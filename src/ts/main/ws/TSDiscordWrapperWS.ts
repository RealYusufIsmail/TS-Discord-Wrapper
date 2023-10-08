import {platform} from 'os';
import {client, connection} from 'websocket'; // Import the necessary types/interfaces from 'websocket'.
import {Heartbeat} from './util/Heartbeat.ts';
import {TSDiscordWrapper} from '../TSDiscordWrapper.ts'; // Remove .ts extension
import {TSDiscordWrapperInfo} from '../TSDiscordWrapperInfo.ts'; // Remove .ts extension
import {get, OpCode} from './util/OpCode.ts';
import GateWayIntent from "../GateWayIntent.ts";
import {ReadyHandler} from "../events/handlers/ReadyHandler.ts";
import {CloseCode, CloseCodeInfo} from "./util/CloseCode.ts";
import {EventNames} from "./util/EventNames.ts";
import * as process from "process";

/**
 * Handles the websocket connection to the Discord API.
 */
export default class TSDiscordWrapperWS {
    private wsClient = new client();
    private token: string | null = null;
    private heartbeat: Heartbeat
    private readonly tsDiscordWrapper: TSDiscordWrapper
    private identifyRateLimit: boolean = false;
    private identifyTimeout: number = 0;
    private attemptedToResume: boolean = false;
    private alreadySentConnectMessageOnce: boolean = false;
    private gatewayIntents: GateWayIntent[] = [];
    //data needed
    private resumeUrl: string | null = null;
    private sessionId: string | null = null;
    private sequenceNumber: number | null = null;

    constructor(tsDiscordWrapper: TSDiscordWrapper) {
        this.tsDiscordWrapper = tsDiscordWrapper;
        this.heartbeat = new Heartbeat(this, tsDiscordWrapper);
    }

    async connect(token: string, intents: GateWayIntent[]) {
        this.token = token;
        this.gatewayIntents = intents;

        const url: string = (this.resumeUrl || TSDiscordWrapperInfo.DISCORD_GATEWAY_URL +
            TSDiscordWrapperInfo.DISCORD_GATEWAY_VERSION +
            TSDiscordWrapperInfo.JSON_ENCODING);

        this.wsClient.connect(url);

        this.wsClient.on('connectFailed', (error: any) => {
            this.tsDiscordWrapper.logger.error('Connect Error: ' + error.toString());
        });

        this.wsClient.on('connect', async (connection: connection) => {
            this.tsDiscordWrapper.logger.info('WebSocket Client Connected');


            if (this.sessionId == null) {
                if (!this.alreadySentConnectMessageOnce) {
                    this.tsDiscordWrapper.logger.info(`
                       _____                            _           _    _          _______ _____   _____  _                       _  __          __                              
  / ____|                          | |         | |  | |        |__   __/ ____| |  __ \\(_)                     | | \\ \\        / /                              
 | |     ___  _ __  _ __   ___  ___| |_ ___  __| |  | |_ ___      | | | (___   | |  | |_ ___  ___ ___  _ __ __| |  \\ \\  /\\  / / __ __ _ _ __  _ __   ___ _ __ 
 | |    / _ \\| '_ \\| '_ \\ / _ \\/ __| __/ _ \\/ _\` |  | __/ _ \\     | |  \\___ \\  | |  | | / __|/ __/ _ \\| '__/ _\` |   \\ \\/  \\/ / '__/ _\` | '_ \\| '_ \\ / _ \\ '__|
 | |___| (_) | | | | | | |  __/ (__| ||  __/ (_| |  | || (_) |    | |  ____) | | |__| | \\__ \\ (_| (_) | | | (_| |    \\  /\\  /| | | (_| | |_) | |_) |  __/ |   
  \\_____\\___/|_| |_|_| |_|\\___|\\___|\\__\\___|\\__,_|   \\__\\___/     |_| |_____/  |_____/|_|___/\\___\\___/|_|  \\__,_|     \\/  \\/ |_|  \\__,_| .__/| .__/ \\___|_|   
                                                                                                                                       | |   | |              
                                                                                                                                       |_|   |_|              
                 `.trim());
                    this.alreadySentConnectMessageOnce = true;
                } else {
                    this.tsDiscordWrapper.logger.info("Reconnected to TSDiscordWrapper");
                }
            } else {
                this.tsDiscordWrapper.logger.info("Resuming session " + this.sessionId);
            }

            this.attemptedToResume = false;
            if (this.sessionId === null) {
                await this.identify(connection, intents);
            } else {
                await this.resume(connection);
            }

            connection.on('error', (error: any) => {
                this.tsDiscordWrapper.logger.error("Connection Error: " + error.toString());
            });

            connection.on('close', (code, desc) => {
                this.disconnect(connection, code, this.gatewayIntents);
            });

            connection.on('message', (message: any) => {
                if (message.type === 'utf8') {
                    const data = message.utf8Data;
                    this.onEvent(JSON.parse(data), connection);
                } else {
                    this.tsDiscordWrapper.logger.error("Received: '" + message + "'");
                }
            });
        });
    }

    async disconnect(connection: connection, code: number, intents: GateWayIntent[]) {
        let closeCodeInfo = CloseCodeInfo.get(code);

        this.tsDiscordWrapper.logger.info("Disconnected from TSDiscordWrapper, code: " + code + " " + closeCodeInfo.reason);

        this.heartbeat.cancel();

        let closeCode
        if (closeCodeInfo.code != null) {
            closeCode = closeCodeInfo.code;
        } else {
            closeCode = 1000;
        }

        if (closeCode == closeCodeInfo.code && closeCodeInfo.shouldReconnect()) {
            this.tsDiscordWrapper.logger.info("Reconnecting to TSDiscordWrapper in 5 seconds");
            await new Promise(resolve => setTimeout(resolve, 5000));
            await this.connect(this.token as string, intents);
        } else {
            this.tsDiscordWrapper.logger.info("Not reconnecting to TSDiscordWrapper, code: " + code + " " + closeCodeInfo.reason);
            await this.invalidate(code);
        }
    }

    async invalidate(code: number) {
        this.sessionId = null;
        this.resumeUrl = null;

        //exit
        process.exit(code);
    }

    async resume(connection: connection) {
        const data = {
            "op": OpCode.RESUME,
            "d": {
                "token": this.token,
                "session_id": this.sessionId,
                "seq": this.sequenceNumber
            }
        }

        await this.send(connection, JSON.stringify(data));
    }

    async identify(connection1: connection, intents: GateWayIntent[]) {
        const data = {
            "op": OpCode.IDENTIFY,
            "d": {
                "token": this.token,
                "intents": GateWayIntent.calculateBitmask(intents),
                "properties": {
                    "$os": platform(),
                    "$browser": "TSDiscordWrapper",
                    "$device": "TSDiscordWrapper"
                }
            }
        }

        this.identifyRateLimit = true;
        await this.send(connection1, JSON.stringify(data));
    }

    async onEvent(payload: any, connection: connection) {
        const sequenceNumber = payload.s;

        if (sequenceNumber !== null) {
            this.sequenceNumber = sequenceNumber;
        }

        const data = payload.d;
        const opCode = payload.op;

        switch (get(opCode)) {
            case OpCode.DISPATCH: {
                const eventName = payload.t;
                await this.handleEvent(eventName, data);
                break;
            }
            case OpCode.RECONNECT: {
                await this.sendClose(connection, CloseCode.RECONNECT, CloseCodeInfo.get(CloseCode.RECONNECT).reason);
                break;
            }
            case OpCode.HELLO: {
                const heartbeatInterval = data.heartbeat_interval as number;
                await this.heartbeat.start(heartbeatInterval, true, this.sequenceNumber, connection);
                break;
            }
            case OpCode.HEARTBEAT_ACK: {
                this.heartbeat.receivedHeartbeatAck();
                break;
            }
            case OpCode.INVALID_SESSION: {
                this.identifyRateLimit = this.identifyRateLimit && Date.now() - this.identifyTimeout < 5000;

                if (this.identifyRateLimit) {
                    this.tsDiscordWrapper.logger.warn("Identify rate limit hit, waiting 5 seconds");
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } else if (this.attemptedToResume) {
                    const oneToFiveSeconds: number = Math.floor(Math.random() * 5) + 1;
                    this.tsDiscordWrapper.logger.warn("Invalid session, waiting " + oneToFiveSeconds + " seconds before attempting to to reconnect");
                    await new Promise(resolve => setTimeout(resolve, oneToFiveSeconds * 1000));
                }

                this.sessionId = null;
                this.resumeUrl = null;
                await this.sendClose(connection, CloseCode.INVALID_SESSION, CloseCodeInfo.get(CloseCode.INVALID_SESSION).reason);
            }
        }
    }

    async sendClose(connection: connection, code?: number, reason?: string) {
        connection.sendCloseFrame(code, reason);
    }

    async send(connection: connection, json: string) {
        if (json === null) {
            this.tsDiscordWrapper.logger.error("Error sending message: json is null");
            return;
        }

        if (connection === null) {
            this.tsDiscordWrapper.logger.error("Error sending message: connection is null");
            return;
        }

        connection.send(json, err => {
            if (err != undefined) {
                this.tsDiscordWrapper.logger.error("Error sending message: " + err);
            }
        });
    }

    async handleEvent(eventName: string, data: any) {
        switch (EventNames.get(eventName)) {
            case EventNames.READY: {
                this.sessionId = data.session_id as string;
                this.resumeUrl = data.resume_gateway_url as string;
                this.attemptedToResume = false;
                new ReadyHandler(this.tsDiscordWrapper, data);
                break;
            }
            case EventNames.INVALID_SESSION: {
                this.sessionId = null;
                this.resumeUrl = null;
                break;
            }
            case EventNames.RECONNECT: {
                this.attemptedToResume = false;
                break
            }
            case EventNames.RESUMED: {
                this.attemptedToResume = false;
            }
        }
    }
}
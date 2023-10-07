import { platform } from 'os';
import { connection, client } from 'websocket'; // Import the necessary types/interfaces from 'websocket'.
import { Heartbeat } from './util/Heartbeat.ts';
import { TSDiscordWrapper } from '../TSDiscordWrapper.ts'; // Remove .ts extension
import { TSDiscordWrapperInfo } from '../TSDiscordWrapperInfo.ts'; // Remove .ts extension
import { get, OpCode } from './util/OpCode.ts';
import GateWayIntent from "../GateWayIntent.ts";
import {ReadyHandler} from "../events/handlers/ReadyHandler.ts";

/**
 * Handles the websocket connection to the Discord API.
 */
export default class TSDiscordWrapperWS {
    private wsClient = new client();
    private token: string | null = null;
    private heartbeat : Heartbeat
    private readonly tsDiscordWrapper : TSDiscordWrapper

    constructor(tsDiscordWrapper : TSDiscordWrapper) {
        this.tsDiscordWrapper = tsDiscordWrapper;
        this.heartbeat = new Heartbeat(this, tsDiscordWrapper);
    }


    //data needed
    private resumeUrl: string | null = null;
    private sessionId: string | null = null;
    private sequenceNumber: number | null = null;

    async connect(token : string, intents: GateWayIntent[]) {
        this.token = token;

        const url: string = (this.resumeUrl || TSDiscordWrapperInfo.DISCORD_GATEWAY_URL +
            TSDiscordWrapperInfo.DISCORD_GATEWAY_VERSION +
            TSDiscordWrapperInfo.JSON_ENCODING);

        this.wsClient.connect(url);

        this.wsClient.on('connectFailed', (error: any) => {
            this.tsDiscordWrapper.logger.error('Connect Error: ' + error.toString());
        });

        this.wsClient.on('connect', async (connection: connection) => {
            this.tsDiscordWrapper.logger.info('WebSocket Client Connected');

            if (this.sessionId === null) {
                await this.identify(connection, intents);
            } else {
                await this.resume(connection);
            }

            connection.on('error', (error: any) => {
                this.tsDiscordWrapper.logger.error("Connection Error: " + error.toString());
            });

            connection.on('close', (code, desc) => {
                this.tsDiscordWrapper.logger.error("Connection Closed: " + code + " " + desc);
            });

            connection.on('message', (message: any) => {
                if (message.type === 'utf8') {
                    const data = message.utf8Data;
                    this.tsDiscordWrapper.logger.info("Received: '" + data + "'");
                    this.onEvent(JSON.parse(data), connection);
                } else {
                    this.tsDiscordWrapper.logger.error("Received: '" + message + "'");
                }
            });
        });
    }
    
    async disconnect(connection : connection) {
        //TODO: Implement disconnect
    }

    async resume(connection : connection) {
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

    async identify(connection1 : connection, intents: GateWayIntent[]) {
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

        await this.send(connection1, JSON.stringify(data));
    }

    async onEvent(payload : any, connection: connection) {
        console.log(payload);

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
            case OpCode.HELLO: {
                const heartbeatInterval = data.heartbeat_interval as number;
                await this.heartbeat.start(heartbeatInterval, true, this.sequenceNumber, connection);
                break;
            }
            case OpCode.HEARTBEAT_ACK: {
                this.heartbeat.receivedHeartbeatAck();
            }
        }
    }

    async sendClose(connection: connection, code?: number, reason?: string) {
        connection.sendCloseFrame(code, reason);
    }

    async send(connection: connection, json: string) {
        connection.send(json, err => {
            if (err) {
                this.tsDiscordWrapper.logger.error("Error sending message: " + err);
            }
        });
    }

    async handleEvent(eventName: string, data: any) {
        switch (eventName) {
            case "READY": {
                this.sessionId = data.session_id as string;
                this.resumeUrl = data.resume_gateway_url as string;
                new ReadyHandler(this.tsDiscordWrapper, data);
                break;
            }
            case "INVALID_SESSION": {
                this.sessionId = null;
                this.resumeUrl = null;
            }
        }
    }
}
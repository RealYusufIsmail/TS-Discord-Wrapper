import { TSDiscordWrapperInfo } from "../TSDiscordWrapperInfo";
import { platform } from 'os';
import {fromInt, OpCode} from "./util/OpCode";
import {connection} from "websocket";
import {Heartbeat} from "./util/Heartbeat";
import {TSDiscordWrapper} from "../TSDiscordWrapper";

//consts
const WebSocketClient = require('websocket').client;
const WebSocketConnection = require('websocket').connection;
const client = new WebSocketClient();

/**
 * Handles the websocket connection to the Discord API.
 */
export default class TSDiscordWrapperWS {
    private WebSocketClient = new WebSocketClient();
    private token: string | null = null;
    private heartbeat : Heartbeat
    private readonly tsDiscordWrapper : TSDiscordWrapper

    constructor(tsDiscordWrapper : TSDiscordWrapper) {
        this.tsDiscordWrapper = tsDiscordWrapper;
        this.heartbeat = new Heartbeat(this, this.WebSocketClient, tsDiscordWrapper);
    }


    //data needed
    private resumeUrl: string | null = null;
    private sessionId: string | null = null;
    private sequenceNumber: number | null = null;

    async connect(token : string) {
        this.token = token;

        const url: string = (this.resumeUrl || TSDiscordWrapperInfo.DISCORD_GATEWAY_URL +
            TSDiscordWrapperInfo.DISCORD_GATEWAY_VERSION +
            TSDiscordWrapperInfo.JSON_ENCODING);

        client.connect(url);

        client.on('connectFailed', (error: any) => {
            console.log('Connect Error: ' + error.toString());
        });

        client.on('connect', async (connection: any) => {
            console.log('WebSocket Client Connected');

            connection.on('error', (error: any) => {
                console.log("Connection Error: " + error.toString());
            });

            connection.on('close', () => {
                console.log('echo-protocol Connection Closed');
            });

            connection.on('message', (message: any) => {
                // Handle incoming messages
            });

            if (this.sessionId === null) {
                await this.identify(connection);
            } else {
                await this.resume(connection);
            }
        });
    }
    async abort() {
        client.abort();
    }

    async disconnect(connection : typeof WebSocketConnection) {
        //TODO: Implement disconnect
    }

    async resume(connection : typeof WebSocketConnection) {
        const data = {
            "op": OpCode.RESUME,
            "d": {
                "token": this.token,
                "session_id": this.sessionId,
                "seq": this.sequenceNumber
            }
        }

        connection.send(JSON.stringify(data));
    }

    async identify(connection : typeof WebSocketConnection) {
        const data = {
            "op": OpCode.IDENTIFY,
            "d": {
                "token": this.token,
                "properties": {
                    "$os": platform(),
                    "$browser": "TSDiscordWrapper",
                    "$device": "TSDiscordWrapper"
                }
            }
        }

        connection.send(JSON.stringify(data));
    }

    async onEvent(payload : any) {
        console.log(payload);

        const sequenceNumber = payload.s;

        if (sequenceNumber !== null) {
            this.sequenceNumber = sequenceNumber;
        }

        const data = payload.d;
        const opCode = payload.op;

        switch (fromInt(opCode)) {
            case OpCode.DISPATCH: {
                const eventName = payload.t;
                //TODO: Handle events
                break;
            }
            case OpCode.HELLO: {
                const heartbeatInterval = data.heartbeat_interval as number;
                await this.heartbeat.start(heartbeatInterval, true, this.sequenceNumber);
                break;
            }
            case OpCode.HEARTBEAT_ACK: {
                this.heartbeat.receivedHeartbeatAck();
            }
        }
    }

    async sendClose(connection: connection, code?: number, reason?: string) {
        connection.close(code, reason);
    }

    async send(connection: connection, json: string) {
        connection.send(json);
    }
}
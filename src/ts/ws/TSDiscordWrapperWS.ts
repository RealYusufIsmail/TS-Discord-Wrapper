import { TSDiscordWrapperInfo } from "../TSDiscordWrapperInfo";
const WebSocketClient = require('websocket').client;
const WebSocketConnection = require('websocket').connection;
import os = require('os');
import {OpCode} from "./util/OpCode";
const client = new WebSocketClient();

/**
 * Handles the websocket connection to the Discord API.
 */
export default class TSDiscordWrapperWS {
    private WebSocketClient = new WebSocketClient();
    private readonly token: string | null = null;

    //data needed
    private resumeUrl: string | null = null;
    private sessionId: string | null = null;
    private sequenceNumber: number | null = null;

    constructor(token : string) {
        this.token = token;
    }

    async connect() {
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

    async disconnect(connection : any) {
        //TODO: Implement disconnect
        connection.close();
    }

    async resume(connection : any) {
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

    async identify(connection : any) {
        const data = {
            "op": OpCode.IDENTIFY,
            "d": {
                "token": this.token,
                "properties": {
                    "$os": os.platform(),
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
    }
}
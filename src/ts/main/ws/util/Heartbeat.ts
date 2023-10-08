import TSDiscordWrapperWS from "../TSDiscordWrapperWS.ts";
import {OpCode} from "./OpCode.ts";
import {CloseCode, CloseCodeInfo} from "./CloseCode.ts";
import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";
import {connection} from 'websocket';

export class Heartbeat {
    private readonly websocket: TSDiscordWrapperWS | null = null;
    private connection: any = null;
    private heartbeatThread: Promise<any> | null = null;
    private heartbeatsMissed: number = 0;
    private heartbeatStartTime: number = 0;
    private readonly tSDiscordWrapper: TSDiscordWrapper
    private shouldCancelPromise: boolean = false;

    constructor(websocket: TSDiscordWrapperWS, tSDiscordWrapper: TSDiscordWrapper) {
        this.websocket = websocket;
        this.tSDiscordWrapper = tSDiscordWrapper;
    }

    async start(hearbeatInterval: number, connected: boolean, sequenceNumber: number | null, connection: connection) {
        if (connection == null) {
            throw new Error("Connection is null, please provide a connection");
        }
        this.connection = connection;

        const heartbeat = {
            "op": OpCode.HEARTBEAT,
            "d": sequenceNumber
        }

        this.heartbeatThread = new Promise(async (resolve, reject) => {
            const timeoutId = setInterval(async () => {
                if (this.shouldCancelPromise) {
                    clearInterval(timeoutId);
                    reject("Heartbeat cancelled");
                } else {
                    if (connected) {
                        if (this.heartbeatsMissed >= 2) {
                            this.heartbeatsMissed = 0;
                            this.tSDiscordWrapper.logger.error("Heartbeat missed 2 times, reconnecting...");
                            await this.websocket?.sendClose(this.connection, CloseCode.MISSED_HEARTBEAT, CloseCodeInfo.get(CloseCode.MISSED_HEARTBEAT).getReason());
                        } else {
                            this.heartbeatsMissed += 1;
                            await this.websocket?.send(this.connection, JSON.stringify(heartbeat));
                            this.heartbeatStartTime = Date.now();
                        }
                    }
                }
            }, hearbeatInterval);
        });
    }

    receivedHeartbeatAck() {
        this.heartbeatsMissed = 0;
        const heartbeatLatency = Date.now() - this.heartbeatStartTime;
        this.tSDiscordWrapper.logger.debug("Conformation of heartbeat received, latency: " + heartbeatLatency + "ms");
    }

    cancel() {
        if (this.heartbeatThread != null) {
            this.shouldCancelPromise = true;
        }
    }
}
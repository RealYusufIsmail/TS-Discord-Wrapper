import TSDiscordWrapperWS from "../TSDiscordWrapperWS.ts";
import {OpCode} from "./OpCode.ts";
import {CloseCode, CloseCodeInfo} from "./CloseCode.ts";
import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";
import { connection } from 'websocket'; // Import the necessary types/interfaces from 'websocket'.

export class Heartbeat {
    private readonly websocket: TSDiscordWrapperWS | null = null;
    private readonly connection: any = null;
    private heartbeatThread: Promise<any> | null = null;
    private heartbeatsMissed: number = 0;
    private heartbeatStartTime: number = 0;
    private readonly tSDiscordWrapper : TSDiscordWrapper

    constructor(websocket: TSDiscordWrapperWS, tSDiscordWrapper : TSDiscordWrapper) {
        this.websocket = websocket;
        this.tSDiscordWrapper = tSDiscordWrapper;
    }

    async start(hearbeatInterval: number, connected: boolean, sequenceNumber: number | null, connection: connection) {

        const heartbeat = {
            "op": OpCode.HEARTBEAT,
            "d": sequenceNumber
        }

        this.heartbeatThread = new Promise(async (resolve, reject) => {
            setInterval(async () => {
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
            }, hearbeatInterval);
        });
    }

    receivedHeartbeatAck() {
        this.heartbeatsMissed = 0;
        const heartbeatLatency = Date.now() - this.heartbeatStartTime;
        this.tSDiscordWrapper.logger.info("Heartbeat latency: " + heartbeatLatency + "ms");
    }
}
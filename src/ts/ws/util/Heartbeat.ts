import TSDiscordWrapperWS from "../TSDiscordWrapperWS";
import {OpCode} from "./OpCode";
import {TSDiscordWrapper} from "../../TSDiscordWrapper";
import {CloseCode, CloseCodeInfo} from "./CloseCode";

export class Heartbeat {
    private readonly websocket: TSDiscordWrapperWS | null = null;
    private readonly connection: any = null;
    private heartbeatThread: Promise<any> | null = null;
    private heartbeatsMissed: number = 0;
    private heartbeatStartTime: number = 0;
    private readonly tSDiscordWrapper : TSDiscordWrapper

    constructor(websocket: TSDiscordWrapperWS, connection : any, tSDiscordWrapper : TSDiscordWrapper) {
        this.websocket = websocket;
        this.connection = connection;
        this.tSDiscordWrapper = tSDiscordWrapper;
    }

    async start(hearbeatInterval: number, connected: boolean, sequenceNumber: number | null) {

        const heartbeat = {
            op: OpCode.HEARTBEAT,
            d: sequenceNumber
        }

        this.heartbeatThread = new Promise(async (resolve, reject) => {
            setInterval(async () => {
                if (connected) {
                    if (this.heartbeatsMissed >= 2) {
                        this.heartbeatsMissed = 0;
                        this.tSDiscordWrapper.logger.error("Heartbeat missed 2 times, reconnecting...");
                        await this.websocket?.sendClose(this.connection, CloseCode.MISSED_HEARTBEAT, CloseCodeInfo.fromInt(CloseCode.MISSED_HEARTBEAT).getReason());
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
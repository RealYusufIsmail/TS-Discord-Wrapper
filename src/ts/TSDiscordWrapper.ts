import TSDiscordWrapperWS from "./ws/TSDiscordWrapperWS";
import * as winston from "winston";

export declare interface TSDiscordWrapper {
    
    /**
     * The websocket manager for the wrapper.
     */
    ws: TSDiscordWrapperWS;

    /**
     * The logger for the wrapper.
     */
    logger: winston.Logger;
}

export class TSDiscordWrapper {
    constructor() {
        this.ws = new TSDiscordWrapperWS(this);
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
                new winston.transports.File({filename: 'logs/combined.log'})
            ]
        });
    }

    async login(token: string) {
        //if contain a new line, throw error
        if (token.includes("\n")) throw new Error("Token cannot contain new lines.");
        //if contain a space, throw error
        if (token.includes(" ")) throw new Error("Token cannot contain spaces.");
        //if contain is null or undefined or empty, throw error
        if (!token) throw new Error("Token cannot be null, undefined, or empty.");

        //connect to websocket
        await this.ws.connect(token);
    }
}
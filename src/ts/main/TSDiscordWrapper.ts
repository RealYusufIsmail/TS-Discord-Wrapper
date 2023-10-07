import * as winston from "winston";
import TSDiscordWrapperWS from "./ws/TSDiscordWrapperWS.ts";
import GateWayIntent from "./GateWayIntent.ts";
import {EventEmitter} from "./events/EventEmitter.ts";
import {User} from "./entities/User.ts";

export declare interface TSDiscordWrapper {
    
    /**
     * The websocket manager for the wrapper.
     */
    ws: TSDiscordWrapperWS;

    /**
     * The logger for the wrapper.
     */
    logger: winston.Logger;

    /**
     * The event emitter for the wrapper.
     */
    eventEmitter: EventEmitter;

    /**
     * The user of the bot.
     */
    bot : User
}

export class TSDiscordWrapper {
    constructor() {
        this.ws = new TSDiscordWrapperWS(this);
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple(),
                }),
                new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
                new winston.transports.File({filename: 'logs/combined.log'})
            ]
        });
        this.eventEmitter = new EventEmitter();
    }

    async login(token: string, intents: GateWayIntent[]) {
        //if contain a new line, throw error
        if (token.includes("\n")) throw new Error("Token cannot contain new lines.");
        //if contain a space, throw error
        if (token.includes(" ")) throw new Error("Token cannot contain spaces.");
        //if contain is null or undefined or empty, throw error
        if (!token) throw new Error("Token cannot be null, undefined, or empty.");
        //If intents is null or undefined, then set it to default intents
        if (!intents) intents = GateWayIntent.getDefaultIntents();

        //connect to websocket
        await this.ws.connect(token, intents);
    }
}
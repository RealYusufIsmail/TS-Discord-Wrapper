import * as winston from "winston";
import TSDiscordWrapperWS from "./ws/TSDiscordWrapperWS.ts";
import GateWayIntent from "./GateWayIntent.ts";
import {EventEmitter} from "./events/EventEmitter.ts";
import {User} from "./entities/User.ts";
import {EmbedBuilder} from "./entities/embed/builder/EmbedBuilder.ts";
import configJson from "../../../package.json";
import {RestAPIHandler} from "./rest/RestAPIHandler.ts";
import {EventNames} from "./ws/util/EventNames.ts";

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
    bot: User

    /**
     * The embed builder used to build embeds.
     */
    embedBuilder: EmbedBuilder;

    /**
     * Gets the version of the wrapper.
     */
    version: string;

    /**
     * The rest api handler for the wrapper.
     */
    restApiHandler: RestAPIHandler;

    /**
     * The application id of the bot.
     */
    applicationId ?: string;

    /**
     * Triggers a method once the bot is ready.
     */
    onReady(callback: () => void): void;
}

export class TSDiscordWrapper {
    private readonly token: string;
    applicationId ?: string
    ready ?: boolean = false;

    constructor(token: string) {
        this.ws = new TSDiscordWrapperWS(this);
        this.token = token;
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
        this.embedBuilder = new EmbedBuilder();
        this.restApiHandler = new RestAPIHandler(this.token, this);
        this.version = configJson.version;
    }

    onReady(callback: () => void) {
        //once ready is not false, then call callback
        if (this.ready) callback();
        //else, wait for ready event
        else this.eventEmitter.on(EventNames.READY, callback);
    }

    async login(intents: GateWayIntent[]) {
        //if contain a new line, throw error
        if (this.token.includes("\n")) throw new Error("Token cannot contain new lines.");
        //if contain a space, throw error
        if (this.token.includes(" ")) throw new Error("Token cannot contain spaces.");
        //if contain is null or undefined or empty, throw error
        if (!this.token) throw new Error("Token cannot be null, undefined, or empty.");
        //If intents is null or undefined, then set it to default intents
        if (!intents) intents = GateWayIntent.getDefaultIntents();

        //connect to websocket
        await this.ws.connect(this.token, intents);
    }
}
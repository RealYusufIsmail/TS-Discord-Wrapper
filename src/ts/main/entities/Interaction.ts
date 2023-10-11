import {SnowFlake, SnowFlakeImpl} from "./utils/SnowFlake.ts";
import {InteractionData} from "./interaction/InteractionData.ts";
import {Member} from "./guild/Member.ts";
import {Message} from "./Message.ts";
import {User} from "./User.ts";
import {TSDiscordWrapper} from "../TSDiscordWrapper.ts";
import {ApplicationCommandsEndpoint} from "../rest/EndPoint.ts";
import {Embed} from "./Embed.ts";

export declare interface Interaction extends SnowFlake {
    /**
     * The application ID of the interaction
     */
    applicationId: string;

    /**
     * The type of interaction
     */
    type: number;

    /**
     * The interaction data
     *
     * Note: This is always present on application command, message component, and modal submit interaction types.
     * It is optional for future-proofing against new interaction types
     */
    data: InteractionData;

    /**
     * The guild it was sent from
     */
    guildId ?: string;

    /**
     * The channel it was sent from
     */
    channelId ?: string;

    /**
     * The member who sent it
     */
    member ?: Member;

    /**
     * The user who sent it
     */
    user ?: User;

    /**
     * The token for this interaction
     */
    token ?: string;

    /**
     * The version of the interaction
     */
    version ?: number;

    /**
     * The message it was sent from
     */
    message ?: Message;

    /**
     * The app permissions of the user
     */
    appPermissions ?: string;

    /**
     * The selected language of the user in the application.
     *
     * Note: This is available on all interaction types except PING
     */
    locale ?: string;

    /**
     * The guild's preferred locale, if invoked in a guild
     */
    guildLocale ?: string;

    /**
     * The entitlements for the invoking user.
     */
    entitlements ?: any[];
}

export class Interaction extends SnowFlakeImpl {
    private readonly tsDiscordWrapper: TSDiscordWrapper;
    applicationId: string;
    type: number;
    data: InteractionData;
    guildId ?: string;
    channelId ?: string;
    member ?: Member;
    user ?: User;
    token ?: string;
    version ?: number;
    message ?: Message;
    appPermissions ?: string;
    locale ?: string;
    guildLocale ?: string;
    entitlements ?: any[];

    constructor(tsDiscordWrapper: TSDiscordWrapper, id : number, applicationId: string, type: number, data: InteractionData, guildId ?: string, channelId ?: string, member ?: Member, user ?: User, token ?: string, version ?: number, message ?: Message, appPermissions ?: string, locale ?: string, guildLocale ?: string, entitlements ?: any[]) {
        super(id);
        this.tsDiscordWrapper = tsDiscordWrapper;
        this.applicationId = applicationId;
        this.type = type;
        this.data = data;
        this.guildId = guildId;
        this.channelId = channelId;
        this.member = member;
        this.user = user;
        this.token = token;
        if (typeof version === "number") {
            this.version = version;
        }
        this.message = message;
        this.appPermissions = appPermissions;
        this.locale = locale;
        this.guildLocale = guildLocale;
        this.entitlements = entitlements;
    }


    sendReply(content: string, isTTS: boolean, ephemeral: boolean): void {
        const mainBody = {
            "type": 4,
            "data": {
                "content": content,
                "tts": isTTS,
                "flags": ephemeral ? 64 : 0
            }
        }

        this.tsDiscordWrapper.restApiHandler
            .performPostRequest(ApplicationCommandsEndpoint.REPLY_TO_SLASH_COMMAND,  mainBody, [this.id, this.token as string])
            .catch((error) => {
                this.tsDiscordWrapper.logger.error("Failed to send reply to interaction: " + error);
            });
    }

    sendReplyEmbed(embed: Embed, ephemeral: boolean): void {
        const mainBody = {
            "type": 4,
            "data": {
                "embeds": [embed.toJson()],
                "flags": ephemeral ? 64 : 0
            }
        }

        this.tsDiscordWrapper.restApiHandler
            .performPostRequest(ApplicationCommandsEndpoint.REPLY_TO_SLASH_COMMAND,  mainBody, [this.id, this.token as string])
            .catch((error) => {
                this.tsDiscordWrapper.logger.error("Failed to send reply to interaction: " + error);
            });
    }

    static fromJson(data: any, tsDiscordWrapper: TSDiscordWrapper): Interaction {
        return new Interaction(tsDiscordWrapper, data.id, data.application_id, data.type, data.data, data.guild_id, data.channel_id, data.member, data.user, data.token, data.version, data.message, data.app_permissions, data.locale, data.guild_locale, data.entitlements);
    }
}
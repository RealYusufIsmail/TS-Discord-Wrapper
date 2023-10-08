import {User} from "../User.ts";

export declare interface Member {

    /**
     * The user this guild member represents
     */
    user ?: User;

    /**
     * The nickname of this guild member
     */
    nick ?: string;

    /**
     * The avatar hash of this guild member
     */
    avatar ?: string;

    /**
     * The roles of this guild member
     */
    roles : string[];

    /**
     * When the user joined the guild
     */
    joined_at : string;

    /**
     * When the user started boosting the guild
     */
    premium_since ?: string;

    /**
     * Whether the user is deafened in voice channels
     */
    deaf : boolean;

    /**
     * Whether the user is muted in voice channels
     */
    mute : boolean;

    /**
     * Whether the user has not yet passed the guild's Membership Screening requirements
     */
    pending ?: boolean;

    /**
     * Total permissions of the member in the channel, including overwrites, returned when in the interaction object
     */
    permissions ?: string;

    /**
     * When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out.
     */
    communicationDisabledUntil ?: string;
}

export class Member {
    user ?: User;
    nick ?: string;
    avatar ?: string;
    roles : string[];
    joined_at : string;
    premium_since ?: string;
    deaf : boolean;
    mute : boolean;
    pending ?: boolean;
    permissions ?: string;
    communicationDisabledUntil ?: string;

    constructor(user ?: User, nick ?: string, avatar ?: string, roles : string[] = [], joined_at ?: string, premium_since ?: string, deaf ?: boolean, mute ?: boolean, pending ?: boolean, permissions ?: string, communicationDisabledUntil ?: string) {
        this.user = user;
        this.nick = nick;
        this.avatar = avatar;
        this.roles = roles;
        this.joined_at = joined_at || '';
        this.premium_since = premium_since;
        this.deaf = deaf || false;
        this.mute = mute || false;
        this.pending = pending;
        this.permissions = permissions;
        this.communicationDisabledUntil = communicationDisabledUntil;
    }

    static fromJson(json: any): Member {
        return new Member(
            json.user ? User.fromJson(json.user) : undefined,
            json.nick,
            json.avatar,
            json.roles,
            json.joined_at,
            json.premium_since,
            json.deaf,
            json.mute,
            json.pending,
            json.permissions,
            json.communication_disabled_until
        );
    }
}
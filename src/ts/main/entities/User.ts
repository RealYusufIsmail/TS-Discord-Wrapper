import {SnowFlake, SnowFlakeImpl} from "./utils/SnowFlake.ts";

export declare interface User extends SnowFlake {

    /**
     * The user's username, not unique across the platform
     */
    username: string;

    /**
     * The user's display name, if it is set. For bots, this is the application name.
     */
    globalName ?: string

    /**
     * The user's avatar hash
     */
    avatar ?: string;

    /**
     * Whether the user belongs to an OAuth2 application
     */
    bot ?: boolean;

    /**
     * Whether the user is an Official Discord System user (part of the urgent message system)
     */
    system ?: boolean;

    /**
     * Whether the user has two factor enabled on their account
     */
    mfaEnabled ?: boolean;

    /**
     * The user's banner hash
     */
    banner ?: string;

    /**
     * The user's banner color encoded as an integer representation of hexadecimal color code
     */
    accentColor ?: number;

    /**
     * The user's chosen language option
     */
    locale ?: string;

    /**
     * Whether the email on this account has been verified
     */
    verified ?: boolean;

    /**
     * The user's email
     */
    email ?: string;

    /**
     * The flags on a user's account
     */
    flags ?: number;

    /**
     * The type of Nitro subscription on a user's account
     */
    premiumType ?: number;

    /**
     * The public flags on a user's account
     */
    publicFlags ?: number;

    /**
     * The user's avatar decoration hash
     */
    accentColorUser ?: string;
}

export class User extends SnowFlakeImpl {
    username: string;
    globalName ?: string
    avatar ?: string;
    bot ?: boolean;
    system ?: boolean;
    mfaEnabled ?: boolean;
    banner ?: string;
    accentColor ?: number;
    locale ?: string;
    verified ?: boolean;
    email ?: string;
    flags ?: number;
    premiumType ?: number;
    publicFlags ?: number;
    accentColorUser ?: string;

    constructor(id: number, username: string, globalName ?: string, avatar ?: string, bot ?: boolean, system ?: boolean, mfaEnabled ?: boolean, banner ?: string, accentColor ?: number, locale ?: string, verified ?: boolean, email ?: string, flags ?: number, premiumType ?: number, publicFlags ?: number, accentColorUser ?: string) {
        super(id);
        this.username = username;
        this.globalName = globalName;
        this.avatar = avatar;
        this.bot = bot;
        this.system = system;
        this.mfaEnabled = mfaEnabled;
        this.banner = banner;
        this.accentColor = accentColor;
        this.locale = locale;
        this.verified = verified;
        this.email = email;
        this.flags = flags;
        this.premiumType = premiumType;
        this.publicFlags = publicFlags;
        this.accentColorUser = accentColorUser;
    }

    public getUsername() : string {
        return this.username;
    }

    public getGlobalName() : string | undefined {
        return this.globalName;
    }

    public getAvatar() : string | undefined {
        return this.avatar;
    }

    public isBot() : boolean | undefined {
        return this.bot;
    }

    public isSystem() : boolean | undefined {
        return this.system;
    }

    public isMfaEnabled() : boolean | undefined {
        return this.mfaEnabled;
    }

    public getBanner() : string | undefined {
        return this.banner;
    }

    public getAccentColor() : number | undefined {
        return this.accentColor;
    }

    public getLocale() : string | undefined {
        return this.locale;
    }

    public isVerified() : boolean | undefined {
        return this.verified;
    }

    public getEmail() : string | undefined {
        return this.email;
    }

    public getFlags() : number | undefined {
        return this.flags;
    }

    public getPremiumType() : number | undefined {
        return this.premiumType;
    }

    public getPublicFlags() : number | undefined {
        return this.publicFlags;
    }

    public getAccentColorUser() : string | undefined {
        return this.accentColorUser;
    }

    public static fromJson(json: any) : User {
        return new User(
            json.id,
            json.username,
            json.globalName ? json.globalName : undefined,
            json.avatar ? json.avatar : undefined,
            json.bot ? json.bot : undefined,
            json.system ? json.system : undefined,
            json.mfaEnabled ? json.mfaEnabled : undefined,
            json.banner ? json.banner : undefined,
            json.accentColor ? json.accentColor : undefined,
            json.locale ? json.locale : undefined,
            json.verified ? json.verified : undefined,
            json.email ? json.email : undefined,
            json.flags ? json.flags : undefined,
            json.premiumType ? json.premiumType : undefined,
            json.publicFlags ? json.publicFlags : undefined,
            json.accentColorUser ? json.accentColorUser : undefined
        );
    }
}

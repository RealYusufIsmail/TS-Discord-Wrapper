import {SnowFlake, SnowFlakeImpl} from "./utils/SnowFlake.ts";

export interface User extends SnowFlake {

    /**
     * The user's username, not unique across the platform
     */
    readonly username: string;

    /**
     * The user's display name, if it is set. For bots, this is the application name.
     */
    readonly globalName: string | null;

    /**
     * The user's avatar hash
     */
    readonly avatar: string | null;

    /**
     * Whether the user belongs to an OAuth2 application
     */
    readonly bot: boolean | null;

    /**
     * Whether the user is an Official Discord System user (part of the urgent message system)
     */
    readonly system: boolean | null;

    /**
     * Whether the user has two factor enabled on their account
     */
    readonly mfaEnabled: boolean | null;

    /**
     * The user's banner hash
     */
    readonly banner: string | null;

    /**
     * The user's banner color encoded as an integer representation of hexadecimal color code
     */
    readonly accentColor: number | null;

    /**
     * The user's chosen language option
     */
    readonly locale: string | null;

    /**
     * Whether the email on this account has been verified
     */
    readonly verified: boolean | null;

    /**
     * The user's email
     */
    readonly email: string | null;

    /**
     * The flags on a user's account
     */
    readonly flags: number | null;

    /**
     * The type of Nitro subscription on a user's account
     */
    readonly premiumType: number | null;

    /**
     * The public flags on a user's account
     */
    readonly publicFlags: number | null;

    /**
     * The user's avatar decoration hash
     */
    readonly accentColorUser: string | null;
}

export class UserImpl extends SnowFlakeImpl implements User {
    private readonly _globalName: string | null;
    private readonly _avatar: string | null;
    private readonly _bot: boolean | null;
    private readonly _system: boolean | null;
    private readonly _mfaEnabled: boolean | null;
    private readonly _banner: string | null;
    private readonly _accentColor: number | null;
    private readonly _locale: string | null;
    private readonly _verified: boolean | null;
    private readonly _email: string | null;
    private readonly _flags: number | null;
    private readonly _premiumType: number | null;
    private readonly _publicFlags: number | null;
    private readonly _accentColorUser: string | null;

    constructor(data : any, idAsLong : number) {
        super(idAsLong);
        this._globalName = data.username;
        this._avatar = data.avatar;
        this._bot = data.bot;
        this._system = data.system;
        this._mfaEnabled = data.mfa_enabled;
        this._banner = data.banner;
        this._accentColor = data.accent_color;
        this._locale = data.locale;
        this._verified = data.verified;
        this._email = data.email;
        this._flags = data.flags;
        this._premiumType = data.premium_type;
        this._publicFlags = data.public_flags;
        this._accentColorUser = data.accent_color_user;
    }

    get username(): string {
        return this._globalName!;
    }

    get globalName(): string | null {
        return this._globalName;
    }

    get avatar(): string | null {
        return this._avatar;
    }

    get bot(): boolean | null {
        return this._bot;
    }

    get system(): boolean | null {
        return this._system;
    }

    get mfaEnabled(): boolean | null {
        return this._mfaEnabled;
    }

    get banner(): string | null {
        return this._banner;
    }

    get accentColor(): number | null {
        return this._accentColor;
    }

    get locale(): string | null {
        return this._locale;
    }

    get verified(): boolean | null {
        return this._verified;
    }

    get email(): string | null {
        return this._email;
    }

    get flags(): number | null {
        return this._flags;
    }

    get premiumType(): number | null {
        return this._premiumType;
    }

    get publicFlags(): number | null {
        return this._publicFlags;
    }

    get accentColorUser(): string | null {
        return this._accentColorUser;
    }
}
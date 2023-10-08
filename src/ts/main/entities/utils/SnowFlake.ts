
/**
 * A snowflake is a 64-bit integer that is used to uniquely identify a Discord entity.
 *
 * @see [DiscordDocs](https://discord.com/developers/docs/reference#snowflakes)
 */
export declare interface SnowFlake {
    /**
     * The id of this snowflake as a string.
     *
     * @returns The id of this snowflake as a string.
     */
    readonly id: string;

    /**
     * The id of this snowflake as a number.
     *
     * @returns The id of this snowflake as a number.
     */
    readonly idAsLong: number;

    /**
     * The timestamp of this snowflake in milliseconds since the Discord Epoch.
     *
     * @returns The timestamp of this snowflake.
     */
    readonly asTimestamp: number;

    /**
     * The worker id of this snowflake.
     *
     * @returns The worker id of this snowflake.
     */
    readonly asWorkerId: number;

    /**
     * The process id of this snowflake.
     *
     * @returns The process id of this snowflake.
     */
    readonly asProcessId: number;

    /**
     * The increment of this snowflake.
     *
     * @returns The increment of this snowflake.
     */
    readonly asIncrement: number;
}

export class SnowFlakeImpl implements SnowFlake {
    private readonly _id: string;
    private readonly _idAsLong: number;
    private readonly _asTimestamp: number;
    private readonly _asWorkerId: number;
    private readonly _asProcessId: number;
    private readonly _asIncrement: number;

    constructor(idAsLong: number) {
        this._id = idAsLong.toString();
        this._idAsLong = idAsLong as number;
        this._asTimestamp = (this._idAsLong >> 22) + 1420070400000;
        this._asWorkerId = (this._idAsLong & 0x3E0000) >> 17;
        this._asProcessId = (this._idAsLong & 0x1F000) >> 12;
        this._asIncrement = this._idAsLong & 0xFFF;
    }

    get id(): string {
        return this._id;
    }

    get idAsLong(): number {
        return this._idAsLong;
    }

    get asTimestamp(): number {
        return this._asTimestamp;
    }

    get asWorkerId(): number {
        return this._asWorkerId;
    }

    get asProcessId(): number {
        return this._asProcessId;
    }

    get asIncrement(): number {
        return this._asIncrement;
    }
}
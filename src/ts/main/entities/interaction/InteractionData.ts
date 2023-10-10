import {SnowFlake, SnowFlakeImpl} from "../utils/SnowFlake.ts";
import {ResolvedData} from "./ResolvedData.ts";
import {SlashOption} from "./slash/SlashOption.ts";

export declare interface InteractionData extends SnowFlake {

    /**
     * The name of the invoked command
     */
    name: string;

    /**
     * The type of the invoked command
     */
    type: number;

    /**
     * The resolved data of the invoked command
     */
    resolved: ResolvedData;

    /**
     * The options of the invoked command
     */
    options: SlashOption

    /**
     * The guild id of the invoked command
     */
    guildId: string;

    /**
     * The id of the user or message targeted by a user or message command.
     */
    targetId: string;
}

export class InteractionData extends SnowFlakeImpl {

    constructor(id: number, name: string, type: number, resolved: ResolvedData, options: SlashOption, guildId: string, targetId: string) {
        super(id);
        this.name = name;
        this.type = type;
        this.resolved = resolved;
        this.options = options;
        this.guildId = guildId;
        this.targetId = targetId;
    }

    public static fromJson(json: any): InteractionData {
        return new InteractionData(
            json.id,
            json.name,
            json.type,
            ResolvedData.fromJson(json.resolved),
            SlashOption.fromJson(json.options),
            json.guild_id,
            json.target_id
        );
    }
}
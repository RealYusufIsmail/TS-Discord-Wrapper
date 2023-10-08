import {SlashOptionType, SlashOptionTypeInfo} from "./SlashOptionType.ts";

export declare interface SlashOption {

    /**
     * The name of the slash option.
     */
    name: string;

    /**
     * The type of the slash option.
     */
    type: SlashOptionType

    /**
     * The value of the slash option.
     */
    value: string | number | boolean;

    /**
     * The list of options of the slash option.
     * Present if this option is a group or subcommand.
     */
    options: SlashOption[];

    /**
     * If the option is focused.
     */
    focused: boolean;
}

export class SlashOption {
    constructor(name: string, type: SlashOptionType, value: string | number | boolean, options: SlashOption[], focused: boolean) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.options = options;
        this.focused = focused;
    }

    public static fromJson(json: any): SlashOption {
        return new SlashOption(
            json.name,
            json.type,
            SlashOptionTypeInfo.getSlashOptionType(json.type),
            json.options.map((option: any) => SlashOption.fromJson(option)),
            json.focused
        );
    }
}
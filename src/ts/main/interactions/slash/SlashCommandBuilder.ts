import {SlashOptionBuilder} from "./SlashOptionBuilder.ts";
import {SlashSubCommandGroup} from "./SlashSubCommandGroup.ts";
import {SlashOption} from "../../entities/interaction/slash/SlashOption.ts";

export declare interface SlashCommandBuilder {

    /**
     * Gets the name of the slash command.
     *
     * @returns The name of the slash command.
     */
    getName(): string;

    /**
     * Adds a slash option to the builder.
     *
     * @param slashOption The slash option.
     * @returns The slash command builder.
     */
    addSlashOption(slashOption: SlashOptionBuilder): SlashCommandBuilder;

    /**
     * Adds a list of slash options to the builder.
     *
     * @param slashOptions The list of slash options.
     * @returns The slash command builder.
     */
    addSlashOptions(slashOptions: SlashOptionBuilder[]): SlashCommandBuilder;

    /**
     * Gets the list of slash options.
     *
     * @returns The list of slash options.
     */
    getSlashOptions(): SlashOptionBuilder[];

    /**
     * Removes a slash option from the builder.
     *
     * @param name The name of the slash option.
     * @returns The slash command builder.
     */
    removeSlashOption(name: string): SlashCommandBuilder;

    /**
     * Removes a slash option from the builder.
     *
     * @param slashOption The slash option.
     * @returns The slash command builder.
     */
    removeSlashOption(slashOption: SlashOptionBuilder): SlashCommandBuilder;

    /**
     * Removes all slash options from the builder.
     *
     * @returns The slash command builder.
     */
    removeAllSlashOptions(): SlashCommandBuilder;

    /**
     * Adds a subcommand to the builder.
     *
     * @param name The name of the subcommand.
     * @param description The description of the subcommand.
     * @returns The slash command builder.
     */
    addSubcommand(name: string, description: string): SlashCommandBuilder;

    /**
     * Adds a subcommand to the builder.
     *
     * @param slashSubCommandBuilder The slash subcommand builder.
     * @returns The slash command builder.
     */
    addSubcommand(slashSubCommandBuilder: SlashSubCommandGroup): SlashCommandBuilder;

    /**
     * Adds a list of subcommands to the builder.
     *
     * @param slashSubCommandBuilder The list of subcommands.
     * @returns The slash command builder.
     */
    addSubcommands(slashSubCommandBuilder: SlashSubCommandGroup[]): SlashCommandBuilder;

    /**
     * Gets the list of subcommands.
     *
     * @returns The list of subcommands.
     */
    getSubcommands(): SlashSubCommandGroup[];

    /**
     * Removes a subcommand from the builder.
     *
     * @param name The name of the subcommand.
     * @returns The slash command builder.
     */
    removeSubcommand(name: string): SlashSubCommandGroup;

    /**
     * Removes a subcommand from the builder.
     *
     * @param slashSubCommandBuilder The slash subcommand builder.
     * @returns The slash command builder.
     */
    removeSubcommand(slashSubCommandBuilder: SlashSubCommandGroup): SlashCommandBuilder;

    /**
     * Removes all subcommands from the builder.
     *
     * @returns The slash command builder.
     */
    removeAllSubcommands(): SlashCommandBuilder;

    /**
     * Builds the slash command.
     *
     * @returns The built slash command.
     */
    toJson(): any;
}

export class SlashCommandBuilder {
    private readonly name: string;
    private readonly description: string;
    private readonly guildOnly: boolean;
    private readonly slashOptions: SlashOptionBuilder[] = [];
    private readonly subcommands: SlashSubCommandGroup[] = [];

    constructor(name: string, description: string, guildOnly: boolean) {
        this.name = name;
        this.description = description;
        this.guildOnly = guildOnly;
    }

    public getName(): string {
        return this.name;
    }

    public addSlashOption(slashOption: SlashOptionBuilder): SlashCommandBuilder {
        this.slashOptions.push(slashOption);
        return this;
    }

    public addSlashOptions(slashOptions: SlashOptionBuilder[]): SlashCommandBuilder {
        this.slashOptions.push(...slashOptions);
        return this;
    }

    public getSlashOptions(): SlashOptionBuilder[] {
        return this.slashOptions;
    }

    public removeSlashOption(name: string): SlashCommandBuilder;
    public removeSlashOption(slashOption: SlashOptionBuilder): SlashCommandBuilder;

    public removeSlashOption(slashOption: string | SlashOptionBuilder): SlashCommandBuilder {
        if (slashOption instanceof SlashOptionBuilder) {
            this.slashOptions.splice(this.slashOptions.findIndex((value) => value === slashOption), 1);
        } else {
            this.slashOptions.splice(this.slashOptions.findIndex((value) => value.getName() === slashOption), 1);
        }
        return this;
    }

    public removeAllSlashOptions(): SlashCommandBuilder {
        this.slashOptions.splice(0, this.slashOptions.length);
        return this;
    }

    public addSubcommand(name: string, description: string): SlashCommandBuilder;
    public addSubcommand(slashSubCommandBuilder: SlashSubCommandGroup): SlashCommandBuilder;
    public addSubcommand(slashSubCommandBuilder: string | SlashSubCommandGroup, description?: string): SlashCommandBuilder {
        if (typeof slashSubCommandBuilder === "string") {
            this.subcommands.push(new SlashSubCommandGroup(slashSubCommandBuilder, description ?? ""));
        } else {
            this.subcommands.push(slashSubCommandBuilder);
        }
        return this;
    }

    public addSubcommands(slashSubCommandBuilder: SlashSubCommandGroup[]): SlashCommandBuilder {
        this.subcommands.push(...slashSubCommandBuilder);
        return this;
    }

    public getSubcommands(): SlashSubCommandGroup[] {
        return this.subcommands;
    }

    public removeSubcommand(name: string): SlashSubCommandGroup;
    public removeSubcommand(slashSubCommandBuilder: SlashSubCommandGroup): SlashCommandBuilder;
    public removeSubcommand(slashSubCommandBuilder: string | SlashSubCommandGroup): SlashCommandBuilder | SlashSubCommandGroup {
        if (typeof slashSubCommandBuilder === "string") {
            const index = this.subcommands.findIndex((value) => value.getName() === slashSubCommandBuilder);
            const slashSubCommand = this.subcommands[index];
            this.subcommands.splice(index, 1);
            return slashSubCommand;
        } else {
            this.subcommands.splice(this.subcommands.findIndex((value) => value === slashSubCommandBuilder), 1);
            return this;
        }
    }

    public removeAllSubcommands(): SlashCommandBuilder {
        this.subcommands.splice(0, this.subcommands.length);
        return this;
    }

    public toJson(): any {
        const jsonObject: any = {
            name: this.name,
            description: this.description,
            options: this.slashOptions.map((value) => value.toJson())
        };

        if (this.subcommands.length > 0) {
            jsonObject.options.push(...this.subcommands.map((value) => value.toJson()));
        }

        return jsonObject;
    }
}
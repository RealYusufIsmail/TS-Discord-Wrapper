import {SlashCommandBuilder} from "./SlashCommandBuilder.ts";
import {SlashInfoSender} from "../../rest/SlashInfoSender.ts";
import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";

export declare interface SlashBuilder {

    /**
     * Adds a slash command to the builder.
     *
     * @param name The name of the slash command.
     * @param description The description of the slash command.
     * @returns The slash builder.
     */
    addSlashCommand(name: string, description: string): SlashBuilder;

    /**
     * Adds a slash command to the builder.
     *
     * @param slashCommandBuilder The slash command builder.
     * @returns The slash builder.
     */
    addSubcommand(slashCommandBuilder: SlashCommandBuilder): SlashBuilder;


    /**
     * Adds a list of slash commands to the builder.
     *
     * @param slashCommands The list of slash commands.
     * @returns The slash builder.
     */
    addSlashCommands(slashCommands: SlashCommandBuilder[]): SlashBuilder;

    /**
     * Gets the list of slash commands.
     *
     * @returns The list of slash commands.
     */
    getSlashCommands(): SlashCommandBuilder[];

    /**
     * Removes a slash command from the builder.
     *
     * @param name The name of the slash command.
     * @returns The slash builder.
     */
    removeSlashCommand(name: string): SlashBuilder;

    /**
     * Removes a slash command from the builder.
     *
     * @param slashCommandBuilder The slash command builder.
     * @returns The slash builder.
     */
    removeSlashCommand(slashCommandBuilder: SlashCommandBuilder): SlashBuilder;

    /**
     * Removes all slash commands from the builder.
     *
     * @returns The slash builder.
     */
    removeAllSlashCommands(): SlashBuilder;

    /**
     * Builds the slash commands.
     *
     * @returns The slash commands.
     */
    build(): void;
}

export class SlashBuilder {
    private tSDiscordWrapper: TSDiscordWrapper;
    private slashCommands: SlashCommandBuilder[] = [];

    constructor(tSDiscordWrapper: TSDiscordWrapper) {
        this.tSDiscordWrapper = tSDiscordWrapper;
    }

    public addSlashCommand(name: string, description: string): SlashBuilder {
        this.slashCommands.push(new SlashCommandBuilder(name, description, false));
        return this;
    }

    public addSubcommand(slashCommandBuilder: SlashCommandBuilder): SlashBuilder {
        this.slashCommands.push(slashCommandBuilder);
        return this;
    }

    public addSlashCommands(slashCommands: SlashCommandBuilder[]): SlashBuilder {
        this.slashCommands.push(...slashCommands);
        return this;
    }

    public getSlashCommands(): SlashCommandBuilder[] {
        return this.slashCommands;
    }

    public removeSlashCommand(name: string): SlashBuilder;
    public removeSlashCommand(slashCommandBuilder: SlashCommandBuilder): SlashBuilder;
    public removeSlashCommand(slashCommandBuilderOrName: SlashCommandBuilder | string): SlashBuilder {
        if (typeof slashCommandBuilderOrName === "string") {
            this.slashCommands = this.slashCommands.filter(slashCommand => slashCommand.getName() !== slashCommandBuilderOrName);
        } else {
            this.slashCommands = this.slashCommands.filter(slashCommand => slashCommand !== slashCommandBuilderOrName);
        }
        return this;
    }

    public removeAllSlashCommands(): SlashBuilder {
        this.slashCommands = [];
        return this;
    }

    public build(): void {
        new SlashInfoSender(this.slashCommands, this.tSDiscordWrapper);
    }
}
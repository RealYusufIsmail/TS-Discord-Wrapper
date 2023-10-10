import {SlashSubCommand} from "./SlashSubCommand.ts";

export declare interface SlashSubCommandGroup {

    /**
     * Gets the name of the slash sub command group.
     *
     * @returns The name of the slash sub command group.
     */
    getName(): string;

    /**
     * Gets the description of the slash sub command group.
     *
     * @returns The description of the slash sub command group.
     */
    getDescription(): string;

    /**
     * Adds a slash sub command to the builder.
     *
     * @param slashSubCommand The slash sub command.
     * @returns The slash sub command group.
     */
    addSlashSubCommand(slashSubCommand: SlashSubCommand): SlashSubCommandGroup;

    /**
     * Adds a list of slash sub commands to the builder.
     *
     * @param slashSubCommands The list of slash sub commands.
     * @returns The slash sub command group.
     */
    addSlashSubCommands(slashSubCommands: SlashSubCommand[]): SlashSubCommandGroup;

    /**
     * Gets the list of slash sub commands.
     *
     * @returns The list of slash sub commands.
     */
    getSlashSubCommands(): SlashSubCommand[];

    /**
     * Removes a slash sub command from the builder.
     *
     * @param name The name of the slash sub command.
     * @returns The slash sub command group.
     */
    removeSlashSubCommand(name: string): SlashSubCommandGroup;

    /**
     * Removes a slash sub command from the builder.
     *
     * @param slashSubCommand The slash sub command.
     * @returns The slash sub command group.
     */
    removeSlashSubCommand(slashSubCommand: SlashSubCommand): SlashSubCommandGroup;

    /**
     * Removes all slash sub commands from the builder.
     *
     * @returns The slash sub command group.
     */
    removeAllSlashSubCommands(): SlashSubCommandGroup;

    /**
     * Builds the slash sub command group.
     *
     * @returns The slash sub command group.
     */
    toJson(): any;
}

export class SlashSubCommandGroup {
    private readonly name: string;
    private readonly description: string;
    private subCommands: SlashSubCommand[] = [];

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public addSlashSubCommand(slashSubCommand: SlashSubCommand): SlashSubCommandGroup;
    public addSlashSubCommand(name: string, description: string): SlashSubCommandGroup;
    public addSlashSubCommand(slashSubCommandOrName: SlashSubCommand | string, description ?: string): SlashSubCommandGroup {
        if (slashSubCommandOrName instanceof SlashSubCommand) {
            this.subCommands.push(slashSubCommandOrName);
        } else {
            this.subCommands.push(new SlashSubCommand(slashSubCommandOrName, description!));
        }
        return this;
    }

    public addSlashSubCommands(slashSubCommands: SlashSubCommand[]): SlashSubCommandGroup {
        this.subCommands.push(...slashSubCommands);
        return this;
    }

    public getSlashSubCommands(): SlashSubCommand[] {
        return this.subCommands;
    }

    public removeSlashSubCommand(name: string): SlashSubCommandGroup;
    public removeSlashSubCommand(slashSubCommand: SlashSubCommand): SlashSubCommandGroup;
    public removeSlashSubCommand(slashSubCommandOrName: SlashSubCommand | string): SlashSubCommandGroup {
        if (typeof slashSubCommandOrName === "string") {
            this.subCommands = this.subCommands.filter(slashSubCommand => slashSubCommand.getName() !== slashSubCommandOrName);
        } else {
            this.subCommands = this.subCommands.filter(slashSubCommand => slashSubCommand !== slashSubCommandOrName);
        }
        return this;
    }

    public removeAllSlashSubCommands(): SlashSubCommandGroup {
        this.subCommands.splice(0, this.subCommands.length);
        return this;
    }

    public toJson(): any {
        return {
            name: this.name,
            description: this.description,
            options: this.subCommands.map((subCommand) => subCommand.toJson())
        };
    }
}
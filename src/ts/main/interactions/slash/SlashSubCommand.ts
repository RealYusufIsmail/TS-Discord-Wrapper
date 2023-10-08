import {SlashOptionBuilder} from "./SlashOptionBuilder.ts";

export declare interface SlashSubCommand {

    /**
     * Gets the name of the slash sub command.
     *
     * @returns The name of the slash sub command.
     */
    getName(): string;

    /**
     * Gets the description of the slash sub command.
     *
     * @returns The description of the slash sub command.
     */
    getDescription(): string;

    /**
     * Adds a slash option to the builder.
     *
     * @param slashOption The slash option.
     * @returns The slash sub command.
     */
    addSlashOption(slashOption: SlashOptionBuilder): SlashSubCommand;

    /**
     * Adds a list of slash options to the builder.
     *
     * @param slashOptions The list of slash options.
     * @returns The slash sub command.
     */
    addSlashOptions(slashOptions: SlashOptionBuilder[]): SlashSubCommand;

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
     * @returns The slash sub command.
     */
    removeSlashOption(name: string): SlashSubCommand;

    /**
     * Removes a slash option from the builder.
     *
     * @param slashOption The slash option.
     * @returns The slash sub command.
     */
    removeSlashOption(slashOption: SlashOptionBuilder): SlashSubCommand;

    /**
     * Removes all slash options from the builder.
     *
     * @returns The slash sub command.
     */
    removeAllSlashOptions(): SlashSubCommand;

    /**
     * Builds the slash sub command.
     */
    toJson(): any;
}

export class SlashSubCommand {
    private readonly name: string;
    private readonly description: string;
    private options: SlashOptionBuilder[] = [];

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

    public addSlashOption(slashOption: SlashOptionBuilder): SlashSubCommand {
        this.options.push(slashOption);
        return this;
    }

    public addSlashOptions(slashOptions: SlashOptionBuilder[]): SlashSubCommand {
        this.options.push(...slashOptions);
        return this;
    }

    public getSlashOptions(): SlashOptionBuilder[] {
        return this.options;
    }

    public removeSlashOption(name: string): SlashSubCommand;
    public removeSlashOption(slashOption: SlashOptionBuilder): SlashSubCommand;
    public removeSlashOption(slashOptionOrName: SlashOptionBuilder | string): SlashSubCommand {
        if (typeof slashOptionOrName === "string") {
            this.options = this.options.filter(option => option.getName() !== slashOptionOrName);
        } else {
            this.options = this.options.filter(option => option !== slashOptionOrName);
        }
        return this;
    }

    public removeAllSlashOptions(): SlashSubCommand {
        this.options = [];
        return this;
    }

    public toJson(): any {
        return {
            name: this.name,
            description: this.description,
            options: this.options.map(option => option.toJson())
        };
    }
}
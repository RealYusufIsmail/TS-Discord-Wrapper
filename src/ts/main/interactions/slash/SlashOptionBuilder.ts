import {SlashChoice} from "./SlashChoice.ts";
import {SlashOptionType} from "../../entities/interaction/slash/SlashOptionType.ts";

export declare interface SlashOptionBuilder {

    /**
     * Gets the name of the slash option.
     *
     * @returns The name of the slash option.
     */
    getName(): string;

    /**
     * Adds a choice to the slash option.
     *
     * @param slashChoice The slash choice.
     * @returns The slash option.
     */
    addChoice(slashChoice: SlashChoice): SlashOptionBuilder;

    /**
     * Adds a choice to the slash option.
     *
     * @param name The name of the choice.
     * @param value The value of the choice.
     * @returns The slash option.
     */
    addChoice(name: string, value: string | number): SlashOptionBuilder;

    /**
     * Adds a list of choices to the slash option.
     *
     * @param slashChoices The list of choices.
     * @returns The slash option.
     */
    addChoices(slashChoices: SlashChoice[]): SlashOptionBuilder;

    /**
     * Gets the list of choices.
     *
     * @returns The list of choices.
     */
    getChoices(): SlashChoice[];
}

export class SlashOptionBuilder {
    private readonly name: string;
    private readonly description: string;
    private readonly type: SlashOptionType;
    private readonly required: boolean;
    private readonly choices: SlashChoice[] = [];

    constructor(name: string, description: string, type: SlashOptionType, required: boolean) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
    }

    public getName(): string {
        return this.name;
    }

    public addChoice(slashChoice: SlashChoice): SlashOptionBuilder;
    public addChoice(name: string, value: string | number): SlashOptionBuilder;
    public addChoice(slashChoiceOrName: SlashChoice | string, value ?: string | number): SlashOptionBuilder {
        if (slashChoiceOrName instanceof SlashChoice) {
            this.choices.push(slashChoiceOrName);
        } else {
            this.choices.push(new SlashChoice(slashChoiceOrName, value!));
        }
        return this;
    }

    public addChoices(slashChoices: SlashChoice[]): SlashOptionBuilder {
        this.choices.push(...slashChoices);
        return this;
    }

    public getChoices(): SlashChoice[] {
        return this.choices;
    }

    public toJson(): any {
        return {
            name: this.name,
            description: this.description,
            type: this.type,
            required: this.required,
            choices: this.choices.map((choice) => choice.toJson())
        };
    }
}

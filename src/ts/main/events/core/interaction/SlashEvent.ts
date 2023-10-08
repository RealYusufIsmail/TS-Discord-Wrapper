import {GenericHandler} from "../GernericEvent.ts";
import {Interaction} from "../../../entities/Interaction.ts";
import {TSDiscordWrapper} from "../../../TSDiscordWrapper.ts";

export class SlashEvent extends GenericHandler {
    private readonly interaction: Interaction;

    public constructor(tsDiscordWrapper: TSDiscordWrapper, interaction: Interaction) {
        super(tsDiscordWrapper);
        this.interaction = interaction;
    }

    getInteraction(): Interaction {
        return this.interaction;
    }

    public toString(): string {
        return "SlashEvent{" +
            "interaction=" + this.interaction +
            '}';
    }
}
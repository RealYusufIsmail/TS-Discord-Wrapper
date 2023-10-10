import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";
import {Interaction} from "../../entities/Interaction.ts";

export abstract class GenericHandler {
    protected readonly tsDiscordWrapper: TSDiscordWrapper;

    protected constructor(tsDiscordWrapper: TSDiscordWrapper) {
        this.tsDiscordWrapper = tsDiscordWrapper;
    }

    getTSDiscordWrapper(): TSDiscordWrapper {
        return this.tsDiscordWrapper;
    }
}
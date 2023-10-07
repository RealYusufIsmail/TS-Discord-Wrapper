import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";

export abstract class GenericHandler {
    protected readonly tsDiscordWrapper: TSDiscordWrapper;
    protected constructor(tsDiscordWrapper: TSDiscordWrapper) {
        this.tsDiscordWrapper = tsDiscordWrapper;
    }

    getTSDiscordWrapper(): TSDiscordWrapper {
        return this.tsDiscordWrapper;
    }
}
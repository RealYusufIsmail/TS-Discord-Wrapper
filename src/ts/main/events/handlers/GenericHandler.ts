import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";

export abstract class GenericHandler {
    protected tsDiscordWrapper: TSDiscordWrapper;
    public constructor(tsDiscordWrapper: TSDiscordWrapper, data: any) {
        this.tsDiscordWrapper = tsDiscordWrapper;

        this.handler(data);
    }

    public abstract handler(data: any): void;
}
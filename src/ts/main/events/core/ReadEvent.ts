import {TSDiscordWrapper} from "../../TSDiscordWrapper.ts";
import {User} from "../../entities/User.ts";
import {GenericHandler} from "./GernericEvent.ts";

export class ReadEvent extends GenericHandler {
   private readonly bot: User;

   constructor(tsDiscordWrapper: TSDiscordWrapper, bot: User) {
        super(tsDiscordWrapper);
        this.bot = bot;
    }

    public getBot(): User {
        return this.bot;
    }
}
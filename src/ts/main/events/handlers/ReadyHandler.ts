import {GenericHandler} from "./GenericHandler.ts";
import {UserImpl} from "../../entities/User.ts";
import {EventNames} from "../../ws/util/EventNames.ts";
import {ReadEvent} from "../core/ReadEvent.ts";

export class ReadyHandler extends GenericHandler {
    handler(data: any): void {
        let bot = new UserImpl(data.user, data.user.id as number);
        this.tsDiscordWrapper.bot = bot;

        this.tsDiscordWrapper.eventEmitter.emit(EventNames.READY, new ReadEvent(this.tsDiscordWrapper, bot));
    }
}
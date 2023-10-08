import {GenericHandler} from "./GenericHandler.ts";
import {EventNames} from "../../ws/util/EventNames.ts";
import {ReadEvent} from "../core/ReadEvent.ts";
import {User} from "../../entities/User.ts";

export class ReadyHandler extends GenericHandler {
    handler(data: any): void {
        let bot = User.fromJson(data.user)
        this.tsDiscordWrapper.bot = bot;
        this.tsDiscordWrapper.applicationId = data.application.id;
        this.tsDiscordWrapper.ready = true;

        this.tsDiscordWrapper.eventEmitter.emit(EventNames.READY, new ReadEvent(this.tsDiscordWrapper, bot));
    }
}
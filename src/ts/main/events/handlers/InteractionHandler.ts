import {GenericHandler} from "./GenericHandler.ts";
import {Interaction} from "../../entities/Interaction.ts";
import {EventNames} from "../../ws/util/EventNames.ts";
import {SlashEvent} from "../core/interaction/SlashEvent.ts";

export class InteractionHandler extends GenericHandler {
    handler(data: any): void {
        let interaction = Interaction.fromJson(data, this.tsDiscordWrapper);

        if (interaction.type == 2) {
            this.tsDiscordWrapper.eventEmitter.emit(EventNames.INTERACTION_CREATE, new SlashEvent(this.tsDiscordWrapper, interaction))
        }
    }
}
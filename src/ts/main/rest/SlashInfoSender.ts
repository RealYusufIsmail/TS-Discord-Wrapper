import {SlashCommandBuilder} from "../interactions/slash/SlashCommandBuilder.ts";
import {TSDiscordWrapper} from "../TSDiscordWrapper.ts";
import {ApplicationCommandsEndpoint} from "./EndPoint.ts";
import {DefaultApiException} from "rest-api-handler";

export class SlashInfoSender {
    private readonly slashCommands: SlashCommandBuilder[];
    private tSDiscordWrapper: TSDiscordWrapper;
    private readonly applicationId: string;

    constructor(slashCommands: SlashCommandBuilder[], tSDiscordWrapper: TSDiscordWrapper) {
        this.slashCommands = slashCommands;
        this.tSDiscordWrapper = tSDiscordWrapper;

        if (this.tSDiscordWrapper.applicationId === undefined) {
            throw new Error("Application id is undefined.");
        }

        this.applicationId = this.tSDiscordWrapper.applicationId;

        this.sendSlashCommands();
    }

    private sendSlashCommands() {
        const promiseCurrentGlobalSlashCommands =
            this.getGlobalSlashCommands();

        let currentGlobalSlashCommands: Map<number, string>;
        promiseCurrentGlobalSlashCommands.then((slashCommands) => {
            currentGlobalSlashCommands = slashCommands;

            const globalSlashCommands: Map<String, SlashCommandBuilder> = new Map();

            for (const slashCommand of this.slashCommands) {
                globalSlashCommands.set(slashCommand.getName(), slashCommand);
            }

            const globalSlashCommandsToRemove: number[] = [];
            const globalSlashCommandsToAdd: SlashCommandBuilder[] = [];

            for (const [id, name] of currentGlobalSlashCommands) {
                if (globalSlashCommands.has(name)) {
                    globalSlashCommandsToAdd.push(globalSlashCommands.get(name) as SlashCommandBuilder);
                } else if (!globalSlashCommands.has(name)) {
                    globalSlashCommandsToRemove.push(id);
                } else {
                    globalSlashCommandsToAdd.push(globalSlashCommands.get(name) as SlashCommandBuilder);
                }
            }

            for (const [name, slashCommand] of globalSlashCommands) {
                const valuesArray = Array.from(currentGlobalSlashCommands.values());
                if (!valuesArray.includes(name as string)) {
                    globalSlashCommandsToAdd.push(slashCommand);
                }
            }


            //To avoid rate limits, we will send the slash commands in batches of 5.
            //delete slash commands

            const globalSlashCommandsToRemoveBatches: number[][] = [];
            const globalSlashCommandsToAddBatches: SlashCommandBuilder[][] = [];

            for (let i = 0; i < globalSlashCommandsToRemove.length; i += 5) {
                globalSlashCommandsToRemoveBatches.push(globalSlashCommandsToRemove.slice(i, i + 5));
            }

            for (let i = 0; i < globalSlashCommandsToAdd.length; i += 5) {
                globalSlashCommandsToAddBatches.push(globalSlashCommandsToAdd.slice(i, i + 5));
            }

            for (const globalSlashCommandsToRemoveBatch of globalSlashCommandsToRemoveBatches) {
                this.deleteGlobalSlashCommands(globalSlashCommandsToRemoveBatch).then(r => {
                    this.tSDiscordWrapper.logger.debug("Deleted slash commands: " + globalSlashCommandsToRemoveBatch.map(slashCommand => slashCommand).join(", "));
                }).catch(e => {
                    this.tSDiscordWrapper.logger.error("Failed to delete slash commands: " + globalSlashCommandsToRemoveBatch.map(slashCommand => slashCommand).join(", "));
                });
            }

            for (const globalSlashCommandsToAddBatch of globalSlashCommandsToAddBatches) {
                this.addGlobalSlashCommands(globalSlashCommandsToAddBatch).catch(e => {
                    if (e instanceof DefaultApiException) {
                        this.tSDiscordWrapper.logger.error("Failed to add slash commands: " + globalSlashCommandsToAddBatch.map(slashCommand => slashCommand.getName()).join(", ") + " because of " + e.getResponse().status + " " + e.getResponse().data.message);
                    } else {
                        this.tSDiscordWrapper.logger.error("Failed to add slash commands: " + globalSlashCommandsToAddBatch.map(slashCommand => slashCommand.getName()).join(", ") + " because of " + e);
                    }
                });
            }
        });
    }

    private async getGlobalSlashCommands(): Promise<Map<number, string>> {
        try {
            const response = await this.tSDiscordWrapper.restApiHandler.performGetRequest(ApplicationCommandsEndpoint.GET_GLOBAL_COMMANDS, [this.applicationId]);

            if (response == null) {
                return new Map();
            } else {
                const slashCommands: Map<number, string> = new Map();

                for (const slashCommand of response) {
                    slashCommands.set(slashCommand.id, slashCommand.name);
                }

                return slashCommands;
            }
        } catch (error) {
            return new Map();
        }
    }

    private async deleteGlobalSlashCommands(ids: number[]): Promise<void> {
        return this.tSDiscordWrapper.restApiHandler
            .performDeleteRequest(ApplicationCommandsEndpoint.DELETE_GLOBAL_COMMAND, [this.applicationId, ids.toString()])
            .then((response) => {
                return;
            });
    }

    private async addGlobalSlashCommands(slashCommands: SlashCommandBuilder[]) {
        for (const slashCommand of slashCommands) {
            await this.tSDiscordWrapper.restApiHandler
                .performPostRequest(ApplicationCommandsEndpoint.CREATE_GLOBAL_COMMAND, slashCommand.toJson(), [this.applicationId])
        }
    }
}
import {TSDiscordWrapper} from "../ts/TSDiscordWrapper";

const tsDiscordWrapper = new TSDiscordWrapper();

tsDiscordWrapper.login("").then(r => {
    tsDiscordWrapper.logger.info("Logged in");
})
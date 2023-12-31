# TSDiscordWrapper

A simple wrapper for the Discord API written in TypeScript.

## Installation

```bash
npm i ts-discord-wrapper    
```

## Usage

```typescript
import {EventNames} from "ts-discord-wrapper/src/ts/main/ws/util/EventNames.ts";
import {ReadEvent} from "ts-discord-wrapper/src/ts/main/events/core/ReadEvent.ts";
import {TSDiscordWrapper} from "ts-discord-wrapper/src/ts/main/TSDiscordWrapper.ts";
import GateWayIntent from "ts-discord-wrapper/src/ts/main/GateWayIntent.ts";
import {SlashBuilder} from "ts-discord-wrapper/src/ts/main/interactions/slash/SlashBuilder.ts";
import {SlashEvent} from "ts-discord-wrapper/src/ts/main/events/core/interaction/SlashEvent.ts";

const tsDiscordWrapper = new TSDiscordWrapper("TOKEN");

tsDiscordWrapper.login(GateWayIntent.getDefaultIntents()).then(() => {
    tsDiscordWrapper.logger.info("Logged in");
});

tsDiscordWrapper.eventEmitter.on(EventNames.READY, (readEvent: ReadEvent) => {
    tsDiscordWrapper.logger.info("Ready as " + readEvent.getBot().getUsername());
});

tsDiscordWrapper.onReady(() => {
    tsDiscordWrapper.logger.info("Ready");
    new SlashBuilder(tsDiscordWrapper)
        .addSlashCommand("ping", "pong")
        .addSlashCommand("embed", "embed test")
        .build();
});

tsDiscordWrapper.eventEmitter.on(EventNames.INTERACTION_CREATE, (slashCommand : SlashEvent) => {
    if (slashCommand.getInteraction().data.name == "ping") {
        slashCommand.getInteraction().sendReply("pong", false, false);
    } else if (slashCommand.getInteraction().data.name == "embed") {
        let embed = slashCommand.getTSDiscordWrapper()
            .embedBuilder
            .setTitle("Test")
            .setDescription("This is a test")
            .setColor(new Color(0, 255, 0))
            .build()
        slashCommand.getInteraction().sendReplyEmbed(embed, true);
    }
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Link to GitHub repo: https://github.com/RealYusufIsmail/TS-Discord-Wrapper

## License
[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
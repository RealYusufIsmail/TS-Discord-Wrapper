# TSDiscordWrapper

A simple wrapper for the Discord API written in TypeScript.

## Installation

```bash
npm i ts-discord-wrapper    
```

## Usage

```typescript
const { TSDiscordWrapper } = require("./main/TSDiscordWrapper");
import GateWayIntent from "./main/GateWayIntent.ts";
import {EventNames} from "./main/ws/util/EventNames.ts";
import {ReadEvent} from "./main/events/core/ReadEvent.ts";

const tsDiscordWrapper = new TSDiscordWrapper();

tsDiscordWrapper.login("TOKEN", GateWayIntent.getDefaultIntents()).then(() => {
    tsDiscordWrapper.logger.info("Logged in");
});

tsDiscordWrapper.eventEmitter.on(EventNames.READY, (readEvent: ReadEvent) => {
   tsDiscordWrapper.logger.info("Ready as " + readEvent.getBot().username);
});

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Link to GitHub repo: https://github.com/RealYusufIsmail/TS-Discord-Wrapper

## License
[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
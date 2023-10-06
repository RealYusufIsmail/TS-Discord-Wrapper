var WebSocketClient = require('websocket').client


/**
 * Handles the websocket connection to the Discord API.
 */
export default class TSDiscordWrapperWS {
    private WebSocketClient = new WebSocketClient();
    private resumeUrl: string | null = null;

    async connect(token : string) {
        const url: string = (this.resumeUrl || TSDiscordWrapperInfo.DISCORD_GATEWAY_URL +
            TSDiscordWrapperInfo.DISCORD_GATEWAY_VERSION +
            TSDiscordWrapperInfo.JSON_ENCODING);

        WebSocketClient.connect(TSDiscordWrapperInfo.DISCORD_GATEWAY_URL, null, null, null, null);

        WebSocketClient.on('connect', function(connection: any) {
            
        });
    }
}
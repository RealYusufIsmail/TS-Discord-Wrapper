export enum TSDiscordWrapperInfo {
    DISCORD_GATEWAY_VERSION = 10,
    DISCORD_GATEWAY_URL = "wss://gateway.discord.gg/?v=" + DISCORD_GATEWAY_VERSION +"&encoding=json",
    JSON_ENCODING = "&encoding=json",
    REST_API_VERSION = 10,
    REST_API_URL = "https://discord.com/api/v" + REST_API_VERSION
}
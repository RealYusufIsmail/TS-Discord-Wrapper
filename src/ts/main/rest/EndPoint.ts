export enum GuildEndpoint {
    GET_BANS = "/guilds/%s/bans",
    BAN = "/guilds/%s/bans/%s",
    KICK = "/guilds/%s/members/%s",
    GET_AUDIT_LOGS = "/guilds/%s/audit-logs",
    GET_MEMBERS = "/guilds/%s/members",
    GET_GUILD = "/guilds/%s",
    GET_GUILDS = "/guilds",
    GET_GUILD_CHANNELS = "/guilds/%s/channels",
    GET_MEMBER = "/guilds/%s/members/%s",
    CREATE_GUILD = "/guilds",
    CREATE_ROLE = "/guilds/%s/roles",
    CREATE_CHANNEL = "/guilds/%s/channels",
    ADD_ROLE = "/guilds/%s/members/%s/roles/%s",
    REMOVE_ROLE = "/guilds/%s/members/%s/roles/%s"
}

export enum UserEndpoint {
    CREATE_DM = "/users/@me/channels",
    GET_USER = "/users/%s",
    GET_USERS = "/users"
}

export enum ApplicationCommandsEndpoint {
    CREATE_GLOBAL_COMMAND = "/applications/%s/commands",
    GET_GLOBAL_COMMANDS = "/applications/%s/commands",
    CREATE_GUILD_COMMAND = "/applications/%s/guilds/%s/commands",
    GET_GUILD_COMMANDS = "/applications/%s/guilds/%s/commands",
    REPLY_TO_SLASH_COMMAND = "/interactions/%s/%s/callback",
    DELETE_GUILD_COMMAND = "/applications/%s/guilds/%s/commands/%s",
    DELETE_GLOBAL_COMMAND = "/applications/%s/commands/%s"
}

export enum ChannelEndpoint {
    CREATE_MESSAGE = "/channels/%s/messages",
    GET_CHANNEL = "/channels/%s",
    CREATE_INVITE = "/channels/%s/invites"
}

export enum VoiceEndpoint {
    GET_VOICE_REGIONS = "/voice/regions"
}

export enum MessageEndpoint {
    DELETE_MESSAGE = "/channels/%s/messages/%s"
}
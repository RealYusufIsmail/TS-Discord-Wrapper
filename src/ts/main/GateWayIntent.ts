export enum GateWayIntent {
    GUILD_MEMBERS = 1,
    GUILD_BANS = 2,
    GUILD_WEBHOOKS = 5,
    GUILD_INVITES = 6,
    GUILD_VOICE_STATES = 7,
    GUILD_PRESENCES = 8,
    GUILD_MESSAGES = 9,
    GUILD_MESSAGE_REACTIONS = 10,
    GUILD_MESSAGE_TYPING = 11,
    DIRECT_MESSAGES = 12,
    DIRECT_MESSAGE_REACTIONS = 13,
    DIRECT_MESSAGE_TYPING = 14,
    MESSAGE_CONTENT = 15,
    AUTO_MODERATION_CONFIGURATION = 20,
    AUTO_MODERATION_EXECUTION = 21,
    UNKNOWN = -1,
}

export namespace GateWayIntent {
    /**
     * Get the GateWayIntent from the given value.
     *
     * @param value The value to get the GateWayIntent from.
     * @return The GateWayIntent from the given value.
     */
    export function get(value: number): GateWayIntent {
        for (const key in GateWayIntent) {
            if (GateWayIntent[key as keyof typeof GateWayIntent] === value) {
                return key as unknown as GateWayIntent;
            }
        }
        return GateWayIntent.UNKNOWN;
    }


    /**
     * Calculates the intent value.
     *
     * @param intents The intents to calculate
     * @return The intent value
     */
    export function calculateBitmask(intents: GateWayIntent[]): number {
        let bitmask = 0;
        for (const intentValue of intents) {
            bitmask += 1 << intentValue;
        }
        return bitmask;
    }

    /**
     * The default intents for the gateway.
     *
     * @return The default intents for the gateway.
     */
    export function getDefaultIntents(): GateWayIntent[] {
        return [
            GateWayIntent.GUILD_MEMBERS,
            GateWayIntent.GUILD_BANS,
            GateWayIntent.GUILD_WEBHOOKS,
            GateWayIntent.GUILD_INVITES,
            GateWayIntent.GUILD_VOICE_STATES,
            GateWayIntent.GUILD_MESSAGES,
            GateWayIntent.GUILD_MESSAGE_REACTIONS,
            GateWayIntent.GUILD_MESSAGE_TYPING,
            GateWayIntent.DIRECT_MESSAGES,
            GateWayIntent.DIRECT_MESSAGE_REACTIONS,
            GateWayIntent.AUTO_MODERATION_CONFIGURATION,
            GateWayIntent.AUTO_MODERATION_EXECUTION,
        ];
    }
}

export default GateWayIntent;

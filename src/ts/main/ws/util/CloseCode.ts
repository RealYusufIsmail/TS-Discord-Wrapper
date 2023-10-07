/**
 * Enumeration representing WebSocket close codes.
 */
export enum CloseCode {
    TERMINATION = 1008,
    UNKNOWN_ERROR = 4000,
    UNKNOWN_OPCODE = 4001,
    DECODE_ERROR = 4002,
    NOT_AUTHENTICATED = 4003,
    AUTHENTICATION_FAILED = 4004,
    ALREADY_AUTHENTICATED = 4005,
    INVALID_SEQ = 4007,
    RATE_LIMITED = 4008,
    SESSION_TIMED_OUT = 4009,
    INVALID_SHARD = 4010,
    SHARDING_REQUIRED = 4011,
    INVALID_VERSION = 4012,
    INVALID_INTENTS = 4013,
    DISALLOWED_INTENTS = 4014,
    RECONNECT = 4999,
    INVALID_SESSION = 4998,
    MISSED_HEARTBEAT = 4997,
    TRIGGERED_SHUTDOWN = 5000,
    UNKNOWN = 4999,
}

/**
 * Class representing additional information associated with each CloseCode.
 */
export class CloseCodeInfo {
    /**
     * Creates an instance of CloseCodeInfo.
     * @param code The CloseCode.
     * @param reason The reason for the close code.
     * @param reconnect Indicates whether the connection should reconnect.
     */
    constructor(public code: CloseCode, public reason: string, public reconnect: boolean = true) {
    }

    /**
     * Get the CloseCode.
     * @returns The CloseCode.
     */
    getCode(): CloseCode {
        return this.code;
    }

    /**
     * Get the reason for the CloseCode.
     * @returns The reason for the CloseCode.
     */
    getReason(): string {
        return this.reason;
    }

    /**
     * Check whether the connection should reconnect.
     * @returns True if the connection should reconnect, false otherwise.
     */
    shouldReconnect(): boolean {
        return this.reconnect;
    }

    /**
     * Static factory method to create a CloseCodeInfo instance from an integer code.
     * @param code The integer code to convert to a CloseCodeInfo instance.
     * @returns The CloseCodeInfo instance corresponding to the provided code.
     */
    static get(code: number): CloseCodeInfo {
        for (const closeCode of Object.values(CloseCode)) {
            if (closeCode === code) {
                return CloseCodeInfo.getCloseCodeInfo(closeCode);
            }
        }
        return CloseCodeInfo.getCloseCodeInfo(CloseCode.UNKNOWN);
    }

    /**
     * Get a CloseCodeInfo instance for a specific CloseCode.
     * @param code The CloseCode for which to retrieve additional information.
     * @returns The CloseCodeInfo instance with information for the specified CloseCode.
     */
    private static getCloseCodeInfo(code: CloseCode): CloseCodeInfo {
        switch (code) {
            case CloseCode.TERMINATION:
                return new CloseCodeInfo(code, "This endpoint is terminating the connection because it has received a message that violates its policy", false);
            case CloseCode.UNKNOWN_ERROR:
                return new CloseCodeInfo(code, "We're not sure what went wrong. Try reconnecting?");
            case CloseCode.UNKNOWN_OPCODE:
                return new CloseCodeInfo(code, "You sent an invalid Gateway opcode. Don't do that!");
            case CloseCode.DECODE_ERROR:
                return new CloseCodeInfo(code, "You sent an invalid payload to us. Don't do that!");
            case CloseCode.NOT_AUTHENTICATED:
                return new CloseCodeInfo(code, "You sent us a payload prior to identifying.");
            case CloseCode.AUTHENTICATION_FAILED:
                return new CloseCodeInfo(code, "The account token sent with your identify payload is incorrect.", false);
            case CloseCode.ALREADY_AUTHENTICATED:
                return new CloseCodeInfo(code, "You sent more than one identify payload. Don't do that!");
            case CloseCode.INVALID_SEQ:
                return new CloseCodeInfo(code, "The sequence sent when resuming the session was invalid. Reconnect and start a new session.");
            case CloseCode.RATE_LIMITED:
                return new CloseCodeInfo(code, "Woah nelly! You're sending payloads to us too quickly. Slow it down!");
            case CloseCode.SESSION_TIMED_OUT:
                return new CloseCodeInfo(code, "Your session timed out. Reconnect and start a new one.");
            case CloseCode.INVALID_SHARD:
                return new CloseCodeInfo(code, "You sent us an invalid shard when identifying.", false);
            case CloseCode.SHARDING_REQUIRED:
                return new CloseCodeInfo(code, "The session would have handled too many guilds - you are required to shard your connection in order to connect.", false);
            case CloseCode.INVALID_VERSION:
                return new CloseCodeInfo(code, "You sent an invalid version for the gateway.", false);
            case CloseCode.INVALID_INTENTS:
                return new CloseCodeInfo(code, "You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.", false);
            case CloseCode.DISALLOWED_INTENTS:
                return new CloseCodeInfo(code, "You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for.", false);
            case CloseCode.RECONNECT:
                return new CloseCodeInfo(code, "Sent when opcode 7 is received");
            case CloseCode.INVALID_SESSION:
                return new CloseCodeInfo(code, "The session has been invalidated. We will reconnect you automatically.");
            case CloseCode.MISSED_HEARTBEAT:
                return new CloseCodeInfo(code, "You missed too many heartbeats, reconnecting.");
            case CloseCode.TRIGGERED_SHUTDOWN:
                return new CloseCodeInfo(code, "The server is going down, disconnecting you.");
            case CloseCode.UNKNOWN:
                return new CloseCodeInfo(code, "Unknown error", false);
            default:
                return new CloseCodeInfo(code, "Unknown close code", false);
        }
    }

    /**
     * Function to convert an integer code to a CloseCode.
     * @param code The integer code to convert.
     * @returns The corresponding CloseCode.
     */
    private static closeCodeFromInt(code: number): CloseCode {
        const closeCodeValues = Object.values(CloseCode);
        const result = closeCodeValues.find((value) => typeof value === 'number' && value === code);

        if (result === undefined) {
            return CloseCode.UNKNOWN;
        } else {
            return result as CloseCode;
        }
    }
}
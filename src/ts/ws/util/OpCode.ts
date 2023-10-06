/**
 * Enumeration representing WebSocket operation codes.
 */
export enum OpCode {
    DISPATCH = 0,                    // An event was dispatched.
    HEARTBEAT = 1,                   // Fired periodically by the client to keep the connection alive.
    IDENTIFY = 2,                    // Starts a new session during the initial handshake.
    PRESENCE = 3,                    // Update the client's presence.
    VOICE_STATE = 4,                // Joins/leaves or moves between voice channels.
    RESUME = 6,                     // Resume a previous session that was disconnected.
    RECONNECT = 7,                 // You should attempt to reconnect and resume immediately.
    REQUEST_GUILD_MEMBERS = 8, // Request information about offline guild members in a large guild.
    INVALID_SESSION = 9,        // The session has been invalidated. You should reconnect and identify/resume accordingly.
    HELLO = 10,                         // Sent immediately after connecting, contains the heartbeat_interval to use.
    HEARTBEAT_ACK = 11,         // Sent in response to receiving a heartbeat to acknowledge that it has been received.
    UNKNOWN = -1                      // For future use or unknown opcodes.
}

export class OpCodeInfo {
    code: number;      // The OpCode code.
    send: boolean;    // Indicates if it is sent.
    receive: boolean;  // Indicates if it is received.

    /**
     * Creates an instance of OpCodeInfo.
     * @param code The OpCode code.
     * @param send Indicates if the OpCode is sent.
     * @param receive Indicates if the OpCode is received.
     */
    constructor(code: number, send: boolean = true, receive: boolean = false) {
        this.code = code;
        this.send = send;
        this.receive = receive;
    }
}

/**
 * Mapping that associates OpCode with OpCodeInfo.
 */
export const OpCodeInfoMap: Record<OpCode, OpCodeInfo> = {
    [OpCode.DISPATCH]: new OpCodeInfo(0, false),
    [OpCode.HEARTBEAT]: new OpCodeInfo(1, true, false),
    [OpCode.IDENTIFY]: new OpCodeInfo(2),
    [OpCode.PRESENCE]: new OpCodeInfo(3),
    [OpCode.VOICE_STATE]: new OpCodeInfo(4),
    [OpCode.RESUME]: new OpCodeInfo(6),
    [OpCode.RECONNECT]: new OpCodeInfo(7, false),
    [OpCode.REQUEST_GUILD_MEMBERS]: new OpCodeInfo(8),
    [OpCode.INVALID_SESSION]: new OpCodeInfo(9, false),
    [OpCode.HELLO]: new OpCodeInfo(10, false),
    [OpCode.HEARTBEAT_ACK]: new OpCodeInfo(11, false),
    [OpCode.UNKNOWN]: new OpCodeInfo(-1, false, false)
};

/**
 * Function to convert an integer code to an OpCode.
 * @param code The integer code to convert.
 * @returns The corresponding OpCode.
 */
export function fromInt(code: number): OpCode {
    return code in OpCode ? code : OpCode.UNKNOWN;
}

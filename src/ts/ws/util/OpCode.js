"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromInt = exports.OpCodeInfoMap = exports.OpCodeInfo = exports.OpCode = void 0;
/**
 * Enumeration representing WebSocket operation codes.
 */
var OpCode;
(function (OpCode) {
    OpCode[OpCode["DISPATCH"] = 0] = "DISPATCH";
    OpCode[OpCode["HEARTBEAT"] = 1] = "HEARTBEAT";
    OpCode[OpCode["IDENTIFY"] = 2] = "IDENTIFY";
    OpCode[OpCode["PRESENCE"] = 3] = "PRESENCE";
    OpCode[OpCode["VOICE_STATE"] = 4] = "VOICE_STATE";
    OpCode[OpCode["RESUME"] = 6] = "RESUME";
    OpCode[OpCode["RECONNECT"] = 7] = "RECONNECT";
    OpCode[OpCode["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    OpCode[OpCode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    OpCode[OpCode["HELLO"] = 10] = "HELLO";
    OpCode[OpCode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
    OpCode[OpCode["UNKNOWN"] = -1] = "UNKNOWN"; // For future use or unknown opcodes.
})(OpCode || (exports.OpCode = OpCode = {}));
var OpCodeInfo = /** @class */ (function () {
    /**
     * Creates an instance of OpCodeInfo.
     * @param code The OpCode code.
     * @param send Indicates if the OpCode is sent.
     * @param receive Indicates if the OpCode is received.
     */
    function OpCodeInfo(code, send, receive) {
        if (send === void 0) { send = true; }
        if (receive === void 0) { receive = false; }
        this.code = code;
        this.send = send;
        this.receive = receive;
    }
    return OpCodeInfo;
}());
exports.OpCodeInfo = OpCodeInfo;
/**
 * Mapping that associates OpCode with OpCodeInfo.
 */
exports.OpCodeInfoMap = (_a = {},
    _a[OpCode.DISPATCH] = new OpCodeInfo(0, false),
    _a[OpCode.HEARTBEAT] = new OpCodeInfo(1, true, false),
    _a[OpCode.IDENTIFY] = new OpCodeInfo(2),
    _a[OpCode.PRESENCE] = new OpCodeInfo(3),
    _a[OpCode.VOICE_STATE] = new OpCodeInfo(4),
    _a[OpCode.RESUME] = new OpCodeInfo(6),
    _a[OpCode.RECONNECT] = new OpCodeInfo(7, false),
    _a[OpCode.REQUEST_GUILD_MEMBERS] = new OpCodeInfo(8),
    _a[OpCode.INVALID_SESSION] = new OpCodeInfo(9, false),
    _a[OpCode.HELLO] = new OpCodeInfo(10, false),
    _a[OpCode.HEARTBEAT_ACK] = new OpCodeInfo(11, false),
    _a[OpCode.UNKNOWN] = new OpCodeInfo(-1, false, false),
    _a);
/**
 * Function to convert an integer code to an OpCode.
 * @param code The integer code to convert.
 * @returns The corresponding OpCode.
 */
function fromInt(code) {
    return code in OpCode ? code : OpCode.UNKNOWN;
}
exports.fromInt = fromInt;
//# sourceMappingURL=OpCode.js.map
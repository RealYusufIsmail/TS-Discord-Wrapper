export enum SlashOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE,
    NUMBER,
    ATTACHMENT,
    UNKNOWN = -1
}

export class SlashOptionTypeInfo {

    static getSlashOptionType(type: number): SlashOptionType {
        switch (type) {
            case 1:
                return SlashOptionType.SUB_COMMAND;
            case 2:
                return SlashOptionType.SUB_COMMAND_GROUP;
            case 3:
                return SlashOptionType.STRING;
            case 4:
                return SlashOptionType.INTEGER;
            case 5:
                return SlashOptionType.BOOLEAN;
            case 6:
                return SlashOptionType.USER;
            case 7:
                return SlashOptionType.CHANNEL;
            case 8:
                return SlashOptionType.ROLE;
            case 9:
                return SlashOptionType.MENTIONABLE;
            case 10:
                return SlashOptionType.NUMBER;
            case 11:
                return SlashOptionType.ATTACHMENT;
            default:
                return SlashOptionType.UNKNOWN;
        }
    }
}
export enum EmbedType {
    RICH = "rich",
    IMAGE = "image",
    VIDEO = "video",
    GIFV = "gifv",
    ARTICLE = "article",
    LINK = "link",
    UNKNOWN = "unknown"
}

export class EmbedTypeInfo {
    public static fromString(value: string): EmbedType {
        switch (value) {
            case "rich":
                return EmbedType.RICH;
            case "image":
                return EmbedType.IMAGE;
            case "video":
                return EmbedType.VIDEO;
            case "gifv":
                return EmbedType.GIFV;
            case "article":
                return EmbedType.ARTICLE;
            case "link":
                return EmbedType.LINK;
            default:
                return EmbedType.UNKNOWN;
        }
    }
}

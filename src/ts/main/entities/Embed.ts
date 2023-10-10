import Color from "ts-color-class/dist/Color";
import {EmbedFooter} from "./embed/EmbedFooter.ts";
import {EmbedAuthor} from "./embed/EmbedAuthor.ts";
import {EmbedImage} from "./embed/EmbedImage.ts";
import {EmbedThumbnail} from "./embed/EmbedThumbnail.ts";
import {EmbedVideo} from "./embed/EmbedVideo.ts";
import {EmbedProvider} from "./embed/EmbedProvider.ts";
import {EmbedField} from "./embed/EmbedField.ts";
import {EmbedType} from "./embed/EmbedType.ts";
import {User} from "./User.ts";

export declare interface Embed {
    /**
     * The title of the embed
     */
    title ?: string;

    /**
     * The type of the embed
     */
    type ?: EmbedType;

    /**
     * The description of the embed
     */
    description ?: string;

    /**
     * The url of the embed
     */
    url ?: string;

    /**
     * The timestamp of the embed
     */
    timestamp ?: Date;

    /**
     * The color of the embed
     */
    color ?: Color;

    /**
     * The footer of the embed
     */
    footer ?: EmbedFooter;

    /**
     * The image of the embed
     */
    image ?: EmbedImage;

    /**
     * The thumbnail of the embed
     */
    thumbnail ?: EmbedThumbnail;

    /**
     * The video of the embed
     */
    video ?: EmbedVideo;

    /**
     * The provider of the embed
     */
    provider ?: EmbedProvider;

    /**
     * The author of the embed
     */
    author ?: EmbedAuthor;

    /**
     * The fields of the embed
     */
    fields ?: EmbedField[];
}

export class Embed {
    title ?: string;
    type ?: EmbedType;
    description ?: string;
    url ?: string;
    timestamp ?: Date;
    color ?: Color;
    footer ?: EmbedFooter;
    image ?: EmbedImage;
    thumbnail ?: EmbedThumbnail;
    video ?: EmbedVideo;
    provider ?: EmbedProvider;
    author ?: EmbedAuthor;
    fields ?: EmbedField[];

    constructor(title ?: string, type ?: EmbedType, description ?: string, url ?: string, timestamp ?: Date, color ?: Color, footer ?: EmbedFooter, image ?: EmbedImage, thumbnail ?: EmbedThumbnail, video ?: EmbedVideo, provider ?: EmbedProvider, author ?: EmbedAuthor, fields ?: EmbedField[]) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.url = url;
        this.timestamp = timestamp;
        this.color = color;
        this.footer = footer;
        this.image = image;
        this.thumbnail = thumbnail;
        this.video = video;
        this.provider = provider;
        this.author = author;
        this.fields = fields;
    }

    public getTitle() : string | undefined {
        return this.title;
    }

    public getType() : EmbedType | undefined {
        return this.type;
    }

    public getDescription() : string | undefined {
        return this.description;
    }

    public getUrl() : string | undefined {
        return this.url;
    }

    public getTimestamp() : Date | undefined {
        return this.timestamp;
    }

    public getColor() : Color | undefined {
        return this.color;
    }

    public getFooter() : EmbedFooter | undefined {
        return this.footer;
    }

    public getImage() : EmbedImage | undefined {
        return this.image;
    }

    public getThumbnail() : EmbedThumbnail | undefined {
        return this.thumbnail;
    }

    public getVideo() : EmbedVideo | undefined {
        return this.video;
    }

    public getProvider() : EmbedProvider | undefined {
        return this.provider;
    }

    public getAuthor() : EmbedAuthor | undefined {
        return this.author;
    }

    public getFields() : EmbedField[] | undefined {
        return this.fields;
    }

    public static fromJson(json: any) : Embed {
        return new Embed(
            json.title ? json.title : undefined,
            json.type ? json.type : undefined,
            json.description ? json.description : undefined,
            json.url ? json.url : undefined,
            json.timestamp ? new Date(json.timestamp) : undefined,
            json.color ? new Color(json.color) : undefined,
            json.footer ? EmbedFooter.fromJson(json.footer) : undefined,
            json.image ? EmbedImage.fromJson(json.image) : undefined,
            json.thumbnail ? EmbedThumbnail.fromJson(json.thumbnail) : undefined,
            json.video ? EmbedVideo.fromJson(json.video) : undefined,
            json.provider ? EmbedProvider.fromJson(json.provider) : undefined,
            json.author ? EmbedAuthor.fromJson(json.author) : undefined,
            json.fields ? json.fields.map((field: any) => EmbedField.fromJson(field)) : undefined
        );
    }
}

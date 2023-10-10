import Color from "ts-color-class/dist/Color";
import {EmbedThumbnailBuilder} from "./EmbedThumbnailBuilder.ts";
import {EmbedImageBuilder} from "./EmbedImageBuilder.ts";
import {EmbedFooterBuilder} from "./EmbedFooterBuilder.ts";
import {EmbedAuthorBuilder} from "./EmbedAuthorBuilder.ts";
import {EmbedFieldBuilder} from "./EmbedFieldBuilder.ts";
import {Embed} from "../../Embed.ts";
import {EmbedType} from "../EmbedType.ts";

export declare interface EmbedBuilder {

    /**
     * Set the title of the embed
     *
     * @param title The title of the embed
     * @returns The embed builder
     */
    setTitle(title: string): EmbedBuilder;

    /**
     * Set the description of the embed
     *
     * @param description The description of the embed
     * @returns The embed builder
     */
    setDescription(description: string): EmbedBuilder;

    /**
     * Set the timestamp of the embed
     *
     * @param timestamp The timestamp of the embed
     * @returns The embed builder
     */
    setTimestamp(timestamp: Date): EmbedBuilder;

    /**
     * Sets the url of the embed
     *
     * @param url The url of the embed
     * @returns The embed builder
     */
    setUrl(url: string): EmbedBuilder;

    /**
     * Sets the color of the embed
     *
     * @param color The color of the embed
     * @returns The embed builder
     */
    setColor(color: Color): EmbedBuilder;

    /**
     * Sets the thumbnail of the embed.
     *
     * @param thumbnail The thumbnail builder.
     * @returns The embed builder.
     */
    setThumbnail(thumbnail: EmbedThumbnailBuilder): EmbedBuilder;

    /**
     * Sets the image of the embed.
     *
     * @param image The image builder.
     * @returns The embed builder.
     */
    setImage(image: EmbedImageBuilder): EmbedBuilder;

    /**
     * Sets the footer of the embed.
     *
     * @param footer The footer builder.
     * @returns The embed builder.
     */
    setFooter(footer: EmbedFooterBuilder): EmbedBuilder;

    /**
     * Sets the author of the embed.
     *
     * @param author The author builder.
     * @returns The embed builder.
     */
    setAuthor(author: EmbedAuthorBuilder): EmbedBuilder;

    /**
     * Adds a field to the embed.
     *
     * @param field The field builder.
     * @returns The embed builder.
     */
    addField(field: EmbedFieldBuilder): EmbedBuilder;

    /**
     * Builds the embed.
     */
    build(): Embed;
}

export class EmbedBuilder {
    private title: string | undefined;
    private description: string | undefined;
    private timestamp: Date | undefined;
    private url: string | undefined;
    private color: Color | undefined;
    private thumbnail: EmbedThumbnailBuilder | undefined;
    private image: EmbedImageBuilder | undefined;
    private footer: EmbedFooterBuilder | undefined;
    private author: EmbedAuthorBuilder | undefined;
    private fields: EmbedFieldBuilder[] = [];

    setTitle(title: string): EmbedBuilder {
        this.title = title;
        return this;
    }

    setDescription(description: string): EmbedBuilder {
        this.description = description;
        return this;
    }

    setTimestamp(timestamp: Date): EmbedBuilder {
        this.timestamp = timestamp;
        return this;
    }

    setUrl(url: string): EmbedBuilder {
        this.url = url;
        return this;
    }

    setColor(color: Color): EmbedBuilder {
        this.color = color;
        return this;
    }

    setThumbnail(thumbnail: EmbedThumbnailBuilder): EmbedBuilder {
        this.thumbnail = thumbnail;
        return this;
    }


    setImage(image: EmbedImageBuilder): EmbedBuilder {
        this.image = image;
        return this;
    }


    setFooter(footer: EmbedFooterBuilder): EmbedBuilder {
        this.footer = footer;
        return this;
    }

    setAuthor(author: EmbedAuthorBuilder): EmbedBuilder {
        this.author = author;
        return this;
    }

    addField(field: EmbedFieldBuilder): EmbedBuilder {
        this.fields.push(field);
        return this;
    }

    build(): Embed {
        //TODO: Add video and provider to EmbedBuilder
        return new Embed(
            this.title,
            EmbedType.RICH,
            this.description,
            this.url,
            this.timestamp,
            this.color,
            this.footer?.build(),
            this.image?.build(),
            this.thumbnail?.build(),
            undefined,
            undefined,
            this.author?.build(),
            this.fields.map(field => field.build())
        );
    }
}
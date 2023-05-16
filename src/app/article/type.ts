
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type PostResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;

type PropertyValueMap = PostResult["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
    PropertyValue,
    { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">;
export type PropertyValueUrl = ExtractedPropertyValue<"url">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueEditedTime = ExtractedPropertyValue<"last_edited_time">;

export interface IPost {
    id: string;
    url: string;
    tags: string[];
    modifiedDate: string;
    publishDate: string;
    title: string;
    description: string;
    link?: string;
}

export type DatabaseItem = PostResult & {
    properties: {
        Name: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        PublishDate: PropertyValueDate;
        LastUpdated?: PropertyValueDate;
    };
};
import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';

export type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  { properties: Record<string, unknown> }
>;

type PropertyValueMap = PostResult['properties'];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue['type'];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<'title'>;
export type PropertyValueRichText = ExtractedPropertyValue<'rich_text'>;
export type PropertyValueMultiSelect = ExtractedPropertyValue<'multi_select'>;
export type PropertyValueSelect = ExtractedPropertyValue<'select'>;
export type PropertyValueUrl = ExtractedPropertyValue<'url'>;
export type PropertyValueDate = ExtractedPropertyValue<'date'>;
export type PropertyValueEditedTime =
  ExtractedPropertyValue<'last_edited_time'>;

export type NotionColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
export type PropertyTag = {
  name: string;
  color: NotionColor;
};

export interface IPost {
  pageId: string;
  tags: PropertyTag[];
  publishDate: string;
  title: string;
  description: string;
  coverImageUrl: string;
  markdown: string;
  readingTime: string; // 게시글을 다 읽는데 걸리는 추정 시간.
}

export type DatabaseItem = PostResult & {
  properties: {
    Name: PropertyValueTitle;
    Tags: PropertyValueMultiSelect | PropertyValueSelect;
    Description: PropertyValueRichText;
    Link: PropertyValueUrl;
    Date: PropertyValueDate;
  };
};

export type ArticleStatus = 'About me' | 'Publish' | 'In progress' | 'Not started';
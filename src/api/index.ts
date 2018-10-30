import _ from "lodash";
import UrlJoin from "url-join";
import qs from "query-string";
import { EndPointConfig } from "podio-js";

export type NoParamsRequest = {};

export enum PodioRefType {
  Item = "item",
  App = "app",
  Space = "space",
  LinkedAccount = "linked_account"
}

export type PodioRefId = number;

export interface PodioRef {
  type: PodioRefType;
  id: PodioRefId;
}

export interface PodioAppToken {
  id: AppId;
  token: string;
}

export interface Hook {
  url: string;
  type: string;
}

export type HookRequest = Hook & {
  ref: PodioRef;
}

export interface HookValidationRequest {
  hook_id: HookId;
  code: string;
}

export interface HookResponse {
  hook_id: HookId;
  options: {[key: string]: any};
}


export function NoHook<Req, Res>(config: EndPointConfig<Req, Res>): EndPointConfig<Req, Res> {
  let parsed = qs.parseUrl(config.uri);
  let query = Object.assign({}, parsed.query, {hook: false});

  return Object.assign({}, config, {
    uri: UrlJoin(parsed.url, `?${qs.stringify(query)}`)
  });
}

export type AppId = number;
export type AppToken = string;
export type ItemId = number;
export type ItemRevision = number;
export type FieldId = number;
export type OrgId = number;
export type SpaceId = number;
export type ViewId = number;
export type CommentId = number;
export type EmbedId = number;
export type ProfileId = number;
export type UserId = number;
export type FileId = number;
export type HookId = number;
export type Revision = number;
export type CategoryId = number;
export type StatusId = number;
export type TaskId = number;
export type LabelId = number;

export interface RemoteUser {
  user_id: UserId;
}

export interface RemoteSpace {
  space_id: SpaceId;
}

export interface RemoteApp {
  app_id: AppId;
}

export interface RemoteOrg {
  org_id: OrgId;
}

export interface RemoteProfile {
  profile_id: ProfileId;
}

export interface RemoteFile {
  file_id: FileId;
}

export interface RemoteHook {
  hook_id: HookId;
}

export interface RemoteItem {
  item_id: ItemId;
}

export interface RemoteView {
  view_id: ViewId;
}

export interface RemoteField {
  field_id: FieldId;
}

export interface RemoteStatus {
  status_id: StatusId;
}

export interface RemoteTask {
  task_id: TaskId;
}

export interface RemoteLabel {
  lable_id: LabelId;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface ClientToken {
  appId: AppId;
  appToken: AppToken;
}

export namespace Fields {

  export enum Type {
    Text = "text",
    Number = "number",
    Image = "image",
    Media = "media",
    Date = "date",
    App = "app",
    Money = "money",
    Progress = "progress",
    Location = "location",
    Duration = "duration",
    Contact = "contact",
    Calculation = "calculation",
    Embed = "embed",
    Question = "question",
    File = "file",
    Telephone = "tel",
    Category = "category"
  }

  export type Color = "DCEBD8" | "F7D1D0" | "DDDDDD" | "D2E4EB" | "F7F0C5" | "E1D8ED" | "FFD5C2" | "D1F3EC";
  export enum Toggle {
    Enabled = "enabled",
    Disabled = "disabled",
  }
  export enum Status {
    Active = "active",
    Deleted = "deleted"
  }
  export enum TextFormat {
    Plain = "plain",
    Markdown = "markdown",
    Html = "html",
    Text = "text"
  }
  export enum OptionalToggle {
    Enabled = "enabled",
    Disabled = "disabled",
    Required = "required"
  }

  export interface TextFieldConfig {
    size: "small" | "large";
    format: TextFormat
  }

  export interface AppFieldConfig {
    referenced_apps: [
      {
        app_id: AppId;
        view_id?: ViewId;
      }
    ];
    multiple?: boolean;
  }

  export interface MoneyFieldConfig {
    allowed_currencies: string
  }
 
  export interface ContactFieldConfig {
    type: "space_users" | "all_users" | "space_contacts" | "space_users_and_contacts"
  }
  export interface CategoryFieldConfig {
    options: [{
      id?: number;
      status?: Status;
      text: string;
      color?: Color
    }];
    multiple?: boolean;
  }

  export interface NumberFieldConfig {
    decimals?: number;
  }

  export interface DateFieldConfig {
    calendar?: boolean;
    end?: OptionalToggle;
    color?: Color
  }


  export interface CalculationFieldConfig {
    script: string;
    unit?: string;
    decimals?: number;
    time?: Toggle;
    calendar?: boolean;
    color: Color;
  }

  export interface FileFieldConfig {
    allowed_mimetypes: string[];
  }

  export interface DurationFieldConfig {
    fields: ["days" | "hours" | "minutes" | "seconds"];
  }

  export interface TelephoneFieldConfig {
    strict?: boolean;
    display_format?: "INT" | "NAT" | "E164" | "RFC3966";
    default_country_code?: string;
  }

  export type RemoteFieldConfig = RemoteField & (TextFieldConfig | AppFieldConfig | MoneyFieldConfig | ContactFieldConfig |
  CategoryFieldConfig | NumberFieldConfig | DateFieldConfig | CalculationFieldConfig | FileFieldConfig | DurationFieldConfig |
  TelephoneFieldConfig);


  export interface EmbedFieldValue {
    embed: EmbedId;
    file?: FileId;
  }

  export interface DurationFieldValue {
    duration: number;
  }

  export interface VideoFieldValue {
    value: FileId;
  }

  export interface LocationFieldValue {
    value: string;
    formatted?: string;
    street_number?: string;
    street_name?: string;
    postal_code?: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: string;
    lng?: string;
  }

  export interface ProgressFieldValue {
    value: number;
  }

  export interface MoneyFieldValue {
    value: string; // in decimal format
    currency: string;
  }

  export interface ContactFieldValue {
    value: ProfileId;
  }

  export interface MemberFieldValue {
    value: UserId;
  }

  export interface AppFieldValue {
    value: AppId;
  }
 
  export interface DateFieldValue {
    start_date: Date;
    end_date?: Date;
    start_time?: number;
    end_time?: number;
  }

  export interface ImageFieldValue {
    value: FileId;
  }

  export interface NumberFieldValue {
    value: number;
  }

  export interface TextFieldValue {
    value: string;
    format?: TextFormat;
  }

  export interface CategoryFieldValue {
    value: CategoryId;
  }

  export interface EmailFieldValue {
    value: string;
    type: "home" | "work" | "other";
  }

  export interface PhoneFieldValue {
    value: string;
    type : "mobile" | "work" | "home" | "main" | "work_fax" | "private_fax" | "other";
  }

  export type FieldValueType = EmbedFieldValue | DurationFieldValue | VideoFieldValue | LocationFieldValue | ProgressFieldValue | MoneyFieldValue |
    ContactFieldValue | MemberFieldValue | AppFieldValue | DateFieldValue | ImageFieldValue | NumberFieldValue |
    TextFieldValue | CategoryFieldValue | EmailFieldValue | PhoneFieldValue;
  
  export interface FieldLabel {
    label: string;
  }

  export interface RemoteFieldWithValue extends FieldLabel, RemoteField {
    type: Type;
    values: FieldValueType[];
  }

  export interface Field extends FieldLabel, RemoteField {
  }

  export function Create<T extends FieldValueType>(field_id: FieldId, label: string, value: T): Field {
    return Object.assign({ label, field_id }, value);
  }

  export function Postable(fields: Field[]) {
    return _.groupBy(fields, "field_id");
  }

}


export type SpaceUrl = string;

export namespace PodioEvents {

  export enum Apps {
    onItemCreate = "item.create",
    onItemUpdate = "item.update",
    onItemDelete = "item.delete",
    onCommentCreate = "comment.create",
    onCommentDelete = "comment.delete",
    onFileChange = "file.change",
    onAppUpdate = "app.update",
    onAppDelete = "app.delete",
    onWebFormCreate = "form.create",
    onWebFormUpdate = "form.update",
    onWebFormDelete = "form.delete",
    onTagAdd = "tag.add",
    onTagDelete = "tag.delete"
  }

  export enum Spaces {
    onAppCreate = "app.create",
    onTaskCreate = "task.create",
    onTaskUpdate = "task.update",
    onTaskDelete = "task.delete",
    onMemberAdd = "member.add",
    onMemberRemove = "member.remove",
    onStatusCreate = "status.create",
    onStatusUpdate = "status.update",
    onStatusDelete = "status.delete"
  }

  export enum Hooks {
    onHookVerify = "hook.verify"
  }

  export type EventType = Apps | Spaces | Hooks;

  export type Event = {
    type: EventType;
    hook_id: number;
  } & any;

  export const EqualTypes = (e1: EventType, e2: EventType): boolean => {
    return e1 === e2;
  };

}
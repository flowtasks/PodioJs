import _ from "lodash";
import { CreateEndpoint, HttpMethod, Transformer, Postable } from "../";
import { RemoteApp, ItemId, ViewId, RemoteItem, RemoteView, RemoteSpace, RemoteField, AppId, Revision, FieldId } from ".";


export interface CreateItemRequest extends Postable<any> {
  app: RemoteApp;
}

export interface AppItem {
  app_id: AppId;
  app_item_id: number;
}

export interface ItemExternalId {
  app_id: AppId;
  external_id: number;
}

export interface LimitOptions {
  limit?: number;
  offset?: number;
}

export interface SortOptions {
  sort_by?: string;
  sort_desc?: boolean;
}

export type Filters = {
  [key: string]: string
};

export interface FilterOptions {
  filters: Filters
}

export interface RememberOptions {
  remember?: boolean;
}

export interface BulkDeleteRequest extends Postable<any> {
  app: RemoteApp;
  data: {
    item_ids?: ItemId[];
    view_id?: ViewId;
  } & FilterOptions
}


export interface ExportItemRequest extends Postable<any> {
  app: RemoteApp;
  exporter: "xls" | "xlsx";
  data: {
    view_id?: ViewId;
    split_email_by_type?: boolean;
    split_phone_by_type?: boolean;
  } & LimitOptions & SortOptions & FilterOptions;
}

export interface FilterRequest extends Postable<any> {
  app: RemoteApp;
  data: SortOptions & LimitOptions & FilterOptions & RememberOptions;
}

export interface ViewFilterRequest extends Postable<any> {
  app: RemoteApp;
  view: RemoteView;
  data: SortOptions & LimitOptions & RememberOptions;
}

export interface SpaceFilterRequest extends Postable<any> {
  app: RemoteApp;
  space: RemoteSpace;
  data: SortOptions & LimitOptions & RememberOptions & FilterOptions;
}

export type CountRequest = Filters & RemoteApp & RemoteView;
export type ItemFieldRequest = RemoteItem & RemoteField;
export type ItemFieldV2Request = RemoteItem & {
  field_or_external_id: number;
};
export type ReferencedItemFieldRequest = RemoteItem & RemoteField & LimitOptions;

export interface TopFieldValuesRequest {
  field_id: FieldId;
  limit?: number;
  not_item_id?: ItemId[];
}

export interface RevisionedItem {
  item_id: ItemId;
  revision: Revision;
}

export type ItemWithRevision = RevisionedItem;

export interface ItemInRevisionRange {
  item_id: ItemId;
  revision_from: Revision;
  revision_to: Revision;
}

export type ItemsAsXlsxRequest = RemoteApp & LimitOptions & SortOptions & RemoteView & {
  deleted_columns?: boolean
};

export interface ItemParticipationRequest {
  item_id: ItemId;
  status: "invited" | "accepted" | "declined" | "tentative";
}

export type UpdateRequest = RemoteItem & Postable<any>;

export type UpdateFieldValueRequest = ItemFieldV2Request & Postable<any>;

export type UpdateValuesRequest = RemoteItem & Postable<any>;

function DefaultDataTransformer<Req>(obj: Req): any {
  return _.get(obj, "data");
};

function GetTransformer<Req, Res>(): Transformer<Req, Res> {
  return {
    request: DefaultDataTransformer
  };
}

export const Get = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}", GetTransformer()
);

export const GetByAppItemId = CreateEndpoint<AppItem, any>(
  HttpMethod.GET, "/app/{{app_id}}/item/{{app_item_id}}"
);

export const GetByExternalId = CreateEndpoint<ItemExternalId, any>(
  HttpMethod.GET, "/item/app/{{app_id}}/external_id/{{external_id}}"
);

export const GetClone = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/clone"
);

export const GetCount = CreateEndpoint<CountRequest, any>(
  HttpMethod.GET, "/item/app/{{app_id}}/count"
)

export const GetFieldValues = CreateEndpoint<ItemFieldRequest, any>(
  HttpMethod.GET, "/item/{{item_id}}/value/{{field_id}}"
);

export const GetFieldValuesV2 = CreateEndpoint<ItemFieldV2Request, any>(
  HttpMethod.GET, "/item/{{item_id}}/value/{{field_or_external_id}}/v2"
);

export const GetTopFieldValues = CreateEndpoint<TopFieldValuesRequest, any>(
  HttpMethod.GET, "/item/field/{{field_id}}/top"
);

export const GetFieldRanges = CreateEndpoint<RemoteField, any>(
  HttpMethod.GET, "/item/field/{{field_id}}/range"
);

export const GetPreviewForField = CreateEndpoint<ItemFieldRequest, any>(
  HttpMethod.GET, "/item/{{item_id}}/reference/{{field_id}}/preview"
);

export const GetReferences = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/reference"
);

export const GetAllRevisions = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/revision"
);

export const GetRevision = CreateEndpoint<RevisionedItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/revision/{{revision}}"
);

export const GetRevisionDifference = CreateEndpoint<ItemInRevisionRange, any>(
  HttpMethod.GET, "/item/{{item_id}}/revision/{{revision_from}}/{{revision_to}}", GetTransformer()
);

export const GetItemValues = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/value"
);

export const GetItemValuesV2 = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/value/v2"
);

export const GetItemsAsXlsx = CreateEndpoint<ItemsAsXlsxRequest, any>(
  HttpMethod.GET, "/item/app/{{app.app_id}}/xlsx"
);

export const GetMeetingUrl = CreateEndpoint<RemoteItem, any>(
  HttpMethod.GET, "/item/{{item_id}}/meeting/url"
);

export const GetReferencesByField = CreateEndpoint<ReferencedItemFieldRequest, any>(
  HttpMethod.GET, "/item/{{item_id}}/reference/field/{{field_id}}"
);

export const Add = CreateEndpoint<CreateItemRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}", GetTransformer()
);

export const BulkDelete = CreateEndpoint<BulkDeleteRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}/delete", GetTransformer()
);

export const Clone = CreateEndpoint<RemoteItem, RemoteItem>(
  HttpMethod.POST, "/item/{{item_id}}/clone"
);

export const Delete = CreateEndpoint<RemoteItem, any>(
  HttpMethod.DELETE, "/item/{{item_id}}"
);

export const DeleteReference = CreateEndpoint<RemoteItem, any>(
  HttpMethod.DELETE, "/item/{{item_id}}/ref"
);

export const Export = CreateEndpoint<ExportItemRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}/export/{{exporter}}", GetTransformer()
);

export const Filter = CreateEndpoint<FilterRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}/filter/", GetTransformer()
);

export const FilterByView = CreateEndpoint<ViewFilterRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}/filter/{{view.view_id}}", GetTransformer()
);

export const FilterBySpace = CreateEndpoint<SpaceFilterRequest, any>(
  HttpMethod.POST, "/item/app/{{app.app_id}}/filter", GetTransformer()
);

export const FindReferenceable = CreateEndpoint<RemoteField, any>(
  HttpMethod.GET, "/item/fields/{{field_id}}/find"
);

export const RevertRevision = CreateEndpoint<ItemWithRevision, any>(
  HttpMethod.DELETE, "/item/{{item_id}}/revision/{{revision}}"
);

export const RevertToRevision = CreateEndpoint<ItemWithRevision, any>(
  HttpMethod.POST, "/item/{{item_id}}/revision/{{revision}}/revert_to"
);

export const SetParticipation = CreateEndpoint<ItemParticipationRequest, any>(
  HttpMethod.POST, "/item/{{item_id}}/participation"
);

export const Update = CreateEndpoint<UpdateRequest, any>(
  HttpMethod.POST, "/item/{{item_id}}", GetTransformer()
);

export const UpdateFieldValue = CreateEndpoint<UpdateFieldValueRequest, any>(
  HttpMethod.PUT, "/item/{{item_id}}/value/{{file_or_external_id}}", GetTransformer()
);

export const UpdateValues = CreateEndpoint<UpdateValuesRequest, any>(
  HttpMethod.PUT, "/item/{{item_id}}/value", GetTransformer()
);


// Rearrange: https://developers.podio.com/doc/items/rearrange-item-10617690
// Calculate: https://developers.podio.com/doc/items/calculate-67633
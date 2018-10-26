import { CreateEndpoint, HttpMethod } from "../";
import { AppId, FieldId, OrgId, SpaceId, RemoteApp, RemoteSpace, NoParamsRequest, RemoteOrg } from ".";

export interface GetAppRequest {
  app_id: AppId;
}

export type CreateAppRequest = any;
export interface GetAllAppRequest {
  exclude_app_ids?: AppId[];
  exclude_demo?: boolean;
  limit: number; // defaults to 4
  order?: "score" | "name";
  referencable_in_org?: OrgId;
  right?: string;
  target_space_id?: SpaceId;
  text?: string;
}

export interface GetByOrgSpaceAndAppRequest {
  org_name: string;
  space_name: string;
  app_name: string;
}

export type AppConfig = any;

export interface FieldConfig {
  label: string;
  description?: string;
  delta: number;
  settings: any;
  mapping: any;
  required: boolean 
}

export interface AppFieldConfig extends FieldConfig {
  app_id: number;
  field_id: number;
}

export interface NewFiledRequest {
  type: string;
  config: FieldConfig
}


export interface DeleteFieldRequest {
  app_id: AppId;
  field_id: FieldId;
  delete_values?: boolean;
}

export interface GetFieldRequest {
  app_id: AppId;
  field_id: FieldId;
}

export interface GetAppByUrlRequest {
  space_id: SpaceId;
  url_label: string;
}

export type AppFeatures = "filters" | "widgets" | "integration" | "forms" | "items" | "flows" | "votings";

export interface InstallAppRequest {
  app_id: AppId;
  space_id: SpaceId;
  features: AppFeatures
}

export interface UpdateAppRequest {
  app_id: AppId;
  config: AppConfig;
}

export interface UpdateAppDescriptionRequest {
  app_id: AppId;
  description: string;
}

export interface UpdateAppOrderRequest {
  space_id: SpaceId;
  order: AppId[];
}

export interface AppConfigV2 extends AppConfig {
}

export const Activate = CreateEndpoint<RemoteApp, any>(HttpMethod.POST, "/app/{{app_id}}/activate");
export const DeActivate = CreateEndpoint<RemoteApp, any>(HttpMethod.POST, "/app/{{app_id}}/deactivate");
export const Get = CreateEndpoint<GetAppRequest, any>(HttpMethod.GET, "/app/{{app_id}}");
export const GetAll = CreateEndpoint<GetAllAppRequest, any>(HttpMethod.GET, "/app");
export const GetByLabels = CreateEndpoint<GetByOrgSpaceAndAppRequest, any>(HttpMethod.GET, "/app/org/{{org_name}}/space/{{space_name}}/{{app_name}}");
export const GetDependencies = CreateEndpoint<RemoteApp, any>(HttpMethod.GET, "/app/{{app_id}}/dependencies");
export const GetField = CreateEndpoint<GetFieldRequest, any>(HttpMethod.GET, "/app/{{app_id}}/field/{{fieldId}}");
export const GetAppByUrl = CreateEndpoint<GetAppByUrlRequest, any>(HttpMethod.GET, "/app/space/{{space_id}}/{{url_label}}");
export const GetAppsBySpace = CreateEndpoint<RemoteSpace, any>(HttpMethod.GET, "/app/space/{{space_id}}");
export const GetSpaceDependencies = CreateEndpoint<RemoteSpace, any>(HttpMethod.GET, "/space/{{space_id}}/dependencies");
export const GetTopApps = CreateEndpoint<NoParamsRequest, any>(HttpMethod.GET, "/app/top");
export const GetTopAppsInOrg = CreateEndpoint<RemoteOrg, any>(HttpMethod.GET, "/app/org/{{org_id}}/top");

export const InstallApp = CreateEndpoint<InstallAppRequest, any>(HttpMethod.POST, "/app/{{app_id}}/install");
export const UpdateAppField = CreateEndpoint<AppFieldConfig, any>(HttpMethod.POST, "/app/{{app_id}}/field/{{field_id}}");
export const UpdateApp = CreateEndpoint<AppConfig, any>(HttpMethod.POST, "/app/{{app_id}}");
export const UpdateAppV2 = CreateEndpoint<AppConfigV2, any>(HttpMethod.POST, "/app/{{app_id}}/v2");
export const UpdateAppDescription = CreateEndpoint<UpdateAppDescriptionRequest, any>(HttpMethod.PUT, "/app/{{app_id}}/description");
export const UpdateAppOrder = CreateEndpoint<UpdateAppOrderRequest, any>(HttpMethod.PUT, "/app/space/{{space_id}}/order", {
  request: (obj: UpdateAppOrderRequest) => obj.order
});

// GetFeatures: https://developers.podio.com/doc/applications/get-features-43648
// GetIcons: https://developers.podio.com/doc/applications/get-icon-suggestions-82045764
// UpdateAppUsage: https://developers.podio.com/doc/applications/update-app-usage-instructions-33570086


export const Create = CreateEndpoint<CreateAppRequest, RemoteApp>(HttpMethod.POST, "/app");
export const Delete = CreateEndpoint<RemoteApp, any>(HttpMethod.POST, "/app/{{app_id}}");

export const AddField = CreateEndpoint<NewFiledRequest, any>(HttpMethod.POST, "/app/{{app_id}}/field");
export const DeleteField = CreateEndpoint<DeleteFieldRequest, any>(HttpMethod.DELETE, "/app/{{app_id}}/field/{{fieldId}}");
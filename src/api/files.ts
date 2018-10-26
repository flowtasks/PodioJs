import { CreateEndpoint, HttpMethod, FormData } from "../";
import { RemoteFile, PodioRef, UserId, DateRange, RemoteApp, FileId } from ".";


export interface AttachFileRequest {
  file: RemoteFile;
  ref: PodioRef;
}

export interface GetAllFilesRequest {
  attached_to?: "item" | "status" | "task" | "space";
  created_by?: UserId;
  created_on?: DateRange;
  filetype?: "image" | "application" | "video" | "text" | "audio";
  hosted_by?: "podio" | "google" | "boxnet" | "dropbox" | "evernote" | "live" | "sharefile" | "sugarsync" | "yousendit";
  limit?: number;
  sort_by?: "name" | "created_on";
  sort_desc?: boolean;
}

export interface GetByRefRequest {
  ref: PodioRef;
  filter: GetAllFilesRequest;
}

export interface ReplaceRequest {
  old: RemoteFile;
  new: RemoteFile;
}

export interface UpdateRequest {
  file: RemoteFile;
  description: string;
}

export interface UploadRequest {
  filename: string;
  source: ReadableStream;
}

export interface LinkedAccountUploadRequest {
  account: PodioRef;
  external_file_id: FileId;
  preserve_permissions?: boolean;
}


export const Attach = CreateEndpoint<AttachFileRequest, any>(HttpMethod.POST, "/file/{{file.file_id}}/attach");
export const Copy = CreateEndpoint<RemoteFile, RemoteFile>(HttpMethod.POST, "/file/{{file_id}}/copy");
export const Delete = CreateEndpoint<RemoteFile, any>(HttpMethod.DELETE, "/file/{{file_id}}");
export const Get = CreateEndpoint<RemoteFile, any>(HttpMethod.GET, "/file/{{file_id}}");
export const GetAll = CreateEndpoint<GetAllFilesRequest, any>(HttpMethod.GET, "/file");
export const GetByApp = CreateEndpoint<GetByRefRequest, any>(HttpMethod.GET, "/file/app/{{ref.id}}");
export const GetBySpace = CreateEndpoint<GetByRefRequest, any>(HttpMethod.GET, "/files/space/{{ref.id}}");
export const GetByLinkedAccount = CreateEndpoint<GetByRefRequest, any>(HttpMethod.GET, "/file/linked_account/{{ref.id}}");
export const Replace = CreateEndpoint<ReplaceRequest, any>(HttpMethod.POST, "/file/{{file_id}}/replace", {
  request: (req: ReplaceRequest) => ({ old_file_id: req.old.file_id })
});
export const Update = CreateEndpoint<UpdateRequest, any>(HttpMethod.PUT, "/file/{{file_id}}");
export const Upload = CreateEndpoint<FormData<UploadRequest>, any>(HttpMethod.POST, "/file");
export const UploadFromLinkedAccount = CreateEndpoint<LinkedAccountUploadRequest, any>(HttpMethod.POST, "/file/linked_account/{{account.id}}");
import { CreateEndpoint, HttpMethod } from "../";
import { SpaceId, RemoteStatus } from ".";


export interface AddStatusRequest {
  space_id: SpaceId;
  data: any;
}

export type UpdateStatusRequest = AddStatusRequest;

export const Add = CreateEndpoint<AddStatusRequest, any>(
  HttpMethod.POST, "/status/space/{{space_id}}"
);

export const Delete = CreateEndpoint<RemoteStatus, any>(
  HttpMethod.DELETE, "/status/{{status_id}}"
);

export const Get = CreateEndpoint<RemoteStatus, any>(
  HttpMethod.GET, "/status/{{status_id}}"
);

export const Update = CreateEndpoint<UpdateStatusRequest, any>(
  HttpMethod.PUT, "/status/status_id"
);
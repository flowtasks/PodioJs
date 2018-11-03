import { CreateEndpoint, HttpMethod, Postable } from "podio-js";
import { PodioRef, ContactId, AccessLevel, PodioApiResponse } from ".";

export enum GrantPrivilegeAction {
  View = "view",
  Comment = "comment",
  Rate = "rate"
}

export interface GrantRequest {
  people: ContactId[];
  action: GrantPrivilegeAction;
  message?: string;
  access_level: AccessLevel;
}

export interface CreateGrantRequest extends Postable<GrantRequest> {
  ref: PodioRef
}


export const Create = CreateEndpoint<CreateGrantRequest, PodioApiResponse>(HttpMethod.POST, "/grant/{{ref.type}}/{{ref.id}}")
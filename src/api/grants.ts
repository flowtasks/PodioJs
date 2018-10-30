import { CreateEndpoint, HttpMethod, Postable } from "podio-js";
import { PodioRef } from ".";

export interface CreateRequest extends Postable<any> {
  ref: PodioRef
}

export const Create = CreateEndpoint<any, any>(HttpMethod.POST, "/grant/{{ref.type}}/{{ref.id}}")
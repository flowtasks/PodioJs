import { CreateEndpoint, HttpMethod } from "../";
import { HookRequest, HookResponse, HookValidationRequest, Hook, RemoteHook } from ".";


let createReqTransformer = (obj: HookRequest) => {
  return {
    url: obj.url,
    type: obj.type
  };
};

let createResTransformer = (obj: any): HookResponse => {
  return {
    hook_id: obj.hook_id,
    options: {
      raw: obj
    }
  };
}

export const All = CreateEndpoint<HookRequest, Hook[]>(HttpMethod.GET, "/hook/{{ref.type}}/{{ref.id}}");
export const Create = CreateEndpoint<HookRequest, HookResponse>(
  HttpMethod.POST, "/hook/{{ref.type}}/{{ref.id}}", {
    request: createReqTransformer,
    response: createResTransformer
  }
);
export const Validate = CreateEndpoint<HookValidationRequest, void>(HttpMethod.POST, "/hook/{{hook_id}}/verify/validate");
export const Delete = CreateEndpoint<RemoteHook, any>(HttpMethod.DELETE, "/hook/{{hook_id}}");
export const RequestVerification = CreateEndpoint<RemoteHook, any>(HttpMethod.POST, "/hook/{{hook_id}}/verify/request");
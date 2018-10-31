import _ from "lodash";

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

export type URI = string;
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
};

export enum DataOption {
  QueryString = "qs",
  Form = "formData",
  Json = "json"
}

export type EndPointConfig<Req, Res> = {
  uri: string,
  method: HttpMethod,
  headers?: {[key: string]: string},
  obj?: Req,
  transformer?: Transformer<Req, Res>
};

export interface FormData<T> {
  form: T;
}

export interface Postable<T> {
  data: T;
}

export function CreateFormData<T>(obj: T): FormData<T> {
  return {
    form: obj
  } as FormData<T>;
}

function IsPostable<T>(obj: Postable<T> | any): obj is Postable<T> {
  return obj !== undefined && (<Postable<T>> obj).data !== undefined;
}

function IsFormData<T>(obj: FormData<T> | any): obj is FormData<T> {
  return obj !== undefined && (<FormData<T>> obj).form !== undefined;
}

export type RequestTransformer<RequestType> = (obj: RequestType) => any;
export type ResponseTransformer<ResponseType> = (json: any) => ResponseType;

export type Transformer<Req, Res> = {
  request?: RequestTransformer<Req>,
  response?: ResponseTransformer<Res>
};

function DefaultRequestTransformer<T>(reqObj: T): any {
  if (IsFormData(reqObj)) {
    return reqObj.form;
  }
  if (IsPostable(reqObj)) {
    return reqObj.data;
  }
  return reqObj;
}
let DefaultResponseTransformer = _.identity;
let DefaultTransformer = {
  request: DefaultRequestTransformer,
  response: DefaultResponseTransformer
};


export type EndPointCaller<Req, Res> = (arg?: Req) => EndPointConfig<Req, Res>;

export function CreateEndpoint<Req, Res>(method: HttpMethod, uri: URI, transformer: Transformer<Req, Res> = DefaultTransformer): EndPointCaller<Req, Res> {
  return (reqArg?: Req): EndPointConfig<Req, Res> => {
    return {
      method,
      uri,
      obj: reqArg,
      transformer
    };
  };
};

export function IsErrorResponse<T>(response: T | FailedResponse): response is FailedResponse {
  return response && (<FailedResponse> response).error !== undefined;
}

export interface FailedResponse {
  error: any;
}

function GetDataOption<Req, Res>(endPoint: EndPointConfig<Req, Res>): DataOption {
  if (endPoint.method === HttpMethod.GET) {
    return DataOption.QueryString;
  }

  if (endPoint.method === HttpMethod.POST || endPoint.method === HttpMethod.PUT) {
    if (IsFormData(endPoint.obj)) {
      return DataOption.Form;
    }
    return DataOption.Json;
  }
}


export async function MakeRequest<Req, Res>(request: any, endPoint: EndPointConfig<Req, Res>): Promise<Res | FailedResponse> {
  let reqTransformer = endPoint.transformer.request || DefaultRequestTransformer;
  let resTransformer = endPoint.transformer.response || DefaultResponseTransformer;

  let dataOption = GetDataOption(endPoint);

  let options = {
    method: endPoint.method,
    uri: _.template(endPoint.uri)((endPoint.obj || {}) as Object),
    [dataOption]: reqTransformer(endPoint.obj),
  };

  try {
    let response = await request(options);
    return resTransformer(response);
  } catch (e) {
    return {
      error: e.message
    };
  }

}

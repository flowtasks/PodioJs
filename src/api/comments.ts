import { CreateEndpoint, HttpMethod } from "../";
import { PodioRef, CommentId, FieldId, EmbedId } from ".";

export interface CommentData {
  value: string;
  external_id?: string | number;
  file_ids?: FieldId[];
  embed_id?: EmbedId;
  embed_url?: string;
}

export interface AddCommentRequest extends PodioRef {
  options: {
    alert_invite?: boolean;
    hook?: boolean;
    silent?: boolean;
  };

  data: CommentData;
}

export interface RemoteComment {
  comment_id: CommentId
}

export interface UpdateCommentRequest extends RemoteComment {
  data: CommentData;
}

let requestTransformer = (req: AddCommentRequest | UpdateCommentRequest ) => {
  return req.data;
};


export const Add = CreateEndpoint<AddCommentRequest, any>(HttpMethod.POST, "/comment/{{type}}/{{id}}", {
  request: requestTransformer
});
export const Delete = CreateEndpoint<RemoteComment, any>(HttpMethod.DELETE, "/comment/{{comment_id}}");
export const Get = CreateEndpoint<RemoteComment, any>(HttpMethod.GET, "/comment/{{comment_id}}");
export const GetOnRef = CreateEndpoint<PodioRef, any>(HttpMethod.GET, "/comment/{{type}}/{{id}}");
export const GetRevisions = CreateEndpoint<RemoteComment, any>(HttpMethod.GET, "/comment/{{comment_id}}/revision");
export const Update = CreateEndpoint<UpdateCommentRequest, any>(HttpMethod.PUT, "/comment/{{comment_id}}", {
  request: requestTransformer
});

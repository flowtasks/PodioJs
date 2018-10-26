import { CreateEndpoint, HttpMethod, Postable } from "../";
import { TaskId, UserId, RemoteTask, PodioRefType, PodioRef, RemoteLabel, OrgId, RemoteOrg, RemoteSpace, SpaceId, LabelId, PodioRefId } from ".";

export interface AssignRequest {
  task_id: TaskId;
  responsible: UserId;
}

export interface CreateLableRequest {
  text: string;
  color: string;
}

export interface TaskRequestOptions {
  hook?: boolean;
  silent?: boolean;
}

export interface SummaryRequest {
  limit?: number;
}

export interface ByTimeRequest {
  time: "overdue" | "due" | "today" | "all";
}

export interface GetCountRequest {
  space?: SpaceId[]
}

export type OrgSummaryRequest = SummaryRequest & RemoteOrg;
export type CreateRequest = Postable<any> & TaskRequestOptions;
export type ReferenceSummaryRequest = PodioRef & SummaryRequest;
export type SpaceSummaryRequest = RemoteSpace & SummaryRequest;
export type CreateWithReferenceRequest = CreateRequest & {
  ref: PodioRef
};
export type DeleteRequest = RemoteTask & TaskRequestOptions;
export type FilterRequest = any;

export interface RankTaskRequest {
  task_id: TaskId;
  after?: TaskId;
  before?: TaskId;
}

export type UpdateLabelRequest = RemoteLabel & CreateLableRequest;

export interface UpdateLabelsOnTaskRequest extends RemoteTask, Postable<LabelId[]> {
  data: LabelId[];
}

export interface UpdateDescriptionRequest extends RemoteTask {
  description: string;
}

export interface UpdateDueDateRequest extends RemoteTask, TaskRequestOptions, Postable<any> {
  data: {
    due_on: Date;
    due_date: Date;
    due_time: string; // hh:mm
  }
}

export interface UpdateReferenceRequest extends RemoteTask, TaskRequestOptions, Postable<any> {
  data: {
    ref_type: PodioRefType;
    ref_id: PodioRefId;
  };
}

export interface UpdateTextRequest extends RemoteTask, TaskRequestOptions, Postable<any> {
  data: {
    text: string;
  }
}

export interface PrivateToggleRequest extends RemoteTask, Postable<any> {
  data: {
    private: boolean
  }
}

export const Get = CreateEndpoint<RemoteTask, any>(
  HttpMethod.GET, "/task/{{task_id}}"
);

export const GetTasksOnReference = CreateEndpoint<PodioRef, any>(
  HttpMethod.GET, "/task/{{type}}/{{id}}/count"
);

export const GetSummary = CreateEndpoint<SummaryRequest, any>(
  HttpMethod.GET, "/task/summary"
);

export const GetSummaryForOrg = CreateEndpoint<OrgSummaryRequest, any>(
  HttpMethod.GET, "/task/org/{{org_id}}/summary"
);

export const GetSummaryForPersonal = CreateEndpoint<any, any>(
  HttpMethod.GET, "/task/personal/summary"
);

export const GetSummaryForReference = CreateEndpoint<ReferenceSummaryRequest, any>(
  HttpMethod.GET, "/task/{{type}}/{{id}}/summary"
);

export const GetSummaryForSpace = CreateEndpoint<SpaceSummaryRequest, any>(
  HttpMethod.GET, "/task/space/{{space_id}}/summary"
);

export const GetByTime = CreateEndpoint<ByTimeRequest, any>(
  HttpMethod.GET, "/task/total/{{time}}"
);

export const GetCount = CreateEndpoint<GetCountRequest, any>(
  HttpMethod.GET, "/task/total"
);

export const Filter = CreateEndpoint<FilterRequest, any>(
  HttpMethod.GET, "/task"
);

export const Create = CreateEndpoint<CreateRequest, any>(
  HttpMethod.POST, "/task"
);

export const CreateWithReference = CreateEndpoint<CreateWithReferenceRequest, any>(
  HttpMethod.POST, "/task/{{ref.type}}/{{ref.id}}"
);

export const Assign = CreateEndpoint<AssignRequest, any>(
  HttpMethod.POST, "/task/{{task_id}}/assign"
);

export const Complete = CreateEndpoint<RemoteTask, any>(
  HttpMethod.POST, "/task/{{task_id}}/complete"
);

export const CreateLabel = CreateEndpoint<CreateLableRequest, any>(
  HttpMethod.POST, "/task/label"
);

export const DeleteLabel = CreateEndpoint<RemoteLabel, any>(
  HttpMethod.DELETE, "/task/label/{{label_id}}"
);

export const Delete = CreateEndpoint<DeleteRequest, any>(
  HttpMethod.DELETE, "/task/{{task_id}}"
);

export const GetLabels = CreateEndpoint<any, any>(
  HttpMethod.GET, "/task/label"
);

export const MarkAsIncomplete = CreateEndpoint<RemoteTask & TaskRequestOptions, any>(
  HttpMethod.POST, "/task/{{task_id}}/incomplete"
);

export const ChangeRank = CreateEndpoint<RankTaskRequest, any>(
  HttpMethod.POST, "/task/{{task_id}}/rank"
);

export const DeleteReference = CreateEndpoint<RemoteTask, any>(
  HttpMethod.DELETE, "/task/{{task_id}}/ref"
);

export const UpdateLabel = CreateEndpoint<UpdateLabelRequest, any>(
  HttpMethod.PUT, "/task/label/{{label_id}}"
);

export const UpdateTask = CreateEndpoint<RemoteTask & TaskRequestOptions & Postable<any>, any>(
  HttpMethod.PUT, "/task/{{task_id}}"
);

export const UpdateDescription = CreateEndpoint<UpdateDescriptionRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/description"
);

export const UpdateDueDate = CreateEndpoint<UpdateDueDateRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/due"
);

export const UpdateLabelsOnTask = CreateEndpoint<UpdateLabelsOnTaskRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/label"
);

export const PrivateToggle = CreateEndpoint<PrivateToggleRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/private"
);

export const UpdateReference = CreateEndpoint<UpdateReferenceRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/ref"
);

export const UpdateText = CreateEndpoint<UpdateTextRequest, any>(
  HttpMethod.PUT, "/task/{{task_id}}/text",
);
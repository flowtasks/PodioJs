import { CreateEndpoint, HttpMethod } from "../";
import { SpaceId, RemoteOrg, RemoteProfile, RemoteUser } from ".";


export interface GetByProfileRequest {
  profile: RemoteProfile;
  space_id: SpaceId;
}

export interface GetByMultipleProfilesRequest {
  profiles: RemoteProfile[];
  space_id: SpaceId;
}

let flattenProfilesRequestTransformer = (obj: GetByMultipleProfilesRequest): string => {
  return obj.profiles.map(e => e.profile_id).join(",");
};

export const Get = CreateEndpoint<any, any>(HttpMethod.GET, "/contact"); // Needs more work; https://developers.podio.com/doc/contacts/get-contacts-22400
export const GetTotal = CreateEndpoint<any, any>(HttpMethod.GET, "/contact/totals/v3");
export const GetByProfile = CreateEndpoint<GetByProfileRequest, any>(HttpMethod.GET, "/contact/{{profile.profile_id}}/v2");
export const GetByMultipleProfiles = CreateEndpoint<GetByMultipleProfilesRequest, any>(HttpMethod.GET, "/contact/{{profile.profile_ids}}/v2", {
  request: flattenProfilesRequestTransformer
});
export const GetByOrg = CreateEndpoint<RemoteOrg, any>(HttpMethod.GET, "/contact/org/{{org_id}}");
export const GetByUser = CreateEndpoint<RemoteUser, any>(HttpMethod.GET, "/contact/user/{{user_id}}");



// Get Linked: https://developers.podio.com/doc/contacts/get-linked-account-contact-21761795
// Get Linked contacts: https://developers.podio.com/doc/contacts/get-linked-account-contacts-6214688
// Get skills: https://developers.podio.com/doc/contacts/get-skills-1346872
// Get user contact field: https://developers.podio.com/doc/contacts/get-user-contact-field-22403
// Get vCard: https://developers.podio.com/doc/contacts/get-vcard-213496

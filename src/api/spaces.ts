import { CreateEndpoint, HttpMethod } from "../";
import { SpaceUrl } from ".";


const Find = CreateEndpoint<SpaceUrl, any>(HttpMethod.GET, "/space/url");

export default {
  Find
};
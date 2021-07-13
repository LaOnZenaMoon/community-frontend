import {noAuthentication} from "@/api";

const GET_DEFAULT_IMAGES = (fileName) => {
  return noAuthentication.get(`/community-api/file/${fileName}/single-image`);
};

export {
  GET_DEFAULT_IMAGES,
}

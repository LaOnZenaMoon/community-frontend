import {authentication, noAuthentication} from "@/api";

const GET_BOARD_TYPES = () => {
  return noAuthentication.get(`/community-api/code/board-type`);
};

const GET_CONTENT_TYPES = () => {
  return noAuthentication.get(`/community-api/code/content-type`);
};

const GET_COMMENTS_TYPES = () => {
  return noAuthentication.get(`/community-api/code/comment-type`);
};

const GET_USERS_TYPES = () => {
  return authentication.get(`/community-api/code/users-type`);
};

export {
  GET_BOARD_TYPES,
  GET_CONTENT_TYPES,
  GET_COMMENTS_TYPES,
  GET_USERS_TYPES,
}

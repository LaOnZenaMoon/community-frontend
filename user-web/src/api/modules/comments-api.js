import {authentication} from "@/api";

const GET_COMMENTS = (boardId, pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/community-api/comment/board/${boardId}?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/community-api/comment/board/${boardId}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const GET_COMMENT = (commentId) => {
  return authentication.get(`/community-api/comment/${commentId}`);
};

const ADD_COMMENT = (payload) => {
  return authentication.post(`/community-api/comment`, payload);
};

const EDIT_COMMENT = (commentId, payload) => {
  return authentication.put(`/community-api/comment/${commentId}`, payload);
};

const REMOVE_COMMENT = (commentId, removeUserId) => {
  return authentication.delete(`/community-api/comment/${commentId}/user/${removeUserId}`);
};

export {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
}

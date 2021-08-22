import {authentication} from "@/api";

const GET_BOARDS = (boardType, pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/community-api/board/boardType/${boardType}?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/community-api/board/boardType/${boardType}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const GET_BOARD = (boardId) => {
  return authentication.get(`/community-api/board/${boardId}`);
};

const ADD_BOARD = (payload) => {
  return authentication.post(`/community-api/board`, payload);
};

const EDIT_BOARD = (boardId, payload) => {
  return authentication.put(`/community-api/board/${boardId}`, payload);
};

const REMOVE_BOARD = (boardId, removeUserId) => {
  return authentication.delete(`/community-api/board/${boardId}/user/${removeUserId}`);
};

export {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  EDIT_BOARD,
  REMOVE_BOARD,
}

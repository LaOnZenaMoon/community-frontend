import {authentication} from "@/api";

const GET_USERS = (userType, pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/user/userType/${userType}?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/user/userType/${userType}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const GET_USER = (userId) => {
  return authentication.get(`/user/${userId}`);
};

const ADD_USER = (payload) => {
  return authentication.post(`/user`, payload);
};

const EDIT_USER = (userId, payload) => {
  return authentication.put(`/user/${userId}`, payload);
};

const REMOVE_USER = (userId, removeUserId) => {
  return authentication.delete(`/user/${userId}/user/${removeUserId}`);
};

export {
  GET_USERS,
  GET_USER,
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
}

import {authentication} from "@/api";

const POST_AUTHENTICATE = (payload) => {
  return authentication.post(`/authenticate`, payload);
};

const GET_USER_LIST = (usersType) => {
  return authentication.get(`/user/userType/${usersType}`);
};

const GET_USER_DETAIL = (userId) => {
  return authentication.get(`/user/${userId}`);
};

const POST_USER = (payload) => {
  return authentication.post(`/user`, payload);
};

const PUT_USER = (payload) => {
  return authentication.put(`/user`, payload);
};

//TODO DELETE API 수정 필요
// const DELETE_USER = (payload) => {
//   return authentication.delete(`/user`, payload);
// };

export {
  POST_AUTHENTICATE,
  GET_USER_LIST,
  GET_USER_DETAIL,
  POST_USER,
  PUT_USER,
}

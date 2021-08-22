import {authentication} from "@/api";


const GET_ROLES = (pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/authorization/role?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/authorization/role?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const ADD_ROLE = (payload) => {
  return authentication.post(`/authorization/role`, payload);
};

const REMOVE_ROLE = (roleId, removeUserId) => {
  return authentication.delete(`/authorization/role/${roleId}/user/${removeUserId}`);
};


const GET_USER_ROLES = (pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/authorization/user-role?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/authorization/user-role?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const ADD_USER_ROLE = (payload) => {
  return authentication.post(`/authorization/user-role`, payload);
};

const REMOVE_USER_ROLE = (userRoleId, removeUserId) => {
  return authentication.delete(`/authorization/user-role/${userRoleId}/user/${removeUserId}`);
};


const GET_RESOURCES = (pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/authorization/resource?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/authorization/resource?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const ADD_RESOURCE = (payload) => {
  return authentication.post(`/authorization/resource`, payload);
};

const REMOVE_RESOURCE = (resourceId, removeUserId) => {
  return authentication.delete(`/authorization/resource/${resourceId}/user/${removeUserId}`);
};


const GET_ROLE_RESOURCES = (pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/authorization/role-resource?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/authorization/role-resource?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const ADD_ROLE_RESOURCE = (payload) => {
  return authentication.post(`/authorization/role-resource`, payload);
};

const REMOVE_ROLE_RESOURCE = (roleResourceId, removeUserId) => {
  return authentication.delete(`/authorization/role-resource/${roleResourceId}/user/${removeUserId}`);
};


const GET_ROLE_HIERARCHIES = (pageSize, pageNumber, searchType, searchContent) => {
  if (searchType && searchContent) {
    return authentication.get(`/authorization/role-hierarchy?pageSize=${pageSize}&pageNumber=${pageNumber}&searchType=${searchType}&searchContent=${searchContent}`);
  }

  return authentication.get(`/authorization/role-hierarchy?pageSize=${pageSize}&pageNumber=${pageNumber}`);
};

const ADD_ROLE_HIERARCHY = (payload) => {
  return authentication.post(`/authorization/role-hierarchy`, payload);
};

const REMOVE_ROLE_HIERARCHY = (roleHierarchyId, removeUserId) => {
  return authentication.delete(`/authorization/role-hierarchy/${roleHierarchyId}/user/${removeUserId}`);
};


export {
  GET_ROLES,
  ADD_ROLE,
  REMOVE_ROLE,
  GET_USER_ROLES,
  ADD_USER_ROLE,
  REMOVE_USER_ROLE,
  GET_RESOURCES,
  ADD_RESOURCE,
  REMOVE_RESOURCE,
  GET_ROLE_RESOURCES,
  ADD_ROLE_RESOURCE,
  REMOVE_ROLE_RESOURCE,
  GET_ROLE_HIERARCHIES,
  ADD_ROLE_HIERARCHY,
  REMOVE_ROLE_HIERARCHY,
}

import axios from "axios";
import {GATEWAY_SERVER} from "@/common/environment";
import {getToken, removeToken} from "@/api/token-control";
import {basicLogger} from "@/common/logger";
import router from "@/routes";


// axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'};
// axios.interceptors.request.use((config) => {
//     // basicLogger('==== Intercept request ====');
//     // basicLogger(config);
//     // basicLogger('============================');
//     return config;
//   },
//   (error) => {
//     basicLogger(error);
//     return Promise.reject(error);
//   });

axios.interceptors.response.use((config) => {
    if (config.status === 401) {
      moveSignInPage();
    }

    basicLogger('==== Intercept response ====');
    basicLogger(config);
    basicLogger('============================');
    return config;
  },
  (error => {
    basicLogger(error);
    return Promise.reject(error);
  }));


const config = {
  domain: GATEWAY_SERVER,
};

const request = {
  get(path, payload) {
    if (payload) {
      return axios.get(`${config.domain + path}`, payload);
    }
    return axios.get(`${config.domain + path}`);
  },
  post(path, payload) {
    return axios.post(`${config.domain + path}`, payload);
  },
  put(path, payload) {
    return axios.put(`${config.domain + path}`, payload);
  },
  delete(path) {
    return axios.delete(`${config.domain + path}`);
  },
};

const authentication = {
  get(path, payload) {
    setJwtToken(getToken());
    return request.get(path, payload);
  },
  post(path, payload) {
    setJwtToken(getToken());
    return request.post(path, payload);
  },
  put(path, payload) {
    setJwtToken(getToken());
    return request.put(path, payload);
  },
  delete(path) {
    setJwtToken(getToken());
    return request.delete(path);
  },
};

const noAuthentication = {
  signIn(payload) {
    return request.post(`/auth-api/authentication`, payload);
  },
  signOut() {
    removeToken();
    router.push(`/login?previousPath=${encodeURIComponent(location.pathname)}`);
  },
  get(path, payload) {
    return request.get(path, payload);
  },
};

const setJwtToken = token => {
  console.log(token);
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

const moveSignInPage = () => {
  alert('Your account information has expired. Please sign in again.');
  router.push(`/login?previousPath=${encodeURIComponent(location.pathname)}`);
};

const movePage = (path) => {
  router.push(path);
};

export {
  authentication,
  noAuthentication,
  moveSignInPage,
  movePage,
}

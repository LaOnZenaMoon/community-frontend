const namespaced = true;

const state = {
  successDialog: false,
  successMessage: '',
  failDialog: false,
  failMessage: '',
  warnDialog: false,
  warnMessage: '',
};

const getters = {
  GET_SUCCESS_DIALOG(state) {
    return state.successDialog;
  },
  GET_SUCCESS_MESSAGE(state) {
    return state.successMessage;
  },
  GET_FAIL_DIALOG(state) {
    return state.failDialog;
  },
  GET_FAIL_MESSAGE(state) {
    return state.failMessage;
  },
  GET_WARN_DIALOG(state) {
    return state.warnDialog;
  },
  GET_WARN_MESSAGE(state) {
    return state.warnMessage;
  },
};

const mutations = {
  CHANGE_SUCCESS_DIALOG(state, message) {
    state.successDialog = !state.successDialog;
    state.successMessage = message;
  },
  CHANGE_FAIL_DIALOG(state, error) {
    state.failDialog = !state.failDialog;
    if (error.response) {
      state.failMessage = error.response.data.message;
    }
  },
  CHANGE_WARN_DIALOG(state, message) {
    state.warnDialog = !state.warnDialog;
    state.warnMessage = message;
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
};

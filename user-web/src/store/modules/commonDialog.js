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
  getSuccessDialog(state) {
    return state.successDialog;
  },
  getSuccessMessage(state) {
    return state.successMessage;
  },
  getFailDialog(state) {
    return state.failDialog;
  },
  getFailMessage(state) {
    return state.failMessage;
  },
  getWarnDialog(state) {
    return state.warnDialog;
  },
  getWarnMessage(state) {
    return state.warnMessage;
  },
};

const mutations = {
  changeSuccessDialog(state, message) {
    state.successDialog = !state.successDialog;
    state.successMessage = message;
  },
  changeFailDialog(state, error) {
    state.failDialog = !state.failDialog;
    if (error.response) {
      state.failMessage = error.response.data.message;
    }
  },
  changeWarnDialog(state, message) {
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

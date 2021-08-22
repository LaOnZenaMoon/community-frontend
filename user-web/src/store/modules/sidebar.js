const namespaced = true;

const state = {
    leftDrawer: true,
    rightDrawer: false,
};

const getters = {
    GET_LEFT_DRAWER(state) {
        return state.leftDrawer;
    },
    GET_RIGHT_DRAWER(state) {
        return state.rightDrawer;
    },
};

const mutations = {
    CHANGE_LEFT_DRAWER(state) {
        state.leftDrawer = !state.leftDrawer;
    },
    CHANGE_RIGHT_DRAWER(state) {
        state.rightDrawer = !state.rightDrawer;
    },
};

export default {
    namespaced,
    state,
    getters,
    mutations,
};

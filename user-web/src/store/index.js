import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import commonDialog from "@/store/modules/commonDialog";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sidebar,
        commonDialog,
    }
})

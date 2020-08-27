import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',//不要在发布环境下启用严格模式！
    modules: {}
});
export default store;

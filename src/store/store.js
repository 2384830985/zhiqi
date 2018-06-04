import Vue from 'vue'
import Vuex from 'vuex'
import Home from './home'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    allInfo: [],
    initial: 1 // 初始分页
  },
  getters: {
    // 暴露数据出去
    // getAllInfo: state => state.allInfo ? state.allInfo : '',
  },
  mutations: {
    // 方法
    addinitial (state,res) {
      state.initial = res
    }
  },
  actions: {
    // 回调处理AJAX回来的参数
    // set_AllInfo ({commit}, ele) {
    //   commit('obtain', ele)
    // }
  },
  modules: {
    // 模块
    home: Home
  }
})

export default store

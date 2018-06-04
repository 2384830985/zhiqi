const home = {
  state: {
    isPictureShow: false,
    serverisPictureShow: false,
    province: '',
    city: '',
    county: '',
    edit: {},
    serverList: {}
  },
  mutations: {
    // 方法
    hideisisPictureShow(state) {
      state.isPictureShow = true
    },
    showisisPictureShow (state, res) {
      // state.isButtonShowList.name = res
      state.isPictureShow = false
    },
    hideserverisPictureShow(state, res) { //服务的新增修改
      state.serverisPictureShow = true
    },
    showserverisPictureShow(state, res) { //服务的新增修改
      state.serverisPictureShow = false
    },
    chProvince (state, res) { // 省
      if (res) {
        state.province = res
      }
    },
    chCity (state, res) { // 市
      if (res) {
        state.city = res
      }
    },
    chCounty (state, res) { // 区
      if (res) {
        state.county = res
      }
    },
    editContent (state, res) {//获取当前的所有数据
      if (res) {
        state.edit = res
      }
    },
    serverListContent (state, res) {//获取当前的所有数据
      if (res) {
        state.serverList = res
      }
    }
  },
  actions: {
    // 异步
  },
  getters: {
    // 暴露出数据
  }
}
export default home
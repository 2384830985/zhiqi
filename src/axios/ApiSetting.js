const manager = ''; // 本地公共
// const manager = 'manager'; // 线上公共
const needLogin = 'needLogin'; // 公共
const serviceModule = {  
  url: '127.0.0.1/', // url
  getLocation: {  // 登录
    url: manager+'/login/tologin',  
    method: 'post'
  },
  getMenu: {  // 导航
    url: manager+'/role/'+needLogin+'/getMenu',
    method: 'post'
  },
  logout: {  // 退出
    url: manager+'/login/logout',
    method: 'post'
  },
  getSessionKey: {  // 图片上传
    url: manager+'/baiduapi/'+needLogin+'/getSessionKey',
    method: 'post'
  },
  // -------------------------------------------下面是广告相关接口
  getAdvertisingList: {  // 首页广告---列表
    url: manager+'/advertising/'+needLogin+'/getAdvertisingList',
    method: 'post'
  },
  getAdvertisingById: {  // 首页广告---详情
    url: manager+'/advertising/'+needLogin+'/getAdvertisingById',
    method: 'post'
  },
  saveOrUpdateAdvertising: {  // 首页广告---新增/修改
    url: manager+'/advertising/'+needLogin+'/saveOrUpdateAdvertising',
    method: 'post'
  },
  getAdvertisingListModel: {  // 广告模板---详情
    url: manager+'/advertisingTemp/'+needLogin+'/getAdvertisingList',
    method: 'post'
  },
  getAdvertisingTempList: {  // 广告模板---列表
    url: manager+'/advertisingTemp/'+needLogin+'/getAdvertisingTempList',
    method: 'post'
  },
  saveOrUpdateAdvertisingTemp: {  // 广告模板---新增或者修改
    url: manager+'/advertisingTemp/'+needLogin+'/saveOrUpdateAdvertisingTemp',
    method: 'post'
  },
  updateServicesListHomeOrEasy: {  // 后台推送---修改
    url: manager+'/agentCatory/'+needLogin+'/updateServicesListHomeOrEasy',
    method: 'post'
  },
  getPickUp: {  // 取件管理---详情
    url: manager+'/pickUpController/'+needLogin+'/getPickUp',
    method: 'post'
  },
  getExpressDelivery: {  // 配送管理---详情
    url: manager+'/expressDelivery/'+needLogin+'/getExpressDelivery',
    method: 'post'
  },
  saveOrUpdateExpressDelivery: {  // 配送管理---保存/修改
    url: manager+'/expressDelivery/'+needLogin+'/saveOrUpdateExpressDelivery',
    method: 'post'
  },
  saveOrUpdatePickUp: {  // 取件管理---保存/修改
    url: manager+'/pickUpController/'+needLogin+'/saveOrUpdatePickUp',
    method: 'post'
  },
  // -------------------------------------------下面是首页相关接口
  getCompanyList: {  //  企业---列表
    url: manager+'/company/'+needLogin+'/getCompanyList',
    method: 'post'
  },
  saveUpdateCompany: {  // 企业---新增/修改
    url: manager+'/company/'+needLogin+'/saveUpdateCompany',
    method: 'post'
  },
  getServicesListHomeOrEasy: {  // 后台---推送
    url: manager+'/agentCatory/'+needLogin+'/getServicesListHomeOrEasy',
    method: 'post'
  },
  getCompanyById: {  // 企业---详情
    url: manager+'/company/'+needLogin+'/getCompanyById',
    method: 'post'
  },
  getUserList: {  // 用户---列表
    url: manager+'/user/'+needLogin+'/getUserList',
    method: 'post'
  },
  getUser: {  // 用户---详情
    url: manager+'/user/'+needLogin+'/getUser',
    method: 'post'
  },
  saveUpdateUser: {  // 用户---新增/修改
    url: manager+'/user/'+needLogin+'/saveUpdateUser',
    method: 'post'
  },
  // -------------------------------------------下面是运营数据相关接口
  getDataTodayOrYesterdaySum: {  // 运营数据---用户,委托提交
    url: manager+'/data/'+needLogin+'/getDataTodayOrYesterdaySum',
    method: 'post'
  },
  getDataStartTimeFinishTime: {  // 运营数据---柱状图
    url: manager+'/data/'+needLogin+'/getDataStartTimeFinishTime',
    method: 'post'
  },
  // -------------------------------------------下面是委托---申请记录接口
  getRequestServicesDynamic: {  // 委托---动态列表
    url: manager+'/requestServicesDynamic/'+needLogin+'/getRequestServicesDynamic',
    method: 'post'
  },
  getRequestServicesList: {  // 委托---列表
    url: manager+'/agentDetail/'+needLogin+'/getRequestServicesList',
    method: 'post'
  },
  selectRequestServicesDetail: {  // 委托---详情
    url: manager+'/agentDetail/'+needLogin+'/selectRequestServicesDetail',
    method: 'post'
  },
  updateRequestServices: {  // 委托---修改
    url: manager+'/agentDetail/'+needLogin+'/updateRequestServices',
    method: 'post'
  },
  examineRequestService: {  // 委托---审核
    url: manager+'/agentDetail/'+needLogin+'/examineRequestService',
    method: 'post'
  },
  getClerkMsg: {  // 业务员---查询
    url: manager+'/user/'+needLogin+'/getClerkMsg',
    method: 'post'
  },
  getRequestServicesData: {  // 业务员---查询
    url: manager+'/agentDetail/'+needLogin+'/getRequestServicesData',
    method: 'post'
  },
  // -------------------------------------------下面是服务类目---列表
  getServicesCatoryList: {  // 类目---列表
    url: manager+'/agentCatory/'+needLogin+'/getServicesCatoryList',
    method: 'post'
  },
  saveUpdateServicesCatory: {  // 类目---新增/修改
    url: manager+'/agentCatory/'+needLogin+'/saveUpdateServicesCatory',
    method: 'post'
  },
  deleteServicesCategory: {  // 类目---删除
    url: manager+'/agentCatory/'+needLogin+'/deleteServicesCategory',
    method: 'post'
  },
  // -------------------------------------------下面是服务项目---列表
  getServicesList: {  // 服务---列表
    url: manager+'/agentService/'+needLogin+'/getServicesList',
    method: 'post'
  },
  updateClosed: {  // 服务---更新上架的状态
    url: manager+'/agentService/'+needLogin+'/updateClosed',
    method: 'post'
  },
  saveUpdateServices: {  // 服务---新增/修改
    url: manager+'/agentService/'+needLogin+'/saveUpdateServices',
    method: 'post'
  },
  getServices: {  // 服务---详情
    url: manager+'/agentService/'+needLogin+'/getServices',
    method: 'post'
  },
  // -------------------------------------------下面是订单---列表
  getOrdersList: {
    url: manager+'/orders/'+needLogin+'/getOrdersList',
    method: 'post'
  },
  selectOrdersDetailsList: {
    url: manager+'/orders/'+needLogin+'/selectOrdersDetailsList',
    method: 'post'
  },
  // -------------------------------------------下面是课程---条件分页
  getTrainPage: { //课程---条件分页
    url: manager+'/train/'+needLogin+'/getTrainPage',
    method: 'post'
  },  
  getTrainById: { //课程---详情
    url: manager+'/train/'+needLogin+'/getTrainById',
    method: 'post'
  },  
  saveUpdateTrain: { //课程---新增或者修改
    url: manager+'/train/'+needLogin+'/saveUpdateTrain',
    method: 'post'
  },  
  deleteTrainById: { //课程---删除
    url: manager+'/train/'+needLogin+'/deleteTrainById',
    method: 'post'
  },  
  updateTrainPublish: { //课程---更新发布状态
    url: manager+'/train/'+needLogin+'/updateTrainPublish',
    method: 'post'
  },  
  getTrainListById: { //课程---类目下课程的集合
    url: manager+'/train/'+needLogin+'/getTrainListById',
    method: 'post'
  },  
  getTrainCategoryPage: { //课程类目----列表
    url: manager+'/trainCategory/'+needLogin+'/getTrainCategoryPage',
    method: 'post'
  },  
  getTrainCategory: { //课程---详情
    url: manager+'/trainCategory/'+needLogin+'/getTrainCategory',
    method: 'post'
  },  
  saveUpdateTrainCategory: { //课程---课程类目的修改或者新增
    url: manager+'/trainCategory/'+needLogin+'/saveUpdateTrainCategory',
    method: 'post'
  },  
  deleteTrainCategory: { //课程---删除(真删除)
    url: manager+'/trainCategory/'+needLogin+'/deleteTrainCategory',
    method: 'post'
  },  
  getRequestTrainPage: { //课程---列表
    url: manager+'/requestTrain/'+needLogin+'/getRequestTrainPage',
    method: 'post'
  },  
  selectRequestTrainDetail: { //课程---详情
    url: manager+'/requestTrain/'+needLogin+'/selectRequestTrainDetail',
    method: 'post'
  },  
  updateRequestTrain: { //课程---更新
    url: manager+'/requestTrain/'+needLogin+'/updateRequestTrain',
    method: 'post'
  },
  // -------------------------------------------下面是权限---角色  以及导航
  getMenuList: { //导航---获取导航列表/导航详情
    url: manager+'/menu/'+needLogin+'/getMenuList',
    method: 'post'
  },
  batchDelMenu: { //导航---批量删除导航
    url: manager+'/menu/'+needLogin+'/batchDelMenu',
    method: 'post'
  },
  saveUpdateMenu: { //导航---新增/修改
    url: manager+'/menu/'+needLogin+'/saveUpdateMenu',
    method: 'post'
  },
  getMenubyRid: { //当前账号/某角色导航
    url: manager+'/menu/'+needLogin+'/getMenubyRid',
    method: 'post'
  },
  saveUpdateRole: { //角色---新增/修改
    url: manager+'/role/'+needLogin+'/saveUpdateRole',
    method: 'post'
  },
  batchDelRole: { //角色---批量删除
    url: manager+'/role/'+needLogin+'/batchDelRole',
    method: 'post'
  },
  getrolelist: { //角色---角色列表/单个角色
    url: manager+'/role/'+needLogin+'/getRolelist',
    method: 'post'
  },
  getMenu: { //角色---左侧导航
    url: manager+'/role/'+needLogin+'/getMenu',
    method: 'post'
  },
  getUserManList: { //员工管理---查询/详情/我的账户
    url: manager+'/user/'+needLogin+'/getUserManList',
    method: 'post'
  },
  saveUpdateUserMan: { //员工管理---新增/修改
    url: manager+'/user/'+needLogin+'/saveUpdateUserMan',
    method: 'post'
  },
  getRolelist: { //员工分组---详情
    url: manager+'/role/'+needLogin+'/getRolelist',
    method: 'post'
  },
  saveUpdateRole: { //员工分组---新增/修改
    url: manager+'/role/'+needLogin+'/saveUpdateRole',
    method: 'post'
  },
  // -------------------------------------------下面是---文章  
  getForumForumList: { //栏目---列表
    url: manager+'/forumForum/'+needLogin+'/getForumForumList',
    method: 'post'
  }, 
  saveForumForum: { //栏目---新增
    url: manager+'/forumForum/'+needLogin+'/saveForumForum',
    method: 'post'
  }, 
  updateForumForum: { //栏目---修改
    url: manager+'/forumForum/'+needLogin+'/updateForumForum',
    method: 'post'
  },
  getForumThreadList: { //文章---列表(分页)
    url: manager+'/forumThread/'+needLogin+'/getForumThreadList',
    method: 'post'
  },
  getForumThreadDetailArticle: { //文章---详情
    url: manager+'/forumThread/'+needLogin+'/getForumThreadDetailArticle',
    method: 'post'
  },
  saveUpdateForumThread: { //文章---修改或者保存
    url: manager+'/forumThread/'+needLogin+'/saveUpdateForumThread',
    method: 'post'
  },
  getForumPostArticle: { //评论---列表(分页)
    url: manager+'/forumPost/'+needLogin+'/getForumPostArticle',
    method: 'post'
  },
  updateForumPostArticle: { //评论---修改(隐藏或者开放)
    url: manager+'/forumPost/'+needLogin+'/updateForumPostArticle',
    method: 'post'
  },
  deleteForumPostArticle: { //评论---删除
    url: manager+'/forumPost/'+needLogin+'/deleteForumPostArticle',
    method: 'post'
  },
}  
const ApiSetting = {...serviceModule }

export default ApiSetting
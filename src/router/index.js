import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/componentHome/home' // 后台路由页
// import Login from '@/components/login/login' // 登录页
// import Component404 from '@/components/Component404' // 404 页面
// import ZqHomePage from '@/components/componentHome/zqHomePage' // zq首页
// import ComponentSurvey from '@/components/componentHome/componentSurvey' // 概况
// import Advertisement from '@/components/componentHome/list/componentAdvertisement' // 广告位
// import ComponentDistribution from '@/components/componentDistribution/componentDistribution' // 配送管理
// import ComponentServer from '@/components/componentServer/componentServer' // 服务管理
// import ComponentOrder from '@/components/componentOrder/componentOrder' // 订单管理
// import ComponentCompany from '@/components/componentuser/componentCompany' // 企业管理
// import ComponentUser from '@/components/componentuser/componentUser' // 用户管理
// import ComponentNavigationList from '@/components/componentNavigationList/componentNavigationList' // 导航列表管理
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 默认
      redirect: '/login' // 重定向到登录页
    },
    {
      path: '/login', //登录页面
      name: 'Login',
      component: resolve => require(['@/components/login/login'],resolve)
    },
    {
      path: '/home', // 首页路由页面
      component: resolve => require(['@/components/componentHome/home'],resolve),
      children: [
        {
          path: '',
          redirect: '/home/zqhome/advertisement/:page/:size' // 首页
        },
        {
          path: '/home/zqhome',
          component: resolve => require(['@/components/componentHome/zqHomePage'],resolve),
          children: [
            {
              path: '/home/zqhome/advertisement/:page/:size/:type/:advertisingTempId/:id', // zq首页
              component: resolve => require(['@/components/componentHome/list/componentAdvertisement'],resolve),
            },
            {
              path: '/home/zqhome/work/:page/:size/:type/:advertisingTempId/:id', // 办事易首页
              component: resolve => require(['@/components/componentHome/list/componentAdvertisement'],resolve),
            },
            {
              path: '/home/zqhome/management/:page/:size/:type/:advertisingTempId/:id', // 课程首页
              component: resolve => require(['@/components/componentHome/list/componentAdvertisement'],resolve),
            }
          ]
        },
        {
          path: '/home/survey', // 概况
          component: resolve => require(['@/components/componentHome/componentSurvey'],resolve)
        },
        {
          path: '/home/distribution', // 配送设置
          component: resolve => require(['@/components/componentDistribution/componentDistribution'],resolve)
        },
        {
          path: '/home/server/:page/:size/:first/:second/:name', // 服务列表配置
          component: resolve => require(['@/components/componentServer/componentServer'],resolve)
        },
        {
          path: '/home/order/:page/:size/:type', // 申请记录
          component: resolve => require(['@/components/componentOrder/componentOrder'],resolve)
        },
        {
          path: '/home/company/:page/:size/:type', // 企业列表
          component: resolve => require(['@/components/componentuser/componentCompany'],resolve)
        },
        {
          path: '/home/user/:page/:size/:type', // 用户列表
          component: resolve => require(['@/components/componentuser/componentUser'],resolve)
        },
        {
          path: '/home/navigation', // 导航列表
          component: resolve => require(['@/components/componentNavigationList/componentNavigationList'],resolve)
        },
        {
          path: '/home/orderrecord/:page/:size/:type/:name/:sute', // 服务订单记录
          component: resolve => require(['@/components/componentOrder/componentOrderRecord'],resolve)
        },
        {
          path: '/home/curriculum/:page/:size/:type/:name', // 课程订单记录
          component: resolve => require(['@/components/componentOrder/componentcurriculum'],resolve)
        },
        {
          path: '/home/enrolment/:page/:size/:name/:first/:second/:enro/:type', // 报名管理
          component: resolve => require(['@/components/componentEnrolment/componentEnrolment'],resolve)
        },
        {
          path: '/home/management/:page/:size/:first/:second/:name', // 课程管理(新增修改)
          component: resolve => require(['@/components/componentEnrolment/componentCourseManagement'],resolve)
        },
        {
          path: '/home/companyRole/:page/:size/:type', // 角色列表
          component: resolve => require(['@/components/componentCompany/componentCompany'],resolve)
        },
        {
          path: '/home/componentStaff/:page/:size/:type', // 员工列表
          component: resolve => require(['@/components/componentCompany/componentStaff'],resolve)
        },
        {
          path: '/home/componentknowledgebase/:page/:size/:type/:name/:id', // 知识库列表
          component: resolve => require(['@/components/componentKnowledgeBase/componentknowledgebase'],resolve)
        },
        {
          path: '/home/couponTemplate/:page/:size/:type/:name/:state', // 优惠券模板
          component: resolve => require(['@/components/couponTemplate/componentCouponTemplate'],resolve)
        },
        {
          path: '/home/coupon/:page/:size/:type/:name/:state/:activity/:template/:server', // 优惠券
          component: resolve => require(['@/components/couponTemplate/componentCoupon'],resolve)
        },
        {
          path: '/home/activity/:page/:size/:type/:name', // 活动管理
          component: resolve => require(['@/components/couponTemplate/componentActivity'],resolve)
        }
      ]
    },
    {
      path: '*', // 404
      component: resolve => require(['@/components/Component404'],resolve)
    }
  ]
})

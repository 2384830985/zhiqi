<template>
<!-- 侧边总体导航 -->
<div>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="white"
        active-text-color="white"
        :unique-opened="true"
        router
        >
         <el-submenu v-for="(item,index) in data" :index="index+1+''" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="items in item.sonMenu" :index="items.url" :key="items.id">{{items.title}}</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/home/survey">
          <i class="el-icon-share"></i>
          <span slot="title">概况</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/home/zqhome/advertisement/1/10/1/0/0">PC执企网首页</el-menu-item>
          <el-menu-item index="/home/zqhome/work/1/10/2/0/0">PC办事易首页</el-menu-item>
          <el-menu-item index="/home/zqhome/management/1/10/4/0/0">PC课程首页</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-service"></i>
            <span>服务管理</span>
          </template>
          <el-menu-item index="/home/server/1/10/666/666/666">
            <span slot="title">服务项目</span>
          </el-menu-item>
          <el-menu-item index="/home/management/1/10/666/666/666">
            <span slot="title">课程项目</span>
          </el-menu-item>
           <el-menu-item index="/home/distribution">配送管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span>订单管理</span>
          </template>
          
          <el-menu-item index="/home/order/1/10/66"> 
            <span slot="title">委托管理</span>
          </el-menu-item>
          <el-menu-item index="/home/enrolment/1/10/66/66/66/66/66"> 
            <span slot="title">报名管理</span>
          </el-menu-item>
          <el-menu-item index="/home/orderrecord/1/10/66/66/1"> 
            <span slot="title">订单管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-phone"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/home/company/1/10/66">
            <span slot="title">企业管理</span>
          </el-menu-item>
          <el-menu-item index="/home/user/1/10/66">
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/home/navigation">
            <span slot="title">导航管理</span>
          </el-menu-item>
          <el-menu-item index="/home/companyRole/1/10/66">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/home/componentStaff/1/10/66">
            <span slot="title">员工管理</span>
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
export default {
  data () {
    return {
      data: [],
      listArray: ['1','2']
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created: function() {
    var that = this
    // http(ApiSetting.getMenu,{ "pageSize": 100 })
    http(ApiSetting.getMenu,'')
    .then((res) => {
      console.log(res)
      if (res.data.status==1) {
        that.data = res.data.data
      }
    }, (error) => {  
      console.log(error)
    })
  }
}
</script>

<style lang="less" scoped>
.el-menu-item:focus, .el-menu-item:hover {
    background-color: #1890FF!important;
}
.is-active{
  background-color: #1890FF!important;
}
.m-b-20{
  margin-bottom: 20px!important;
}
.is-active{
	background: #1890FF;
	color: white;
}
</style>

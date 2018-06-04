<template>
<!-- 总的路由页面 -->
<div>
	<div class="t-home-herder">
		<el-header style="text-align: right; font-size: 12px;padding: 17px;box-shadow: 0px 1px 4px 0px rgba(0,21,41,0.12) 
">
		<div class="t-home-navigation1"></div>
	      <el-dropdown @command="handleCommand">
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item command="1">退出</el-dropdown-item>
	          <!-- <el-dropdown-item>新增</el-dropdown-item>
	          <el-dropdown-item>退出</el-dropdown-item> -->
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>王大虎</span>
	    </el-header>
	</div>
	<div class="t-home-navigation" style='padding-top:60px;overflow:auto;'>
		<ComponentNavigation></ComponentNavigation>
	</div>
	<div class="t-hmoe-content">
		<div class="t-hmoe-server">
			<router-view/>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentNavigation from '../componentList/componentNavigation'
export default {
  data () {
      return {
      }
  },
  components:{
  	ComponentNavigation: ComponentNavigation
  },
  methods: {
  	 handleCommand(command) {
  	 	if (command==1) {
		http(ApiSetting.logout,{})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          this.$router.push({
			        path:'/login', // 退出登录
			      })
		        }
		      },(error)=>{  
		        console.log(error)
		      })
  	 	}
      }
  }
}
</script>

<style lang="less" scoped>

.t-home-navigation::-webkit-scrollbar {/*滚动条整体样式*/
        width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
.t-home-navigation::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #002140;
    }
.t-home-navigation::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #001529;
    }
.t-home-navigation1{
	position: absolute;
	top: 0;
	left: 0;
	width: 256px;
	background: #002140;
	height: 60px;
	border-bottom: 4px solid #38D4D8;
}
.t-home-navigation{
	position: fixed;
	width: 256px;
	height: 100%;
	left: 0;
	top: 0;
	background: #001529;
	z-index: 12;
}
.t-home-herder{
	position: fixed;
	z-index: 125;
	top: 0;
	left: 0;
	width:100%;
	background: white;
}
.t-hmoe-content{
	// position: fixed;
	padding: 60px 0 0 256px;
	// top: 0;
	// left: 0;
	width: 100%;
	height: 100%;
}
.t-hmoe-server{
	width:100%;
	height: 100%;
	min-width: 1000px;
	position: relative;
}
</style>

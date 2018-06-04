<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">优惠券管理</el-breadcrumb-item>
		  <el-breadcrumb-item>优惠券模板</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="t-zqHome-title">优惠券模板</div>
		<div class="t-zqHome-server" :class="index1==0?'t-zqHome-server-Selected':''" 
		@click="switchCategory">
			服务类
		</div>
		<div class="t-zqHome-server" :class="index1==1?'t-zqHome-server-Selected':''">
			课程类
		</div>
		<div class="t-zqHome-server" :class="index1==2?'t-zqHome-server-Selected':''">
			咨询类
		</div>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">模板列表</div>
				<div class="t-right">
					<el-button type="primary" size="small" @click="AddEstablishServer()" class="m-r-20 t-left" icon="el-icon-plus">新建</el-button>
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="1">已开启</el-radio-button>
					  <el-radio-button label="0">已关闭</el-radio-button>
					</el-radio-group>
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入模板名称"
					    @blur="blursearch"
					    v-model="searchname"
					    suffix-icon="el-icon-search"
					    >
					  </el-input>
				  </div>
			</div>
			
			<div class="m-t-10">
				<el-table
				@row-click="rowClick"
				header-row-class-name=""
			    v-loading="loading"
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column
			      prop="title"
			      label="名称"
			      width="300">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="有效期"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="views"
			      label="券量统计">
			    </el-table-column>
			    <el-table-column
			      prop="userName"
			      label="优惠方式">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态">
			      <template slot-scope="scope">
			        {{scope.row.status|status}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="创建时间">
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentCouponTemplateDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentCouponTemplateDetails>
	<ComponentCouponTemplateAdd @start1="start1"></ComponentCouponTemplateAdd>
</div>

</template>
<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentCouponTemplateDetails from './componentCouponTemplateDetails'
import ComponentCouponTemplateAdd from './componentCouponTemplateAdd'
export default {
  data () {
    return {
    	index1: 0,
    	pagesNumber: 0, //分页总数
    	content: {},
    	isShow: false,
		loading: false,
	    firstFloor: [], // 一级数组
	    tableData: [], // 服务数组
	    radio:66,
	    searchname: '',
	    serverFirstFloor: [], // 服务一级
	    serverSendFloor: [], // 服务二级
	    curriculumFirstFloor: [], // 课程一级
	    curriculumSendFloor: [], // 课程二级
    }
  },
    methods: {
    	blursearch(){
    		var that = this
    		if (this.searchname!='') {
				let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		      	let url = this.Jump.Jump(last,this.$route.params,{page:1,name:this.searchname}); // 获取url
				if (this.$route.params.name!=this.searchname) {
			      this.$router.push({
			        path:url, // 获取当前连接，重新跳转
			      })
			    }
	      	}
    	},
    	radiochange(res) {
    		let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
	      	let url = this.Jump.Jump(last,this.$route.params,{page:1,type:res,name:66}); // 获取url
			if (this.$route.params.type!=res) {
		      this.$router.push({
		        path:url, // 获取当前连接，重新跳转
		      })
		    }
    	},
    	AddEstablishServer() { // 新建
    		let arr = {
    			serverFirstFloor:this.serverFirstFloor,
    			serverSendFloor:this.serverSendFloor,
    			curriculumFirstFloor:this.curriculumFirstFloor,
    			curriculumSendFloor:this.curriculumSendFloor,
    		}
    		console.log(arr)
    		this.$store.commit('serverListContent',arr)
			this.$store.commit('hideserverisPictureShow')
    	},
    	switchCategory(rts,index) { // 切换一级
    		var that = this;
    		let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
	      	let url = this.Jump.Jump(last,this.$route.params,{id:rts.id,page:1,type:66,name:66}); // 获取url
			if (this.$route.params.id!=rts.id) {
		      this.$router.push({
		        path:url, // 获取当前连接，重新跳转
		      })
		    }
    	},
    	ObtainServer(){ // 获取服务
    		var that = this;
    		if (that.$route.params.name!=66) {
    			var arr = {
    				pageNo:that.$route.params.page,
					pageSize:that.$route.params.size,
					forumId:that.firstFloorid,
					showType: 1,
					title:that.$route.params.name
    			}
    		}else{
    			var arr = {
    				showType: 1,
    				pageNo:that.$route.params.page,
					pageSize:that.$route.params.size,
					forumId:that.firstFloorid
    			}
    		}
    		if (that.$route.params.type!=66) {
    			arr.status = that.$route.params.type
    		}
			http(ApiSetting.getForumThreadList,{forumThread: arr})
		      .then((res)=>{
		        if (res.data.status==1) {
		        	that.tableData = res.data.data.resultList
		        	that.pagesNumber = res.data.data.sum
		        }
		      },(error)=>{  
		        console.log(error)
		      })
    	},
		rowClick(row) { // 详情
			var that = this;
			http(ApiSetting.getForumThreadDetailArticle,{forumThread:{id:row.id}})   
		      .then((res)=>{
		        if (res.data.status==1) {
		        	that.content = res.data.data[0]
		          	that.content.firstFloor = this.firstFloor
		          	that.content.in = 1
		          	http(ApiSetting.getForumPostArticle,{forumPost:{
						threadId:row.id,
						pageSize:10,
						pageNo:1
					}})   
				      .then((res1)=>{
				        if (res1.data.status==1) {
				        	that.content.resultList = res1.data.data.resultList
				        	that.content.sum = res1.data.data.sum
				        	that.isShow = true
				        }
				      },(error)=>{
				        console.log(error)
				      })
		        }
		      },(error)=>{
		        console.log(error)
		      })
		},
		changeIsShow() {
			this.isShow = false
		},
		handleClick(res){//编辑
			this.$store.commit('editContent',res)
			this.$store.commit('hideisisPictureShow')
		},
		start1() { // 添加回调刷新页面数据
			this.start()
		},
		start() {//开始执行代码
		var that = this;
		// pid:2 固定: 值为2 表示知识库
	  	http(ApiSetting.getForumForumList,{forumForum: {pid:2,pageSize:1000}})  
	      .then((res)=>{
	        if (res.data.status==1) {
	        	that.firstFloor = []
	        	that.firstFloor = res.data.data.resultList;
	        	if (that.$route.params.id!=66) {
	        		for (var i = 0; i < that.firstFloor.length; i++) {
	        			if (that.firstFloor[i].id==that.$route.params.id) {
							that.firstFloorid = that.firstFloor[i].id
	        				that.firstFloorname = that.firstFloor[i].title
	        				that.firstFloorstatus1 = that.firstFloor[i].status
	        				that.index1 = i
	        			}
	        		}
	        	}else{
	        		that.firstFloorid = that.firstFloor[0].id
	        		that.firstFloorname = that.firstFloor[0].title
	        		that.firstFloorstatus1 = that.firstFloor[0].status
	        	}
	        	that.ObtainServer()
	        }
	      },(error)=>{  
	        console.log(error)
	      })
		}
    },
    mounted() {
    	let that = this
    	// 服务类目
    	http(ApiSetting.getServicesCatoryList,{servicesCategory: {pageNo:1,pageSize:1000}})  
	      .then((res)=>{
	        if (res.data.status==1) {
	        	that.serverFirstFloor = []// 服务一级类目
	        	that.serverSendFloor = []// 服务二级类目
	        	let list = res.data.data.resultList;
	        	for (let i = 0; i < list.length; i++) {
	        		if (list[i].pid==0) {
	        			that.serverFirstFloor.push(list[i])
	        		}else{
	        			that.serverSendFloor.push(list[i])
	        		}
	        	}
	        }
	      })
	    // 课程类目
    	http(ApiSetting.getTrainCategoryPage,{trainCategory: {pageNo:1,pageSize:1000}}) 
	      .then((res)=>{
	        if (res.data.status==1) {
	        	that.curriculumFirstFloor = []// 课程一级类目
	        	that.curriculumSendFloor = []// 课程二级类目
	        	let list = res.data.data.resultList;
	        	for (let i = 0; i < list.length; i++) {
	        		if (list[i].pid==0) {
	        			that.curriculumFirstFloor.push(list[i])
	        		}else{
	        			that.curriculumSendFloor.push(list[i])
	        		}
	        	}
	        }
	      })
	  	this.start()
	},
    components: { // 注入子组件
    	ComponentPaging: ComponentPaging,
    	ComponentCouponTemplateDetails: ComponentCouponTemplateDetails,
    	ComponentCouponTemplateAdd: ComponentCouponTemplateAdd
    },
    watch: {
	  	'$route' (to, from) {
	  		this.start();
	      // 对路由变化作出响应...
	    }
	  }
}
</script>

<style lang="less" scoped>
.m-r-20{
	margin-right: 20px;
}
.t-el-icon-setting{
	display: none;
	position: absolute;
	top: 4px;
    right: -4px;
    font-size: 14px;
}
.t-zqHome-server{
	position: relative;
	cursor: pointer;
	font-size:14px;
	line-height:22px;
	color: #000;
	float: left;
	padding: 0 16px 10px;
	border: 2px solid rgba(255,255,255,0);
	margin-right: 32px;
}
.t-zqHome-server:hover .t-el-icon-setting{
	display: block;
}
.t-zqHome-server1{
	cursor: pointer;
	font-size:14px;
	line-height:22px;
	color: #1890FF;
	float: left;
	padding: 0 16px 10px;
	border: 2px solid rgba(255,255,255,0);
	margin-right: 32px;
}
.t-zqHome-server-Selected{
	font-weight: bold;
	color: #1890FF;
	border-bottom: 2px solid #1890FF;
}
.demo-form-inline1{
	float: left;
	// margin: 10px 0 0 32px ;
}
.t-zqHome-navigation{
	position: relative;
	width: 100%;
	height: 156px;
	background: white;
	padding: 16px 0 0 32px;
    border-bottom: 1px solid #E9E9E9;
}
.el-breadcrumb__item{
	margin: 4px 0;
}
.el-breadcrumb__inner{
    color: #000000!important;
}
.t-zqHome-title{
	margin: 16px 0 37px;
	height:28px; 
	font-size:20px;
	color:rgba(0,0,0,0.85);
	line-height:28px;
	font-weight: bold;
}
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.t-zqHome-list-content{
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	overflow: hidden;
	width: 100%;
	background: white;
	padding: 24px 32px 32px;
}
.t-server-content{
	width: 100%;
	padding: 24px;
}
.t-order-list-title{
	line-height:24px;
	font-size:16px;
	color:rgba(0,0,0,0.85);
	font-weight: bold;
}
.t-order-search{
	width:272px;
}
.el-row{
	margin:0!important;
}
.el-col-8{
	padding:0!important;
}
.border-r-E8E8E8{
	border-right: 1px solid #E8E8E8 
}
.t-order-entrust{
	color:rgba(0,0,0,0.85);
	line-height:32px;
	font-size:24px;
	text-align: center;
}
.t-order-type{
	line-height:22px;
	font-size:14px;
	color:rgba(0,0,0,0.45);
	text-align: center;
	margin-bottom: 4px;
}
.t-order-content{
	overflow: hidden;
	width: 100%;
	height: 106px;
	background: white;
	margin: 0 0 24px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
	padding: 24px 0;
}
.demo-form-inline1{
	float: left;
	margin: 10px 0 0 32px ;
}
.el-breadcrumb__item{
	margin: 4px 0;
}
.el-breadcrumb__inner{
    color: #000000!important;
}
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.t-zqHome-list-content{
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	overflow: hidden;
	width: 100%;
	background: white;
	padding: 24px 32px 32px;
}
.t-server-content{
	width: 100%;
	padding: 24px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    min-height: 36px;
  }
  .el-radio-button__inner {
    color: #409EFF!important;
    background-color: white!important;
    border-color: #409EFF!important;
    -webkit-box-shadow: -1px 0 0 0 #409EFF;
    box-shadow: -1px 0 0 0 #409EFF;
	}
</style>

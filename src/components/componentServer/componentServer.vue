<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">服务管理</el-breadcrumb-item>
		  <el-breadcrumb-item>服务</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="t-zqHome-title">服务项目</div>
		<div class="t-zqHome-server" v-for="(list,index) in firstFloor"  @click="switchCategory(list,index)"  :class="index1==index?'t-zqHome-server-Selected':''">
			{{list.title}}
			<i class="el-icon-setting t-el-icon-setting" @click.stop="addcategory(list.title,list.status,list.id)"></i>
		</div>
		<div class="t-zqHome-server1" @click="addcategory()">
			+ 增加类目
		</div>
		<!-- <div class="t-zqHome-navigation-tab" :class="{ 'b-buttom-1890FF': isActive==1 }" @click="isActive=1">导航</div>
		<div class="t-zqHome-navigation-tab" :class="{ 'b-buttom-1890FF': isActive==2 }" @click="isActive=2">广告</div> -->
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<el-form :inline="true" class="demo-form-inline demo-form-inline1">
			  <el-form-item label="子类：">
			    <el-select  size="small" @change="ObtainServer1" v-model="SecondFloorid" placeholder="公司注册（隐藏）">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.title"
			      :value="item.id">
			    </el-option>
			  </el-select>
			  </el-form-item>
			  <el-form-item style="margin-right: 40px">
			  	<el-dropdown trigger="click"  @command="Setup">
			  		<el-button size="small" icon="el-icon-setting"></el-button>
			    <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="onSubmit">新建</el-button> -->
			    	<el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="1">修改</el-dropdown-item>
				    <el-dropdown-item command="2">新增</el-dropdown-item>
				  </el-dropdown-menu>
			   	</el-dropdown>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
			  <el-form-item label="名称"  prop="region" >
			   	<el-input size="small" type="region" v-model="formInline.region" placeholder="请输入" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button size="small" type="primary"  @click="onSubmit('formInline')">查询</el-button>
			    <el-button size="small" @click="onSubmit('formInline',1)">重置</el-button>
			  </el-form-item>
			</el-form>
			<div>
				<el-button type="primary" size="small" @click="AddEstablishServer()" class="m-r-10" icon="el-icon-plus">新建</el-button>
				<!-- <el-dropdown trigger="click">
				  <el-button size="small" >
				    更多操作<i class="el-icon-arrow-down el-icon--right"></i>
				  </el-button>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item>黄金糕</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown> -->
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
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="orderNum"
			      label="委托数量"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="ord"
			      label="置顶系数">
			    </el-table-column>
			    <el-table-column
			      prop="closed"
			      label="状态">
			      <template slot-scope="scope">
			        {{scope.row.closed|closed}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="created"
			      label="更新时间">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button type="text" size="small" v-if="scope.row.closed==0" @click.stop="serverListContenttype(scope.row,1)">关闭</el-button>
			        <el-button type="text" size="small" v-if="scope.row.closed==1" @click.stop="serverListContenttype(scope.row,0)">开放</el-button>
			        <el-button type="text" size="small" @click.stop="serverListContent(scope.row)">修改</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentServerDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentServerDetails>
	<ComponentServerCategory @start2="start2"></ComponentServerCategory>
	<ComponentServerAdd @start1="start1"></ComponentServerAdd>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentServerDetails from './componentServerDetails'
import ComponentServerCategory from './componentServerCategory'
import ComponentServerAdd from './componentServerAdd'
export default {
  data () {
    return {
    	index1: 0,
    	pagesNumber: 0, //分页总数
    	content: [],
    	isShow: false,
    	input2: '',
        input21: '',
        formInline1: {
          user: ''
        },
        options: [],
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
	    firstFloor: [], // 一级数组
	    SecondFloor: [], // 二级数组
	    firstFloorid: '', // 一级ID
	    firstFloorname: '', // 一级的名称
	    SecondFloorid: '', // 二级ID
	    SecondFloorname: '', // 二级的名称
	    tableData: [], // 服务数组
	    startnumber: 1,
	    firstFloorstatus: 1, // 初始二级状态
	    firstFloorstatus1: 1 // 初始一级状态
    }
  },
    methods: {
    	AddEstablishServer() { // 新建
    		var arr = {
    			firstFloor:this.firstFloor,
    			SecondFloor:this.SecondFloor,
    			type: 1,
    			servicesSpecificationList: [
    				// {
    				// 	title: '',
    				// 	servicesSpecificationDetailList:[{title:''}]
    				// }
    			],
    			dynamicTags: [],
    			thing: [],
    			description: ''
    		}
    		this.$store.commit('serverListContent',arr)
			this.$store.commit('hideserverisPictureShow')
    	},
    	addcategory(title,suatus,id) { 
    		var that = this
    		if (title) { // 修改
    			var arr = {
					type:1,
					firstFloor: that.firstFloor,
		        	SecondFloor: that.SecondFloor,
		        	id: id,
					title: title,
					status: suatus,
					firstFloor: that.firstFloor,
		        	SecondFloor: that.SecondFloor,
				}
    		}else{
    			var arr = {
					type:1,
					firstFloor: that.firstFloor,
		        	SecondFloor: that.SecondFloor
				}
    		}
    		this.handleClick(arr)
    	},
    	switchCategory(rts,index) { // 切换一级
    		var that = this;
    		that.options = [];
    		that.firstFloorid = rts.id
    		that.firstFloorname = rts.title
    		that.firstFloorstatus1 = rts.status
    		that.index1 = index;
    		let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
		      for(let variable  in this.$route.params){   //variable 为属性名
		        if (variable=='first') {
		          url += that.firstFloorid+'/'
		        }else if (variable=='second'){
		          url += 666+'/'
		        }else if (variable=='page'){
		          url += 1+'/'
		        }else{
		          url += this.$route.params[variable]+'/'
		        }
		      }
		      let basic = url.substr(0, url.length - 1);
		      basic = basic
		      this.$router.push({
		        path:basic, // 获取当前连接，重新跳转
		      })
    		// that.ObtainCategory()
    	},
    	ObtainCategory(){ // 获取二级
    		var that = this
    		for (let i = 0; i < that.SecondFloor.length; i++) {
    			if (that.SecondFloor[i].pid == this.firstFloorid) {
    				that.options.push(that.SecondFloor[i])
    			}
    		}
    		if (that.$route.params.second!=666) {
    			for (let i = 0; i < that.options.length; i++) {
        			if (that.options[i].id==that.$route.params.second) {
						that.SecondFloorid = that.options[i].id
    					that.SecondFloorname = that.options[i].title
    					that.firstFloorstatus = that.options[i].status
        			}
        		}
    		}else{
    			if (that.options[0]) {
    			that.SecondFloorid = that.options[0].id
    			that.SecondFloorname = that.options[0].title
    			that.firstFloorstatus = that.options[0].status
    			}else{
    				that.SecondFloorid = ''
    			}
    		}
    		that.ObtainServer()
    	},
    	ObtainServer(){ // 获取服务
    		var that = this;
    		for (let i = 0; i < that.options.length; i++) {
    			if (that.options[i].id == that.SecondFloorid) {
    				that.SecondFloorname = that.options[i].title
    				that.firstFloorstatus = that.options[i].status
    			}
    		}
    		if (that.$route.params.name!=666) {
    			var arr = {
    				pageNo:that.$route.params.page,
					pageSize:that.$route.params.size,
					id:that.SecondFloorid,
					title:that.$route.params.name
    			}
    		}else{
    			var arr = {
    				pageNo:that.$route.params.page,
					pageSize:that.$route.params.size,
					id:that.SecondFloorid
    			}
    		}
			http(ApiSetting.getServicesList,{services: arr})
		      .then((res)=>{
		        if (res.data.status==1) {
		        	that.tableData = res.data.data.resultList
		        	that.pagesNumber = res.data.data.sum
		        }
		      },(error)=>{  
		        console.log(error)
		      })
    	},
    	serverListContenttype(row,index) { // 修改状态
    		var that = this
    		if (index==1) {
    			var msg = '关闭成功'
    			var msa = '确认关闭？, 是否继续'
    		}else{
    			var msg = '开启成功'
    			var msa = '确认开启？, 是否继续'
    		}
    		this.$confirm(msa, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          http(ApiSetting.updateClosed,{services: {id:row.id,closed:index}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	this.$notify({
	                  title: '成功',
	                  message: msg,
	                  type: 'success'
	                });
	                that.start()
		        }
		      },(error)=>{  
		        console.log(error)
		      })
	        }).catch(() => {      
	        });
    	},
		onSubmit(ret,index) { // 查询
			var that = this
			if (that.formInline.region=='') {
				return
			}
			let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
		      if (index) {
				for(let variable  in this.$route.params){   //variable 为属性名
			        if (variable=='page'){
			          url += 1+'/'
			        }else if(variable=='name'){
			          url += 666+'/'
			        }else{
			          url += this.$route.params[variable]+'/'
			        }
		      	}
		      }else{
		      	for(let variable  in this.$route.params){   //variable 为属性名
			        if (variable=='page'){
			          url += 1+'/'
			        }else if(variable=='name'){
			          url += that.formInline.region+'/'
			        }else{
			          url += this.$route.params[variable]+'/'
			        }
		      	}
		      }
		      let basic = url.substr(0, url.length - 1);
		      basic = basic
		      this.$router.push({
		        path:basic, // 获取当前连接，重新跳转
		      })
			console.log('submit!');
		},
		rowClick(row) { // 详情
			var that = this;
			http(ApiSetting.getServices,{services:{id:row.id}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.content = res.data.data
		          that.content.arr = []
		          for (let i = 0; i < that.content.serviceSku.length; i++) {
		          		let arr=res.data.data.serviceSku[i].propertiesName.split(",");
		          		arr.push(res.data.data.serviceSku[i].price);
		          		var uur = {};
                        for (let l = 0; l < arr.length; l++) {
                        	if (l==arr.length-1) {
                        		uur['ll']=arr[l]
                        	}else{
                        		uur['l'+l]=arr[l]
                        	}
                        }
                        that.content.arr.push(uur);
		        	}
		        	that.content.firstFloorname = that.firstFloorname
		        	that.content.SecondFloorname = that.SecondFloorname
		          that.isShow = true
		        }
		      },(error)=>{
		        console.log(error)
		      })
		},
		changeIsShow() {
			this.isShow = false
		},
		Setup(command) { // 新增修改二级类目
			var that = this
			if (command==2) {
				var arr = {
					type:2,
					firstFloor: that.firstFloor,
		        	SecondFloor: that.SecondFloor,
		        	firstFloorid: that.firstFloorid
				}
				this.handleClick(arr)
			}
			if (command==1) {
				if (that.options!='') {
				var arr = {
					type:2,
					id: that.SecondFloorid,
					title: that.SecondFloorname,
					status: that.firstFloorstatus,
					firstFloor: that.firstFloor,
		        	SecondFloor: that.SecondFloor,
		        	firstFloorid: that.firstFloorid
				}
				this.handleClick(arr)
				}
			}
		},
		handleClick(res){//编辑
			this.$store.commit('editContent',res)
			this.$store.commit('hideisisPictureShow')
		},
		serverListContent(res){//服务编辑
			var that = this
			http(ApiSetting.getServices,{services:{id:res.id}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.content = res.data.data
		          that.content.arr = []
		          that.content.arr1 = []
		          for (let i = 0; i < that.content.serviceSku.length; i++) {
		          		let arr=res.data.data.serviceSku[i].propertiesName.split(",");
		          		arr.push(res.data.data.serviceSku[i].price);
		          		var uur = {};
		          		var uur1 = {};
                        for (let l = 0; l < arr.length; l++) {
                        	if (l==arr.length-1) {
                        		uur['ll']=arr[l]
                        	}else{
                        		uur['l'+l]=arr[l]
                        	}
                        }
                        for (let l = 0; l < arr.length; l++) {
                        	if (l==arr.length-1) {
                        		uur1['ll']=arr[l]
                        	}
                        }
                        that.content.arr.push(uur);
                        that.content.arr1.push(uur1);
		        	}
		        	that.content.firstFloor = that.firstFloor
		        	that.content.SecondFloor = that.SecondFloor
		        	if (that.content.services[0].receiveDatum!="") {
		        		that.content.dynamicTags = that.content.services[0].receiveDatum.split('@@@')
		        	}else{
		        		that.content.dynamicTags = []
		        	}
	    			if (that.content.services[0].needDatum!="") {
	    				that.content.thing = that.content.services[0].needDatum.split('@@@')
	    			}else{
	    				that.content.thing = []
	    			}
	    			that.content.title = that.content.services[0].title
	    			that.content.imgUrl = that.content.services[0].imgUrl
	    			that.content.nowPrice = that.content.services[0].nowPrice
	    			that.content.region = that.content.services[0].region
	    			that.content.originalPrice = that.content.services[0].originalPrice
	    			that.content.categoryId = that.content.services[0].categoryId
	    			that.content.firstLevel = that.content.services[0].firstLevel
	    			that.content.content = that.content.services[0].content
	    			that.content.description = that.content.services[0].description
	    			that.content.deliverType = that.content.services[0].deliverType 
	    			that.content.days = that.content.services[0].days
	    			that.content.ord = that.content.services[0].ord
	    			that.content.id = that.content.services[0].id
	    			that.content.keywords = that.content.services[0].keywords
	    			// if (that.content.servicesSpecificationList=='') {
	    			// 	that.content.servicesSpecificationList.push(
	    			// 		{
		    		// 			title: '',
		    		// 			servicesSpecificationDetailList:[{title:''}]
		    		// 		}
	    			// 		)
	    			// }
		        	this.$store.commit('serverListContent',that.content)
					this.$store.commit('hideserverisPictureShow')
		        }
		      },(error)=>{
		        console.log(error)
		      })
			
		},
		ObtainServer1(){
			this.options = [];
			let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
		      for(let variable  in this.$route.params){   //variable 为属性名
		        if (variable=='second') {
		          url += this.SecondFloorid+'/'
		        }else if (variable=='page'){
		          url += 1+'/'
		        }else{
		          url += this.$route.params[variable]+'/'
		        }
		      }
		      let basic = url.substr(0, url.length - 1);
		      basic = basic
		      this.$router.push({
		        path:basic, // 获取当前连接，重新跳转
		      })
			// this.ObtainServer()
		},
		start1() { // 添加回调刷新页面数据
			this.start()
		},
		start2() { // 类目回调刷新页面数据
			this.start()
		},
		start() {//开始执行代码
		var that = this;
	  	http(ApiSetting.getServicesCatoryList,{servicesCategory: {pageNo:1,pageSize:1000}})  
	      .then((res)=>{
	        if (res.data.status==1) {
	        	that.firstFloor = []
	        	that.options = []
	        	that.SecondFloor = []
	        	let list = res.data.data.resultList;
	        	for (let i = 0; i < list.length; i++) {
	        		if (list[i].pid==0) {
	        			that.firstFloor.push(list[i])
	        		}else{
	        			that.SecondFloor.push(list[i])
	        		}
	        	}
	        	if (that.$route.params.first!=666) {
	        		for (var i = 0; i < that.firstFloor.length; i++) {
	        			if (that.firstFloor[i].id==that.$route.params.first) {
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
	        	that.ObtainCategory()
	        }
	      },(error)=>{  
	        console.log(error)
	      })
		}
    },
    mounted() {
	  	this.start()
	},
    components: { // 注入子组件
    	ComponentPaging: ComponentPaging,
    	ComponentServerDetails: ComponentServerDetails,
    	ComponentServerCategory: ComponentServerCategory,
    	ComponentServerAdd: ComponentServerAdd
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
</style>

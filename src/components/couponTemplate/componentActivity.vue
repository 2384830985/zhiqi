<template>
<div>
	<div class="t-zqHome-navigation" style="height:105px;">
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: content.upper }">优惠券管理</el-breadcrumb-item>
	  <el-breadcrumb-item>活动</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="t-zqHome-title">活动</div>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">活动列表</div>
				<div class="t-right">
				<el-button type="primary" size="small" @click="AddEstablishServer()" class="m-r-20 t-left" icon="el-icon-plus">新建</el-button>
					<el-radio-group @change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="0">已开启</el-radio-button>
					  <el-radio-button label="1">已关闭</el-radio-button>
					</el-radio-group>
					
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入活动名称"
					    @blur="blind"
					    suffix-icon="el-icon-search"
					    v-model="companyname">
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
			      prop="id"
			      label="名称"
			      width="300">
			      <template slot-scope="scope">
			         {{scope.row.company.name}} | {{scope.row.contactPerson}}
			      </template>
			    </el-table-column>
			    <el-table-column
			    prop="contactPhone"
			      label="开始时间"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="number"
			      label="结束时间">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="活动进度">
			      <template slot-scope="scope">
			         {{scope.row.status|trainStatus}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="状态">
			      <template slot-scope="scope">
			         {{scope.row.status|trainStatus}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      width="200"
			      label="创建时间">
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentActivityDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentActivityDetails>
	<ComponentActivityAdd @start1="start1"></ComponentActivityAdd>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentActivityDetails from './componentActivityDetails'
import ComponentActivityAdd from './componentActivityAdd'
export default {
  data () {
    return {
    	radio: 66,
    	pagesNumber: 1, //分页总数
    	content: [],
    	isShow: true,
		companyname: '',
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: [],
		isShow1: false,
		userSalesman: [],
        value: '',
        firstFloor: [],
        options: [],
        SecondFloor: [],
        firstFloorid: '',
        firstFloorname: '',
        first: '',
        options1: [],
        second: '',
        Train: ''
    }
  },
    methods: {
    	AddEstablishServer() { // 新建
    		this.$store.commit('serverListContent',{})
			this.$store.commit('hideserverisPictureShow')
    	},
    	second1() {
    		var that = this
    		this.Train = ''
    		that.tableData = []
			let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
				for(let variable  in this.$route.params){   //variable 为属性名
			        if (variable=='page'){
			          url += 1+'/'
			        }else if(variable=='name'){
			          url += 66+'/'
			        }else if(variable=='second'){
			          url += this.second+'/'
			        }else if(variable=='enro'){
			          url += 66+'/'
			        }else{
			          url += this.$route.params[variable]+'/'
			        }
		      	}
		      let basic = url.substr(0, url.length - 1);
		      basic = basic
		      this.$router.push({
		        path:basic, // 获取当前连接，重新跳转
		      })
    	},
    	ObtainSecondFloor(){
    		this.options = []
    		for (var i = 0; i < this.SecondFloor.length; i++) {
    			if (this.SecondFloor[i].pid == this.first) {
    				this.options.push(this.SecondFloor[i])
    			}
    		}
    	},
    	Obtainsecond(){
    		var that = this;
			http(ApiSetting.getTrainPage,{train:{trainCategoryId:that.second}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.options1 = res.data.data.resultList
		        }
		      },(error)=>{  
		        console.log(error)
		      })
    	},
    	changeIsShow2() {
  		this.isShow1 = false
  		},
  		blind(){
  			var that = this
			let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
		    if (that.companyname=='') {
				for(let variable  in this.$route.params){   //variable 为属性名
			        if (variable=='page'){
			          url += 1+'/'
			        }else if(variable=='name'){
			          url += 66+'/'
			        }else{
			          url += this.$route.params[variable]+'/'
			        }
		      	}
		    }else{
				for(let variable  in this.$route.params){   //variable 为属性名
			        if (variable=='page'){
			          url += 1+'/'
			        }else if(variable=='name'){
			          url += that.companyname+'/'
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
  		},
    	start() {
    		var that = this //that.$route.params.type
    		if (that.$route.params.first!=66) {
    		this.first = that.$route.params.first
    		that.ObtainSecondFloor()
    		}
    		if (that.$route.params.second!=66) {
    		this.second = that.$route.params.second
    		that.Obtainsecond()
    		}
    		if (that.$route.params.type!=66) {
    			var value = {
    				pageNo: that.$route.params.page,
    				pageSize: that.$route.params.size,
    				status: that.$route.params.type
    			}
    		}else{
    			var value = {
    				pageNo: that.$route.params.page,
    				pageSize: that.$route.params.size
    			}
    		}
    		if (that.$route.params.name!=66) {
    			value.userName = that.$route.params.name
    		}
    		if (that.$route.params.enro!=66) {
    			this.Train = that.$route.params.enro
    			value.trainId = that.$route.params.enro
    			http(ApiSetting.getRequestTrainPage,{rtEntity:value})  
			      .then((res)=>{
			        if (res.data.status==1) {
			          that.tableData = res.data.data.resultList
			          that.pagesNumber = res.data.data.sum
			        }
			      },(error)=>{  
			        console.log(error)
			      })
    		}
		
    	},
		onSubmit() {
		console.log('submit!');
		},
		rowClick(row) {
			var that = this;
			http(ApiSetting.selectRequestTrainDetail,{id:row.id})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.content = res.data.data.RequestTrainDetail
		          that.isShow = true
		        }
		      },(error)=>{  
		        console.log(error)
		      })
		},
		changeIsShow() {
			this.start();
			this.isShow = false
		},
		radiochange(res) {
			console.log(res)
			if (this.$route.params.type!=res) {
			let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
		    let url = last.split(':')[0].split('"')[1]
		      for(let variable  in this.$route.params){   //variable 为属性名
		        if (variable=='type') {
		          url += res+'/'
		        }else if (variable=='page') {
				  url += 1+'/'
		        }else if (variable=='name') {
				  url += 66+'/'
		        }else{
		          url += this.$route.params[variable]+'/'
		        }
		      }
		      let basic = url.substr(0, url.length - 1);
		      basic = basic
		      this.$router.push({
		        path:basic, // 获取当前连接，重新跳转
		      })
		    }
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
        			}
        		}
    		}else{
    			if (that.options[0]) {
    			that.SecondFloorid = that.options[0].id
    			that.SecondFloorname = that.options[0].title
    			}else{
    				that.SecondFloorid = ''
    			}
    		}
    		that.start()
    	},
    	start1() { // 添加回调刷新页面数据
			this.start()
		},
    },

    created:function(){
    	var that = this;
    	if (that.$route.params.first!=66) {
    		this.first = that.$route.params.first
    		that.ObtainSecondFloor()
    	}
	  	http(ApiSetting.getTrainCategoryPage,{trainCategory: {pageNo:1,pageSize:1000}})  
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
	        			}
	        		}
	        	}else{
	        		that.firstFloorid = that.firstFloor[0].id
	        		that.firstFloorname = that.firstFloor[0].title
	        	}
	        	that.ObtainCategory()
	        }
	      },(error)=>{  
	        console.log(error)
	      })
    },
    components: {
    	ComponentPaging: ComponentPaging,
    	ComponentActivityDetails: ComponentActivityDetails,
    	ComponentActivityAdd: ComponentActivityAdd
    },
    watch: {
  	'$route' (to, from) { // 监听路由变化
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
.t-zqHome-navigation{
	position: relative;
	width: 100%;
	height: 55px;
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
	margin: 16px 0 4px;
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

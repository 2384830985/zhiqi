<template>
<div>
	<!-- <ComponentBreadcrumb style="height:102px;;" :content="content2"></ComponentBreadcrumb> -->
	<div class="t-zqHome-navigation" style="height:139px;">
	<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
		  <el-breadcrumb-item>课程类订单管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="t-zqHome-title" style="margin-bottom:20px;">课程类订单管理</div>
		<div class="t-zqHome-server" @click="switchCategory()"  :class="index1==0?'t-zqHome-server-Selected':''">
			委托类订单管理
		</div>
		<div class="t-zqHome-server" @click="switchCategory()"  :class="index1==1?'t-zqHome-server-Selected':''">
			课程类订单管理
		</div>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">订单列表</div>
				<div class="t-right">
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="0">待支付</el-radio-button>
					  <el-radio-button label="1">已支付</el-radio-button>
					  <el-radio-button label="2">已取消</el-radio-button>
					</el-radio-group>
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入客户名称"
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
			      label="订单号"
			      width="220">
			    </el-table-column>
			    <el-table-column
			    prop="title"
			      label="课程"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="company.user.userName"
			      label="客户">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="支付金额">
			      <template slot-scope="scope">
			         {{scope.row.factPrice}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      width="100"
			      label="状态">
			      <template slot-scope="scope">
			         {{scope.row.payStatus|payStatus}}
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentOrderRecordDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentOrderRecordDetails>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentBreadcrumb from '../componentList/componentBreadcrumb'
import ComponentPaging from '../componentList/componentPaging'
import ComponentOrderRecordDetails from './componentOrderRecordDetails'
export default {
  data () {
    return {
    	index1: 1,
    	content2:{ // 导航配置
          upper: '/',
          upperTitle: '订单管理',
          title: '委托类订单管理'
      	},
    	radio: 66,
    	pagesNumber: 1, //分页总数
    	content: [],
    	isShow: false,
		companyname: '',
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: [],
		isShow1: false,
		userSalesman: []
    }
  },
    methods: {
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
    		if (that.$route.params.type!=66) {
    			var value = {
    				pageNo: that.$route.params.page,
    				pageSize: that.$route.params.size,
    				payStatus: that.$route.params.type
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
		http(ApiSetting.getOrdersList,{orders:value})  
	      .then((res)=>{
	        if (res.data.status==1) {
	          that.tableData = res.data.data.resultList
	          that.pagesNumber = res.data.data.sum
	        }
	      },(error)=>{  
	        console.log(error)
	      })
    	},
		onSubmit() {
		console.log('submit!');
		},
		rowClick(row) {
			var that = this;
			http(ApiSetting.selectOrdersDetailsList,{orders:{id:row.id}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.content = res.data.data
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
		}
    },
    created:function(){
    	var that = this
    	this.start()
    	http(ApiSetting.getClerkMsg,{user:{}})  
        .then((res)=>{
          if (res.data.status==1) {
            that.userSalesman = res.data.data
          }
        },(error)=>{  
          console.log(error)
        })
    },
    components: {
    	ComponentPaging: ComponentPaging,
    	ComponentOrderRecordDetails: ComponentOrderRecordDetails,
    	ComponentBreadcrumb: ComponentBreadcrumb
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
</style>

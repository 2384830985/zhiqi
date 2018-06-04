<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>企业管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">企业列表</div>
				<div class="t-right">
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="0">正常</el-radio-button>
					  <el-radio-button label="1">已封停</el-radio-button>
					</el-radio-group>
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入企业名称"
					    suffix-icon="el-icon-search"
					    @blur="blurcompany"
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
			      prop="name"
			      label="企业"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="userName"
			      label="所属用户"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="contactPerson"
			      label="联系人">
			    </el-table-column>
			    <el-table-column
			      prop="closed"
			      label="状态">
			      <template slot-scope="scope">
			         {{scope.row.closed | closed}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="更新时间">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button type="text" size="small" @click.stop="examine(0,scope.row)" v-if="scope.row.closed==1">解封</el-button>
			        <el-button type="text" size="small" @click.stop="examine(1,scope.row)" v-if="scope.row.closed==0">封停</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentCompanyDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentCompanyDetails>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentCompanyDetails from './componentCompanyDetails'
export default {
  data () {
    return {
    	radio: 66,
    	pagesNumber: 0, //分页总数
    	content: [],
    	isShow: false,
		companyname: '',
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: []
    }
  },
    methods: {
    	blurcompany(){
    		var that = this
    		if (this.companyname!='') {
			http(ApiSetting.getCompanyList,{company:{name:this.companyname}})  
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
	      	http(ApiSetting.getCompanyById,{
	      		company:{
	      			id:row.id
	      		}
	      	})  
	        .then((res)=>{
		        if (res.data.status==1) {
		          this.content = res.data.data
		        }
	        },(error)=>{  
	        	console.log(error)
	        })
			this.isShow = true
        },
        changeIsShow() {
      		this.isShow = false
        },
        examine(index,row) {
	      	var that = this
        },
        start() {
			var that = this //that.$route.params.type
			if (that.$route.params.type!=66) {
				var value = {
					pageNo: that.$route.params.page,
					pageSize: that.$route.params.size,
					closed: that.$route.params.type
				}
			}else{
				var value = {
					pageNo: that.$route.params.page,
					pageSize: that.$route.params.size
				}
			}
			http(ApiSetting.getCompanyList,{company:value})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.tableData = res.data.data.resultList
		          that.pagesNumber = res.data.data.sum
		        }
		      },(error)=>{  
		        console.log(error)
		      })
        },
	    radiochange(res) {
	      	let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
	      	let url = this.Jump.Jump(last,this.$route.params,{type:res,page:1}); // 获取url
			if (this.$route.params.type!=res) {
		      this.$router.push({
		        path:url, // 获取当前连接，重新跳转
		      })
		    }
		}

    },
    components: {
    	ComponentPaging: ComponentPaging,
    	ComponentCompanyDetails: ComponentCompanyDetails
    },
    created:function(){
    	this.start()
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
</style>

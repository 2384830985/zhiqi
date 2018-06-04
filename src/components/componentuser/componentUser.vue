<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">用户列表</div>
				<div class="t-right">
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="0">正常</el-radio-button>
					  <el-radio-button label="1">已封停</el-radio-button>
					</el-radio-group>
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入用户名称"
					    @blur="blurusername"
					    suffix-icon="el-icon-search"
					    v-model="username1">
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
			      prop="userName"
			      label="账号"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="realName"
			      label="昵称"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="companyNum"
			      label="企业">
			    </el-table-column>
			    <el-table-column
			      prop="closed"
			      label="状态">
			      <template slot-scope="scope">
			         {{scope.row.closed | closed}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="updated"
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
	<ComponentUserDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentUserDetails>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentUserDetails from './componentUserDetails'
export default {
  data () {
    return {
    	pagesNumber: 0, //分页总数
    	content: [],
    	isShow: false,
		username1: '',
        radio: 66,
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: []
    }
  },
    methods: {
    	blurusername() {
			var that = this
    		if (this.username1!='') {
			http(ApiSetting.getUserList,{user:{userName:this.username1}})  
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
	      	http(ApiSetting.getUser,{
	      		user:{
	      			id:row.id
	      		}
	      	})  
		    .then((res)=>{
		        if (res.data.status==1) {
		          this.content = res.data.data[0]
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
      		if(index==0){
        		var masg = '恭喜你解封成功了！'
        		var a = '是否要解封?'
        	}else{
				var masg = '恭喜你封停成功了！'
				var a = '是否要封停?'
        	}
			this.$confirm(a, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        http(ApiSetting.saveUpdateUser,{user:{id:row.id,closed:index}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          this.$notify({
	                title: '成功',
	                message: masg,
	                type: 'success'
	              });
	              that.start();
		        }
		      },(error)=>{  
		        console.log(error)
		      })
	        }).catch(() => {      
	        });
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
		http(ApiSetting.getUserList,{user:value})  
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
    	ComponentUserDetails: ComponentUserDetails
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

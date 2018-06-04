<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
		  <el-breadcrumb-item>员工管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">员工列表</div>
				<div class="t-right">
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  	<el-radio-button label="66">全部</el-radio-button>
					  	<el-radio-button label="0">正常</el-radio-button>
					  	<el-radio-button label="1">已封停</el-radio-button>
					</el-radio-group>
					<div class="t-right" style="color:#409EFF;font-size: 14px;cursor:pointer;margin-left:100px" 
					@click="Setup"
				>新增员工</div>
				</div>
			</div>
			<div class="m-t-10">
				<el-table
				header-row-class-name=""
			    v-loading="loading"
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column
			      prop="realName"
			      label="员工"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="certifyType"
			      label="类别"
			      width="180">
			      <template slot-scope="scope">
			         {{scope.row.certifyType | certifyType}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="userName"
			      label="账号">
			    </el-table-column>
			    <el-table-column
			      prop="roleList[0].title"
			      label="角色">
			    </el-table-column>
			    <el-table-column
			      prop="busy"
			      label="是否忙碌">
			      <template slot-scope="scope">
			         {{scope.row.busy | busy}}
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
			       	<el-button type="text" size="small" style="color:red;" v-if="scope.row.closed==1" @click="cancal(scope.row,0)">解封</el-button>
			       	<el-button type="text" size="small" style="color:red;" v-if="scope.row.closed==0" @click="cancal(scope.row,1)">封停</el-button>
			        <el-button type="text" size="small" @click.stop="examine(scope.row)">修改</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentStaffAdd @start1="start"></ComponentStaffAdd>
	<!-- <ComponentCompanyDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentCompanyDetails> -->
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentStaffAdd from './componentStaffAdd'
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
		tableData: [],
		jiaose: []
    }
  },
    methods: {
    	Setup() {
		var that = this
		var row = {
			jiaose: this.jiaose
		}
      	this.$store.commit('serverListContent',row)
		this.$store.commit('hideserverisPictureShow')
    	},
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
    	cancal(row,index) {
    		var that = this
    		if (index==0) {
    		var msg = '解封成功'
    		var msa = '确认解封？, 是否继续'
	    	}else{
	    	var msg = '封停成功'
    		var msa = '确认封停？, 是否继续'
	    	}
    		var text1 = []
    		text1.push(row.id)
    		this.$confirm(msa, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          http(ApiSetting.saveUpdateUserMan,{user: {id:row.id,closed:index}})  
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
      onSubmit() {
        console.log('submit!');
      },
      changeIsShow() {
      	this.isShow = false
      },
      examine(row) {
      	var that = this
      	row.typeof = 1
      	row.oneList = this.oneList
      	row.jiaose = this.jiaose
      	console.log(row)
      	this.$store.commit('serverListContent',row)
		this.$store.commit('hideserverisPictureShow')
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
    		console.log(value)
		http(ApiSetting.getUserManList,{user:value})  
	      .then((res)=>{
	        if (res.data.status==1) {
	          console.log(res)
	          that.tableData = res.data.data.resultList
	          that.pagesNumber = res.data.data.sum
	        }
	      },(error)=>{  
	        console.log(error)
	      })
		http(ApiSetting.getrolelist,{role:{pageNo:1,pageSize:1000}})  //角色
	      .then((res)=>{
	        if (res.data.status==1) {
	          that.jiaose = res.data.data.resultList
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
    	ComponentStaffAdd: ComponentStaffAdd
    },
    created:function(){
    	var that = this
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

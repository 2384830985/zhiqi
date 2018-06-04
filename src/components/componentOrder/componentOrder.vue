<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
		  <el-breadcrumb-item>委托管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="t-server-content">
		<div class="t-order-content">
			<el-row :gutter="20">
			  <el-col :span="8">
			  	<div class="grid-content bg-purple border-r-E8E8E8">
			  		<div class="t-order-type">待审核</div>
			  		<div class="t-order-entrust">{{statistics.examineSum}}个委托</div>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			 	<div class="grid-content bg-purple border-r-E8E8E8">
			  		<div class="t-order-type">本周委托平均审核时间</div>
			  		<div class="t-order-entrust">{{statistics.minuteRequestServiceTime}}分钟</div>
			 	</div>
			  </el-col>
			  <el-col :span="8">
				<div class="grid-content bg-purple">
			  		<div class="t-order-type">本周完成委托数</div>
			  		<div class="t-order-entrust">{{statistics.finishSum}}个委托</div>
			 	</div>
			  </el-col>
			</el-row>
		</div>
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">委托列表</div>
				<div class="t-right">
					<el-radio-group :change="radiochange(radio)" v-model="radio" size="small" class="t-left" style="margin-right:24px;">
					  <el-radio-button label="66">全部</el-radio-button>
					  <el-radio-button label="0">待审核</el-radio-button>
					  <el-radio-button label="1">待支付</el-radio-button>
					  <el-radio-button label="4">待分配</el-radio-button>
					  <el-radio-button label="5">办理中</el-radio-button>
					  <el-radio-button label="6">已完成</el-radio-button>
					</el-radio-group>
					<el-input 
					    size="small"
					    class="t-order-search t-right"
					    placeholder="请输入客户名称"
					    suffix-icon="el-icon-search"
					    v-model="input7">
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
			      prop="serviesTitle"
			      label="服务项目"
			      width="180">
			    </el-table-column>
			    <el-table-column
			    prop="company"
			      label="客户"
			      width="180">
			      <template slot-scope="scope">
			      	<span>{{scope.row.company.name}}&nbsp;&nbsp;{{scope.row.contactPhone}} </span>
			        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
			       
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="duratiion"
			      label="办理周期">
			      <template slot-scope="scope">
			      	<span>{{scope.row.duratiion}}天</span>
			        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
			       
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="状态">
			      <template slot-scope="scope">
			         {{scope.row.status | serverType}}
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
			        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
			        <el-button type="text" size="small" @click.stop="examine(1,scope.row)" v-if="scope.row.status==0">接受</el-button>
			        <el-button type="text" size="small" @click.stop="examine1(2,scope.row)" v-if="scope.row.status==0">拒绝</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="t-right" style="margin: 16px 0 0;">
			  	<ComponentPaging :pagesNumber="pagesNumber"></ComponentPaging>
			  </div>
			</div>
		</div>
	</div>
	<ComponentOrderDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></ComponentOrderDetails>
	<!-- 下面是接受委托 -->
	<ComponentOrderExamine @changeIsShow2="changeIsShow2" @mask1="mask1" :content='content1' :isShow1="isShow1"></ComponentOrderExamine>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentPaging from '../componentList/componentPaging'
import ComponentOrderDetails from './componentOrderDetails'
import ComponentOrderExamine from '../componentList/componentOrderExamine'
export default {
  data () {
    return {
    	radio: 66,
    	pagesNumber: 1, //分页总数
    	content: [],
    	isShow: false,
    	input2: '',
        input21: '',
		input7: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: [],
		statistics: [],
		isShow1: false,
		content1: {},
		userSalesman: []
    }
  },
    methods: {
    	changeIsShow2() {
  		this.isShow1 = false
  		},
    	start() {
    		var that = this //that.$route.params.type
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
		http(ApiSetting.getRequestServicesList,{rsEntity:value})  
	      .then((res)=>{
	        if (res.data.status==1) {
	          // this.$message({
	          //   showClose: true,
	          //   message: '恭喜你，更新成功',
	          //   type: 'success'
	          // });
	          that.tableData = res.data.data.resultList
	          that.pagesNumber = res.data.data.sum
	        }
	      },(error)=>{  
	        console.log(error)
	      })
		http(ApiSetting.getRequestServicesData,{})  
	      .then((res)=>{
	        if (res.data.status==1) {
	          that.statistics = res.data.data
	        }
	      },(error)=>{  
	        console.log(error)
	      })
    	},
		onSubmit() {
		console.log('submit!');
		},
		examine(ret,row) {
			var that = this;
			http(ApiSetting.selectRequestServicesDetail,{id:row.id})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	// that.isShow1 = true
		        	that.content = res.data.data.requestServiceDetail
		        	this.content1 = {
				        id: this.content.id,
				        price: this.content.price,
				        duratiion: this.content.duration,
				        expressFee: this.content.expressFee,
				        status: this.content.status,
				      }
					this.isShow1 = true
		        }
		      },(error)=>{  
		        console.log(error)
		      })
		},
		mask1(){
			this.start()
		},
		examine1(ret,row) {
			if(ret==1){
        		var masg = '恭喜你接受成功了！'
        		var a = '是否要接受?'
        	}else{
				var masg = '恭喜你拒绝成功了！'
				var a = '是否要拒绝?'
        	}
			this.$confirm(a, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          http(ApiSetting.examineRequestService,{rsEntity:{id:row.id,status:ret}})  
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
		rowClick(row) {
			var that = this;
			http(ApiSetting.selectRequestServicesDetail,{id:row.id})  
		      .then((res)=>{
		        if (res.data.status==1) {
		          that.content = res.data.data.requestServiceDetail
		          that.content.userSalesman = []
		          if (that.content.status==4||that.content.status==5) {
		          	that.content.userSalesman = that.userSalesman
		          }
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
    	ComponentOrderDetails: ComponentOrderDetails,
    	ComponentOrderExamine: ComponentOrderExamine
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
</style>

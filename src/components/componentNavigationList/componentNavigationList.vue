<template>
<div>
	<div class="t-zqHome-navigation">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
		  <el-breadcrumb-item>导航管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="t-server-content">
		<div class="t-zqHome-list-content">
			<div>
				<div class="t-left t-order-list-title">导航列表</div>
				<div class="t-right" style="color:#409EFF;font-size: 14px;cursor:pointer;" 
					@click="Setup"
				>新增导航</div>
			</div>
			<div class="m-t-10">
				<el-table
				@row-click="rowClick"
				header-row-class-name=""
			    v-loading="loading"
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column
			      prop="date"
			      label="导航名称"
			      width="180">
			       <template slot-scope="scope">
					<span v-if="!scope.row.indexof1">{{scope.row.title}}</span>
			       	<span v-if="scope.row.indexof1">{{scope.row.indexof1==1 ? '├─' : '└─'}}{{scope.row.title}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态"
			      width="180">
			      <template slot-scope="scope">
					<span>{{scope.row.status|status}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="url"
			      label="URL内容">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="200">
			      <template slot-scope="scope">
			        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
			        <el-button type="text" size="small" style="color:red;" v-if="scope.row.status==0" @click="cancal(scope.row)">删除</el-button>
			        <el-button type="text" size="small" v-if="scope.row.parentId==0" @click="subclass(scope.row)">添加子类</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			 
			</div>
		</div>
	</div>
	<ComponentNavigationAdd @start1="start1"></ComponentNavigationAdd>
</div>

</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentNavigationAdd from './componentNavigationAdd'
export default {
  data () {
    return {
    	content: [],
    	isShow: false,
    	input2: '',
        input21: '',
		input7: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        formInline: {
        user: '',
        region: ''
	    },
		loading: false,
		tableData: [],
		oneList: []
    }
  },
    methods: {
    	start1() {
    		this.start()
    	},
    	cancal(row) {
    		var that = this
    		var msg = '删除成功'
    		var msa = '确认删除？, 是否继续'
    		var text1 = []
    		text1.push(row.id)
    		this.$confirm(msa, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          http(ApiSetting.batchDelMenu,{mids: text1})  
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
      Setup(command) {
      	var list = {
      		typeof: 0,
      		oneList: this.oneList
      	}
      	this.$store.commit('serverListContent',list)
		this.$store.commit('hideserverisPictureShow')
      },
      onSubmit() {
        console.log('submit!');
      },
      rowClick() {
		this.isShow = true
      },
      changeIsShow() {
      	this.isShow = false
      },
      edit(row) {
      	row.typeof = 1
      	row.oneList = this.oneList
      	this.$store.commit('serverListContent',row)
		this.$store.commit('hideserverisPictureShow')
      },
      subclass(row) {
      	var list = {
      		typeof: 2,
      		oneList: this.oneList,
      		parentId: row.id
      	}
      	this.$store.commit('serverListContent',list)
		this.$store.commit('hideserverisPictureShow')
      },
      start() {
      	this.tableData = []
    	http(ApiSetting.getMenuList,{})  
	    .then((res)=>{
	      if (res.data.status==1) {
	      	for (var i = 0; i < res.data.data.length; i++) {
	      		this.tableData.push(res.data.data[i])
	      		for (var l = 0; l < res.data.data[i].sonMenu.length; l++) {
	      			if (l==res.data.data[i].sonMenu.length-1) {
	      				res.data.data[i].sonMenu[l].indexof1 = 2
	      				this.tableData.push(res.data.data[i].sonMenu[l])
	      			}else{
	      				res.data.data[i].sonMenu[l].indexof1 = 1
	      				this.tableData.push(res.data.data[i].sonMenu[l])
	      			}
	      		}
	      	}
	      	this.oneList = res.data.data; //所有导航
	      	this.oneList.push({
	      		id:0,
	      		title: '顶级'
	      	})
	        console.log(this.tableData)
	      }
	    },(error)=>{  
	      console.log(error)
	    })
      }
    },
    created: function() {
    	this.start()
  	},
    components: {
    	ComponentNavigationAdd: ComponentNavigationAdd
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

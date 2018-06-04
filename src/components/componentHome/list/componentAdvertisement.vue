<template>
<!-- 表格 -->
<div>
<div class="t-zqHome-list-content">
	<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
	  <el-form-item label="版块" prop="user">
	   <el-select  v-model="formInline.advertisingTempId" @change="onSubmit()" size="small" type="user" placeholder="焦点图(隐藏)">
	      <el-option label="区域一"
				v-for="(item1,index1) in  section.data" :key="item1.id"
					:label="item1.name" :value="item1.id"
	      ></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item>
	    <!-- <el-button size="small" @click="onSubmit('formInline')">显示版块</el-button> -->
      <el-dropdown trigger="click"  @command="Setup">
            <el-button size="small" icon="el-icon-setting"></el-button>
          <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="onSubmit">新建</el-button> -->
            <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="1">修改</el-dropdown-item> -->
            <el-dropdown-item command="1">修改</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
	  </el-form-item>
	  <el-form-item label="广告位编号："  prop="region" >
	   	<el-input size="small" type="region" v-model="formInline.id" placeholder="请输入" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button size="small" type="primary"  @click="onSubmit('formInline')">查询</el-button>
	    <el-button size="small" @click="resetForm()">重置</el-button>
	  </el-form-item>
	</el-form>
	<div>
		<!-- <el-button type="primary" size="small" class="m-r-10" @click="newlyBuild" icon="el-icon-plus">新建</el-button> -->
		<!-- <el-dropdown trigger="click">
		  <el-button size="small" >
		    更多操作<i class="el-icon-arrow-down el-icon--right"></i>
		  </el-button>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item>黄金糕</el-dropdown-item>
		    <el-dropdown-item>狮子头</el-dropdown-item>
		    <el-dropdown-item>螺蛳粉</el-dropdown-item>
		    <el-dropdown-item>双皮奶</el-dropdown-item>
		    <el-dropdown-item>蚵仔煎</el-dropdown-item>
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
	      prop="id"
	      label="广告位编号"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型"
	      width="180">
	       <template slot-scope="scope">
		     {{scope.row.type | filterType}}
		  </template>
	    </el-table-column>
	    <el-table-column
	      prop="description"
	      label="描述">
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="状态">
	        <template slot-scope="scope">
		     {{scope.row.status | filterstatus}}
		  </template>
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="100">
	      <template slot-scope="scope">
	        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
	        <el-button type="text" size="small" @click.stop="handleClick(scope.row)">编辑</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="t-right" style="margin: 16px 0 0;">
	  	<componentPaging :pagesNumber="pagesNumber"></componentPaging>
	  </div>
	</div>
	<ComponentPictureAdd></ComponentPictureAdd>
  <ComponentModule @start="created1"></ComponentModule>
</div>
<HomePageDetails @changeIsShow="changeIsShow" :content='content' :isShow="isShow"></HomePageDetails>
</div>
</template>

<script type="text/javascript">
import http from "../../../axios/http.js";  
import ApiSetting from '../../../axios/ApiSetting.js'
import ComponentPictureAdd from './../addModify/componentPictureAdd'
import HomePageDetails from './../details/zqHomePageDetails'
import componentPaging from './../../componentList/componentPaging'
import ComponentModule from './../componentModule'
export default {
  data () {
    return {
      section: [],
      formInline: {
        advertisingTempId: '',
        id: ''
	    },
    isShow: false,
	content: [],
	loading: false,
	pagesNumber: 1, //分页总数
	tableData: []
    }
  },
   created () {
    this.created1()
  },
  methods: {
    Setup(command) { // 修改版块
      var that = this
      if (command==1) {
        let name;
        for (var i = 0; i < this.section.data.length; i++) {
          if (this.section.data[i].id==this.formInline.advertisingTempId) {
            name = this.section.data[i].name
          }
        }
        var data = {
          id: this.formInline.advertisingTempId,
          name: name
        }
        this.$store.commit('serverListContent',data)
        this.$store.commit('hideserverisPictureShow')
      }
    },
    onSubmit() {
      let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
      let url = last.split(':')[0].split('"')[1]
      for(let variable  in this.$route.params){   //variable 为属性名
        if (variable=='advertisingTempId') {
          url += this.formInline.advertisingTempId+'/'
        }else if (variable=='id') {
          url += this.formInline.id+'/'
        }else{
          url += this.$route.params[variable]+'/'
        }
      }
      let basic = url.substr(0, url.length - 1);
      basic = basic
      this.$router.push({
        path:basic, // 获取当前连接，重新跳转
      })
    	// this.onSubmit();
    },
    handleClick(res){//编辑
    	this.$store.commit('editContent',res)
    	this.$store.commit('hideisisPictureShow')
    },
    resetForm(formName) { //重置
      let last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
      let url = last.split(':')[0].split('"')[1]
      for(let variable  in this.$route.params){   //variable 为属性名
        if (variable=='advertisingTempId') {
          url += 0+'/'
        }else if (variable=='id') {
          url += 0+'/'
        }else if (variable=='page') {
        	url += 1+'/'
        }else{
          url += this.$route.params[variable]+'/'
        }
      }
      let basic = url.substr(0, url.length - 1);
      this.$router.push({
        path:basic, // 获取当前连接，重新跳转
      })
    },
    changeIsShow(res) {
    	this.isShow = false;
    },
    rowClick(row, event, column){
    	this.content = row
    	this.isShow = true;
    },
    newlyBuild() {
    	this.$store.commit('hideisisPictureShow')
    },
    created1 () {
    var that = this;
    that.section = [];
    http(ApiSetting.getAdvertisingTempList,{"advertisingTemp":{type:that.$route.params.type}})  
    .then((res)=>{
      if (res.data.status==1) {
      	that.section = res.data
         if (!res.data.data[0]) {
         	that.tableData = []
         	return 
         }
         if (this.$route.params.id==0) {
         	that.formInline.id=' ';
         }
	     if (this.$route.params.advertisingTempId==0) {
	     	this.$route.params.advertisingTempId = res.data.data[0].id
	     }
	    that.formInline.advertisingTempId = Number(this.$route.params.advertisingTempId)
        that.formInline.pageNo = this.$route.params.page;
  		that.formInline.pageSize=10;

        http(ApiSetting.getAdvertisingList,{"advertising":that.formInline})  
		    .then((res)=>{
		      if (res.data.status==1) {
		        that.tableData = res.data.data.resultList
		        that.pagesNumber = res.data.data.sum
		      }
		    },(error)=>{  
		      console.log(error)
		    })
      }
    },(error)=>{ 
      console.log(error)
    })
    
  },
  },
  components: {
  	componentPaging: componentPaging,
  	HomePageDetails: HomePageDetails,
  	ComponentPictureAdd: ComponentPictureAdd,
    ComponentModule: ComponentModule
  },
  watch: {
  	'$route' (to, from) {
  		this.created1();
      // 对路由变化作出响应...
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>

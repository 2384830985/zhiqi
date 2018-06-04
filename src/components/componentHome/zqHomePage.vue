<template>
<!-- ZQ首页 -->
<div style="position:relative">
	<ComponentBreadcrumb :content="content"></ComponentBreadcrumb>
	<div style="padding:24px 24px 0;position:relative;" v-if="type1!=4">
		<el-tabs type="border-card" class ="overflow:hidden;" @tab-click="handleClick" v-model="activeName2" >
			<el-tab-pane v-for="(item,index) in  data.firstConditionCategoryList"
				:key="index"
			    :label="'导航'+(index+1)" :name='index+""'>
			  <el-select class='t-left' v-model="item.id" size="small"
              @change="handleone(index,item.id)"
              type="user" placeholder="焦点图(隐藏)">
			      <el-option 
					v-for="(item1,index1) in  data.firstAllCategoryList" :key="item1.id"
					:label="item1.title" :value="item1.id"
			      ></el-option>
			  </el-select>
			  <ComponentUploading @fileUps="fileUp1" v-if="easyService==0" :dialogImageUrl="item.homeImgFirst"></ComponentUploading>
        <ComponentUploading @fileUps="file" v-if="easyService==0" :dialogImageUrl="item.homeImgSecond"></ComponentUploading>
        <ComponentUploading @fileUps='file2' v-if="easyService!=0" :dialogImageUrl="item.easyImg"></ComponentUploading>
			  <div class="clear"></div>
			  <div style="margin-top:20px;">
              <div style="float:left;margin:10px 0 0 20px;"
                    v-for="(city,indexChecked) in item.categoryList"
              >
                  <input type="checkbox" v-if="city.homePage==1&&easyService==0"  checked="checked" @change="handleChecked(index,indexChecked)">
                  <input type="checkbox" v-if="city.homePage!=1&&easyService==0"  @change="handleChecked(index,indexChecked)">
                  <input type="checkbox" v-if="city.easyService==1&&easyService==1"  checked="checked" @change="handleChecked(index,indexChecked)">
                  <input type="checkbox" v-if="city.easyService!=1&&easyService==1"  @change="handleChecked(index,indexChecked)">
                  <label>{{city.title}}</label>
              </div>
                
			 	<!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="city in item.categoryList" :label="city.title" :key="city.id">{{city.title}}</el-checkbox>
				</el-checkbox-group> -->
			  </div>
			</el-tab-pane>
			
		  <!-- 
		  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
		  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
		  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
		</el-tabs>
    <img class="t-update-buttom"  style="height:38px;" @click="primary" src="../../assets/images/shuaxin.png" alt="">
		<!-- <el-button class="t-update-buttom" style="height:38px;" @click="primary" type="primary">更新</el-button> -->
	</div>
	<div class="t-zqHome-list">
		<router-view/>
	</div>
	
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentBreadcrumb from '../componentList/componentBreadcrumb'
import ComponentUploading from '../componentList/componentUploading'
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data () {
    return {
      content:{ // 导航配置
          upper: '/',
          upperTitle: '内容管理',
          title: 'PC端执企网首页'
      },
    	dialogImageUrl: '',
    	cities: cityOptions,
    	activeName2: '0',
    	checkedCities: ['上海', '北京'],
    	user: '',
      data: {},
      tabsindex: 0,
      easyService: 0,
      type1: 1,
    }
  },
  methods: {
    handleone(index,id) {
        for(var i=0;i<this.data.firstConditionCategoryList.length;i++){
            if (id==this.data.firstConditionCategoryList[i].id) {
                this.data.firstConditionCategoryList[index] = this.data.firstConditionCategoryList[i]
            }
        }
    },
    handleChecked(index,indexChecked){
      if (this.easyService==0) {
        var homepage = this.data.firstConditionCategoryList[index].categoryList[indexChecked].homePage;
        if (homepage==1) {
            this.data.firstConditionCategoryList[index].categoryList[indexChecked].homePage = 0
        }else{
            this.data.firstConditionCategoryList[index].categoryList[indexChecked].homePage = 1
        }
      }else{
        var easyService = this.data.firstConditionCategoryList[index].categoryList[indexChecked].easyService;
        if (easyService==1) {
            this.data.firstConditionCategoryList[index].categoryList[indexChecked].easyService = 0
        }else{
            this.data.firstConditionCategoryList[index].categoryList[indexChecked].easyService = 1
        }
      }
    },
  	handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
    },
  	handleClick(tab, event) {
      this.tabsindex = tab.index;
    },
    changeIsShow(res) {
    	this.isShow = false;
    },
    fileUp1(res) { // 获取上传图片1的数据
      this.data.firstConditionCategoryList[this.tabsindex].homeImgFirst = res
    },
    file(res) { // 获取上传图片2的数据
      this.data.firstConditionCategoryList[this.tabsindex].homeImgSecond = res
    },
    file2(res) {
      this.data.firstConditionCategoryList[this.tabsindex].easyImg = res

    },
    primary() { // 更新导航 updateServicesListHomeOrEasy
       this.data.firstConditionCategoryList[this.tabsindex].id
       http(ApiSetting.updateServicesListHomeOrEasy,this.data)  
      .then((res)=>{
        if (res.data.status==1) {
          this.$message({
            showClose: true,
            message: '恭喜你，更新成功',
            type: 'success'
          });
        }
      },(error)=>{  
        console.log(error)
      })
    },
    created1 () {
      var that = this;
      this.type1 = that.$route.params.type;
      var data = {}
      if (this.type1!=4) {
        if (that.$route.params.type==1) {
        data.homePage = 1
        this.content = {
          upper: '/',
          upperTitle: '内容管理',
          title: 'PC端执企网首页'
        }
        this.easyService = 0
        }else{
          data.easyService = 1
          this.content = {
            upper: '/',
            upperTitle: '内容管理',
            title: 'PC端办事易首页'
          }
          this.easyService = 1
        }
      }else{
        this.content = {
            upper: '/',
            upperTitle: '内容管理',
            title: 'PC端课程首页'
          }
      }
      if (!data.easyService&&!data.homePage) {
        return 
      }
      http(ApiSetting.getServicesListHomeOrEasy,{"servicesCategory":data})  
      .then((res)=>{
        if (res.data.status==1) {
          var lenght = res.data.data.firstConditionCategoryList.length;
          var arr = [];
          for (var i = 0;i<lenght;i++) {
            if (that.easyService==0) {
              if (res.data.data.firstConditionCategoryList[i].homePage==1) {
                arr.push(res.data.data.firstConditionCategoryList[i])
              }
            }
            if (that.easyService==1) {
              if (res.data.data.firstConditionCategoryList[i].easyService==1) {
                arr.push(res.data.data.firstConditionCategoryList[i])
              }
            }
          }
          res.data.data.firstConditionCategoryList = arr;
          that.data = res.data.data;
        }
      },(error)=>{  
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.created1();
      // 对路由变化作出响应...
    }
  },
  components: {
    ComponentBreadcrumb: ComponentBreadcrumb,
    ComponentUploading: ComponentUploading
  },
  created () {
    this.created1()
  }
}
</script>

<style lang="less" scoped>
.el-icon-plus1{
    position: absolute;
    top:9px;
    left:9px;
    font-size:10px;
    z-index:1;
}
.t-dialogImageUrl-img{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:11;
}
.t-dialogImageUrl-up{
    position: absolute;
    top:0;
    left:0;
	width:32px;
	height:32px; 
	opacity: 0;
    z-index: 15
}
.t-dialogImageUrl-logo{
	position:relative;
	float: left;
	margin:  0 20px ;
	width:32px;
	height:32px; 
	background: #F9F9F9;
	border: 1px dashed  #DCDFE6;
	border-radius: 4px;
}
.t-dialogImageUrl-logo1{
	position:relative;
	float: left;
	width:32px;
	height:32px; 
	background: #F9F9F9;
	border: 1px dashed  #DCDFE6;
	border-radius: 4px;
}
.t-update-buttom{
  cursor:pointer;
	position: absolute;
	right: 25px;
	top: 25px;
}
.t-zqHome-list{
	width: 100%;
	padding: 24px 24px 40px;
}
.t-zqHome-navigation{
	position: relative;
	width: 100%;
	height: 102px;
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
	font-family:PingFangSC-Medium;
	color:rgba(0,0,0,0.85);
	line-height:28px;
}
.t-zqHome-navigation-tab{
	cursor: pointer;
	float: left;
	margin-right: 32px;
	width: 60px;
	font-size:14px;
	line-height:22px;
	text-align: center;
	padding: 11px 0;
	border-bottom: 2px solid white;
}
.t-zqHome-navigation-tab:hover{
	color: #1890FF;
}
.b-buttom-1890FF{
	color: #1890FF;
	border-bottom: 2px solid #1890FF;
}
</style>

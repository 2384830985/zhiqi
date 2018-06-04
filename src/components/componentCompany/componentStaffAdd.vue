<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">员工配置</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">
               {{data.id?'保 存':'提 交'}}
              </el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form" style="margin-bottom:50px;">
      		<div class="t-pictureAdd-form-title">
      			基础信息
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">员工名称：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.realName" placeholder="请输入员工名称"></el-input>
				  </div>
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">员工账号：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.userName" placeholder="请输入员工账号"></el-input>
				  </div>
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">员工密码：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.password" placeholder="请输入员工密码"></el-input>
				  </div>
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">所属角色：</div>
				  		<el-checkbox-group 
					    v-model="checkedCities1">
					    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
					  </el-checkbox-group>
				  </div>

				<!--   <el-button class="t-update-buttom" style="margin-left: 0;" @click="Preservation" size="small" type="primary">
			            	保存
			            </el-button> -->
			  </el-col>
			  <el-col :span="12">
			    <div class="grid-content bg-purple">
                <div class="t-pictureAdd-form-lable">图片：</div>
                <ComponentUploading style="float:none;margin:0 0 24px 0;" @fileUps="fileUp1" :dialogImageUrl="data.avatar"></ComponentUploading>
                <div class="t-pictureAdd-form-lable">所属员工类别：</div>
                <el-select size="medium" style="margin:0;"  class="t-pictureAdd-form-select" v-model="data.certifyType" placeholder="选择所属员工类别">
                <el-option
                  v-for="item in openType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
			  </el-col>
			</el-row>

      	</div>
      </div>
    
    </transition>
     
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentUploading from '../componentList/componentUploading'
// import ComponentProvince from '../../componentList/componentProvince'
export default {
	
  	data () {
    return {
    	data: {},
    	openType: [{ // 打开方式
          value: 1,
          label: '平台运营账号'
        }, {
          value: 4,
          label: '业务员'
        }],
        checkedCities1: [], //选中角色
        cities: [] //所有角色
    }
  },
  watch: {
  	edit(val) { // 监听变化
  		this.data = val;
  		this.data.password = ''
  		this.cities = [];
  		this.checkedCities1 = [];
  		for (var i = 0; i < this.data.jiaose.length; i++) {
	  			this.cities.push(this.data.jiaose[i].title)
	  		}
  		if (this.data.id) {
	  		for (var i = 0; i < this.data.roleList.length; i++) {
	  			this.checkedCities1.push(this.data.roleList[i].title)
	  		}
  		}
  	}
  },
  created: function() {
    // console.log(this.$store.state)
  },
  methods:  {
  	Preservation: function() {
      var that = this
      let roleList = []
      for (let i = 0; i < this.data.jiaose.length; i++) {
      	for (let l = 0; l < this.checkedCities1.length; l++) {
      		if (this.checkedCities1[l]==this.data.jiaose[i].title) {
      			roleList.push({id:this.data.jiaose[i].id})
      		}
      	}
	  }
	  console.log(roleList)
      var Backstageuser1 = JSON.parse(localStorage.getItem('Backstageuser'))
      console.log(Backstageuser1)
  		var data = {
        user: {
          certifyType: that.data.certifyType,
          password: that.data.password,
          realName: that.data.realName,
          roleList: roleList,
          userName: that.data.userName,
          avatar: that.data.avatar
        }
      }
      if (that.data.id) {
        data.user.id = that.data.id
      }
      let mesg = '';
      if (that.data.id) {
        mesg = '修改成功'
      }else{
        mesg = '新增成功'
      }
  		http(ApiSetting.saveUpdateUserMan,data)  
	    .then((res)=>{
	      if (res.data.status==1) {
	        this.$notify({
            title: '成功',
            message: mesg,
            type: 'success'
          });
          that.$emit('start1')
	        this.$store.commit('showserverisPictureShow')
	      }
	    },(error)=>{  
	      console.log(error)
	    })
  	},
  	cancel: function() {
  		this.$confirm('取消后将不记录次配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showserverisPictureShow')
        }).catch(() => {      
        });
  	},
  	deleteser: function(){
  		this.$confirm('删除后不可恢复，请确认类目下无服务项目！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$store.commit('showserverisPictureShow')
        }).catch(() => {      
        });
  	},
  	fileUp1: function(res){
  		this.data.avatar = res
  	}
  },
  components: {
  	ComponentUploading: ComponentUploading
  },
  computed: {
    isPictureShow () {
      return this.$store.state.home.serverisPictureShow
    },
    edit() {  
        return this.$store.state.home.serverList;  
    }  
  }
}
</script>

<style lang="less" scoped>
.t-specifications-sku-input{
  border:none;
  width:90%;
  height:100%;
  background: #F9F9F9;
}
.t-specifications-sku{
  width:457px;
  min-height:148px; 
  background:rgba(255,255,255,1);
  box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.06) ;
  border-radius: 4px ; 
  padding: 25px 12px;
  border: 1px solid #E4E7ED;
}
.t-specifications-sku-cancal{
  display: none;
  position: absolute;
  right: 5px;
  top:5px;
  padding: 1px;
  width:14px;
  height: 14px;
  border-radius:50%;
  background: #C0C4CC;
  color:white;
}
.t-specifications-sku-add{
  margin-bottom:10px;
  height:24px; 
  background: white;
  line-height:12px;
  font-size:12px;
  text-align: center;
  color: #999999;
  padding: 4px 10px;
  float: left;
  margin-right: 8px;
  border-radius: 3px ;
  position: relative;
  cursor: pointer;
  border: 1px dashed #D8DCE6; 
  width:120px;
}
.t-specifications-sku1:hover .t-specifications-sku-cancal{
  display: block;
}
.t-specifications-sku1{
  margin-bottom:10px;
  height:24px; 
  background: #F9F9F9;
  line-height:12px;
  font-size:12px;
  color: #5A5E66;
  padding: 6px 10px;
  float: left;
  margin-right: 8px;
  border-radius: 3px ;
  position: relative;
  cursor: pointer;
  width:120px;
}
.t-specifications-add{
  width:450px;
  height:36px;
  border-radius:4px;
  text-align: center;
  color: #909399;
  font-size:14px;
  line-height:14px;
  padding-top: 10px;
  cursor: pointer;
  border: 1px dashed #D8DCE6; 
}
.t-pictureAdd-form-line{
	width: 100%;
	height: 1px;
	background: #E3E3E3;
	margin: 10px 0 30px;
}
.t-pictureAdd-form-select{
	width: 450px;
	margin-bottom: 20px;
}
.t-pictureAdd-form-lable{
	font-size:14px;
	color:rgba(0,0,0,1);
	line-height:22px;
	margin-bottom: 8px;
}
.t-pictureAdd-form-title{
	font-size:16px;
	color:rgba(0,0,0,1);
	line-height:22px;
	margin-bottom: 20px;
}
.t-pictureAdd-form{
	width:950px;
	margin: 40px auto 20px;
	height:100%;
	// overflow: auto;
}
.t-update-buttom{
	margin-top: 16px;
	margin-left: 20px;
}
.t-pictureAdd-header-title{
	font-size:18px;
	color:rgba(51,51,51,1);
	font-weight: bold;
	line-height:25px;
	margin-top: 19px;
	float: left;
}
.t-pictureAdd-header-content{
	width: 1190px;
	margin: 0 auto;
	height: 64px;
}
.t-pictureAdd-header{
	width: 100%;
	height: 64px;
	background: #FAFAFA;
	box-shadow: 0px 1px 0px 0px rgba(232,232,232,1) 
}
.t-pictureAdd-content{
	overflow: auto;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	background: white;
	z-index: 130;
}
.pictureadd-enter-to, .pictureadd-leave-to{
    transition: opacity 0.3s
  }
.pictureadd-enter, .pictureadd-leave-to{
	opacity: 0
}
.el-checkbox+.el-checkbox {
	margin-left: 0px;
    margin-right: 30px;
}
</style>

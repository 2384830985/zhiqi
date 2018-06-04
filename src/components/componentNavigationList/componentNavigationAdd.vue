<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">导航配置</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">
               {{data.id?'保 存':'提 交'}}
              </el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form">
      		<div class="t-pictureAdd-form-title">
      			基础信息
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">资源名称：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.title" placeholder="请输入导航名称"></el-input>
			      		<div class="t-pictureAdd-form-lable">URL内容：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.url" placeholder="url链接（后面哈希）"></el-input>
			      		<div class="t-pictureAdd-form-lable">排序：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.ord" placeholder="请输入数字"></el-input>
			      		<div class="t-pictureAdd-form-lable">说明：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.description" placeholder="导航说明"></el-input>
				  </div>
			  </el-col>
			  <el-col :span="12">
				  <div class="grid-content bg-purple" style="padding-left:25px;">
			      		<div class="t-pictureAdd-form-lable">上级节点：</div>
			      		<el-select size="medium" class="t-pictureAdd-form-select" v-model="data.parentId" placeholder="请选择上级节点">
						    <el-option
						      v-for="item in data.oneList"
						      :key="item.id"
						      :label="item.title"
						      :value="item.id">
						    </el-option>
						  </el-select>
			      		<div class="t-pictureAdd-form-lable">状态：</div>
			      		<el-select size="medium" class="t-pictureAdd-form-select" v-model="data.status" placeholder="请选择当前导航状态">
                <el-option
                  v-for="item in openType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
			      		<div class="t-pictureAdd-form-lable">图标：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.icon" placeholder="请输入导航图标"></el-input>
                <a href="http://element.eleme.io/#/zh-CN/component/icon" style="color: rgb(64, 158, 255); font-size: 14px; cursor: pointer;" target="_blank">图标网址</a>
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
// import ComponentProvince from '../../componentList/componentProvince'
export default {
  	data () {
    return {
    	data: {},
    	openType: [{ // 状态
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }]
    }
  },
  watch: {
  	edit(val) { // 监听广告位详情的变化
  		this.data = val
      console.log(this.data)
  	}
  },
  created: function() {
    // console.log(this.$store.state)
  },
  methods:  {
  	Preservation: function() {
      var that = this
  		var data = {
        menu: {
          parentId: that.data.parentId,
          title: that.data.title,
          url: that.data.url,
          description: that.data.description,
          ord: that.data.ord,
          status: that.data.status,
          icon: that.data.icon,
        }
      }
      if (that.data.id) {
        data.menu.id = that.data.id
      }
      let mesg = '';
      if (that.data.typeof==0) {
        mesg = '新增成功'
      }else if (that.data.typeof==1) {
        mesg = '编辑成功'
      }else if (that.data.typeof==2) {
        mesg = '添加成功'
      }
  		http(ApiSetting.saveUpdateMenu,data)  
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
  	}
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
</style>

<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">广告位配置</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">保 存</el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form">
      		<div class="t-pictureAdd-form-title">
      			广告位规格
      		</div>
      		<div class="t-pictureAdd-form-lable">类型：</div>
      		<el-select size="medium" class="t-pictureAdd-form-select" v-model="data.type" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
      		<div class="t-pictureAdd-form-lable">描述：</div>
      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.description" placeholder="请输入内容"></el-input>
      		<div class="t-pictureAdd-form-line"></div>
      		<div class="t-pictureAdd-form-title">
      			广告位规格
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple">
				  		
			      		<div class="t-pictureAdd-form-lable">图片：</div>
			      		<ComponentUploading style="float:none;margin:0 0 24px 0;" @fileUps="fileUp1" :dialogImageUrl="data.imgRul"></ComponentUploading>
			      		<div class="t-pictureAdd-form-lable">链接打开方式：</div>
			      		<el-select size="medium" class="t-pictureAdd-form-select" v-model="data.openType" placeholder="请选择">
						    <el-option
						      v-for="item in openType"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
				  </div>
			  </el-col>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light" style="padding-left:25px;">
				  		<div class="t-pictureAdd-form-lable">文字：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.content" placeholder="请输入内容"></el-input>
			      		<div class="t-pictureAdd-form-lable">链接地址：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.url" placeholder="请输入内容"></el-input>
				  </div>
			  </el-col>
			</el-row>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple">
				  		<!-- <ComponentProvince :province="province" :city="city" :county="county"></ComponentProvince> -->
				  </div>
			  </el-col>
			</el-row>
      	</div>
      </div>
    </transition>
</div>
</template>

<script type="text/javascript">
import http from "../../../axios/http.js";  
import ApiSetting from '../../../axios/ApiSetting.js'
import ComponentUploading from '../../componentList/componentUploading'
// import ComponentProvince from '../../componentList/componentProvince'
export default {
  	data () {
    return {
    	data: {
    		type: '',
    		openType: '',
    	},
      	openType: [{ // 打开方式
          value: 1,
          label: '本标签'
        }, {
          value: 2,
          label: '新标签'
        }],
      	options: [{ //广告类型
          value: 1,
          label: '图片'
        }, {
          value: 2,
          label: '图文'
        }, {
          value: 3,
          label: '文字'
        }],
        value: '',
        input: '',
        // province: 1,
        // city: 1,
        // county: 1
    }
  },
  watch: {
	edit(val) { // 监听广告位详情的变化
		this.data = val
	}
	// isprovince(val) { // 监听省的变化然后重新赋值
	// 	this.province = val
	// },
	// iscity(val) { // 监听市的变化然后重新赋值
	// 	this.city = val
	// },
	// iscounty(val) { // 监听区的变化然后重新赋值
	// 	this.county = val
	// }
  },
  created: function() {
    // console.log(this.$store.state)
  },
  methods:  {
  	Preservation: function() {
  		delete this.data.updateTime
  		var that = this
  		http(ApiSetting.saveOrUpdateAdvertising,{"advertising":that.data})  
	    .then((res)=>{
	      if (res.data.status==1) {
	        alert('修改成功')
	        this.$store.commit('showisisPictureShow')
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
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.$store.commit('showisisPictureShow')
        }).catch(() => {      
        });
  	},
  	fileUp1: function(res){
  		this.data.imgRul = res
  	}
  },
  computed: {
    isPictureShow () {
      return this.$store.state.home.isPictureShow
    },
    isprovince () { // 监听省变化
      return this.$store.state.home.province
    },
    iscity () { // 监听市变化
      return this.$store.state.home.city
    },
    iscounty () { // 监听区变化
      return this.$store.state.home.county
    },
    edit() {  
        return this.$store.state.home.edit;  
    }  
  },
  components: {
  	// ComponentProvince: ComponentProvince
  	ComponentUploading: ComponentUploading
  }
}
</script>

<style lang="less" scoped>
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
	height:580px;
	overflow: auto;
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

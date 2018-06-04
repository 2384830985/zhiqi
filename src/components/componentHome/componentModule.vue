<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">版块配置</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">保 存</el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form">
      		<div class="t-pictureAdd-form-title">
      			版块配置
      		</div>
      		<div class="t-pictureAdd-form-lable">版块名称：</div>
      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.name" placeholder="请输入内容"></el-input>
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
    	data: {
    	}
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
  		delete this.data.updateTime
  		var that = this
  		http(ApiSetting.saveOrUpdateAdvertisingTemp,{"advertisingTemp":{
        id: that.data.id,
        name: that.data.name
      }})  
	    .then((res)=>{
	      if (res.data.status==1) {
	        alert('修改成功')
	        this.$store.commit('showserverisPictureShow')
          that.$emit('start')
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

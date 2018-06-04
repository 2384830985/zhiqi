<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title" v-if="data.id">修改类目</div>
            <div class="t-pictureAdd-header-title" v-if="!data.id">增加类目</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">
                {{data.id?'保 存':'提交'}}
              </el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form">
      		<div class="t-pictureAdd-form-title">
      			类目信息
      		</div>
      		<div class="t-pictureAdd-form-lable">上级类目：</div>
      		<el-select v-if="data.firstFloorid" size="medium" class="t-pictureAdd-form-select" v-model="data.firstFloorid" placeholder="请选择">
			    <el-option
			      v-for="item in data.firstFloor"
			      :key="item.id"
			      :label="item.title"
			      :value="item.id">
			    </el-option>
			  </el-select>
        <div v-if="!data.firstFloorid" style="margin-bottom:10px;">无</div>
      		<div class="t-pictureAdd-form-lable">类目名称：</div>
      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.title" placeholder="请输入内容"></el-input>
      		<div class="t-pictureAdd-form-line"></div>
      		<div class="t-pictureAdd-form-title">
      			类目状态
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light">
				  		<div class="t-pictureAdd-form-lable">是否显示在类目列表中：</div>
			      		<el-select size="medium" class="t-pictureAdd-form-select" v-model="data.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
				  </div>
			  </el-col>
			</el-row>
			<div class="t-pictureAdd-form-line"></div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple" v-if="data.id">
				  	<el-button type="danger" size="medium" @click="deleteser"  plain>删除</el-button>
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
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
// import ComponentProvince from '../../componentList/componentProvince'
export default {
  	data () {
    return {
    	data: {
    		type: '',
    		openType: '',
    	},
      	options: [{ //广告类型
          value: 0,
          label: '关闭'
        }, {
          value: 1,
          label: '启用'
        }],
        value: '',
        // province: 1,
        // city: 1,
        // county: 1
    }
  },
  watch: {
	edit(val) { // 监听广告位详情的变化
		this.data = val
	}
  },
  created: function() {
    // console.log(this.$store.state)
  },
  methods:  {
  	Preservation: function() {
      var that = this
      var arr = {
        title: that.data.title,
        status: that.data.status
      }
      if (that.data.firstFloorid) {
        arr.pid = that.data.firstFloorid
      }else{
        arr.pid = 0
      }
      if (that.data.id) {
        arr.id = that.data.id
      }
      this.$confirm('确认保存！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http(ApiSetting.saveUpdateTrainCategory,{trainCategory:arr})  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              });
              that.$emit('start2')
              this.$store.commit('showisisPictureShow')
            }
          },(error)=>{  
            console.log(error)
          })
        }).catch(() => {      
        });
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
  	},
  	deleteser: function(){
      var that = this
  		this.$confirm('删除后不可恢复，请确认类目下无服务项目！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           http(ApiSetting.deleteTrainCategory,{id:that.data.id})  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              that.$emit('start2')
              this.$store.commit('showisisPictureShow')
            }else{
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          },(error)=>{  
            console.log(error)
          })
        }).catch(() => {      
        });
  	}
  },
  computed: {
    isPictureShow () {
      return this.$store.state.home.isPictureShow
    },
    edit() {  
        return this.$store.state.home.edit;  
    }  
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

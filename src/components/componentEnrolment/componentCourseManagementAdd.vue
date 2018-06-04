<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      <el-form :inline="true" class="demo-form-inline demo-form-inline1" :rules="rules" :model="data" ref="data">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">{{data.id?'修改':'新增'}}课程</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom"  @click="Preservation('data')" size="small" type="primary">
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
          <el-form-item  prop="title">
              <div class="t-pictureAdd-form-lable">名称：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.title" placeholder="请填写服务项目名称，限20个以内中英文及数字字符"></el-input>
          </el-form-item>
            <el-row>

        <el-col :span="12">
        <el-form-item prop="firstLevel">
                <div class="t-pictureAdd-form-lable">所属一级类目：</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="一级类目" v-model="data.firstLevel"  @change="firstFloor1">
                <el-option
                  v-for="item1 in data.firstFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">所属二级类目：</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="一级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        </el-row>
        <el-form-item >
              <div class="t-pictureAdd-form-lable">SEO关键字：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.keywords" placeholder="请填写SEO关键字，限60个以内中英文及数字字符"></el-input>
          </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-left:25px;">
                <div class="t-pictureAdd-form-lable">图片：</div>
                <ComponentUploading style="float:none;margin:0 0 24px 0;" @fileUps="fileUp1" :dialogImageUrl="data.url"></ComponentUploading>
                <el-form-item prop="curriculumtype">
                <div class="t-pictureAdd-form-lable">授课方式：</div>
                <el-select size="medium" style="margin:0;"  class="t-pictureAdd-form-select" v-model="data.curriculumtype" placeholder="选择授课方式">
                <el-option
                  v-for="item in openType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>
          </div>
        </el-col>
      </el-row>
      <div class="t-pictureAdd-form-line"></div>
          <div class="t-pictureAdd-form-title">
            授课信息
          </div>
          <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" >
          <el-form-item  prop="teacherName">
              <div class="t-pictureAdd-form-lable">授课讲师：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.teacherName" placeholder="请填写讲师姓名"></el-input>
          </el-form-item>
            <el-row>
        <el-col :span="12">
        <el-form-item>
                <div class="t-pictureAdd-form-lable">授课时间：</div>
                 <el-date-picker
                  v-model="data.beginTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间">
                </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item>
                <div class="t-pictureAdd-form-lable">&nbsp;</div>
                <el-date-picker
                  v-model="data.endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束时间">
                </el-date-picker>
          </el-form-item>
        </el-col>
        </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-left:25px;">
                <el-form-item  prop="address">
              <div class="t-pictureAdd-form-lable">授课地点：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.address" placeholder="请填写授课地点，包括门牌号"></el-input>
          </el-form-item>
               <el-form-item  prop="maxPerson">
                <div class="t-pictureAdd-form-lable">总人数限制：</div>
                <el-input-number style="margin:0;" v-model="data.maxPerson" :min="1" size="medium"  :max="1000" label="0"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;<span>人</span>
                </el-form-item>
          </div>
        </el-col>
      </el-row>
			<div class="t-pictureAdd-form-line"></div>
			<div class="t-pictureAdd-form-title">
      		收费
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light" >
          <el-form-item  prop="nowPrice">
				  		<div class="t-pictureAdd-form-lable">报名费（优惠价）：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.nowPrice" placeholder="请填写价格"></el-input>
          </el-form-item>
				  </div>
			  </el-col>
			  <el-col :span="12">
				  <div class="grid-content bg-purple" style="padding-left:25px;">
          <el-form-item   prop="originalPrice">
                <div class="t-pictureAdd-form-lable">报名费（原价）：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.originalPrice" placeholder="请填写价格"></el-input>
          </el-form-item>
				  </div>
			  </el-col>
			</el-row>


			<div class="t-pictureAdd-form-line"></div>
			<div class="t-pictureAdd-form-title">
      		课程介绍
      		</div>
      		<el-row>
          <div class="t-pictureAdd-form-lable">课程简介：</div>
            <el-input size="medium" class="t-pictureAdd-form-select" style="width:100%;" v-model="data.content" placeholder="50字以内"></el-input>
          <div class="t-pictureAdd-form-lable">图文详情：</div>
            <ComponentwangEditor :content="data.description" @fileUps="description"></ComponentwangEditor>
			</el-row>

      	</div>
         
 </el-form>
<!-- <el-button v-popover:popover>删除</el-button> -->
      </div>
   
    </transition>
     
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentUploading from '../componentList/componentUploading'
import ComponentwangEditor from '../componentList/componentwangEditor'
export default {
  	data () {
      var validatetitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      var validatenowPrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('优惠价不为空'));
        } else {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!reg.test(value)) {
            callback(new Error('优惠价不正确'));
          }else{
            callback();
          }
        }
      };
      var validateoriginalPrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('原价不为空'));
        } else {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!reg.test(value)) {
            callback(new Error('原价格式不正确'));
          }else{
            callback();
          }
        }
      };
    return {
    	data: {
    	},
      	openType: [{ // 打开方式
          value: 0,
          label: '线下'
        }, {
          value: 1,
          label: '线上'
        }],
        // province: 1,
        // city: 1,
        // county: 1
        SecondFloorList: [],
        rules: {
          title: [
             { required: true, message: '请填写名称', trigger: 'change' }
          ],
          maxPerson: [
             { required: true, message: '请填写总人数限制', trigger: 'change' }
          ],
          address: [
             { required: true, message: '请填写授课地点', trigger: 'change' }
          ],
          teacherName: [
             { required: true, message: '请填写授课讲师', trigger: 'change' }
          ],
          firstLevel: [
             { required: true, message: '请填写一级类目', trigger: 'change' }
          ],
          trainCategoryId: [
             { required: true, message: '请填写二级类目', trigger: 'change' }
          ],
          curriculumtype: [
             { required: true, message: '请填写授课方式', trigger: 'change' }
          ],
          nowPrice: [
            { validator: validatenowPrice, trigger: 'change' }
          ],
          originalPrice: [
            { validator: validateoriginalPrice, trigger: 'change' }
          ]
        }
    }
  },
  watch: {
	serverList(val) { // 监听广告位详情的变化
    let ssr = 'data'
    if (val.options) {
      this.SecondFloorList = val.options
    }
    // this.$refs[ssr].resetFields();
		this.data = val
	}
  },
  created: function() {
    // console.log(this.$store.state.home.serverList)
  },
  methods:  {
    description(res) {
      this.data.description = res
    },
    firstFloor1: function() {
      this.SecondFloorList = []
      this.data.trainCategoryId = ''
      for (let i = 0; i < this.data.SecondFloor.length; i++) {
        if (this.data.SecondFloor[i].pid==this.data.firstLevel) {
          this.SecondFloorList.push(this.data.SecondFloor[i])
        }
      }
    },
  	Preservation: function(formName) {
      var that = this
       this.$refs[formName].validate((valid) => { // 表单验证
          if (valid) {
      var trainImageList = []
      if (this.data.url!='') {
        trainImageList.push({url
          :this.data.url})
      }else{
        alert('请上传图片')
      }
      var arr = {
        train: {
          title: this.data.title,
          type: this.data.curriculumtype,
          trainCategoryId: this.data.trainCategoryId,
          url: this.data.url,
          teacherName: this.data.teacherName,
          address: this.data.address,
          beginTime: this.data.beginTime,
          endTime: this.data.endTime,
          maxPerson: this.data.maxPerson,
          nowPrice: this.data.nowPrice,
          originalPrice: this.data.originalPrice,
          content: this.data.content,
          description: this.data.description,
          trainImageList: trainImageList,
          keywords: this.data.keywords
        }
      }
      if (that.data.id) {
        var msg = '修改成功'
        arr.train.id = that.data.id
      }else{
        var msg = '新建成功'
      }
      this.$confirm('确认保存！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http(ApiSetting.saveUpdateTrain,arr)  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                title: '成功',
                message: msg,
                type: 'success'
              });
              that.$emit('start1')
              this.$store.commit('showserverisPictureShow')
            }
          },(error)=>{  
            console.log(error)
          })
        }).catch(() => {      
        });

          } else {
            console.log('error submit!!');
            return false;
          }
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
          this.$store.commit('showserverisPictureShow')
        }).catch(() => {      
        });
  	},
  	fileUp1: function(res){
  		this.data.url = res
  	}
  },
  computed: {
    isPictureShow () {
      return this.$store.state.home.serverisPictureShow
    },
    serverList() {  
      return this.$store.state.home.serverList;  
    }  
  },
  components: {
  	ComponentUploading: ComponentUploading,
    ComponentwangEditor: ComponentwangEditor
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
  overflow:hidden;
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
.xinzhong{
  color:#409EFF;
  border:1px solid #409EFF;
}
.el-tag + .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    margin-top:0;
    vertical-align: bottom;
  }
  .el-form-item {
    margin-bottom: 16px;
}
.el-tag{
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

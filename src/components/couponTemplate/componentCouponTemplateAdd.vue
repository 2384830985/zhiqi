<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      <el-form :inline="true" class="demo-form-inline demo-form-inline1" :rules="rules" :model="data" ref="data">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">{{data.id?'修改':'新增'}}模板</div>
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
          <el-form-item prop="title">
            <div class="t-pictureAdd-form-lable">名称：</div>
            <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.title" placeholder="请填写模板名称，限20个以内中英文及数字字符"></el-input>
          </el-form-item>
        <el-row>
        </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-left:25px;">
          <el-row>
            <div class="t-pictureAdd-form-lable">图片：</div>
            <ComponentUploading style="float:none;margin:0 0 24px 0;" @fileUps="fileUp1" :dialogImageUrl="data.imgUrl"></ComponentUploading>
          </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="t-pictureAdd-form-line"></div>
          <div class="t-pictureAdd-form-title">
            适用条件
          </div>
          <el-form-item prop="forumId">
                <div class="t-pictureAdd-form-lable">适用类型(必选)：</div>
                <el-select size="medium" style="margin:0"  class="t-pictureAdd-form-select" placeholder="请选择适用类型(必选)" v-model="apply">
                <el-option
                  v-for="item in applyType"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
                </el-option>
              </el-select>
          </el-form-item>
          <el-row>
          <div v-if="apply==1">
          <el-col :span="12">
        <el-form-item prop="trainCategoryId" >
                <div class="t-pictureAdd-form-lable">适用类目：</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择一级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in data.serverFirstFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">&nbsp;</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择二级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in data.serverSendFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        <el-form-item prop="trainCategoryId" >
                <div class="t-pictureAdd-form-lable">适用规格：</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择适用规格" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in data.SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">&nbsp;</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择二级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <div>
        <el-form-item prop="trainCategoryId" >
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择一级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="trainCategoryId">
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择二级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          </div>
        </el-col>
        </div>
          <div v-if="apply==2">
          <el-col :span="12">
        <el-form-item prop="trainCategoryId" >
                <div class="t-pictureAdd-form-lable">适用类目：</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择一级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in data.curriculumFirstFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">&nbsp;</div>
                <el-select size="medium" style="margin:0;width:211px;"  class="t-pictureAdd-form-select" placeholder="选择二级类目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in data.curriculumSendFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        </div>
        <div></div>
          <!-- <el-col> -->
        <el-form-item prop="trainCategoryId" style="padding-left: 25px;margin:0;" v-if="apply==1">
                <div class="t-pictureAdd-form-lable">适用项目：</div>
                <el-select size="medium" style="margin:0;"  class="t-pictureAdd-form-select" placeholder="选择服务项目" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        <el-form-item prop="trainCategoryId" style="padding-left: 25px;margin:0;" v-if="apply==2">
                <div class="t-pictureAdd-form-lable">适用课程：</div>
                <el-select size="medium" style="margin:0;"  class="t-pictureAdd-form-select" placeholder="选择课程" v-model="data.trainCategoryId">
                <el-option
                  v-for="item1 in SecondFloorList"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
        <!-- </el-col> -->
        <div class="clear"></div>
        <div>
        <el-col :span="12">
          <el-form-item  prop="outline">
              <div class="t-pictureAdd-form-lable">有效期：</div>
                <el-select size="medium" style="margin:0"  class="t-pictureAdd-form-select" placeholder="请选择有效期" v-model="Validity">
                <el-option
                  v-for="item in termValidity"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item  prop="title">
              <div class="t-pictureAdd-form-lable">适用用户范围：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" :disabled="true" style="margin:0;" v-model="data.title" placeholder="不限"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-left:25px;">
                <el-form-item  prop="outline">
              <div class="t-pictureAdd-form-lable">&nbsp;</div>
              <div v-if="Validity==1">
                 <el-date-picker
                  v-model="value1"
                  style="margin:0;width:200px;"
                  type="date"
                  placeholder="选择指定开始日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                style="margin:0;width:211px;" 
                  v-model="value2"
                  type="date"
                  placeholder="选择指定结束日期">
                </el-date-picker>
              </div>
              <el-input v-if="Validity==2" size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.outline" placeholder="填写指定天数"></el-input>
          </el-form-item>
          </div>
        </el-col>
        </div>
        <div v-if="apply==1">
<div class="clear"></div>
 <el-col :span="12">
            <el-col :span="12">
        <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">金额范围：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:200px;" v-model="data.outline" placeholder="填写最低金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="trainCategoryId">
                <div class="t-pictureAdd-form-lable">&nbsp;</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:211px;" v-model="data.outline" placeholder="填写最高金额"></el-input>
          </el-form-item>
        </el-col>
        </el-col>
        </div>
        <div v-if="apply==2">
        <div class="clear"></div>
          <el-col :span="12">
            <el-col :span="12">
          <el-form-item prop="trainCategoryId">
                  <div class="t-pictureAdd-form-lable">课程单价：</div>
                  <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:200px;" v-model="data.outline" placeholder="填写最低金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item prop="trainCategoryId">
                  <div class="t-pictureAdd-form-lable">&nbsp;</div>
                  <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:211px;" v-model="data.outline" placeholder="填写最高金额"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
          <el-col :span="12" style="padding-left: 25px;margin:0;">
            <el-col :span="12">
          <el-form-item prop="trainCategoryId">
                  <div class="t-pictureAdd-form-lable">报名费合计：</div>
                  <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:200px;" v-model="data.outline" placeholder="填写最低金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item prop="trainCategoryId">
                  <div class="t-pictureAdd-form-lable">&nbsp;</div>
                  <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;width:211px;" v-model="data.outline" placeholder="填写最高金额"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
        </div>
        
        
      </el-row>
      <div class="t-pictureAdd-form-line"></div>
          <div class="t-pictureAdd-form-title">
            优惠信息
          </div>
          <el-row>
<el-form-item  prop="outline" v-if="apply==2">
              <div class="t-pictureAdd-form-lable">优惠范围：</div>
                <el-select size="medium" style="margin:0"  class="t-pictureAdd-form-select" placeholder="请选择有效期" v-model="Validity">
                <el-option
                  v-for="item in preferentialScope"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
                </el-option>
              </el-select>
          </el-form-item>
          <div class="clear"></div>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" >

          <el-form-item  prop="title">
              <div class="t-pictureAdd-form-lable">优惠方式：</div>
                <el-select size="medium" style="margin:0"  class="t-pictureAdd-form-select" placeholder="请选择优惠方式" v-model="preferential">
                <el-option
                  v-for="item in preferentialAapproach"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item  prop="title" v-if="preferential==1">
              <div class="t-pictureAdd-form-lable">折扣：</div>
                <el-input size="medium"  class="t-pictureAdd-form-select" style="margin:0;"   placeholder="填写折扣百分数，0~99" v-model="input4">
                  <template slot="append">%</template>
                </el-input>
          </el-form-item>
          <el-form-item  prop="title" v-if="preferential==2">
              <div class="t-pictureAdd-form-lable">减免：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.outline" placeholder="填写最高金额"></el-input>
          </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-left:25px;">

            <el-form-item  prop="outline">
                <div class="t-pictureAdd-form-lable">可用次数：</div>
                  <el-input-number size="medium" :min="1" :max="10" label="请输入减免金额如1（元）"></el-input-number><span>&nbsp;次</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
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
export default {
  	data () {
      var validatetitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      var validatetitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('标题不为空'));
        } else {
          // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          // if (!reg.test(value)) {
          //   callback(new Error('原价格式不正确'));
          // }else{
          //   callback();
          // }
          if (value) {
            if (value.length>30) {
              callback(new Error('请输入填写30字以内文章标题'));
            }else{
              callback();
            }
          }
        }
      };
      var validateoutline = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('概要不为空'));
        } else {
          if (value) {
            if (value.length>70) {
              callback(new Error('请输入填写70字以内文章标题'));
            }else{
              callback();
            }
          }
        }
      };
    return {
    	data: {
        content: ''
    	},
      preferentialScope: [
        { 
          value: 1,
          label: '单人'
        },
        { 
          value: 2,
          label: '全体'
        },
      ],
      applyType: [ // 优惠方式
        { 
          value: 1,
          label: '服务项目'
        },
        { 
          value: 2,
          label: '培训课程'
        },
      ],
      preferentialAapproach: [ // 优惠方式
        { 
          value: 1,
          label: '折扣'
        },
        { 
          value: 2,
          label: '满减'
        },
      ],
      termValidity: [ // 有效期
        { 
          value: 1,
          label: '指定日期'
        },
        { 
          value: 2,
          label: '指定天数'
        },
        { 
          value: 3,
          label: '长期'
        },
      ],
      apply: '',
      Validity: '',//有效期的值
      preferential: '',//优惠方式的值
      value1: '',
      value2: '',
      	status: [{ // 打开方式
          value: 1,
          label: '开启'
        }, {
          value: 0,
          label: '关闭'
        }],
        // province: 1,
        // city: 1,
        // county: 1
        SecondFloorList: [],
        rules: {
          forumId: [
             { required: true, message: '请填写所属栏目', trigger: 'change' }
          ],
          status: [
             { required: true, message: '请填写状态', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请填写作者', trigger: 'change' }
          ],
          title: [
            { validator: validatetitle, trigger: 'change' }
          ],
          outline: [
            { validator: validateoutline, trigger: 'change' }
          ],

        }
    }
  },
  watch: {
  	serverList(val) { // 监听广告位详情的变化 
      this.data.content = '';
      this.data=JSON.parse(JSON.stringify(val)); //this.templateData是父组件传递的对象  
      this.$refs.data.resetFields();
  	}
  },
  created: function() {
    // console.log(this.$store.state.home.serverList)
  },
  methods:  {
    description(res) {
      this.data.content = res
    },
  	Preservation: function(formName) {
      var that = this
       this.$refs[formName].validate((valid) => { // 表单验证
          if (valid) {
      if (this.data.imgUrl=='') {
        this.$message({
          showClose: true,
          message: '请上传图片'
        });
        return 
      }
      var arr = {
        forumThread: {
          title: this.data.title,
          forumId: this.data.forumId,
          status: this.data.status,
          content: this.data.content,
          showType: 1,
          author: this.data.author,
          imgUrl: this.data.imgUrl,
          outline: this.data.outline,
          sort: this.data.sort,
          keywords: this.data.keywords
        }
      }
      if (this.data.sort!=0) {
        arr.forumThread.sortStatus = 1
      }
      if (that.data.id) {
        var msg = '修改成功'
        arr.forumThread.id = that.data.id
      }else{
        var msg = '新建成功'
      }
      this.$confirm('确认保存！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http(ApiSetting.saveUpdateForumThread,arr)  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                title: '成功',
                message: msg,
                type: 'success'
              });
              that.data.content = ""
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
  		this.data.imgUrl = res
      this.$forceUpdate()
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
  	ComponentUploading: ComponentUploading
  }
}
</script>

<style lang="less" scoped>
.clear{
  clear:both;
}
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

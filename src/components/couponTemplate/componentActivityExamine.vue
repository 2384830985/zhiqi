<template>
<!-- 接受委托 -->
<div>
    <transition name="fade">
      <div class="personal-mask1" v-show="isShow1" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-show="isShow1">
        <div class="t-order-examine-header">追加优惠券</div>
        <div class="t-order-examine-content">
          <div class="t-order-examine-confirm">请确认以下信息</div>
          <el-form  :model="content" ref="content" :inline="true" :rules="rules1" status-icon class="demo-form-inline">
          <el-form-item label="追加套数：" prop="price" style="margin-bottom:0;">
            <el-input class="w-200" placeholder="填写套数" size="small" v-model="content.price"></el-input>
          </el-form-item>
          <div class="MaximumAppend">当前最多可追加 <span>400</span> 套</div>
          </el-form>
        </div>
          <div class="t-order-confirm">
            <div class="t-right">
              <el-button size="small" @click="cancal">取 消</el-button>
              <el-button size="small" @click="ok('content')" type="primary">立即追加</el-button>
            </div>
          </div>
      </div>
    </transition>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
export default {
  props: ['isShow1','content'],
  data () {
      var validatePrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入快递费用'));
        } else {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!reg.test(value)) {
            callback(new Error('快递费用格式不正确'));
          }else{
        callback();
          }
        }
      };
       var checkAge1 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('办理周期不能为空'));
        }
        // setTimeout(() => {
         if (value < 1) {
            callback(new Error('办理周期必须大于1天'));
          } else {
            callback();
          }
        // }, 1000);
      };
    return {
      rules1: {
          price: [
            { validator: validatePrice, trigger: 'blur' }
          ],
          expressFee: [
            { validator: validatePrice, trigger: 'blur' }
          ],
          duratiion: [
            { validator: checkAge1, trigger: 'blur' }
          ]
      },
    }
  },
  methods: {
    mask() {
      this.$emit('changeIsShow2',1)
    },
    cancal() {
      this.$emit('changeIsShow2',1)
    },
    ok(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        that.content.status = 1;
        if (valid) {
          http(ApiSetting.updateRequestServices,{"rsEntity": that.content})  
          .then((res)=>{
            if (res.data.status==1) {
              http(ApiSetting.examineRequestService,{rsEntity:{id:that.content.id,status:1}})  
              .then((res)=>{
                if (res.data.status==1) {
                  this.$notify({
                    title: '成功',
                    message: '恭喜你提交成功了！',
                    type: 'success'
                  });
                  that.$emit('changeIsShow2',1)
                  that.$emit('mask1',that.content)
                }
              },(error)=>{  
                console.log(error)
              })
              
            }
          },(error)=>{  
            console.log(error)
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.MaximumAppend{
	margin-left:85px;
	color: #333;
	font-size: 14px;
}
.MaximumAppend span{
	color: #FC3049;
}
.t-order-confirm{
  width: 100%;
  padding: 12px 10px;
  border-top: 1px solid #F4F4F4;
}
.el-form-item {
    margin-bottom: 18px;
}
.w-200{
  width: 200px;
}
.demo-form-inline{
  margin-left: 86px;
}
.t-order-examine-confirm{
  color:rgba(0,0,0,0.65);
  font-size:14px;
  line-height:20px;
  margin-bottom: 32px;
}
.t-order-examine-content{
  padding: 24px;
  padding-bottom: 95px;
}
.t-order-examine-header{
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #F4F4F4;
  padding: 16px 24px;
  line-height:20px;
  font-size:14px;
  color: #000000;
  // font-weight: bold;
}
.color-120{
	color: rgb(120,120,120);
}
.personal-content-line{
	width: 100%;
	height: 1px;
	background:#E3E3E3;
	margin: 4px 0 20px;
}
.personal-content-logo{
	width:20px;
	height:20px; 
	background:rgba(244,244,244,1);
	position: absolute;
	top: 3px;
	left: 0;
}
.personal-mask1{
    position:fixed;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    width:100%;
    height: 100%;
    z-index:119;
    background:rgba(0,0,0,0.5)
  }
  .personal-content1{
    width:500px;
    position:fixed;
    left: 50%;
    top: 50%;
    height: 348px;
    margin-top: -203px;
    margin-left: -250px;
    z-index:120;
    background-color: white;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15);
    border-radius: 4px;
  }
  .fade-enter-to, .fade-leave-to{
    transition: opacity 0.3s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
  .content-enter-to, .content-leave-to{
    transition: opacity 0.3s
  }
  .content-enter, .content-leave-to{
    opacity: 0
  }
  .t-Alertbu{
    width: 100%;
    font-size: 12px;
    padding: 20px 0 0 10px;
    text-align: left;
  }
</style>

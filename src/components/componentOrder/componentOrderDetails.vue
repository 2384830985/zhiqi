<template>
<div>
    <transition name="fade">
      <div class="personal-mask" v-show="isShow" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-show="isShow">
      	<div class="personal-content-title">{{content.id}}</div>
      	<el-row :gutter="20" style="height:60px;">
		  <el-col :span="8">
		 	<div class="grid-content bg-purple">
		 		<div class="t-order-customer"></div>
		  		<div class="t-order-customer-content">
		  			<div class="t-order-customer-iphone">{{content.userName}}</div>
		  			<div class="t-order-customer-name">客户</div>
		  		</div>
		 	</div>
		  </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="t-order-customer"></div>
          <div class="t-order-customer-content">
            <el-dropdown trigger="click" @command="handleCommand" style="cursor:pointer;">
              <span class="el-dropdown-link t-order-customer-iphone" >
                <span  v-if="content.transactUsre">{{content.transactUsre}}</span>
                <span  v-if="!content.transactUsre">暂无</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="list in content.userSalesman" :key="list.id" :command="list.id">{{list.realName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="t-order-customer-name">业务员</div>
          </div>
        </div>
      </el-col>
		  <el-col :span="8">
      <el-dropdown trigger="click"  @command="handleCommand1"  v-if="content.status==0">
      <span class="el-dropdown-link">
        <div class="grid-content bg-purple">
        <div class="t-order-customer"></div>
          <div class="t-order-customer-content">
            <div class="t-order-customer-iphone">{{content.status|serverType}}</div>
            <div class="t-order-customer-name">状态</div>
          </div>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">接受</el-dropdown-item>
        <el-dropdown-item command="2">拒绝</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
			<div class="grid-content bg-purple" v-if="content.status!=0">
        <div class="t-order-customer"></div>
          <div class="t-order-customer-content">
            <div class="t-order-customer-iphone">{{content.status|serverType}}</div>
            <div class="t-order-customer-name">状态</div>
          </div>
        </div>
		  </el-col>
		</el-row>
      	<div class="personal-content-name">服务信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">服务项目：</span>
      		<span class="personal-content-type1 color-120">{{content.servicesTitle}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">办理周期：</span>
      		<span class="personal-content-type1 color-120">{{content.duration}}天</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">服务收费：</span>
      		<span class="personal-content-type1 color-120">{{content.price}}元</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">联系人：</span>
      		<span class="personal-content-type1 color-120">
          {{content.contactProvince|province(province1)}} 
          {{content.contactCity|city(city1)}} 
          {{content.contactDistrict|county(county1)}}
          {{content.contactAddress}}
          {{content.contactPhone}}
          {{content.contactPerson}}
          </span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">办理所需资质和文件：</span>
      		<span class="personal-content-type1 color-120" v-if="content.needDatum"> 
          <span v-for="list in content.needDatum.split('@@@')">{{list}}&nbsp;</span>
          </span>
          <span v-if="!content.needDatum">无</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">交付物：</span>
      		<span class="personal-content-type1 color-120" v-if="content.receiveDatum">
          <span v-for="list in content.receiveDatum.split('@@@')">{{list}}&nbsp;</span>
          </span>
          <span v-if="!content.receiveDatum">无</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">文件和快递设置</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">交付物配送方式：</span>
      		<span class="personal-content-type1 color-120">{{content.deliverType|deliverType}}</span>
      	</div>
      	<div class="personal-content-type" v-if="content.deliverType==1">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">快递费用：</span>
      		<span class="personal-content-type1 color-120">{{content.expressFee}}元</span>
      	</div>
      	<div class="personal-content-type" v-if="content.deliverType==1">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">快递公司：</span>
      		<span class="personal-content-type1 color-120">顺丰</span>
      	</div>
      	<!-- <div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">快递单号：</span>
      		<span class="personal-content-type1 color-120">SF09040418231</span>
      	</div> -->
      	<div class="personal-content-line"></div>
        <div class="personal-content-name">其他</div>
          <div class="personal-content-type">
          <div class="personal-content-logo"></div>
          <span class="personal-content-type1">备注：</span>
          <span class="personal-content-type1 color-120">{{content.remark}}</span>
        </div>
      </div>
    </transition>
    <ComponentOrderExamine @changeIsShow2="changeIsShow2" @mask1="mask1" :content='content1' :isShow1="isShow1"></ComponentOrderExamine>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js"
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentOrderExamine from '../componentList/componentOrderExamine'
import global_ from '../../method/method'
export default {
  props: ['isShow','content'],
  data () { 
    return {
    	content1: {},
      isShow1: false,
      province1: global_.province1,
      city1: global_.city1,
      county1: global_.county1,
    }
  },
  methods: {
    handleCommand(command){
      var that = this;
      http(ApiSetting.updateRequestServices,{rsEntity:{id:that.content.id,transactUserId:command}})  
          .then((res)=>{
            if (res.data.status==1) {
              for (let i = 0; i < that.content.userSalesman.length; i++) {
                if (that.content.userSalesman[i].id==command) {
                  that.content.transactUsre = that.content.userSalesman[i].realName
                }
              }
              this.$notify({
                  title: '成功',
                  message: '业务员添加成功',
                  type: 'success'
                });
            }
          },(error)=>{  
            console.log(error)
          })
    },
    handleCommand1(command){
      if (command==1) {
        this.rowClick()
      }else{
        this.examine1(2,this.content1)
      }
    },
    examine1(ret,row) {
      this.$confirm('是否要拒绝?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            http(ApiSetting.examineRequestService,{rsEntity:{id:this.content.id,status:ret}})  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                  title: '成功',
                  message: '恭喜你拒绝成功了！',
                  type: 'success'
                });
                this.$emit('changeIsShow',1)
            }
          },(error)=>{  
            console.log(error)
          })
          }).catch(() => {      
          });
    },
  	mask (){
		  this.$emit('changeIsShow',1)
  	},
    mask1(res){
      this.content.expressFee = res.expressFee
      this.content.price = res.price
      this.content.duration = res.duratiion
      // this.$emit('changeIsShow',1)
    },
  	changeIsShow2() {
  		this.isShow1 = false
  	},
  	rowClick() {
      if (this.content.status==0) {
  	 	this.content1 = {
        id: this.content.id,
        price: this.content.price,
        duratiion: this.content.duration,
        expressFee: this.content.expressFee,
        status: this.content.status,
      }
		  this.isShow1 = true
      }
    },
    tijiaocontent(res) {
    }
  },
  components: {
  	ComponentOrderExamine: ComponentOrderExamine
  }
}
</script>

<style lang="less" scoped>
.t-order-customer{
	float: left;
	margin-right: 8px;
	color:#F4F4F4;
	width:40px;
	height:40px; 
	background:rgba(244,244,244,1);
	border-radius: 20px ; 
}
.t-order-customer-content{
	float: left;
}
.t-order-customer-iphone{
	font-size:14px;
	color:rgba(0,0,0,1);
	line-height:22px;
}
.t-order-customer-name{
	font-size:12px;
	color:rgba(0,0,0,0.45);
	line-height:18px;
}
.el-row{
	margin:0!important;
}
.el-col-8{
	padding:0!important;
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
.personal-content-type{
	width: 100%;
	position: relative;
	padding-left: 28px;
	margin-bottom: 20px;
}
.personal-content-type1{
	font-size:14px;
	color:rgba(0,0,0,1);
	line-height:22px;
	margin-bottom: 20px;
}
.personal-content-name{
	font-size:14px;
	color:rgba(0,0,0,1);
	line-height:22px;
	margin-bottom: 20px;
}
.personal-content-title{
	font-size: 16px;
	color: #000000;
	font-weight: bold;
	line-height: 24px;
	margin-bottom: 32px;
}
.personal-mask{
    position:fixed;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    width:100%;
    height: 100%;
    z-index:102;
    // background:rgba(0,0,0,0.5)
  }
  .personal-content1{
  	overflow: auto;
  	padding: 76px 24px 16px;
    padding-bottom: 20px;
    position:fixed;
    right: 0;
    top: 0;
    width: 640px;
    height: 100%;
    z-index:109;
    background-color: white;
    box-shadow: 2px 0px 10px 0px rgba(221,226,233,0.49), -1px 0px 0px 0px rgba(227,227,227,1) 
  }
  .fade-enter-to, .fade-leave-to{
    transition: opacity 0.3s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
  .content-enter-to, .content-leave-to{
    transition: transform 0.5s
  }
  .content-enter, .content-leave-to{
    transform:translate3d(100%,0,0)
  }
  .t-Alertbu{
    width: 100%;
    font-size: 12px;
    padding: 20px 0 0 10px;
    text-align: left;
  }
</style>

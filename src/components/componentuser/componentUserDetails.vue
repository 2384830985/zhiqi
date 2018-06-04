<template>
<div>
    <transition name="fade">
      <div class="personal-mask" v-show="isShow" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-show="isShow">
      	<div class="personal-content-title">{{content.realName}}</div>
      	<div class="personal-content-name">基本信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">账号：</span>
      		<span class="personal-content-type1 color-120">{{content.userName}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">性别：</span>
      		<span class="personal-content-type1 color-120">{{content.gender|gender}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">生日：</span>
      		<span class="personal-content-type1 color-120">{{content.birthday}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">状态：</span>
      		<span class="personal-content-type1 color-120">{{content.closed|closed}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">所在地区：</span>
      		<span class="personal-content-type1 color-120">
          {{content.province|province(province1)}}/ 
          {{content.city|city(city1)}}/
          {{content.district|county(county1)}}&nbsp;
          </span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">联系信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">联系电话：</span>
      		<span class="personal-content-type1 color-120">{{content.phone}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">电子邮箱：</span>
      		<span class="personal-content-type1 color-120">{{content.email}}</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">注册信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">注册来源：</span>
      		<span class="personal-content-type1 color-120">
          {{content.froms|froms}}
          </span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">注册时间：</span>
      		<span class="personal-content-type1 color-120">{{content.created}}</span>
      	</div>
      </div>
    </transition>
</div>
</template>

<script type="text/javascript">
import global_ from '../../method/method'
export default {
  props: ['isShow','content'],
  data () {
    return {
      province1: global_.province1,
      city1: global_.city1,
      county1: global_.county1
    }
  },
  methods: {
  	mask (){
		  this.$emit('changeIsShow',1)
  	}
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

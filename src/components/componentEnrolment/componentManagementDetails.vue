<template>
<div>
    <transition name="fade">
      <div class="personal-mask" v-show="isShow" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-if="isShow">
      	<div class="personal-content-title">{{content.title}}</div>
      	<div class="personal-content-name">基础信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">图片：</span>
      		<!-- <span class="personal-content-type1 color-120">重新上传图片</span> -->
      	</div>
        <div style="width:60px;height:60px;margin-bottom:20px;background:rgb(230,230,230);">
          <img v-if="content.trainImageList[0]" :src="content.trainImageList[0].url" style="width:100%;height:100%;" alt="">
        </div>
        <div class="personal-content-type">
          <div class="personal-content-logo"></div>
          <span class="personal-content-type1">关键字：</span>
          <span class="personal-content-type1 color-120">{{content.keywords}}</span>
        </div>
        <div class="personal-content-type">
          <div class="personal-content-logo"></div>
          <span class="personal-content-type1">所属类目：</span>
          <span class="personal-content-type1 color-120">{{content.firstFloorname}} / {{content.SecondFloorname}}</span>
        </div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">报名费（优惠价）：</span>
      		<span class="personal-content-type1 color-120">{{content.nowPrice}}元</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">报名费（原价）：</span>
      		<span class="personal-content-type1 color-120">{{content.originalPrice}}元</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">授课信息</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">授课讲师：</span>
      		<span class="personal-content-type1 color-120">{{content.teacherName}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">授课时间：</span>
      		<span class="personal-content-type1 color-120">{{content.beginTime}}-{{content.endTime}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">授课地点：</span>
      		<span class="personal-content-type1 color-120">{{content.address}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">总人数限制：</span>
      		<span class="personal-content-type1 color-120">{{content.maxPerson}}</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">课程介绍</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">简介：</span>
      		<span class="personal-content-type1 color-120">{{content.content}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">图文详情：</span>
      		<span class="personal-content-type1 color-120" style="display: block;" v-html="content.description"></span>
      	</div>
      </div>
    </transition>
</div>
</template>

<script type="text/javascript">
export default {
  props: ['isShow','content'],
  data () {
    return {
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
	color: #000;
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

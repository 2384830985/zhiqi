<template>
<!-- 详情 -->
<div>
    <transition name="fade">
      <div class="personal-mask" v-show="isShow" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-show="isShow">
      	<div class="personal-content-title"># {{content.id}}</div>
      	<div class="personal-content-name">广告位规格</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">类型：</span>
      		<span class="personal-content-type1 color-120">{{content.type|filterType}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">描述：</span>
      		<span class="personal-content-type1 color-120">{{content.description}}</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name">广告位设置</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">图片：</span>
      		<!-- <span class="personal-content-type1 color-120">重新上传图片</span> -->
      	</div>
        <div style="width:100px;height:125px;margin-bottom:20px;background:rgb(230,230,230);">
          <img :src="content.imgRul" style="width:100%;height:100%;" alt="">
        </div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">文字：</span>
      		<span class="personal-content-type1 color-120">{{content.content}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">链接打开方式：</span>
      		<span class="personal-content-type1 color-120">{{content.openType|filteropenType}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">链接：</span>
      		<span class="personal-content-type1 color-120">{{content.url}}</span>
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
	color: rgb(153,153,153);
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

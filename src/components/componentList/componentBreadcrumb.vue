<template>
<!-- ZQ 首页公用里面导航 -->
<div class="t-zqHome-navigation">
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: content.upper }">{{content.upperTitle}}</el-breadcrumb-item>
	  <el-breadcrumb-item>{{content.title}}</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="t-zqHome-title">{{content.title}}</div>
	<!-- <div class="t-zqHome-navigation-tab" :class="{ 'b-buttom-1890FF': isActive==1 }" @click="isActive=1">导航</div>
	<div class="t-zqHome-navigation-tab" :class="{ 'b-buttom-1890FF': isActive==2 }" @click="isActive=2">广告</div> -->
</div>
</template>

<script type="text/javascript">
export default {
	props: ['content'],
	data () {
		return {
		}
	}
}
</script>

<style lang="less" scoped>
.t-zqHome-navigation{
	position: relative;
	width: 100%;
	height: 102px;
	background: white;
	padding: 16px 0 0 32px;
    border-bottom: 1px solid #E9E9E9;
}
.el-breadcrumb__item{
	margin: 4px 0;
}
.el-breadcrumb__inner{
    color: #000000!important;
}
.t-zqHome-title{
	margin: 16px 0 4px;
	height:28px; 
	font-size:20px;
	color:rgba(0,0,0,0.85);
	line-height:28px;
	font-weight: bold;
}
</style>

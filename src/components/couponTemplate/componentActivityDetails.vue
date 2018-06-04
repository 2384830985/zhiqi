<template>
<div>
    <transition name="fade">
      <div class="personal-mask" v-show="isShow" @click="mask">
      </div>
    </transition>
     <transition name="content">
      <div class="personal-content1"  v-if="isShow">
      	<div class="personal-content-title">{{content.title}}
        <!-- <el-dropdown trigger="click" class="t-right" style="cursor:pointer;" @command="handleCommand">
        <span class="el-dropdown-link">
          ...
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="content.comment==0" class="clearfix" command="2">
            开放
          </el-dropdown-item>
          <el-dropdown-item v-if="content.comment==1" class="clearfix" command="3">
            关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
        </div>

      	<div class="personal-content-name">基础信息</div>
        <div class="personal-content-type">
          <div class="personal-content-logo"></div>
          <span class="personal-content-type1">状态：</span>
          <span class="personal-content-type1 color-120">{{content.forumName}}</span>
        </div>
        <div class="personal-content-type">
          <div class="personal-content-logo"></div>
          <span class="personal-content-type1">开始时间：</span>
          <span class="personal-content-type1 color-120">{{content.author}}</span>
        </div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">结束时间：</span>
      		<span class="personal-content-type1 color-120">{{content.status|status}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">活动进度：</span>
      		<span class="personal-content-type1 color-120">{{content.status|status}}</span>
      	</div>
      	<div class="personal-content-line"></div>
      	<div class="personal-content-name" style="margin-bottom: 1px;">活动规则</div>
      	   <el-table
		      :data="content.arr"
		      style="width: 100%;margin: 0 0 20px;">
	          <el-table-column
	            prop="l0"
	            label="名称"
	            width="200">
	          </el-table-column>
		      <el-table-column
		        prop="ll"
		        label="每次领取张数">
		      </el-table-column>
		    </el-table>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">优惠券生成方式：</span>
      		<span class="personal-content-type1 color-120">{{content.outline}}</span>
      	</div>
      	<div class="personal-content-type">
      		<div class="personal-content-logo"></div>
      		<span class="personal-content-type1">限制生成套数：</span>
      		<span class="personal-content-type1 color-120">{{content.outline}} 
      		<span class="personal-append" @click="Append">追加</span>
      		</span>
      	</div>
        <ComponentActivityExamine @changeIsShow2="changeIsShow2" @mask1="mask1" :content='content1' :isShow1="isShow1"></ComponentActivityExamine>
      </div>
       
    </transition>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentActivityExamine from './componentActivityExamine'
export default {
  props: ['isShow','content'],
  data () {
    return {
      isShow1: false,
      paginationindex: 1,
      content1: {}
    }
  },
  methods: {
    Append() {//追加优惠券套
      this.isShow1 = true
    },
    changeIsShow2() {
      this.isShow1 = false
    },
    mask1(res){
      this.content.expressFee = res.expressFee
      this.content.price = res.price
      this.content.duration = res.duratiion
      // this.$emit('changeIsShow',1)
    },
  	mask (){
		this.$emit('changeIsShow',1)
  	},
     handleCommand(command) {
        if (command==1) {
          this.$store.commit('serverListContent',this.content)
          this.$store.commit('hideserverisPictureShow')
        }else{
          var that = this
        if (command==2) {
          var msg = '开放成功'
          var msa = '确认开放？ 是否继续'
          var inde = 1
        }else{
          var msg = '关闭成功'
          var msa = '确认关闭？ 是否继续'
          var inde = 0
        }
        this.$confirm(msa, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            http(ApiSetting.saveUpdateForumThread,{forumThread: {
              id:that.content.id,
              comment:inde,
              forumId: that.content.forumId
            }})  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                    title: '成功',
                    message: msg,
                    type: 'success'
                  });
              that.content.comment = inde
            }
          },(error)=>{  
            console.log(error)
          })
          }).catch(() => {      
          });
        }
      }
  },
  components: {
    ComponentActivityExamine: ComponentActivityExamine
  }
}
</script>

<style lang="less" scoped>
.personal-append{
	color: #00ADEE;
	cursor: pointer;
}
.Selected{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.personal-content-open{
  background:rgba(240,242,245,1);
  cursor:pointer;
  color:#000000;
  display:inline;
  outline: none;
  border:none;
  position:absolute;
  right: 8px;
  bottom: -2px;
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

<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">角色配置</div>
      			<div class="t-right">
      				<el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">
               {{data.id?'保 存':'提 交'}}
              </el-button>
      				<el-button class="t-update-buttom" @click="cancel" size="small">取消</el-button>
      			</div>
      		</div>
      	</div>
      	<div class="t-pictureAdd-form" style="margin-bottom:50px;">
      		<div class="t-pictureAdd-form-title">
      			基础信息
      		</div>
      		<el-row>
			  <el-col :span="12">
				  <div class="grid-content bg-purple-light" >
				  		<div class="t-pictureAdd-form-lable">角色名称：</div>
			      		<el-input size="medium" class="t-pictureAdd-form-select" v-model="data.title" placeholder="请输入导航名称"></el-input>
			      		<div class="t-pictureAdd-form-lable">角色类型：</div>
			      		<el-radio v-model="data.type" label="0">系统</el-radio>
  						<el-radio v-model="data.type" label="1">企业</el-radio>
			      		<div class="t-pictureAdd-form-lable">角色权限：</div>
			      		<el-radio v-model="data.roleType" label="0">普通角色</el-radio>
  						<el-radio v-model="data.roleType" label="1">管理角色</el-radio>
			      		<div class="t-pictureAdd-form-lable">状态：</div>
			      		<el-radio v-model="data.status" label="0">禁用</el-radio>
  						<el-radio v-model="data.status" label="1">启用</el-radio>
			      		<!-- <div class="t-pictureAdd-form-lable">权限设置</div>
			      		<el-button class="t-update-buttom" style="margin-left: 0;" @click="Preservation" size="small" type="primary">
			            	开始设置
			            </el-button> -->
				  </div>
				<!--   <el-button class="t-update-buttom" style="margin-left: 0;" @click="Preservation" size="small" type="primary">
			            	保存
			            </el-button> -->
			  </el-col>
			  <el-col :span="12">
				  <el-tree
				  :data="oneList"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  :default-checked-keys="current"
				  highlight-current
				  :props="defaultProps">
				</el-tree>
  <!-- <el-button class="t-update-buttom" @click="Preservation" size="small" type="primary">
                    保存
                  </el-button> -->
				<!-- <div class="buttons">
				  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
				  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
				  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
				  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
				  <el-button @click="resetChecked">清空</el-button>
				</div> -->

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
    	data: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        oneList: [], // 一级tree
        twoList: [], // 二级tree
        current: [], // 当前选中的
    }
  },
  watch: {
  	edit(val) { // 监听广告位详情的变化
  		this.data = val
  		if (this.data.id) {
  			this.data.roleType = this.data.roleType+''
  			this.data.type = this.data.type+''
  			this.data.status = this.data.status+''
  		}else{
        this.data = {
          
        }
      }
  		console.log(this.data.id)
  		this.oneList = []
  		this.twoList = []
  		this.current = []
  		if (this.data.id) {
  			var value = this.data.id
  		}else{
  			var value = ''
  		}
  		http(ApiSetting.getMenubyRid,{id:value})
	    .then((res)=>{
	      if (res.data.status==1) {
	        console.log(res.data.data)
	        for (var i = 0; i < res.data.data.length; i++) {
	        	if (res.data.data[i].state) {
		        	if (res.data.data[i].state.selected) {
		        		this.current.push(Number(res.data.data[i].id))
		        	}
	        	}
	        	if (res.data.data[i].parent=='#') {
	        		this.oneList.push({
	        			id:res.data.data[i].id,
	        			label:res.data.data[i].text,
	        			children: []
	        		})
	        	}else{
	        		this.twoList.push({
	        			id:res.data.data[i].id,
	        			label:res.data.data[i].text,
	        			pid:res.data.data[i].parent
	        		})
	        	}
	        }
	        console.log(this.current)
	        for (var i = 0; i < this.twoList.length; i++) {
	        	for (var l = 0; l < this.oneList.length; l++) {
	        		if (this.twoList[i].pid==this.oneList[l].id) {
	        			this.oneList[l].children.push(this.twoList[i])
	        		}
	        	}
	        }
	        console.log(this.oneList)
	        setTimeout(() => {
	            this.$refs.tree.setCheckedKeys(this.current)
	        }, 500)
	      }
	    },(error)=>{  
	      console.log(error)
	    })
      console.log(this.data)
  	}
  },
  created: function() {
    // console.log(this.$store.state)
  },
  methods:  {
  	 getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3213, 3270]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
  	Preservation: function() {
      var that = this
      var selectMid = []
      selectMid = this.$refs.tree.getCheckedKeys()
      console.log(selectMid)
      console.log(this.oneList)
      // function ContrastLIst(id,pid) {
      //   for (let i = 0; i < selectMid.length; i++) {
      //     if (id!=selectMid[i]) {
      //       selectMid.push(pid)
      //     }
      //   }
      // }
      // function Contrast(id){
      //   for (let i = 0; i < that.oneList.length; i++) {
      //     for (let l = 0; l < that.oneList[i].children.length; l++) {
      //       if (that.oneList[i].children[l].id==id) {
      //         ContrastLIst(id,that.oneList[i].children[l].pid)
      //       }
      //     }
      //   }
      // }

      // for (let i = 0; i < selectMid.length; i++) {
      //   Contrast(selectMid[i])
      // }
      for (let i = 0; i < this.twoList.length; i++) {
        for (let l = 0; l < selectMid.length; l++) {
          if (selectMid[l]==this.twoList[i].id) {
            // if (!selectMid[l].indexof(this.twoList[i].pid)) {
              selectMid.push(this.twoList[i].pid)
            // }
          }
        }
      }
      // 最简单数组去重法 
      function unique1(array){ 
      var n = []; //一个新的临时数组 
      //遍历当前数组 
      for(var i = 0; i < array.length; i++){ 
      //如果当前数组的第i已经保存进了临时数组，那么跳过， 
      //否则把当前项push到临时数组里面 
      if (n.indexOf(array[i]) == -1) n.push(array[i]); 
      } 
      return n; 
      }
      selectMid = unique1(selectMid)
      let tree = ''
      for (var i = 0; i < selectMid.length; i++) {
        if (i==selectMid.length-1) {
          tree+=selectMid[i]
        }else{
          tree+=selectMid[i]+','
        }
      }
      var Backstageuser1 = JSON.parse(localStorage.getItem('Backstageuser'))
      console.log(Backstageuser1)
  		var data = {
        role: {
          title: that.data.title,
          type: that.data.type,
          roleType: that.data.roleType,
          status: that.data.status,
          selectMid: tree,
          userId: Backstageuser1.id,
        }
      }
      if (that.data.id) {
        data.role.id = that.data.id
      }
      let mesg = '';
      if (that.data.id) {
        mesg = '修改成功'
      }else{
        mesg = '新增成功'
      }
  		http(ApiSetting.saveUpdateRole,data)  
	    .then((res)=>{
	      if (res.data.status==1) {
	        this.$notify({
            title: '成功',
            message: mesg,
            type: 'success'
          });
          that.$emit('start1')
	        this.$store.commit('showserverisPictureShow')
	      }
	    },(error)=>{  
	      console.log(error)
	    })
  	},
  	cancel: function() {
  		this.$confirm('取消后将不记录次配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showserverisPictureShow')
        }).catch(() => {      
        });
  	},
  	deleteser: function(){
  		this.$confirm('删除后不可恢复，请确认类目下无服务项目！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$store.commit('showserverisPictureShow')
        }).catch(() => {      
        });
  	}
  },
  computed: {
    isPictureShow () {
      return this.$store.state.home.serverisPictureShow
    },
    edit() {  
        return this.$store.state.home.serverList;  
    }  
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
</style>

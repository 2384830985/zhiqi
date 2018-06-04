<template>
<div>
	<ComponentBreadcrumb :content="content"></ComponentBreadcrumb>
	<div class="t-express-content">
		<div class="t-express-setup">
			<div class="t-express-setup-header">
				<span class="t-express-setup-headerT">快递寄送设置</span>
				<el-select v-model="express"  @change="handleChange" size="small" class="t-el-cascader" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
		<!-- 		<el-dropdown style="float:left;margin-left:24px;color:#1890FF;margin-top:1px;" trigger="click">
				  <span class="el-dropdown-link">
				    北京<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item>朝阳区</el-dropdown-item>
				    <el-dropdown-item>海淀区</el-dropdown-item>
				   <!--  <el-dropdown-item>螺蛳粉</el-dropdown-item>
				    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
				    <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
				 <!--  </el-dropdown-menu> -->
				<!-- </el-dropdown> -->
			</div>
			<div class="t-express-setup-content">
				<div class="t-express-setup-contentT">快递费用</div>
				<el-form :inline="true" :model="ruleForm1" :rules="rules1" ref="ruleForm1" class="demo-form-inline">
				  <el-form-item prop="price">
				    <el-input style="width:294px;" 
				     size="small" v-model="ruleForm1.price" placeholder="请输入快递费用"></el-input>
				  </el-form-item>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" size="small" @click="onSubmit(ruleForm1)">保 存</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
		<div class="t-express-setup">
			<div class="t-express-setup-header">
				<span class="t-express-setup-headerT">上门取件设置</span>
				<el-select v-model="Pickup"  @change="handleChange1" size="small" class="t-el-cascader" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div>
			<div class="t-express-setup-content">
				<div class="t-express-setup-contentT">取件地址</div>
				<el-form :inline="true" class="demo-form-inline">
				  <el-form-item>
				    <el-input style="width:294px;" size="small" v-model="Pickupaddress" placeholder="请输入取件地址"></el-input>
				  </el-form-item>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" size="small" @click="onSubmit1">保 存</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import ComponentBreadcrumb from '../componentList/componentBreadcrumb'
export default {
	data () {
		var validatePrice = (rule, value, callback) => { // 验证快递
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
	   return {
	   	ruleForm1: {
	   		price: ''
	   	},
	   	rules1: {
 		  price: [
            { validator: validatePrice, trigger: 'blur' }
          ],
	   	},
	   	Pickup: 6666,
	   	express: 6666,
	   	Pickupaddress: '',
	   	price: '',
	   	content:{ // 导航配置
	   		upper: '/',
	   		upperTitle: '服务管理',
	   		title: '配送管理'
	   	},

	   	user1: '',
        user: '',
        options: [{
          value: 1,
          label: '北京',
      	},
      	{
      	  value: 6666,
          label: '全国',
          // children: [{
          //   value: '5',
          //   label: '朝阳区'
          // }]
      	}],
      	selectedOptions3: [6666, 6666]
	   }
	},
	components: {
	  ComponentBreadcrumb: ComponentBreadcrumb
	},
	methods: {
		onSubmit (formName) { // 快递保存
			http(ApiSetting.saveOrUpdateExpressDelivery,{"expressDelivery": {id:this.express,price:this.ruleForm1.price}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	alert('保存成功')
		        }
		      },(error)=>{  
		        console.log(error)
		      })
		},
		onSubmit1 () { // 取件保存
			 http(ApiSetting.saveOrUpdatePickUp,{"pickUp": {id:this.Pickup,address:this.Pickupaddress}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	alert('保存成功')
		        }
		      },(error)=>{  
		        console.log(error)
		      })
		},
		handleChange() { // 快递设置
			this.Pickup = this.selectedOptions3[0];
			this.start()
		},
		handleChange1() { // 上面取件设置
			this.express = this.selectedOptions3[1];
			this.start()
		},
		start () { // 页面初始加载
			let that = this;
			http(ApiSetting.getPickUp,{"pickUp": {id:this.Pickup}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	that.Pickupaddress = res.data.data.address
		        }
		      },(error)=>{  
		        console.log(error)
		      })
			http(ApiSetting.getExpressDelivery,{"expressDelivery": {id:this.express}})  
		      .then((res)=>{
		        if (res.data.status==1) {
		        	that.ruleForm1.price = res.data.data.price
		        }
		      },(error)=>{  
		        console.log(error)
		      })
		}
	},
	created () {
		this.start();
	}
}
</script>

<style lang="less" scoped>
.t-el-cascader{
	float: left;
	margin-top: -4px;
	border: none!important;
	width: 100px!important;
	margin-left: 25px; 
	.el-input__inner{
		border: none!important;
	}
}
.t-express-content{
	width: 100%;
	padding: 24px;
	.t-express-setup{
		width: 100%;
		height: 190px;
		border-radius: 2px;
		background: white;
		margin-bottom: 24px;
		.t-express-setup-header{
			width: 100%;
			height: 55px;
			border-bottom: 1px solid #E9E9E9;
			padding: 15px 32px;
			.t-express-setup-headerT{
				float: left;
				line-height:24px;
				font-size:16px;
				color: #000;
				font-weight: bold;
			}
		}
	}
}
.t-express-setup-content{
	padding: 24px 32px;
	.t-express-setup-contentT{
		height:22px; 
		font-size:14px;
		color:rgba(0,0,0,0.85);
		line-height:22px;
		margin-bottom: 8px;
		font-weight: bold;
	}
}
</style>
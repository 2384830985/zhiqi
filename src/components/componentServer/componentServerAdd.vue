<template>
<!-- 新增页面 -->
<div>
	<transition name="pictureadd">
      <div class="t-pictureAdd-content" v-show="isPictureShow">
      <el-form :inline="true" class="demo-form-inline demo-form-inline1" :rules="rules" :model="data" ref="data">
      	<div class="t-pictureAdd-header">
      		<div class="t-pictureAdd-header-content">
      			<div class="t-pictureAdd-header-title">服务项目</div>
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
          <el-form-item  prop="title">
              <div class="t-pictureAdd-form-lable">名称：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.title" placeholder="请填写服务项目名称，限20个以内中英文及数字字符"></el-input>
          </el-form-item>
          <div class="t-pictureAdd-form-lable">适用地区：</div>
                <el-input size="medium" :disabled="true" class="t-pictureAdd-form-select" v-model="data.url" placeholder="北京"></el-input>
           <el-form-item  prop="firstLevel">
			      		<div class="t-pictureAdd-form-lable">所属一级类目：</div>
                <el-select size="medium" style="margin:0;" @change="firstFloor"  class="t-pictureAdd-form-select" placeholder="一级类目" v-model="data.firstLevel">
                <el-option
                  v-for="item1 in data.firstFloor"
                  :key="item1.id"
                  :value="item1.id"
                  :label="item1.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item  prop="ord">
			      		<div class="t-pictureAdd-form-lable">置顶系数：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.ord" placeholder="请输入内容"></el-input>
          </el-form-item>      
			      		<div class="t-pictureAdd-form-lable">办理所需资质和文件：</div>
			      		<el-tag
                  :key="tag"
                   style="height:36px;padding: 1px 10px;margin:0 5px 5x 0;float:left;"
                  v-for="tag in data.thing"
                  closable
                  :disable-transitions="false"
                  @close="handleClose1(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  style="float:left;"
                  class="input-new-tag"
                  v-if="inputVisible1"
                  size="medium"
                  v-model="inputValue1"
                  ref="saveTagInput"
                  @keyup.enter.native="handleInputConfirm1"
                  @blur="handleInputConfirm1"
                >
                </el-input>
                <el-button v-else class="button-new-tag" style="height:36px;margin:0" @click="showInput1">+ 添加</el-button>
				  </div>
			  </el-col>
			  <el-col :span="12">
				  <div class="grid-content bg-purple" style="padding-left:25px;">
			      		<div class="t-pictureAdd-form-lable">图片：</div>
			      		<ComponentUploading style="float:none;margin:0 0 24px 0;" @fileUps="fileUp1" :dialogImageUrl="data.imgUrl"></ComponentUploading>
                <el-form-item  prop="days">
			      		<div class="t-pictureAdd-form-lable">办理周期：</div>
			      		<el-input-number style="margin:0;" v-model="data.days" :min="1" size="medium"  :max="1000" label="描述文字"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;<span>工作日</span>
                </el-form-item>
          <el-form-item  prop="categoryId">
                <div class="t-pictureAdd-form-lable">所属二级类目：</div>
                <el-select size="medium" style="margin:0;" @change="firstFloor"  class="t-pictureAdd-form-select" v-model="data.categoryId" placeholder="二级类目">
                <el-option
                  v-for="item in SecondFloorList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.title"
                  >
                </el-option>
              </el-select>
          </el-form-item>
                <el-form-item  prop="deliverType">
			      		<div class="t-pictureAdd-form-lable">支持配送方式：</div>
			      		<el-select size="medium" @change="firstFloor" style="margin:0;"  class="t-pictureAdd-form-select" v-model="data.deliverType" placeholder="选择配送方式">
						    <el-option
						      v-for="item in openType"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
              </el-form-item>
			      		<div class="t-pictureAdd-form-lable">交付物：</div>
                <el-tag
                  :key="tag"
                   style="height:36px;padding: 1px 10px;margin:0 5px 5x 0;float:left;"
                  v-for="tag in data.dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                style="float:left;"
                  class="input-new-tag"
                  v-if="inputVisible"
                  size="medium"
                  v-model="inputValue"
                  ref="saveTagInput"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" style="height:36px;margin:0" @click="showInput">+ 添加</el-button>
			      		<!-- <el-input size="medium" class="t-pictureAdd-form-select" v-model="data.url" placeholder="请输入内容"></el-input> -->
				  </div>
			  </el-col>
        
			</el-row>
      <el-row>
        <el-col :span="12">
        <div class="grid-content bg-purple" style="padding-top:20px;">
         <el-form-item  prop="keywords">
              <div class="t-pictureAdd-form-lable">SEO关键字：</div>
                <el-input size="medium" class="t-pictureAdd-form-select" style="margin:0;" v-model="data.keywords" placeholder="请填写SEO关键字，限60个以内中英文及数字字符"></el-input>
          </el-form-item>
          </div>
        </el-col>
      </el-row>
			<div class="t-pictureAdd-form-line"></div>
			<div class="t-pictureAdd-form-title">
      			价格
      		</div>
      		<el-row>
        <div class="t-pictureAdd-form-lable">规格设置：</div>
			  <el-col :span="12">
				  <div class="grid-content bg-purple">
          <div style="margin-bottom:20px;" v-for="(item,index) in data.servicesSpecificationList">
            <el-button style="padding:9px;" :class="Specificationsindex==index?'xinzhong':''" icon="el-icon-star-off"
              @click="Specificationsgai(index,item)"
            ></el-button>
            <el-button style="padding:9px" type="danger"  icon="el-icon-delete" circle @click="Specificationsdelete(index)"></el-button>
            <el-input size="medium" style="width:342px;margin-right:25px;margin-bottom: 18px;" v-model="item.title" class="t-pictureAdd-form-select t-right" placeholder="请输入内容"></el-input> 
          </div>
          <div v-if="data.servicesSpecificationList">
				  <div class="t-specifications-add" v-if="data.servicesSpecificationList.length<4" @click="AddSpecifications">+ 添加规格</div></div></div>
			  </el-col>
        <el-col :span="12" v-if="data.servicesSpecificationList">
          <div class="grid-content bg-purple" style="padding-left:25px;" v-if="data.servicesSpecificationList.length>0">
            <div class="t-specifications-sku">
              <div class="t-specifications-sku1" v-for="(item,index) in Specificationssku">
                <input class="t-specifications-sku-input"  @blur="matchingprice1(index,item.title)" v-model="item.title"  type="text">
                <div class="t-specifications-sku-cancal" @click="specificationsCancal(index)">
                <i class="el-tag__close el-icon-close"></i>
                </div>
              </div>
              <div class="t-specifications-sku-add" @click="AddSpecificationsku">+ 添加规格</div>
            </div>
          </div>
        </el-col>
        <el-table v-if="data.servicesSpecificationList"
          :data="data.arr"
          style="width: 100%;margin: 0 0 20px;">
          <el-table-column
            v-if="data.servicesSpecificationList[0]"
            prop="l0"
            :label="data.servicesSpecificationList[0].title"
            >
          </el-table-column>
          <el-table-column
            v-if="data.servicesSpecificationList[1]"
            prop="l1"
            :label="data.servicesSpecificationList[1].title"
            >
          </el-table-column>
          <el-table-column
            v-if="data.servicesSpecificationList[2]"
            prop="l2"
            :label="data.servicesSpecificationList[2].title"
            >
          </el-table-column>
          <el-table-column
            v-if="data.servicesSpecificationList[3]"
            prop="l3"
            :label="data.servicesSpecificationList[3].title"
            >
          </el-table-column>
          <el-table-column
            prop="ll"
            width="180"
            label="价格">
            <template slot-scope="scope">
              <el-input size="medium" v-model="scope.row.ll" @change="priceCh" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      <el-row style="margin-top:20px;">
        <el-col :span="12">
          <div class="grid-content bg-purple" v-if="data.servicesSpecificationList">
          <el-form-item  prop="nowPrice">
                <div class="t-pictureAdd-form-lable">售价：</div>
                <el-input size="medium" style="margin:0" :disabled="data.servicesSpecificationList[0]?true:false" class="t-pictureAdd-form-select" v-model="data.nowPrice" placeholder="请填写价格"></el-input>
          </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left:25px;">
          <div class="grid-content bg-purple">
          <el-form-item  prop="originalPrice">
          <div class="t-pictureAdd-form-lable">原价：</div>
                <el-input size="medium" style="margin:0" class="t-pictureAdd-form-select" v-model="data.originalPrice" placeholder="请填写价格"></el-input>
          </el-form-item>      
          </div>
        </el-col>
      </el-row>

			</el-row>
			<div class="t-pictureAdd-form-line"></div>
			<div class="t-pictureAdd-form-title">
      		服务介绍
      		</div>
      		<el-row>
          <div class="t-pictureAdd-form-lable">服务简介：</div>
            <el-input size="medium" class="t-pictureAdd-form-select" style="width:100%;" v-model="data.content" placeholder="50字以内"></el-input>
          <div class="t-pictureAdd-form-lable">图文详情：</div>
            <ComponentwangEditor :content="data.description" @fileUps="description"></ComponentwangEditor>
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
import ComponentwangEditor from '../componentList/componentwangEditor'
export default {
  	data () {
      var validatetitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          
          callback();
        }
      };
      var validatekeywords =  (rule, value, callback) => {
        if (value !== '') {
          if (value.length >60) {
            callback(new Error('关键词长度应小于60'));
          } else {
            callback();
          }
        }else{
          callback();
        }
        
      };
      var validateord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入置顶系数'));
        } else {
          // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var reg = /^[0-9]*$/;
          if (!reg.test(value)) {
            callback(new Error('置顶系数为正整数'));
          }else{
            callback();
          }
        }
      };
      var validatedays = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入办理周期'));
        } else {
          // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var reg = /^[1-9]\d*$/;
          if (!reg.test(value)) {
            callback(new Error('请输入办理周期为正整数'));
          }else{
            callback();
          }
        }
      };
      var validatenowPrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('售价不为空'));
        } else {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!reg.test(value)) {
            callback(new Error('售价格式不正确'));
          }else{
            callback();
          }
        }
      };
      var validateoriginalPrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('原价不为空'));
        } else {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!reg.test(value)) {
            callback(new Error('原价格式不正确'));
          }else{
            callback();
          }
        }
      };
    return {
      value10: [],
        inputVisible: false,
        inputValue: '',
        inputVisible1: false,
        inputValue1: '',
       visible2: false,
      loading: false,
      tableData: [],
    	num1: 1,
    	data: {
    		type: '',
    		openType: '',
        categoryId: '',
        firstLevel: '',
        deliverType: '',
        thing: [],
    	},
      	openType: [{ // 打开方式
          value: 1,
          label: '快递寄送'
        }, {
          value: 2,
          label: '上门取件'
        }, {
          value: 3,
          label: '上门取件 + 快递寄送'
        }, {
          value: 4,
          label: '无交付物'
        }],
        value: '',
        input: '',
        // province: 1,
        // city: 1,
        // county: 1
        SecondFloorList: [],
        Specificationssku: [], // sku
        Specificationsindex: 0,
        comparison: [],
        rules: {
          title: [
             { required: true, message: '请填写名称', trigger: 'change' }
          ],
          firstLevel: [
            { required: true, message: '请选择一级类目', trigger: 'change' }
          ],
          categoryId: [
            { required: true, message: '请选择二级类目', trigger: 'change' }
          ],
          deliverType:  [
            { required: true, message: '请选择支持配送方式', trigger: 'change' }
          ],
          ord: [
            { validator: validateord, trigger: 'change' }
          ],
          nowPrice: [
            { validator: validatenowPrice, trigger: 'change' }
          ],
          originalPrice: [
            { validator: validateoriginalPrice, trigger: 'change' }
          ],
          days: [
            { validator: validatedays, trigger: 'change' }
          ],
          keywords: [
            { validator: validatekeywords, trigger: 'change' }
          ]
        }
    }
  },
  watch: {
	serverList(val) { // 监听广告位详情的变化
		this.data = val
    if (this.data.servicesSpecificationList[0]) {
      this.Specificationssku = this.data.servicesSpecificationList[0].servicesSpecificationDetailList
    }else{
      this.Specificationssku = []
    }
    if (this.data.type!=1) {
      sessionStorage.setItem('pirce1',JSON.stringify(this.data.arr1))
      this.firstFloor()
    }
    let ssr = 'data'
    this.$refs[ssr].resetFields();
	}
  },
  created: function() {
    // console.log(this.$store.state.home.serverList)
  },
  methods:  {
    description(res) {
      this.data.description = res
    },
     handleClose(tag) {
        this.data.dynamicTags.splice(this.data.dynamicTags.indexOf(tag), 1);
        this.AddSpecificationsku()
      let len = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.length-1
      this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(len,1)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.data.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
     handleClose1(tag) {
        this.data.thing.splice(this.data.thing.indexOf(tag), 1);
        this.AddSpecificationsku()
      let len = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.length-1
      this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(len,1)
      },

      showInput1() {
        this.inputVisible1 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm1() {
        let inputValue = this.inputValue1;
        if (inputValue) {
          this.data.thing.push(inputValue);
        }
        this.inputVisible1 = false;
        this.inputValue1 = '';
      },
    priceCh() { // 存储进行比较的价格
      sessionStorage.setItem('pirce1',JSON.stringify(this.data.arr))
      this.minprice()
    },
    minprice() { // 计算最低价格
      let price = []
      for (let i = 0; i < this.data.arr.length; i++) {
        if (this.data.arr[i]!='') {
          if (this.data.arr[i].ll!="") {
            price.push(Number(this.data.arr[i].ll))
          }
        }
      }
      function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                    var temp = arr[j+1];        // 元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
      }
      bubbleSort(price)
      this.data.nowPrice = price[0]
      this.AddSpecificationsku()
      if (this.data.servicesSpecificationList[this.Specificationsindex]) {
        let len = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.length-1
      this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(len,1)
      }
      
    },
    specificationsCancal(index) { // 删除sku
      this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(index,1)
      this.matchingprice()// 匹配价格(sku)
      this.minprice()
    },
    Specificationsdelete(index) { // 删除规格
      this.data.servicesSpecificationList.splice(index,1)
      if (index==this.Specificationsindex) {
        this.Specificationssku = []
        // this.Specificationsindex = 0
      }
      this.matchingprice()// 匹配价格(sku)
      this.minprice()
    },
    AddSpecifications() { // 添加规格
      this.$set(this.data.servicesSpecificationList, this.data.servicesSpecificationList.length, {title:'',servicesSpecificationDetailList:[]})
    },
    AddSpecificationsku() { // 添加sku
      if (this.data.servicesSpecificationList[this.Specificationsindex]) {
        this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.push({
        title: ''
        })
        this.Specificationssku = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList
      }
    },
    Specificationsgai(index,item) { // 修改当前选中的index
      this.Specificationsindex = index
      this.Specificationssku = item.servicesSpecificationDetailList
    },
    matchingprice1(index,title){
      if (title=='') {
        return false
      }
      let data1 = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList
      let ssr =1
      for (var i = 0; i < data1.length-1; i++) {
        if (index!=i) {
        if (data1[i].title==title) {
          ssr++
        }
        }
      }
      if (ssr==1) {
        this.matchingprice(index)
      }
    },
    matchingprice(index) { // 匹配价格(sku)
      var comparison1 = []
      var comparison2 = []
      if (sessionStorage.getItem("pirce")) {
          comparison1=JSON.parse(sessionStorage.getItem("pirce")); //this.templateData是父组件传递的对象
        }
      if (sessionStorage.getItem("pirce1")) {
          comparison2=JSON.parse(sessionStorage.getItem("pirce1")); //this.templateData是父组件传递的对象
        }
      var that = this
      // console.log(this.data.servicesSpecificationList)
      var ssr = [] //取出里面的值
      for (let i = 0; i < this.data.servicesSpecificationList.length; i++) {
        let ssa = []
        for (let l = 0; l < this.data.servicesSpecificationList[i].servicesSpecificationDetailList.length; l++) {
          if (this.data.servicesSpecificationList[i].servicesSpecificationDetailList[l].title!="") {
            ssa.push(this.data.servicesSpecificationList[i].servicesSpecificationDetailList[l].title)
          }
        }
        ssr.push(ssa)
      }

      var results = []
      var result = []
      var resultsLength = ''
      var duibi = []
      function dfs(arr, depth){
            if (arr[depth]){
                for (var i = 0; i < arr[depth].length; i++) {
                    //result数组保留不同数组的值 每次循环保留一次  如result.0 = "a" result.0 = "b"
                    // result.0 = "c" 因为depth在这一层的值就是0 下一层for循环里面才会变成1
                    result[depth] = arr[depth][i];
                    //判断depth 是否等于数组减一  因为外面已经先调用的了一次for循环，所以递归要少一次
                    if (depth != arr.length - 1) {
                        ///重新调用dfs() 这里要注意depth+1
                        dfs(arr, depth + 1)
                    } else {
                        let param={};
                        let param1={};
                        ////这里应该要再优化一下
                        for(var r=0;r<arr.length;r++){
                            resultsLength =r;
                            param['l'+r]=result[r]
                        }
                        for(var r=0;r<arr.length;r++){
                            resultsLength =r;
                            param1['l'+r]=result[r]
                        }
                        duibi.push(param1);
                        let start = 1
                        for (let i = 0; i < comparison1.length; i++) {
                          if(JSON.stringify(comparison1[i]) == JSON.stringify(param)&&start==1){
                            start++
                            param = comparison2[i]
                          }
                        }
                        if (start==1) {
                          param['ll'] = 0
                        }
                        results.push(param);
                        param={}
                    }
                }
            }
        }
        dfs(ssr,0) 
        this.data.arr = results
        if (index==0||index) {
          this.AddSpecificationsku()
          if (this.data.servicesSpecificationList[this.Specificationsindex]) {
            let len = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.length-1
          this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(len,1)
          }
        }
        // JSON.stringify(this.data.arr)
        // console.log(duibi)
        sessionStorage.setItem('pirce',JSON.stringify(duibi))
        sessionStorage.setItem('pirce1',JSON.stringify(this.data.arr))
        // console.log(this.data.arr)
    },
    firstFloor: function() {
      this.SecondFloorList = []
      for (let i = 0; i < this.data.SecondFloor.length; i++) {
        if (this.data.SecondFloor[i].pid==this.data.firstLevel) {
          this.SecondFloorList.push(this.data.SecondFloor[i])
        }
      }
    },
  	Preservation: function(formName) {
      var that = this
       this.$refs[formName].validate((valid) => { // 表单验证
          if (valid) {
            
      let len = that.data.servicesSpecificationList.length
      var arr = []
      for (var i = 0; i < that.data.arr.length; i++) {
        let abb = []
        for (let l = 0; l < len; l++) {
          let zi = 'l'+l
          abb.push(that.data.arr[i][zi])
        }
        abb.push(that.data.arr[i].ll)
        arr.push(abb)
      }
      var a1 = ''
      for (let i = 0; i < that.data.dynamicTags.length; i++) {
        if (i==that.data.dynamicTags.length-1) {
          a1 += that.data.dynamicTags[i]
        }else{
          a1 += that.data.dynamicTags[i]+'@@@'
        }
      }
      var b1 = ''
      for (let i = 0; i < that.data.thing.length; i++) {
        if (i==that.data.thing.length-1) {
          b1 += that.data.thing[i]
        }else{
          b1 += that.data.thing[i]+'@@@'
        }
      }
      for (var i = that.data.servicesSpecificationList.length - 1; i >= 0; i--) {
        delete that.data.servicesSpecificationList[i].createTime 
        delete that.data.servicesSpecificationList[i].finishTime
        for (var l = 0; l < that.data.servicesSpecificationList[i].servicesSpecificationDetailList
.length; l++) {
          delete that.data.servicesSpecificationList[i].servicesSpecificationDetailList[l].createTimne
        }
      }
      let ssr = {
        // services:{
          servicesSpecificationList: that.data.servicesSpecificationList,
          services: {
              title: that.data.title,
              categoryId: that.data.categoryId,
              deliverType: that.data.deliverType,
              content: that.data.content,
              days: that.data.days,
              description: that.data.description,
              firstLevel: that.data.firstLevel,
              imgUrl: that.data.imgUrl,
              nowPrice: that.data.nowPrice,
              originalPrice: that.data.originalPrice,
              region: '北京',
              ord: that.data.ord,
              receiveDatum: a1,
              needDatum: b1,
              keywords: that.data.keywords
            },
          servicesSku: arr
        // }
      }
      if (that.data.servicesSpecificationList=='') {
        delete ssr.servicesSku
      }
      if (that.data.servicesSpecificationList) {
        if (that.data.servicesSpecificationList[0]) {
          if (that.data.servicesSpecificationList[0].title=='') {
            ssr.servicesSpecificationList =[]
            delete ssr.servicesSku
          }
        }
      }
      if (that.data.id) {
        ssr.services.id = that.data.id
      }
      if (that.data.type) {
        var msg = '新建成功'
      }else{
        var msg = '修改成功'
      }
      this.$confirm('确认保存！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http(ApiSetting.saveUpdateServices,ssr)  
          .then((res)=>{
            if (res.data.status==1) {
              this.$notify({
                title: '成功',
                message: msg,
                type: 'success'
              });
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
      this.AddSpecificationsku()
      let len = this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.length-1
      this.data.servicesSpecificationList[this.Specificationsindex].servicesSpecificationDetailList.splice(len,1)
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
    serverList() {  
      return this.$store.state.home.serverList;  
    }  
  },
  components: {
  	ComponentUploading: ComponentUploading,
    ComponentwangEditor: ComponentwangEditor
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

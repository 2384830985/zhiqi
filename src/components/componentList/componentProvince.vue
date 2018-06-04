<template>
<!-- 省市区三级联动 -->
<div>
 <el-select v-model="newprovince" placeholder="省份">
    <el-option
      v-for="item in PROVINCE1"
      :key="item.ProID"
      :label="item.ProName"
      :value="item.ProID">
    </el-option>
  </el-select>
 <el-select v-model="newcity" placeholder="市区">
    <el-option
      v-for="item in cityList"
      :key="item.CityID"
      :label="item.CityName"
      :value="item.CityID">
    </el-option>
  </el-select>
 <el-select v-model="newcounty" placeholder="县区">
    <el-option
      v-for="item in countyList"
      :key="item.Id"
      :label="item.countyName"
      :value="item.Id">
    </el-option>
  </el-select>
</div>
</template>

<script type="text/javascript">
import global_ from '../../method/method'
export default {
  props: ['province','city','county'],
  data () {
    return {
      newprovince: this.province,
      newcity: this.city,
      newcounty: this.county,
      cityList: [],
      countyList: [],
      PROVINCE1: global_.province1,
      CITY1: global_.city1,
      COUNTY1: global_.county1
    }
  },
  methods: {
  },
  created () {
  	let that = this;
  	that.cityList = [];
  	that.countyList = [];
  	that.CITY1.forEach(function(res,index){
			if (res.ProID==that.province) {
				that.cityList.push(res)
			}
		})
	that.COUNTY1.forEach(function(res,index){
		if (res.CityID==that.city) {
			that.countyList.push(res)
		}
	})
  },
  watch: {
	province(val) { // 监听父组件的值改变后传入当前的省的model
		this.newprovince = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
  	},
	city(val) { // 监听父组件的值改变后传入当前的省的model
		this.newcity = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
  	},
	county(val) { // 监听父组件的值改变后传入当前的省的model
		this.newcounty = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
  	},
	newprovince(val) { // 省改变操作
		let that = this;
		this.newcity = '';
		this.newcounty = '';
		that.cityList = [];
		that.countyList = [];
		this.$store.commit('chProvince',val)
		that.CITY1.forEach(function(res,index){
			if (res.ProID==val) {
				that.cityList.push(res)
			}
		})
	},
	newcity(val) { // 市改变操作
		let that = this;
		that.countyList = [];
		this.newcounty = '';
		this.$store.commit('chCity',val)
		that.COUNTY1.forEach(function(res,index){
			if (res.CityID==val) {
				that.countyList.push(res)
			}
		})
	},
	newcounty(val) { // 区改变操作
		this.$store.commit('chCounty',val)
	}

  },
}
</script>

<style lang="less" scoped>
</style>

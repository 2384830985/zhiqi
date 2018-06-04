<template>
<!-- 昨日新增 -->
<div class="t-zq-home">
	<div class="t-zq-dynamic">
		<el-row :gutter="20">
		  <el-col :span="6">
			  <div class="grid-content bg-purple">
			  	<div class="t-grid-content-title">今日新增注册用户</div>
			  	<div class="t-grid-content-number">{{userData.userData.todaySum}}</div>
			  	<div class="t-grid-content-title m-b-20">昨日新增<span>&nbsp;&nbsp;{{userData.userData.yesterdaySum}}&nbsp;&nbsp;&nbsp;&nbsp;</span>本周新增<span>&nbsp;&nbsp;{{userData.userData.weekSum}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
			  	<div class="t-grid-content-cumulative">累计注册用户<span>&nbsp;&nbsp;{{userData.userData.userSum}}</span></div>
			  </div>
		  </el-col>
		  <el-col :span="6">
			  <div class="grid-content bg-purple">
			  	<div class="t-grid-content-title">待审核委托</div>
			  	<div class="t-grid-content-number">{{userData.requestServicesData.checksSum}}</div>
			  	<div class="t-grid-content-title m-b-20">待支付<span>&nbsp;&nbsp;{{userData.requestServicesData.paySum}}&nbsp;&nbsp;&nbsp;&nbsp;</span>办理中<span>&nbsp;&nbsp;{{userData.requestServicesData.makeSum}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
			  	<div class="t-grid-content-cumulative">累计委托<span>&nbsp;&nbsp;{{userData.requestServicesData.rServicesSum}}</span></div>
			  </div>
		  </el-col>
		  <el-col :span="6">
			  <div class="grid-content bg-purple">
			  	<div class="t-grid-content-title">待确认约谈</div>
			  	<div class="t-grid-content-number">350</div>
			  	<div class="t-grid-content-title m-b-20">待支付<span>&nbsp;&nbsp;433&nbsp;&nbsp;&nbsp;&nbsp;</span>已支付<span>&nbsp;&nbsp;2000&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
			  	<div class="t-grid-content-cumulative">累计约谈<span>&nbsp;&nbsp;20050</span></div>
			  </div>
		  </el-col>
		  <el-col :span="6">
			  <div class="grid-content bg-purple">
			  	<div class="t-grid-content-title">待回复问答</div>
			  	<div class="t-grid-content-number">350</div>
			  	<div class="t-grid-content-title m-b-20">待支付<span>&nbsp;&nbsp;433&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
			  	<div class="t-grid-content-cumulative">累计问答<span>&nbsp;&nbsp;20050</span></div>
			  </div>
		  </el-col>
		</el-row>
	</div>
	<div class="t-zq-trend">
		<div class="t-zq-trend-header">
			<div class="t-zq-trend-user" :class="type==0?'color-409eff':''" @click="changetype(0,'type')">新用户</div>
			<div class="t-zq-trend-user" :class="type==1?'color-409eff':''" @click="changetype(1,'type')">新企业</div>
			<div class="t-zq-trend-user" :class="type==2?'color-409eff':''" @click="changetype(2,'type')">委托</div>
			<div class="t-zq-trend-user" :class="type==3?'color-409eff':''" @click="changetype(3,'type')">约谈</div>
			<div class="t-zq-trend-user" :class="type==4?'color-409eff':''" @click="changetype(4,'type')">订单</div>
			<div class="block t-zq-trend-time">
			    <el-date-picker
			      v-model="time1"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      value-format="timestamp"
			      :blur="timelement()"
			      >
			    </el-date-picker>
			</div>
			<div class="t-right">
				<div class="t-zq-trend-data" :class="time123==0?'color-409eff':''" @click="changetype1(0,'time')">今日</div>
				<div class="t-zq-trend-data" :class="time123==1?'color-409eff':''" @click="changetype1(1,'time')">本周</div>
				<div class="t-zq-trend-data" :class="time123==2?'color-409eff':''" @click="changetype1(2,'time')">本月</div>
				<div class="t-zq-trend-data" :class="time123==3?'color-409eff':''" @click="changetype1(3,'time')">全年</div>	
			</div>
		</div>
		<div class="myChart" id="myChart"></div>
	</div>
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js'
import Echarts from 'echarts'
export default {
  data () {
    return {
        time1: '',
        time2: '',
        type: 0,
        time123: 0,
        startTime: '',
        finishTime: '',
        identification: '',
        userData: {
        	userData:{},
        	requestServicesData: {}
        }, // 用户数据
        dataList: [],
        name: '新用户'
    }
  },
  methods: {
  	timelement() {
  		// --------------------------------------------------------------------------自选时间
  		// console.log(this.start(this.time1[0]))
  		// console.log(this.end(this.time1[1]))
  		if (this.time1) {
  			// console.log(this.start(this.timestampToTime(this.time1[0]/1000)))
	  		// console.log(this.end(this.timestampToTime(this.time1[1]/1000)))
	  		// console.log(Math.ceil((this.time1[1]/1000-this.time1[0]/1000)/86400))
	  		var arr = [];
	  		let index = Math.ceil((this.time1[1]/1000-this.time1[0]/1000)/86400)
	  		for (var i = 0; i < index+1; i++) {
	  			let starte = this.time1[0]/1000 + i*86400 // 开始时间
	  			arr.push(this.timestampToTime(starte))
	  		}
	  		if ((this.time1[1]/1000-this.time1[0]/1000)<86400) {
	  			this.dataList = ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点'];
	  			this.time123 = 555
	  			this.identification = 'hour'
	  		}else{
	  			this.time123 = 666
	  			this.dataList = arr;
	  			this.identification = 'day'
	  		}
	  		this.drawLine()
	  		// console.log(this.time1[0]/1000)
	  		// console.log(this.time1[1]/1000)
  		}
  	},
  	changetype(res,type) { // 样式
  		this[type] = res
  		if (res==0) {
  			this.name = '新用户'
  		}
  		if (res==1) {
  			this.name = '新企业'
  		}
  		if (res==2) {
  			this.name = '委托'
  		}
  		if (res==3) {
  			this.name = '约谈'
  		}
  		if (res==4) {
  			this.name = '订单'
  		}
  		this.drawLine()
  	},
  	changetype1(res,type) { // 日期
  		if (this.time1!='') {
  			this.time1 = ''
  		}
  		this.time123 = res
  		if (res==0) { // 今天 24小时
  			// --------------------------------------------------------------------------今天
  			this.startTime = this.start(this.newdate())
  			this.finishTime = this.end(this.newdate())
  			this.identification = 'hour'
  			this.dataList = ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点'];
  			// console.log(this.start(this.newdate())) // 开始时间 
  			// console.log(this.end(this.newdate())) // 结束时间 
  			this.drawLine()
  		}else if (res==1) { // 本周 7天
  			// --------------------------------------------------------------------------本周
  			if (new Date().getDay()==0) {
  				var index = 7
  			}else{
  				var index = new Date().getDay(); // 当前礼拜几
  			}
  			let timestamp = Date.parse(new Date())/1000;
  			let startdate = timestamp - index*86400 // 开始时间
  			let arr = [];
  			for (var i = index; i >=0; i--) {
  				let starte = timestamp - i*86400 // 开始时间
  				arr.push(this.timestampToTime(starte))
  			}
  			// console.log(arr)
  			// console.log(this.start(this.timestampToTime(startdate)))
  			// console.log(this.end(this.newdate())) // 结束时间 
  			this.startTime = this.start(this.timestampToTime(startdate))
  			this.finishTime = this.end(this.newdate())
  			this.dataList = arr;
  			this.identification = 'day'
  			this.drawLine()
  		}else if (res==2) { // 本月 30天
  			// --------------------------------------------------------------------------本月
  			// let timestamp = Date.parse(new Date())/1000;
  			let timestamp = Date.parse(this.end(this.newdate()))/1000
  			let startdate = timestamp - (this.timestampToTimeri()-1)*86400 

  			let arr = [];
  			for (var i = this.timestampToTimeri()-1; i>=0; i--) {
  				let starte = timestamp - i*86400 // 开始时间
  				arr.push(this.timestampToTime(starte))
  			}
			// console.log(arr)
  	// 		console.log(this.start(this.timestampToTime1(startdate)))// 开始时间
  	// 		console.log(this.end(this.newdate())) // 结束时间 
  			this.startTime = this.start(this.timestampToTime1(startdate))
  			this.finishTime = this.end(this.newdate())
  			this.dataList = arr;
  			this.identification = 'day'
  			this.drawLine()
  		}else if (res==3) { // 全年 12月
  			let arr = [];
  			for (var i = 0; i < this.timestampToTimeyue1(); i++) {
  				if (i+1<10) {
					arr.push(('0'+(i+1))+'月')
  				}else{
  					arr.push((i+1)+'月')
  				}
  			}
  			// console.log(arr)
  			// --------------------------------------------------------------------------今年
  			// console.log(this.start(this.timestampToTimeyue()))// 开始时间
  			// console.log(this.end(this.newdate())) // 结束时间 
  			this.startTime = this.start(this.timestampToTimeyue())
  			this.finishTime = this.end(this.newdate())
  			this.dataList = arr;
  			this.identification = 'month'
  			this.drawLine()
  		}
  	},
  	newdate() {
		let day2 = new Date();
		day2.setTime(day2.getTime());
		let fen = day2.getMonth()+1
		if ((day2.getMonth()+1)<10) {
			fen = '0'+fen
		}
		let miao = day2.getDate()
		if (day2.getDate()<10) {
			miao = '0'+miao
		}
		return day2.getFullYear()+"-" + fen + "-" + miao;
  	},
  	timestampToTime(timestamp) { // 获取当前年月日
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
        // let D = date.getDate();
        // let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D;
    },
  	timestampToTime1(timestamp) { // 获取当前年月日
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate());
        return Y+M+D;
    },
  	timestampToTimeri() { // 获取当前是几日
  		let day2 = new Date();
		day2.setTime(day2.getTime());
        return day2.getDate();
    },
  	timestampToTimeyue() { // 获取当前是几月
  		let day2 = new Date();
		day2.setTime(day2.getTime());
        return day2.getFullYear()+"-" + '01' + "-" + '01';
    },
  	timestampToTimeyue1() { // 获取当前是几月
  		let day2 = new Date();
		day2.setTime(day2.getTime());
        return day2.getMonth()+1;
    },
  	end(res) {
		return res + ' ' + '23:59:59'
  	},
  	start(res) {
		return res + ' ' + '00:00:00'
  	},
  	Calculation(res) {// 把数据放到当前的数据里面
  		let arr = [];
  		// console.log(this.dataList.length)
  		if (this.time123==0||this.time123==555) {
  			for (var i = 0; i < this.dataList.length; i++) {// 小时
  				var a=1;
  				for (var l = res.length - 1; l >= 0; l--) {
  					if (this.dataList[i]==res[l].date.split(' ')[1]+'点') {
  						arr.push(res[l].rsNum)
  						a++
  					}
  				}
  				if (a==1) {
  					arr.push(0)
  				}
  			}
  		}
  		if (this.time123==1||this.time123==2||this.time123==666) { // 天
  			for (var i = 0; i < this.dataList.length; i++) {
  				var a=1;
  				for (var l = res.length - 1; l >= 0; l--) {
  					if (this.dataList[i]==res[l].date) {
  						arr.push(res[l].rsNum)
  						a++
  					}
  				}
  				if (a==1) {
  					arr.push(0)
  				}
  			}
  		}
  		if (this.time123==3) {
  			for (var i = 0; i < this.dataList.length; i++) {// 月
  				var a=1;
  				for (var l = res.length - 1; l >= 0; l--) {
  					if (this.dataList[i]==res[l].date.split('-')[1]+'月') {
  						arr.push(res[l].rsNum)
  						a++
  					}
  				}
  				if (a==1) {
  					arr.push(0)
  				}
  			}
  		}
  		// console.log(arr)
  		return arr
  	},
  	drawLine(startTime,finishTime,identification) {
  		var that = this;
  		var atre = [];
  		http(ApiSetting.getDataStartTimeFinishTime,{
	  			requestServices: {
	  				startTime: that.startTime,
	  				finishTime: that.finishTime,
	  				identification: that.identification
	  			}
  			}
  			) 
	      .then((res)=>{
	        if (res.data.status==1) {
	          // console.log(res.data.data)
	          if (that.type==0) {
	          	atre = that.Calculation(res.data.data.userMap)
	          }else if (that.type==1) {
	          	atre = that.Calculation(res.data.data.companyMap)
	          }else if (that.type==2) {
	          	atre = that.Calculation(res.data.data.requestServicesMap)
	          }else if (that.type==3) {
	          	atre = that.Calculation(res.data.data.requestConsultationMapB)
	          }else if (that.type==4) {
	          	atre = that.Calculation(res.data.data.ordersMap)
	          }
	           // 基于准备好的dom，初始化echarts实例
      let myChart = Echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
         color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : that.dataList,//下面显示内容
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name: that.name,
	            type:'bar',
	            barWidth: '60%',
	            data:atre // 当前是数据
	        }
	    ]
      });
	        }
	      },(error)=>{  
	        console.log(error)
	      })
     
    }
  },
  mounted() {
  	var that = this;
  	http(ApiSetting.getDataTodayOrYesterdaySum,{})  
      .then((res)=>{
        if (res.data.status==1) {
          that.userData = res.data.data
        }
      },(error)=>{  
        console.log(error)
      })
    this.changetype1(0)
    this.drawLine();
  }
}
</script>

<style lang="less" scoped>
.color-409eff{
	color: #409eff!important;
	border-bottom: 1px solid #409eff
}
.myChart{
	width: 100%;
	height: 500px;
}
.t-zq-trend-time{
	float: right;
	margin: 5px;
}
.t-zq-trend-header{
	width: 100%;
	height: 50px;
	border-bottom: 1px solid  #E8E8E8;
}
.t-zq-trend-data{
	font-size: 14px;
	cursor: pointer;
	padding: 14px 12px;
	color: #000000;
	display: inline-block;
}
.t-zq-trend-data:hover{
		color: #1890FF;
	}
.t-zq-trend-user:focus{
		color: #1890FF;
	}
.is-active {
    background-color: white!important;
}
.t-zq-home{
	width: 100%;
	height: 100%;
	padding: 20px 20px 40px 20px;
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
  	padding: 20px 24px 0;
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 2px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .t-grid-content-title{
  	color:rgba(0,0,0,0.45);
  	font-size: 14px;
  	line-height: 22px;
  	span{
		color:rgba(0,0,0,0.85);
		line-height:22px;
  	}
  }
  .t-grid-content-number{
  	font-size: 30px;
  	line-height:38px;
  	color:rgba(0,0,0,0.85);
  	margin-bottom: 20px;
  	font-family:HelveticaNeue;
  }
  .t-grid-content-cumulative{
  	border-top: 1px solid #E8E8E8;
  	padding: 9px 0 10px;
    font-size:14px;
    color:rgba(0,0,0,0.65);
    line-height:22px;
    span{
		color:rgba(0,0,0,0.85);
		line-height:22px;
  	}
  }
  .t-zq-trend{
  	width: 100%;
  	height: 600px;
  	background: white;
  	margin-top: 24px;
  }
  .t-zq-trend-order{
  margin-right: 108px;
  }
  .t-zq-trend-user{
    font-size: 14px;
    cursor: pointer;
    padding: 14px 32px;
    color: #000000;
    display: inline-block;
  }
  .t-zq-trend-user:hover{
    color: #1890FF;
  }
@media screen and (max-width: 1450px) {
    .t-zq-trend-user{
      padding: 14px 20px;
    }
}
</style>

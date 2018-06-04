<template>
<!-- 分页 -->
<div>
<el-pagination
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		layout="prev, pager, next"
    :current-page="currentPage"
		:page-size="10"
		:total="pagesNumber">
</el-pagination>
</div>
</template>

<script type="text/javascript">
export default {
  props: ['pagesNumber'],
  data () {
    return {
      currentPage: Number(this.$route.params.page) || 1
    }
  },
  computed: {
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
      var url = last.split(':')[0].split('"')[1]
      for(let variable  in this.$route.params){   //variable 为属性名
        if (variable=='page') {
          url += val+'/'
        }else if (variable=='size') {
          url += 10+'/'
        }else{
          url += this.$route.params[variable]+'/'
        }
        
      }
      var basic = url.substr(0, url.length - 1);
      this.$router.push({
        path:basic, // 获取当前连接，重新跳转
      })
    },
    getUrlParam: function () {
    }
  },
  computed: {  
    listenshowpage1() {
        return this.$store.state.initial;  
    }  
  },  
  watch: {  
    listenshowpage1: function(a, b) {  
      this.currentPage =1;
       var last=JSON.stringify(this.$route.matched[this.$route.matched.length-1].path)
      var url = last.split(':')[0].split('"')[1]
      for(let variable  in this.$route.params){   //variable 为属性名
        if (variable=='page') {
          url += 1+'/'
        }else if (variable=='size') {
          url += 10+'/'
        }else{
          url += this.$route.params[variable]+'/'
        }
        
      }
      var basic = url.substr(0, url.length - 1);
      this.$router.push({
        path:basic, // 获取当前连接，重新跳转
      })
    },
    '$route' (to, from) {
      this.currentPage = Number(this.$route.params.page)
      // 对路由变化作出响应...
    }
  },  
}
</script>

<style lang="less" scoped>
</style>

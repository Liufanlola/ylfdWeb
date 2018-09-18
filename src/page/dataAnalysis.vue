<template>
  <el-container>
    <el-aside width='200px'>
      <keep-alive>
        <nav-component v-bind:navList=navList></nav-component>
      </keep-alive>
    </el-aside>
    <el-main>
      <el-row class="show-panel">
        <el-col><head-component v-bind:backRouter="backRouter"></head-component></el-col>
      </el-row>
      <el-row>
        <el-col class="show-panel-content">
          <router-view/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import navComponent from '../components/navComponent'
import headComponent from '../components/headComponent'
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      navList: [
        {
          index: '0',
          firstTitle: '风险分析报告概要',
          firstUrl: '/dataAnalysis/dataAnalysisSummary',
          secondUrl: '#',
          secondOrder: false,
          active: true
        },
        {
          index: '1',
          firstTitle: '运营商数据检索',
          firstUrl: '/dataAnalysis/dataSearch',
          secondUrl: '#',
          secondOrder: true,
          active: false
        },
        {
          index: '2',
          firstTitle: '多头借贷分析',
          firstUrl: '/dataAnalysis/creditAnalysis',
          secondUrl: '#',
          secondOrder: false,
          active: false
        },
        {
          index: '3',
          firstTitle: '关联信息检索',
          firstUrl: '/dataAnalysis/informationRetrieval',
          secondUrl: '#',
          secondOrder: false,
          active: false
        },
        {
          index: '4',
          firstTitle: '高频联系人TOP10',
          firstUrl: '/dataAnalysis/frequencyContact',
          secondUrl: '#',
          secondOrder: false,
          active: false
        },
        {
          index: '5',
          firstTitle: '授权书信息',
          firstUrl: '#',
          secondUrl: '#',
          secondOrder: false,
          active: false
        }
      ],
      backRouter: {
        url: '/enter/',
        name: '返回首页'
      }
    }
  },
  mounted: function () {
    this.getParams()
  },
  methods: {
    getParams () {
    //   const userParams = this.$route.params.user
    //   this.user = userParams
      this.user = localStorage.getItem('user')
    },
    backLogin () {
      localStorage.removeItem('user')
      localStorage.removeItem('userInfo')
    }
  },
  components: {navComponent, headComponent}
}
</script>

<style lang="less" scoped>
.el-main{
  padding: 0 !important;
}
.show-panel-content{
  padding: 20px;
}
</style>

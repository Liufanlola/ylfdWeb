<template>
  <el-container>
    <el-aside width='200px'>
      <nav-component v-bind:navList=navList></nav-component>
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
      navList: [
        {
          index: '0',
          firstTitle: '首页',
          firstUrl: '/enter/',
          secondUrl: '#',
          secondOrder: false,
          active: true
        },
        {
          index: '1',
          firstTitle: '服务中心',
          secondTitle: '风控产品',
          firstUrl: '#',
          secondUrl: '/riskControlProducts',
          secondOrder: true,
          active: false
        },
        {
          index: '2',
          firstTitle: '历史报告查询',
          secondTitle: '风控产品报告',
          firstUrl: '#',
          secondUrl: '/enter/riskControlProductsReports',
          secondOrder: true,
          active: false
        },
        {
          index: '3',
          firstTitle: '个人信息',
          firstUrl: '#',
          secondUrl: '#',
          secondOrder: false,
          active: false
        }
      ],
      backRouter: {
        url: '/',
        name: '退出'
      }
    }
  },
  mounted: function () {
  },
  methods: {
  },
  components: { navComponent, headComponent }
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

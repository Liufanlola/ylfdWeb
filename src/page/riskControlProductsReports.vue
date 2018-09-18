<template>
  <paging-component v-bind:queryParam="queryParam" v-on:checkReports="pageLink($event)"></paging-component>
</template>
<script>
import pagingComponent from '../components/pagingComponent'
export default {
  name: 'productReport',
  data () {
    return {
      name: '',
      phoneNum: '',
      credit: '',
      queryTime: '',
      queryParam: {
        columnHeadings: '历史记录查询',
        title: ['手机号', '姓名', '身份证', '查询时间', '查询状态', '操作'],
        query: ['phone', 'name', 'sid', 'searchdate', 'dhbstatusText'],
        interfaceName: 'queryCreditLog',
        check: true,
        search: true
      }
    }
  },
  components: { pagingComponent },
  methods: {
    pageLink: function (item) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      let obj = JSON.stringify({'userName': userData.user, 'authorization': userData.authorization, 'name': item.name, 'phoneNum': item.phone, 'credit': item.sid})
      localStorage.setItem('userInfo', obj)
      this.$router.push({
        name: 'dataAnalysisSummary',
        path: '/dataAnalysis/dataAnalysisSummary'
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>

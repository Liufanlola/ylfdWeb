<template>
    <div class="content">
      <paging-component v-bind:queryParam="queryParam"></paging-component>
      <paging-component v-bind:queryParam="debtDetect"></paging-component>
      <paging-component v-bind:queryParam="applyDetect"></paging-component>
    </div>
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
        columnHeadings: '信贷逾期详情',
        title: ['检查项目名', '风险等级', '逾期时间', '逾期天数', '逾期金额'],
        query: ['itemName', 'riskLevel', 'overdueTime', 'overduedayRange', 'overdueAmount'],
        interfaceName: 'nameOverdue',
        check: false,
        search: false
      },
      debtDetect: {
        columnHeadings: '多平台借贷负债检测',
        title: ['风险等级', '多头借贷', '借贷详情', '维度命中多头个数', '维度命中多头详情', '维度显示名'],
        query: ['riskLevel', 'platformCount', 'platformDetail', 'count', 'detail', 'dimension'],
        interfaceName: 'platBorrow',
        check: false,
        search: false
      },
      applyDetect: {
        columnHeadings: '多平台借贷申请检测',
        title: ['检查项目名', '风险等级', '多头借贷', '借贷详情', '维度命中多头个数', '维度命中多头详情', '维度显示名'],
        query: ['itemName', 'riskLevel', 'platformCount', 'platformDetail', 'count', 'detail', 'dimension'],
        interfaceName: 'platForm',
        check: false,
        search: false
      }
    }
  },
  components: { pagingComponent }
}
</script>

<style lang="less" scoped>
</style>

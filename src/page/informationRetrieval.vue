<template>
    <div class="container-fluid">
      <div class="content">
        <paging-component v-bind:queryParam="court"></paging-component>
        <paging-component v-bind:queryParam="customer"></paging-component>
      </div>
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
      court: {
        columnHeadings: '法院信息详情',
        title: ['姓名', '性别', '年龄', '省份', '风险类型', '执行标的', '立案时间', '失信被执行人行为具体详情', '执行依据文号', '做出依据执行单位', '被执行人义务', '案号', '执行法院', '执行状态', '被执行人履行情况'],
        query: ['name', 'gender', 'age', 'province', 'fraudType', 'executionNumber', 'filingTime', 'discreditDetail', 'executionBase', 'executionDepartment', 'duty', 'caseNumber', 'courtNumber', 'executionStatus', 'situation'],
        interfaceName: 'courtInfo',
        check: false,
        search: false
      },
      customer: {
        columnHeadings: '客户行为检测',
        title: ['检查项目名', '风险等级', '命中详情', '命中明细'],
        query: ['itemName', 'riskLevel', 'detail', 'data'],
        interfaceName: 'FreqDetail',
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

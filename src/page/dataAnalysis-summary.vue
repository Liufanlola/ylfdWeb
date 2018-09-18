<template>
  <div class="mainContent">
    <h1 class="firstTitle">风险分析报告概要</h1>
    <risk-reports v-if="riskData" v-bind:riskData="riskData"></risk-reports>
  </div>
</template>
<script>
import axios from 'axios'
import riskReports from '../components/riskReports'
export default {
  name: 'riskReport',
  data () {
    return {
      riskData: {
        title: '风险分析报告',
        navTitle: ['扫描意见', '姓名', '身份证', '手机号', '命中的风险项目'],
        EnglishTitle: ['decision', 'applicant', 'idcard', 'phone', 'concern'],
        navContent: [],
        bgColor: '#50bfea'
      }
    }
  },
  components: { riskReports },
  created: function () {
  },
  mounted: function () {
    this.getparams()
  },
  methods: {
    getparams: function () {
      let param = new FormData()
      const obj = JSON.parse(localStorage.getItem('userInfo'))
      param.append('userName', obj.userName)
      param.append('Authorization', obj.authorization)
      param.append('tel', obj.phoneNum)
      param.append('card', obj.credit)
      param.append('name', obj.name)
      axios.post('/api/searchCreditLog', param, {
      }).then(res => {
        const that = this
        const riskreports = res.data.data
        for (var i = 0; i < that.riskData.EnglishTitle.length; i++) {
          const name = that.riskData.EnglishTitle[i]
          if (riskreports[name].indexOf(',') !== -1) {
            const newRiskReport = riskreports[name].split(',')
            that.riskData.navContent.push(newRiskReport)
          } else {
            const newRiskReport2 = new Array(riskreports[name])
            that.riskData.navContent.push(newRiskReport2)
          }
        }
      }).catch(res => {
        console.log(res)
      })
    }
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
</style>

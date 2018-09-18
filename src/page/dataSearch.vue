<template>
    <div class="mainContent">
        <h1 class="firstTitle">运营商数据检索</h1>
        <risk-reports v-if="riskData" v-bind:riskData="riskData" class="plate"></risk-reports>
        <el-row class="plate number" :gutter="10">
            <el-col :xs='24' :sm='24' :md='6' :lg='6'><div class="left-content" v-bind:style='{backgroundColor:dataSearch.bgColor,height:434+"px"}'>{{ dataSearch.title }}</div></el-col>
            <el-col :xs='24' :sm='24' :md='18' :lg='18'>
                <div class="right-content">
                    <el-row>
                        <el-col :span="8" class="list-name">{{ dataSearch.navTitle[0] }}</el-col>
                        <el-col :span="16" class="list-result">{{ dataSearch.navContent.activeregion }}</el-col>
                    </el-row>
                    <el-row class="phoneSilentTime">
                        <el-col :span="8" class="list-name" v-bind:style='{lineHeight:183+"px"}'>{{ dataSearch.navTitle[1] }}</el-col>
                        <el-col :span="16" class="secondPhoneSilentTime list-result">
                            <el-row>
                                <el-col :span="8" class="list-name">一月内静默次数</el-col>
                                <el-col :span="16" class="list-result">{{ dataSearch.navContent.oneMonth }}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="list-name">三月内静默次数</el-col>
                                <el-col :span="16" class="list-result">{{ dataSearch.navContent.threeMonth }}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="list-name last">六月内静默次数</el-col>
                                <el-col :span="16" class="list-result last">{{ dataSearch.navContent.sixMonth }}</el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="list-name">{{ dataSearch.navTitle[2] }}</el-col>
                        <el-col :span="16" class="list-result">{{ dataSearch.navContent.billaverage }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="list-name">{{ dataSearch.navTitle[3] }}</el-col>
                        <el-col :span="16" class="list-result">{{ dataSearch.navContent.phoneNum }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="list-name">{{ dataSearch.navTitle[4] }}</el-col>
                        <el-col :span="16" class="list-result">{{ dataSearch.navContent.tagslabel }}</el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row class="plate operate" :gutter="10">
            <el-col :xs='24' :sm='24' :md='6' :lg='6'><div class="left-content" :class="{twoHeight:operateData.hasDataActive}" v-bind:style='{backgroundColor:operateData.bgColor,height:(60+1)*(operateData.navContent.length+1)+"px"}'>{{ operateData.title }}</div></el-col>
            <el-col :xs='24' :sm='24' :md='18' :lg='18'>
                <div class="right-content">
                    <el-row>
                        <el-col :span="8">
                            <el-row class='list-name'>月份</el-row>
                            <el-row class='list-name' v-for="item in operateData.navContent" v-bind:key="item.month" :class="{ 'hasData': operateData.hasDataActive }">{{ item.month }}</el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row class='list-name'>通话次数</el-row>
                            <el-row class='list-name' v-for="item in operateData.navContent" v-bind:key="item.month" :class="{ 'hasData': operateData.hasDataActive }">{{ item.calltime }}</el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row class='list-name'>月实际消费</el-row>
                            <el-row class='list-name' v-for="item in operateData.navContent" v-bind:key="item.month" :class="{ 'hasData': operateData.hasDataActive }">{{ item.consume }}</el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-show="operateData.hasDataActive" :class="{noData:operateData.hasDataActive}">无数据</el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
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
        title: '归属地解析',
        navTitle: ['身份证所属地', '手机所属地', '登记居住地址', '入网时间'],
        EnglishTitle: ['cardAddress', 'phoneAddress', 'residence', 'opendate'],
        navContent: [],
        bgColor: '#50bfea'
      },
      dataSearch: {
        title: '号码使用情况',
        navTitle: ['活跃地区', '手机静默次数', '平均月消费', '一个月内通话号码总个数', '标签'],
        secondTitle: ['一个月内静默次数', '三个月内静默次数', '六个月内静默次数'],
        navContent: {},
        bgColor: '#5ed3b6'
      },
      operateData: {
        title: '近六个月运营 商数据分析',
        navTitle: ['月份', '通话次数', '月实际消费'],
        navContent: [],
        bgColor: '#ec5923',
        hasDataActive: true
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
      axios.post('/api/dataAnalysis', param, {
      }).then(res => {
        console.log(res)
        const riskreports = res.data
        const that = this
        if (res.status === 200) {
          // 归属地解析
          for (var i = 0; i < that.riskData.EnglishTitle.length; i++) {
            const name = that.riskData.EnglishTitle[i]
            if (riskreports.beloging[name].indexOf(',') !== -1) {
              const newRiskReport = riskreports.beloging[name].split(',')
              that.riskData.navContent.push(newRiskReport)
            } else {
              const newRiskReport2 = new Array(riskreports.beloging[name])
              that.riskData.navContent.push(newRiskReport2)
            }
          }
          // 号码使用情况
          for (let key in riskreports.numberUse) {
            if (riskreports.numberUse[key] === '') {
              riskreports.numberUse[key] = '无数据'
            }
          }
          this.dataSearch.navContent = riskreports.numberUse
          // 近六个月运营商数据
          if (riskreports.expenses.length === 0) {
            this.operateData.hasDataActive = true
          } else {
            riskreports.expenses.forEach((item) => {
              if (item.calltime === null) {
                item.calltime = '无数据'
              }
              if (item.consume === null) {
                item.consume = '无数据'
              }
              if (item.month === null) {
                item.month = '无数据'
              }
              this.operateData.navContent.push(item)
              this.operateData.hasDataActive = false
            })
          }
        } else {
          this.riskData.navContent = null
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
.plate{
    margin-bottom:30px;
}
.secondPhoneSilentTime{
    padding-left:0 !important;
}
.number{
    .right-content{
        .el-row:first-child{
            .list-result{
                border-top:none;
            }
        }
        .el-row:last-child{
            .list-name{
                border-bottom:none;
            }
        }
    }
}
.hasData{
    display: none;
}
.noData{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e6e6e6;
}
.twoHeight{
    height:120px !important;
}
</style>

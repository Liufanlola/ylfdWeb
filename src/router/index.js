import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from '@/page/login'
import Enter from '@/page/enter'
import RiskControlProducts from '@/page/riskControlProducts'
import RiskControlProductsReport from '@/page/riskControlProductsReports'
import index from '@/page/index'
import dataAnalysis from '@/page/dataAnalysis'
import dataAnalysisSummary from '@/page/dataAnalysis-summary'
import dataSearch from '@/page/dataSearch'
import creditAnalysis from '@/page/creditAnalysis'
import informationRetrieval from '@/page/informationRetrieval'
import frequencyContact from '@/page/frequencyContact'
import secondQuery from '@/page/secondQuery'
import thirdQuery from '@/page/thirdQuery'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/secondQuery',
      name: 'secondQuery',
      component: secondQuery
    },
    {
      path: '/thirdQuery',
      name: 'thirdQuery',
      component: thirdQuery
    },
    {
      path: '/enter',
      component: Enter,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: 'riskControlProductsReports',
          name: 'riskControlProductsReports',
          component: RiskControlProductsReport
        }
      ]
    },
    {
      path: '/riskControlProducts',
      name: 'riskControlProducts',
      component: RiskControlProducts
    },
    {
      path: '/dataAnalysis',
      component: dataAnalysis,
      children: [
        {
          path: '/dataAnalysis/dataAnalysisSummary',
          name: 'dataAnalysisSummary',
          component: dataAnalysisSummary
        },
        {
          path: '/dataAnalysis/dataSearch',
          name: 'dataSearch',
          component: dataSearch
        },
        {
          path: '/dataAnalysis/creditAnalysis',
          name: 'creditAnalysis',
          component: creditAnalysis
        },
        {
          path: '/dataAnalysis/informationRetrieval',
          name: 'informationRetrievals',
          component: informationRetrieval
        },
        {
          path: '/dataAnalysis/frequencyContact',
          name: 'frequencyContact',
          component: frequencyContact
        }
      ]
    }
  ]
})

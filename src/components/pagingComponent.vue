<template>
    <div>
        <el-row>
            <el-col><h1 class="pagingTitle">{{ queryParam.columnHeadings }}</h1></el-col>
        </el-row>
        <el-row>
            <el-form :inline="true" :model="searchForm" v-show="queryParam.search">
                <el-form-item label="姓名">
                    <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchForm.phoneNum" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="searchForm.credit" placeholder="身份证"></el-input>
                </el-form-item>
                <el-form-item label="查询时间">
                    <el-date-picker
                    v-model="searchForm.queryTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch" class="search-btn">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-row class="nav" type='flex' justify='space-beteween'>
                <el-col class="item" v-for="item in queryParam.title" :key="item">{{ item }}</el-col>
            </el-row>
            <el-row>
                <el-row class="data-list" type='flex' justify='space-beteween' v-for="item in newDataLists" v-bind:key="item.phone">
                    <el-col class="item">{{ item[queryParam.query[0]] }}</el-col>
                    <el-col class="item">{{ item[queryParam.query[1]] }}</el-col>
                    <el-col class="item">{{ item[queryParam.query[2]] }}</el-col>
                    <el-col class="item">{{ item[queryParam.query[3]] }}</el-col>
                    <el-col class="item" v-show="queryParam.query.length>4" v-bind:class="{ fontRed:item.dhbstatus==='1', fontGreen:item.dhbstatus==='0'}">{{ item[queryParam.query[4]] }}</el-col>
                    <el-col class="item" v-show="queryParam.query.length>5">{{ item[queryParam.query[5]] }}</el-col>
                    <el-col class="item" v-show="queryParam.query.length>6">{{ item[queryParam.query[6]] }}</el-col>
                    <el-col class="item" v-show="queryParam.query.length>7">{{ item[queryParam.query[7]] }}</el-col>
                    <el-col  class="item check" v-show="queryParam.check"><em @click='checkReports(item)'>查看</em></el-col>
                </el-row>
            </el-row>
            <el-row class="no-data" v-show="noData">
                <span>无数据</span>
            </el-row>
            <el-row class="page-list" v-show="!noData">
                <el-col>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'productReport',
  data () {
    return {
      searchForm: {
        name: '',
        phoneNum: '',
        credit: '',
        queryTime: ''
      },
      currentPage: 1,
      pageSize: 5,
      dataLists: '',
      newDataLists: '',
      noData: true,
      total: 10
    }
  },
  props: {
    queryParam: {
      type: Object,
      required: true
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData: function () {
      let param = new FormData()
      const obj = JSON.parse(localStorage.getItem('userInfo'))
      const userData = JSON.parse(localStorage.getItem('userData'))
      param.append('page', this.currentPage)
      param.append('limit', this.pageSize)
      if (obj) {
        param.append('userName', obj.userName)
        param.append('Authorization', obj.authorization)
        param.append('name', obj.name)
        param.append('tel', obj.phoneNum)
        param.append('card', obj.credit)
      } else {
        param.append('userName', userData.user)
        param.append('Authorization', userData.authorization)
        param.append('name', this.searchForm.name)
        param.append('tel', this.searchForm.phoneNum)
        param.append('card', this.searchForm.credit)
      }
      axios.post('/api/' + this.queryParam.interfaceName, param, {
      }).then(res => {
        if (!res.data.count) {
          this.noData = true
        } else {
          this.noData = false
          this.dataLists = res.data.data
          this.total = res.data.count
          const end = parseInt(this.pageSize) + 1
          this.newDataLists = this.dataLists.slice(0, end)
          this.newDataLists.forEach((item) => {
            if (item.dhbstatus === '1') {
              item.dhbstatusText = '数据生成成功'
            } else if (item.dhbstatus === '0') {
              item.dhbstatusText = '数据生成失败'
            } else {
              item.dhbstatusText = '数据正在生成中'
            }
          })
        }
      }).catch(res => {
        console.log(res)
      })
    },
    onSearch: function () {
      this.getData()
    },
    checkReports: function (item) {
      console.log('我被点击了')
      this.$emit('checkReports', item)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
    .search-btn{
        background-color: #07bfd3;
    }
    .nav{
        background-color: #f2f2f2;
        border-top:1px solid #e6e6e6;
        .el-col{
            border-right: 1px solid #e6e6e6;
        }
        .el-col:first-child{
            border-left: 1px solid #e6e6e6;
        }
    }
    .item{
        text-align: center;
        line-height: 60px;
    }
    .data-list{
        .item{
            border-right: 1px solid #e6e6e6;
            border-bottom:1px solid #e6e6e6;
        }
        .item:first-child{
            border-left: 1px solid #e6e6e6;
        }
        em{
            display:inline-block;
            width:100px;
            line-height:30px;
            background-color: #07bfd3;
            color:#fff;
        }
        .fontRed{
            color:#5bdea7;
        }
        .fontGreen{
            color: #f00;
        }
    }
    .page-list{
        padding: 100/1080*7vh 0;
        border: 1px solid #e6e6e6;
        border-top: none;
    }
    .no-data{
        line-height: 100/1080*60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e6e6e6;
        border-top: none;
    }
</style>

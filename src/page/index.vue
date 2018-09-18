<template>
    <el-container>
        <el-main>
            <h1 class="firstTitle">产品数据统计</h1>
            <div class="data-content">
                <h2>风控产品统计</h2>
                <el-row :gutter="30">
                    <el-col :span="4">
                        <div class="data-item">
                            <em>累计查询次数</em>
                            <strong>{{ productsData.sum }}</strong>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data-item">
                            <em>通过情况</em>
                            <strong>{{ productsData.passCount }}</strong>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data-item">
                            <em>关注情况</em>
                            <strong>{{ productsData.refuseCount }}</strong>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data-item">
                            <em>拒绝情况</em>
                            <strong>{{ productsData.attentionCount }}</strong>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data-item">
                            <em>剩余查询次数</em>
                        <strong>{{ productsData.residuetimes }}</strong>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'data-panel',
  data () {
    return {
      productsData: {}
    }
  },
  mounted: function () {
    let param = new FormData()
    const obj = JSON.parse(localStorage.getItem('userData'))
    param.append('userName', obj.user)
    param.append('Authorization', obj.authorization)
    axios.post('/api/searchCount', param, {
    }).then(res => {
      this.productsData = res.data.data
    }).catch(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
.data-content{
    width:756px;
    box-shadow: 0 0 10px #e1e0e0;
    padding-left: 30px;
    h2{
        font-size: 16px;
        line-height: 67px;
    }
    h2:before{
        content: "-";
        color: transparent;
        width:4px;
        height: 100/1080*18vh;
        background-color: #06bfd3;
        margin-right: 6px;
    }
    .data-item{
        display: flex;
        flex-direction: column;
        text-align: center;
        em,strong{
            line-height: 45px;
        }
    }
}
</style>

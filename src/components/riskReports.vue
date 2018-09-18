<template>
    <el-row :gutter="10">
      <el-col :xs='24' :sm='24' :md='6' :lg='6'>
        <div class="left-content" v-bind:style='{backgroundColor:riskData.bgColor,height:(60+1)*riskData.navTitle.length+"px"}'>{{ riskData.title }}</div>
      </el-col>
      <el-col :xs='24' :sm='24' :md='18' :lg='18'>
        <div class="right-content">
          <el-row>
            <el-col :span="8">
              <el-row v-for="(item,index) in riskData.navTitle" v-bind:key="item" class="list-name" v-bind:style='{lineHeight:60*Array.from(riskData.navContent[index]).length+"px"}'>{{ item }}</el-row>
            </el-col>
            <el-col :span="16">
              <el-row v-show="!noDataActive" v-for="value in riskData.navContent" v-bind:key="value[0]" class="list-result">
                <el-col>
                  <el-row v-for="item in value" :key="item">
                    {{ item }}
                  </el-row>
                </el-col>
              </el-row>
              <el-row v-show="noDataActive" :class="{noData: noDataActive}" v-bind:style='{height:(60+1)*riskData.navTitle.length+"px"}'>
                <em>无数据</em>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'data-content',
  data () {
    return {
      noDataActive: false,
      len: 0
    }
  },
  props: {
    riskData: {
      type: Object,
      required: true
    }
  },
  mounted: function () {
    console.log(this.riskData.navContent[3])
    if (this.riskData.navContent) {
      this.noDataActive = false
    } else {
      this.noDataActive = true
    }
  }
}
</script>

<style lang="less">
@media screen and (max-width: 992px) {
.left-content{
  margin-bottom:10px;
  height: 120px !important;
}
}
.left-content{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  // margin-right:10px;
}
.right-content{
  border: 1px solid #e6e6e6;
  line-height: 60px;
  color: #666666;
  .list-name{
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    text-align: center;
  }
  .list-result{
    border-top: 1px solid #e6e6e6;
    padding-left:10px;
  }
  .el-col-8{
    .list-name:last-child{
      border-bottom:none;
    }
  }
  .el-col-16{
    .list-result:first-child{
      border-top:none;
    }
  }
}
.noData{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

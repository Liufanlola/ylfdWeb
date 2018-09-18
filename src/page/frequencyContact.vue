<template>
    <div class="container-fluid">
      <div class="content">
        <paging-component v-bind:queryParam="contact"></paging-component>
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
      contact: {
        columnHeadings: '高频联系人信息',
        title: ['通话号码', '号码归属地', '标记', '号码标记次数', '主叫次数', '被叫次数', '联系次数', '通话总时长'],
        query: ['fromattel', 'fanchatelloc', 'tagslabel', 'tagslabeltimes', 'callouttimes', 'callintimes', 'calltimes', 'calllength'],
        interfaceName: 'queryDhbHighFrequency',
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

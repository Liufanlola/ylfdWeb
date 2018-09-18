<template>
  <div class="header">
      <span>用户：</span><span class='user'>{{ user }}</span>
      <span class='back' @click='backLogin'><router-link :to='backRouter.url'>{{ backRouter.name }}</router-link></span>
  </div>
</template>
<script>
export default {
  name: 'DeputyNav',
  data () {
    return {
      user: ''
    }
  },
  props: {
    backRouter: {
      type: Object,
      required: true
    }
  },
  mounted: function () {
    this.getParams()
  },
  methods: {
    getParams () {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.user = userData.user
    },
    backLogin () {
      localStorage.removeItem('user')
      localStorage.removeItem('userInfo')
    }
  }
}
</script>

<style lang='less' scoped>
.header{
    box-sizing: border-box;
    line-height: 60px;
    font-size: 18px;
    padding-right:44px;
    background-color: #fafafa;
    text-align: right;
    .user{
        padding-right:34px;
    }
    .back{
        a{
            color: #000;
        }
        cursor: pointer;
    }
}
</style>

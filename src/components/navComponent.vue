<template>
    <div class="nav-panel">
        <ul class="list-group first-level">
            <li class="list-group-item list-group-special" v-for='item in navList' v-bind:key="item.index">
                <div @click="itemChange(item)" v-bind:class='{active:item.secondUrl==="#" && item.active}' class="list-group-first">
                    <router-link :to="item.firstUrl">{{ item.firstTitle }}</router-link>
                    <span v-bind:class='{ arrowActive:item.secondUrl==="#" }'>
                        <i class="iconfont icon-arrowdown-copy" v-bind:class='{onactive:!item.secondOrder}'></i>
                        <i class="iconfont icon-arrowup" v-bind:class='{inactive:item.secondOrder}'></i>
                    </span>
                </div>
                <transition-group class="list-group second-level" tag='ul'>
                    <li class="list-group-item list-group-first" v-if="item.secondOrder" v-bind:key='item.secondUrl' v-bind:class='{active:item.active}' @click='secondItemChange(item)'>
                        <router-link :to="item.secondUrl">{{ item.secondTitle }}</router-link>
                    </li>
                </transition-group>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      activeIndex: '0'
    }
  },
  mounted: function () {
  },
  created () {
  },
  methods: {
    itemChange: function (item) {
      this.navList.forEach(element => {
        element.active = false
      })
      item.secondOrder = !item.secondOrder
      item.active = !item.active
    },
    secondItemChange: function (item) {
      this.navList.forEach(element => {
        element.active = false
      })
      item.active = !item.active
    }
  },
  props: {
    navList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.nav-panel{
    box-sizing: border-box;
    width: 200px;
    background: linear-gradient(to bottom,#05bfd3,#5de5bd);
    color: #fff;
    font-size: 18px;
    padding: 0;
    padding-top:60px;
    height: 100vh;
}
.list-group-item{
    border: none;
    background-color: transparent;
    line-height: 34px;
    padding: 0;
    cursor: pointer;
    a{
        color:#fff;
        text-decoration: none;
        display:block;
    }
}
.list-group-special{
     margin-top: 14px;
     div{
         display: flex;
         justify-content: space-between;
     }
}
.list-group-first{
    padding:0 30px;
}
.second-level{
    a{
    color:#c2eff3;
    }
}
.active{
    background-color: #53d3de;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.onactive{
    display:none;
}
.inactive{
    display:none;
}
.arrowActive{
    display:none;
}
</style>

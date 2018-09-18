<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
.border-radius(@radius){
    border-radius: @radius;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.btn-login{
    width:100%;
    line-height: 40px;
    font-size: 20px;
    background: linear-gradient(to right,#5de5bd,#05bed3);
    padding: 0;
    border:none;
    .border-radius(2px);
    span{
      color: #fff;
    }
}
.pagingTitle{
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;
}
.pagingTitle:before{
    content: "-";
    color: transparent;
    width:4px;
    height: 100/1080*18vh;
    background-color: #06bfd3;
    margin-right: 6px;
}
.firstTitle{
    display: block;
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;
}
.firstTitle:before{
    content: "-";
    color: transparent;
    width:4px;
    height: 100/1080*18vh;
    background-color: #06bfd3;
    margin-right: 6px;
}
</style>

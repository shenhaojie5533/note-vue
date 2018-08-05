<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
export default {
  components: {Header,Footer},
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a, a:hover, a:focus, a:visited
{
  text-decoration: none;
}
input{
  border: none;
  outline: none;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
.fll{
  float: left;
}
.flr{
  float: right;
}
.content{
  width: 1100px;
  margin: 0 auto;
}
  .mt10{
    margin-top: 10px;
  }
.el-button{
  height: 40px;
  width: 100%;
  margin-top: 0;
}
</style>

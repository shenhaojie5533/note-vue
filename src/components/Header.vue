<template>
<div class="allheader">
  <div class="content clearfix">
    <h1 class="title fll">云笔记</h1>
    <div class="sch flr">
      <i class="iconfont icon-sousuo-copy" @click="$router.push('/schlist')"></i>
      <button @click="$router.push('/writenote')">写笔记</button>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "Header",
      data() {
        return {}
      }
    }
</script>

<style scoped>
.allheader{
  width: 100%;
  background-color: #398dee;
}
.allheader .content{
  width: 1100px;
  margin: 0 auto;
}
 .content .title{
  color: #fff;
   margin: 10px 0;
   font-size: 24px;
}
.content .sch i{
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
.content .sch button{
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 3px 5px;
  width: 100px;
  color:  #398dee;
  margin-top: 10px;
  background-color: #fff;
  height:30px;
}
</style>

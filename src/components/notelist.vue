<template>
  <div class="article-list">
    <div class="itemall" v-for="item in listData" @click="detail(item._id)">
      <div class="item-top">
        <div class="img-wrap">
          <img :src="item.pic">
        </div>
        <div class="item-msg">
          <div class="row-one">
            <span class="author-name">
            {{item.author}}
          </span>
            <h2>
              {{item.title}}
            </h2>
          </div>
          <div class="row-two">
            <span class="row-item">
              浏览:{{item.looknum}}
            </span>
            <span class="row-item">
              回复: 0
            </span>
            <span class="row-item">
              分类: news
            </span>
          </div>
        </div>
      </div>

      <div class="item-content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "notelist",
      data(){
          return{
            listData:[],
        }
      },
      methods:{
        getArticle(){
          this.$axios.get("/getDetail").then(res => {
            console.log(res.data.data);
            this.listData = res.data.data;
          })
        },
        detail(val){
          console.log(val);
          this.$router.push({path:'/detail',query:{id:val}})
        }
      },
      mounted(){
        this.getArticle();
      }
    }
</script>

<style scoped>
  .article-list {
    box-sizing: border-box;
    margin-top: 30px;
    border-radius:  4px;
    padding: 2px 20px;
    background: #fff;
  }
  .itemall {
    text-decoration: none;
    color: #333;
    display: block;
    padding-bottom: 20px;
    margin-top: 20px;
  }
  .item-top {
    display: flex;
  }
  .item-top .img-wrap {
    margin-right: 15px;
    width: 80px;
    height: 80px;
  }
  .img-wrap img {
    display: block;
    width: 100%;
  }
  .row-one {
    display: flex;
  }
  .row-one  .author-name {
    color: #409eff;
    font-weight: 700;
    padding-right: 8px;
    border-right: 1px solid #000;
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-left: 15px;
  }
  .item-msg {
    width: 100%;
  }
  .row-two {
    box-sizing: border-box;
    padding: 4px 8px;
    margin-top: 15px;
    border-radius: 4px;
    width: 100%;
    background: #bbb;
  }
  .row-two .row-item {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-right: 30px;
  }
  .itemall .item-content{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    height: 40px;
  }
</style>

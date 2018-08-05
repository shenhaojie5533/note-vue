<template>
  <div class="addsch">
    <div class="content">
      <div class="input-wrap">
        <input type="text" v-model="title" class="search-input" @keyup.enter="handleSearch" placeholder="请输入关键字">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

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
    </div>
  </div>
</template>

<script>
    export default {
        name: "schlist",
      data () {
        return {
          listData:[],
          title: ""
        }
      },
      methods : {
        getArticle(){
          this.$axios.get("/getDetail").then(res => {
            this.listData = res.data.data;
          })
        },
        handleSearch () {
          let title = this.title
          this.$axios.get('/getschli', {
           params:{
             title
           }
          }).then(res => {
            this.listData = res.data.data
          })
        },
        detail(val){
          console.log(val);
          this.$router.push({path:'/detail',query:{id:val}})
        },
      },
      created () {
        this.getArticle();
      }
    }
</script>

<style>
  .addsch .input-wrap .el-button {
    flex: 1;
    border-radius: 0 4px 4px 0;
    height: 52px;
    margin-top: 0;
  }
</style>

<style scoped>
  .addsch{
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px 0;
  }
  .addsch .content{
    width: 1100px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: -3px 3px 10px #ccc;
    padding:20px 24px 50px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .addsch .content .input-wrap {
    margin-top: 30px;
    display: flex;
  }
  .addsch .input-wrap .search-input{
    height: 50px;
    flex: 9;
    line-height: 50px;
    padding: 0 10px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #e1e1e1;
    border-right: 0;
    outline: none;
    font-size: 18px;
    color: #555;
  }

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
  .item-content{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    height: 40px;
  }
</style>

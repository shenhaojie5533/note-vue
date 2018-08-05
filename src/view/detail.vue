<template>
  <div class="adddetail">
    <div class="content">
        <h2>
          {{title}}
        </h2>
        <div class="content-msg">
          <div class="author">
            作者: <span class="author-name">{{author}}</span>
          </div>
          <div class="create-time">
           {{createdAt}}
          </div>
        </div>
        <div class="content-details" v-html="contents"></div>
      </div>
  </div>
</template>

<script>
  import time from '../components/time'
  export default {
    name: "detail",
    data() {
      return {
        title:'',
        author:'',
        createdAt:'',
        contents:''
      }
    },
    methods: {
      getDetailData() {
        let id = this.$route.query.id;
        console.log(id);
        this.$axios.post("/getDetails", {_id: id}).then(res => {
             this.title=res.data.data.title,
            this.author=res.data.data.author,
             this.contents=res.data.data.contents,
            this.createdAt=time(res.data.data.createdAt);
        })
      },
    },
    mounted() {
      this.getDetailData();
    }
  }
</script>

<style scoped>
  .adddetail {
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px 0;
  }

  .adddetail .content {
    width: 1100px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: -3px 3px 10px #ccc;
    padding: 20px 24px 50px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .content h2 {
    text-align: center;
    font-size: 2.5em;
    line-height: 1em;
    font-weight: 400;
    color: #303030;
  }

  .content .content-msg {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 14px;
    color: #959595;
    font-size: 14px;
  }

  .content-msg .author-name {
    margin-right: 15px;
    color: #e67e22;
  }

  .content-details {
    margin-top: 30px;
    line-height: 3;
    padding: 10px 30px;
  }
</style>

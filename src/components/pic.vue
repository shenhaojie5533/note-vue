<template>
      <div class="container">
        <label id="btn-wrap">
          <input type="file" name="file" accept="image/jpeg,image/png" @change="up" id="file-input">
          <img :src="img" v-if="img">
          <i class="iconfont icon-icon_jiahao" v-if="!img"></i>
        </label>
      </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Sixiang",
    data() {
      return {
        token: '',
        img: "",
      }
    },
    methods: {
      up($event) {
        var file = $event.target.files[0];
        var form = new FormData();
        form.append("file", file);
        form.append("token", this.token);
        axios.post("https://upload-z1.qiniup.com", form, {
          headers: {"Content-Type": "multipart/form-data"}
        }).then(res => {
          console.log(res.data.url)
          this.img = res.data.url;
        })
      },
      getToken() {
        axios.get('/pic').then(res => {
          this.token = res.data.data;
        })
      },
    },
    watch:{
      img(){
        this.$emit('imges',this.img)
      },
    },
    created() {
      this.getToken();
    }
  }
</script>

<style scoped>
  #file-input {
    display: none;
  }
  #btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    border: 1px dashed #ccc;
    margin: 10px auto;
  }
  #btn-wrap img {
    z-index: 998;
    height: 150px;
    width: 150px;
  }
  .icon-icon_jiahao {
    font-size: 60px;
    color: #ccc;
  }
</style>

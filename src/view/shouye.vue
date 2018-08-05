<template>
<div class="allshouye">
  <div class="content">
    <div class="swiperbox clearfix">
      <div class="swiper fll" >
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
            <img :src="slide.pic">
            <div class="pictitle">
              <p>{{slide.title}}</p>
            </div>
          </swiper-slide>
        </swiper>

      </div>
      <div class="loign flr">
        <div class="login-box" v-if="!(usermsg.username)">
          <form action="#" class="ELloign">
            <el-input placeholder="邮箱" type="text" v-model="email"></el-input>
            <el-input placeholder="密码" type="password" v-model="password" @keyup.enter.native="handleLogin"></el-input>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button plain @click="$router.push('/rejiste')">去注册</el-button>
          </form>
        </div>
        <div class="user-box" v-else>
          <div class="tianjia">
            <label id="btn-wrap">
              <input type="file" name="file" accept="image/jpeg,image/png" @change="up" id="file-input">
              <img :src="usermsg.usericon">
            </label>
          </div>
          <div class="iconbox"><img :src="usermsg.usericon"></div>
          <div class="justone">
            <el-button plain @click="handleIcon">
              更改头像
            </el-button>
          </div>
          <div>{{usermsg.username}}</div>
          <div class="mt10">{{usermsg.email}}</div>
          <div class="tuichu">
            <el-button type="danger" @click="handleLoout">退出登录</el-button>
          </div>
        </div>
        <p>this notes is very pretebd bility</p>
        <p>IT牛人都在用的笔记...</p>
      </div>
    </div>

    <notelist></notelist>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import cookies from 'js-cookie'
  import notelist from '@/components/notelist'
    export default {
        name: "shouye",
      components:{notelist},
      data(){
          return{
            token: '',
            email:"",
            password:"",
            usermsg:{
              username: "",
              email:"",
              usericon:''
            },
            swiperSlides:[],
            swiperOption:{
              autoplay:true
            }
          }
      },
      methods:{
        handleLogin(){
          let params={
            email:this.email,
            password:this.password,
            usericon:this.usericon
          }
          this.$axios.post('/login',params).then(res =>{
            if(res.data.code == 200){
              this.usermsg = res.data.data
              cookies.set('username',this.usermsg.username,{expires:14})
              cookies.set('email',this.usermsg.email)
              cookies.set('usericon',this.usermsg.usericon)
              this.$message({
                message: '登录成功，欢迎回来' + res.data.data.username,
                type: 'success'
              });
            }else {
              this.$message.error(res.data.msg);
            }
          })
        },
        getUserMsg(){
          let username = cookies.get('username')
          let email = cookies.get('email')
          let usericon = cookies.get('usericon')

          if(username && email){
            this.usermsg.username = username;
            this.usermsg.email = email;
            this.usermsg.usericon = usericon;
          }
        },
        handleIcon(){
           let usericon = this.usermsg.usericon
          this.$axios.post('/msgchange',{
            usericon
          }).then(res=>{
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          })
        },
        handleLoout(){
          this.usermsg.email = "";
          this.usermsg.username = "";
          cookies.remove('email');
          cookies.remove('username');

          this.$axios.delete('/logout').then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '成功退出登录',
                type: 'warning'
              });
            }else {
              this.$message.error(res.data.msg);
            }
          })
          },
        up($event) {
          var file = $event.target.files[0];
          var form = new FormData();
          form.append("file", file);
          form.append("token", this.token);
          axios.post("https://upload-z1.qiniup.com", form, {
            headers: {"Content-Type": "multipart/form-data"}
          }).then(res => {
            console.log(res.data.url)
            this.usermsg.usericon = res.data.url;
          })
        },
        getToken() {
          axios.get('/pic').then(res => {
            this.token = res.data.data;
          })
        },
        getbanners(){
          this.$axios.get("/getSwiper").then(res => {
            console.log(res.data.data);
            this.swiperSlides = res.data.data;
          })
        },
      },
      created() {
        this.getToken();
      },
      mounted(){
          this.getUserMsg();
          this.getbanners();
      }
    }
</script>

<style>
.ELloign .el-input__inner{
    margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  }
.ELloign .el-button{
  width: 100%;
  margin-bottom: 20px;
  height: 40px;
  margin-top: 0;
}
.el-button+.el-button {
  margin-left: 0;
  height: 40px;
}
.justone .el-button{
  margin-top: 0;
  margin-bottom: 8px;
  width: 80px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  padding: 0
}
  .tuichu .el-button{
    margin-top: 10px;
    width: 100%;
    height: 40px;
  }
</style>


<style scoped>
  .allshouye{
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px 0;
  }
.allshouye .content{
  width: 1100px;
  margin: 0 auto;
}
.content .swiperbox{
  width: 100%;
}
.swiperbox .swiper{
  width:770px;
  height: 365px;
  position:relative;
}
.swiper-slide img{
  width: 100%;
  height: 365px;
}
.swiperbox .loign{
  box-shadow: -3px 3px 10px #ccc;
  width: 23%;
  height: 325px;
  background-color: #fff;
  padding: 20px;
  text-align: center;
}
  .swiperbox .loign p{
    color: #888;
    margin-bottom: 20px;
  }
  .loign .user-box{
    height: 240px;
    color: #777;
    position: relative;
  }

  .user-box .tianjia{
    margin: 0;
    padding: 0;
    position: absolute;
    left: 75px;

  }
  .user-box .iconbox img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .pictitle{
    opacity: 0.6;
    line-height: 50px;
    width: 100%;
    height: 50px;
    background-color: #000;
    position: absolute;
    bottom: 3px;
  }
  .pictitle p{
    text-align: center;
    font-size: 25px;
    color: white;
  }

   #file-input {
     display: none;
   }
  #btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px dashed #fff;
    border-radius: 50%;
  }
  #btn-wrap img {
    z-index: 998;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
</style>

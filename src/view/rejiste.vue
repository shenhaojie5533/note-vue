<template>
  <div class="allrejist">
    <div class="content">
      <div class="rejistebox">
        <h1>立即注册</h1>
        <form action="#" class="zhuce">
          <div class="for"><el-input placeholder="请输入昵称" type="text" v-model="username"></el-input></div>
          <div class="for"><el-input placeholder="请输入邮箱" type="text" v-model="email"></el-input></div>
          <div class="for"><el-input placeholder="请输入密码" type="password" v-model="password" @keyup.enter.native="open"></el-input></div>
          <router-link to="#"> <el-button type="primary" @click="open">新用户注册</el-button></router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "rejiste",
      data(){
          return{
            username:"",
            email:"",
            password:""
          }
      },
      methods:{
        open(){
          let params={
            username:this.username,
            email:this.email,
            password:this.password
          }
          this.$axios.post('/user',params).then(res=>{
            if (res.data.code == 200){
              this.$alert('注册成功，请登录...', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/');
                }
              });
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      }
    }
</script>

<style>
  .zhuce .el-input__inner{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
  .zhuce .el-button{
    width: 100%;
    height: 50px;
    font-size: 16px;
    margin-top: 30px;
  }
</style>
<style scoped>
  .allrejist{
    width: 100%;
    background-color: #f5f5f5;
    padding: 50px 0;
  }
  .content .rejistebox{
    width: 360px;
    padding: 40px 130px;
    margin: 9px auto;
    background: #fff;
    box-shadow: -3px 3px 10px #ccc;
  }
  .rejistebox h1{
    margin-bottom: 30px;
    color: #777;
    font-size: 27px;
    text-align: center;
  }
  .rejistebox .for{
    width: 360px;
    height: 50px;
    margin-bottom: 20px;
    line-height: 50px;
  }
</style>

<template>
    <div class="allwrite">
      <div class="content">
        <div class="title-wrap">
          <div class="title-label">
            标题
          </div>
          <input type="text" v-model="title" placeholder="请输入笔记标题">
        </div>
        <div class="clearfix">
          <div class="title-label">
            内容
          </div>
          <div class="editor">
            <div id="editorElem" style="text-align:left"></div>
          </div>

          <div class="last clearfix">
            <div class="leftpic fll">
              <pic @imges="getImg"></pic>
            </div>
            <div class="rightbtn flr">
              <div class="liebiao">
                <el-button plain @click="$router.push('/schlist')">查看笔记列表</el-button>
              </div>
              <el-button type="primary" style="margin-top: 15px;" @click="handleSubmit">发布笔记</el-button>
              <br>
              <el-button type="primary" style="margin-top: 15px;" @click="handleSwiper">上传轮播图</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import pic from '@/components/pic'
  import E from 'wangeditor'
  export default {
    name: 'writenote',
    components:{pic},
    data () {
      return {
        editorContent: '',
        content:"",
        title:"",
        editorContents:'',
        pic:''
      }
    },
    methods: {
      handleSubmit(){
        let params={
          title:this.title,
          content:this.editorContent,
          contents:this.editorContents,
        }
        this.$axios.post('/addArticle',params).then(res=>{
          if (res.data.code == 200){

            this.$alert('提交成功，请到列表查看...', '提交成功', {
              confirmButtonText: '确定',
              callback: action => {
                this. title = "";
                var editor = new E('#editorElem')
                editor.create()
                editor.txt.clear()
              }
            });
          } else {
            this.$alert('您还未登录，请登录...', '温馨提醒', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/');
              }
            });
          }
        })
      },
      handleSwiper(){
        let params={
          title:this.title,
          pic:this.pic
        }
        this.$axios.post('/addSwiper',params).then(res=>{
          if (res.data.code == 200){
            this.$alert('上传成功，请到首页查看...', '提交成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/');
              }
            });
          } else {
            this.$alert('您还未登录，请登录...', '温馨提醒', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/');
              }
            });
          }
        })
      },
      getImg(val){
        this.pic = val
      },

    },
    mounted() {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = () => {
        var text =editor.txt.text();
        var html =editor.txt.html();
        this.editorContent = text
        this.editorContents = html
      }
      editor.customConfig.zIndex = 1000
      editor.create()
    },
    watch: {
      title() {

      }
    }
  }
</script>

<style>
  .allwrite .rightbtn .el-button{
    width: 150px;
    height: 40px;
  }
  .allwrite element.style {
    z-index: 10500;
  }
  .liebiao .el-button{
    margin-top: 0;
  }
</style>
<style scoped>
  .allwrite{
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px 0;
  }
  .allwrite .content{
    width: 1100px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: -3px 3px 10px #ccc;
    padding:20px 24px 50px;
    box-sizing: border-box;
    border-radius: 4px;
  }
   .title-label {
    color: #333;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
  }
  .title-wrap input{
    margin: 10px 0;
    border: 1px solid #eee;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    line-height: 40px;
    padding: 0 6px;
    font-size: 16px;
    color: #555;
  }
  .clearfix .editor {
    margin-top: 10px;
  }
  .rightbtn{
    margin-top: 15px;
    width: 150px;
  }
</style>

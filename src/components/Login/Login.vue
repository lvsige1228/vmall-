<template>
  <div class="body">
    <div class="main" v-model="userInfo">
      <h1>欢迎登录</h1> <br>
        <el-input v-model="userInfo.inputName" placeholder="请输入用户名"></el-input>
        <br>
        <el-input placeholder="请输入密码" v-model="userInfo.inputPass" show-password ></el-input>
        <br>
        <el-button type="primary" @click="login">Login</el-button>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                userInfo:{
                    inputName: '',
                    inputPass: '',
                },
                username:'',
                password: ''
            }
        },
        methods:{
            login(){
                this.$network.getLogin({
                        username:this.userInfo.inputName,
                        password:this.userInfo.inputPass
                }).then(res=>{
                    if(res.data.status !== 0){
                         alert('用户名或者密码错误');
                        this.userInfo.inputName = '';
                        this.userInfo.inputPass = '';
                    }else {
                        localStorage.userInfo = JSON.stringify(res.data.data)
                        this.$router.push('/HelloWorld')
                    }

                })
            }
        },

    }
</script>

<style lang="stylus" scoped>
  .main
    width: 40%
    border-radius 20px
    margin auto
    background-color: rgba(255, 255, 255, 0.3)
    padding 20px 100px
    box-sizing border-box
    display flex
    justify-content center
    align-items center
    flex-direction column

  .body
    width: 100%
    height: 100vh
    background-image: url('../../assets/4.jpg')
    opacity 0.8
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding 10% 0
    box-sizing border-box
</style>

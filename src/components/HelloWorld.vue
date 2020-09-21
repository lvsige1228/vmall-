<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/IndexA">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>

            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>商品</span>
            </template>
            <el-menu-item index="/product">商品管理</el-menu-item>
            <el-menu-item index="/ProductCategory">品类管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/OrderList">订单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/UserList">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>ECharts</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ECharts">ECharts图表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>BaiDuMap</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/BaiDuMap">BaiDuMap</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

<!--        BaiDuMap/-->
      </el-aside>
      <el-container>
        <el-header>
          <div class="userInfo" @mouseenter="show=true" @mouseleave="show=false">
            <i class="el-icon-user-solid"></i>
            欢迎！{{username}}
            <i class="el-icon-arrow-down"></i>
            <div class="backLogin" v-if="show" @click="goBack">
              <i class="el-icon-s-help"></i> 退出登录
            </div>
          </div>

        </el-header>
        <el-main>
          <!--          容器-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>

    export default {
        name: 'Home',

        data() {
            return {
                username: JSON.parse(localStorage.getItem('userInfo')).username, // 欢迎页面 用户名
                show: false, //退出登录的框
            }
        },
        methods: {
            // 退出登录
            goBack() {
                this.$router.push('/login');
                localStorage.removeItem('userInfo')
            },
        },
    }
</script>
<style lang="stylus" scoped>
  .backLogin
    position: absolute;
    top: 60px
    right: 19px
    width: 180px
    height: 50px
    border: 1px solid #A4A7A9
    box-shadow 1px 6px 10px 2px #ddd
    line-height: 50px
    text-align left
    border-radius 5px
    background-color: #fff
    font-size 14px
    padding 0 20px
    box-sizing border-box

  .home
    width: 100%
    height: 80vh
    display flex
    justify-content flex-start

  /deep/ .el-col-12
    width: 100% !important
    height: 100% !important

  .left
    width: 20%
    height: 100%
    border: 1px solid red


  .right
    width: 80%
    height: 100%
    border: 1px solid red


  /deep/ .el-header {
    background-color: #ffff;
    color: #333;
    text-align: right;
    line-height: 60px;

  }

  .el-aside {
    background-color: #545C64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

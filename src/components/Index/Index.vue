<template>
  <div class="wrapper">

    <h1>首页</h1>


    <div class="index_container">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple1">
            <span>{{orderCount}}</span>
            <font> <i class="el-icon-s-finance"></i> 订单总数</font>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple2"><span>{{productCount}}</span>
            <font> <i class="el-icon-s-grid"></i> 商品总数</font>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple3"><span>{{userCount}}</span>
            <font> <i class="el-icon-user-solid"></i> 用户总数</font>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                orderCount: '',
                productCount: '',
                userCount: '',
            }
        },
        mounted() {
            this.$network.getCount({}).then(res => {
                this.orderCount = res.data.data.orderCount;
                this.productCount = res.data.data.productCount;
                this.userCount = res.data.data.userCount;
            })
        },
        methods: {
            mouseEnter() {

            }
        },


    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  h1 {
    @include MP(20px, 0);
    @include FontOnly(32px)
  }

  span {
    @include FontSize(38px);
    @include MP(50px, 0)
  }

  .el-row {
    margin-bottom: 20px;
    height: 80%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple1 {
    background: #F0AD4F;
  }

  .bg-purple2 {
    background: #69BD69;
  }

  .bg-purple3 {
    background: #5DB8D3;
  }

  .grid-content {
    border-radius: 4px;
    height: 200px;
    @include FlexMenu();
    color: $fontColor;

    &:hover {
      transform: scale(1.05);
      color: #000;
      transition: all 1s;
    }
  }
</style>

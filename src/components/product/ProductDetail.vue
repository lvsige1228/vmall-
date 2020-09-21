<template>
  <div>
    <span class="title">商品详情</span>


    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品名称：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{detailList.name}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品描述：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{detailList.subtitle}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>当前状态：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{detailList.status}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品价格：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{detailList.price}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品库存：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{detailList.stock}}</div>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品详情：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white"><span v-html="detailList.detail"></span></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>商品图片：</b></div>
      </el-col>
      <el-col :span="8">

        <span v-if="!detailList.mainImage">
        <b> 没有图片</b>
      </span>
        <img v-if="detailList.mainImage" :src="detailList.imageHost + detailList.mainImage" width="80">
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProductDetail",
        computed: {
            ...mapState(['detailList'])
        },
        mounted() {
            let row = this.$route.query;
            this.$store.dispatch('GET_DETAIL', row)
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .title {
    @include MP(2px, 0);
    @include FontSize(30px)
  }

  .main {
    @include Size(100%, 100%);
    @include Pd(50px);
    @include boxSizing();

    div {
      @include FlexStart();

      div {
        @include Mlt(5%, 5%);
        @include SizeBack(50%, 100%, #fff);

      }
    }
  }

  .white {
    background-color: #fff;
    display: flex;
    align-items: center;
  }


  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }


  .bg-purple {
    display: flex;
    align-items: center;
  }


  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

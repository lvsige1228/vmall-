<template>
  <div>
    <header>
      <span class="title">品类管理</span>
      <el-button type="primary" @click="jump"><i class="el-icon-circle-plus"></i>
        <span>添加商品</span>
      </el-button>
    </header>
    <span>当前商品分类ID:{{id.id}}</span>
    <el-table
      :data="subCategory"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="品类id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="品类名称"
        width="180">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">

          <el-button
            size="mini"
            @click="open(scope.$index, scope.row)">修改名称
          </el-button>

        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "ProductCategorySubCate",
        data() {
            return {
                id: ''
            }
        },
        methods: {
            jump() {
                this.$router.push({
                    path: '/ProductCategoryAdd'
                })
            },
            // 点击修改 名称
              open(index, row) {
                 // console.log(index,row)
                 // prompt里设置默认值
                 let messageStr = "请输入新的品类名称";
                 let defaultStr = `${row.name}`;
                 let str = window.prompt(messageStr, defaultStr);
                 // 把id 和修改之后的数据作为参数传递
                  let obj = {
                     id: row.id,
                     str,
                 };
                 this.$store.dispatch('GET_SET_CATEGORY', obj);
                 if(this.status == 0){
                     alert('修改品类名称成功');
                     this.$store.dispatch('GET_SUB_CATEGORY',this.id.id)
                 }else {
                     alert('修改品类名称失败')
                 }
             },
        },
        mounted() {
            let id = this.$route.query;
            this.id = id;
            this.$store.dispatch('GET_SUB_CATEGORY',id.id)
        },
        computed:{
            ...mapState(['subCategory']),
            ...mapState(['status'])
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../Scss/index";

  header {
    @include FlexSpace();
    @include Size(100%, 50px);

    .title {
      @include MP(2px, 0);
      @include FontSize(30px)
    }
  }

</style>

<template>
  <div>

    <header>
      <span class="title">品类管理</span>
      <el-button type="primary"  @click="jump"><i class="el-icon-circle-plus"></i>
        <span>添加商品</span>
      </el-button>
    </header>
    <span>当前商品分类ID:0</span>
    <el-table
      :data="category"
      style="width: 100%">
      <el-table-column
        label="品类ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="品类名称"
        prop="name">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">

          <el-button
            size="mini"
            @click="open(scope.$index, scope.row)">修改名称
          </el-button>
           <el-button
            size="mini"
            type="danger"
            @click="viewSubcate(scope.$index, scope.row)">查看其子品类</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ProductCategory",
        data() {
            return {}
        },
        computed: {
            ...mapState(['category']),
            ...mapState(['status'])
        },
        methods: {
            // 点击增加 跳转
            jump(){
              this.$router.push({
                  path:'/ProductCategoryAdd'
              })
            },
            // 点击修改 名称
            open(index, row) {
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
                if(this.status === 0){
                    alert('修改品类名称成功');
                    this.$store.dispatch('GET_CATEGORY')
                }else {
                    alert('修改品类名称失败')
                }
            },
            //  点击跳转 子品类
            viewSubcate(index,row){
                this.$router.push({
                    path:'/ProductCategory/ProductCategorySubCate',
                    query:{
                        id:row.id
                    }
                })
            }
        },
        mounted() {
            this.$store.dispatch('GET_CATEGORY')
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

<template>
  <div>

    <span class="title">品类管理  添加商品</span>

    <div class="main">
     <div>
       <span>所属品类</span> <el-select v-model="value" placeholder="请选择">
       <el-option
         v-for="item in category"
         :key="item.id"
         :label="item.name"
         :value="item.name">
       </el-option>
     </el-select>
     </div>
    <div> <span>品类名称</span> <el-input v-model="input" placeholder="请输入内容"></el-input> </div>
      <el-button type="primary" @click="add">确认添加</el-button>
    </div>


  </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ProductCategoryAdd",
        computed: {
            ...mapState(['category']),
            ...mapState(['status'])
        },
        data() {
            return {
                value: [],
                input: ''
            }
        },

        methods: {
            add() {
                this.$store.dispatch('ADD_CATEGORY',this.input);
                if (this.status == 0) {
                    alert('添加子类商品成功');
                    this.$router.push({
                        path: '/ProductCategory'
                    })
                } else {
                    alert('添加子类商品失败,信息缺失');
                }


            }
        }
    }
</script>


<style lang="scss" scoped>
  @import "../../../Scss/index";


  .title {
    @include MP(2px, 0);
    @include FontSize(24px)
  }

  /*.main {
    @include Size(50%, 400px);
    @include borderLV();
    div{
      @include FlexStart();
      span{
         display: inline-block;
         width: 30%;
      }
    }
  }*/

</style>

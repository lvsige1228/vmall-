<template>
  <div>
    <span class="title">编辑页面</span>

    <div class="main">
      <div><b>商品名称</b>
        <el-input v-model="detailList.name"></el-input>
      </div>
      <div><b>商品描述</b>
        <el-input v-model="detailList.subtitle"></el-input>
      </div>
      <div><b>商品库存</b>
        <el-input v-model="detailList.status"></el-input>
      </div>
      <div><b>商品价格</b>
        <div class="input-group">
          <el-input type="number" class="form-control" placeholder="价格" v-model="detailList.price" name="price"/>
          <div class="input-group-addon">元</div>
        </div>
      </div>


      <div><b>所属分类</b>

        <!--        请选择一级分类-->
        <el-select v-model="value" placeholder="请选择一级分类">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--        请选择二级分类-->
        <el-select v-model="valueSub" placeholder="请选择二级分类" v-if="showSub">
          <el-option
            v-for="item in subCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div>
        <b>商品图片</b>
        <img :src="detailList.imageHost + detailList.mainImage" width="80">
      </div>

      <!--  富文本编辑器-->
      <quill-editor
        ref="myQuillEditor"
        v-model="detailList.detail"
        :options="editorOption"
        @change="onEditorChange($event)"></quill-editor>
      <el-button type="primary" @click="editSubmit">确认修改</el-button>

    </div>


  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProductEdit",
        data() {
            return {
                // content: '',
                editorOption: {
                    // Some Quill options...
                },

                detail: '',
                value: '',
                showSub: false,
                valueSub: ''
            }
        },
        computed: {
            ...mapState(['detailList']),
            ...mapState(['statusEdit']),
            ...mapState(['category']), //分类
            ...mapState(['subCategory']), //二级分类
        },
        mounted() {

            let row = this.$route.query;
            console.log(row);
            this.$store.dispatch('GET_CATEGORY')
            this.$store.dispatch('GET_DETAIL', row)
        },
        methods: {
            onEditorChange({quill, html, text}) {
                // this.content = html;
                // this.detailList.detail = text;
            },
            editSubmit() {
                console.log(this.detailList);
                this.$store.dispatch('EDIT_SUBMIT', this.detailList);
                console.log(this.statusEdit);
                if (this.statusEdit == 0) {
                    alert('修改产品成功');
                    this.$router.push({
                        path: '/product'
                    })
                } else {
                    alert('修改产品失败');
                }
            },
            //改变时拿到id
            // lv(id) {
            //     this.showSub = true;
            //     this.$store.dispatch('GET_SUB_CATEGORY', id)
            // }
        },
        watch:{
            value(newS,oldS){
                this.showSub = true;
                // console.log(newS,oldS);
                this.$store.dispatch('GET_SUB_CATEGORY', newS)
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../Scss/index";

  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
  }

  .title {
    @include MP(2px, 0);
    @include FontSize(30px)
  }

</style>





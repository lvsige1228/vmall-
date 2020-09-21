<template>
  <div>
    <span class="title">编辑页面</span>
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

    <div>
      <b>商品图片----</b>
      <span v-if="!detailList.mainImage">
        <b> 没有图片</b>
      </span>
      <img v-if="detailList.mainImage" :src="detailList.imageHost + detailList.mainImage" width="80">


      <!-- 上传图片  -->
      <el-upload
        class="upload-demo"
        name="upload_file"
        action="/api/product/upload.do"
        v-model="detailList.subImages"
        multiple
        :limit="3"
        :on-success="handleSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>



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


    <!--  富文本编辑器-->
    <quill-editor
      ref="myQuillEditor"
      v-model="detailList.detail"
      :options="editorOption"
      @change="onEditorChange($event)"></quill-editor>


    <el-button type="primary" @click="editSubmit">确认修改</el-button>

  </div>

</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                detailList: {},
                value:'',
                valueSub:'',
                showSub:false,
                editorOption:{

                }
            }
        },
        computed: {
            ...mapState(['category']), //分类
            ...mapState(['subCategory']), //二级分类
        },
        methods: {
            onEditorChange({quill, html, text}) {
            },
            handleSuccess(response, file, fileList) {
                // 这里可以打印出来看看  所需要的值
                console.log(response, file, fileList)
                this.detailList.subImages = response.data.uri;
                console.log( this.detailList.subImages )
            },
            editSubmit() {
                console.log(this.detailList);
                this.$network.getSave({
                    params: {
                        categoryId: this.detailList.categoryId,
                        id: this.detailList.id,
                        name: this.detailList.name,
                        subtitle: this.detailList.subtitle,
                        subImages: this.detailList.subImages,
                        mainImage: this.detailList.mainImage,
                        detail: this.detailList.detail,
                        price: this.detailList.price,
                        stock: this.detailList.stock,
                        status: this.detailList.status,
                    }
                }).then(res => {
                    console.log(res.data);
                    if (res.data.status == 0) {
                        alert('更新产品成功');
                        this.$router.push({
                            path: '/product'
                        })
                    } else {
                        alert('更新产品失败')
                    }
                })
            }
        },
        mounted() {
            let row = this.$route.query;

            this.$network.getDetail({
                params: {
                    productId: row.id
                }
            }).then(res => {
                console.log(res.data.data);
                this.detailList = res.data.data
            })
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
  @import "../../Scss/index";

  .title {
    @include MP(2px, 0);
    @include FontSize(30px)
  }

  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
  }

</style>

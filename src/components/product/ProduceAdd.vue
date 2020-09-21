<template>
  <div>
    <span class="title">商品管理 添加商品</span>
    <div class="main" v-model="main">
      商品名称
      <el-input v-model="main.name" placeholder="请输入商品名称"></el-input>
      商品描述
      <el-input v-model="main.describe" placeholder="请输入商品描述"></el-input>
      所属分类
      <el-input v-model="main.classifiy" placeholder="请输入所属分类"></el-input>
      商品价格
      <div class="input-group">
        <input type="number" class="form-control" placeholder="价格" v-model="main.price" name="price">
        <div class="input-group-addon">元</div>
      </div>
      商品库存
      <div class="input-group">
        <input type="number" class="form-control" placeholder="库存" v-model="main.addon" name="addon">
        <div class="input-group-addon">件</div>
      </div>
      商品图片

      <!-- 上传图片  -->
      <el-upload
        class="upload-demo"
        name="upload_file"
        action="/api/product/upload.do"
        v-model="main.subImages"
        multiple
        :limit="3"
        :on-success="handleSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <!--  富文本编辑器-->
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
        @change="onEditorChange($event)"></quill-editor>


      <!--      -->
      <el-button type="danger" @click="submitAll">提交</el-button>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant';
    import {mapState} from 'vuex'
    import axios from 'axios'

    export default {
        name: "ProduceAdd",
        data() {
            return {
                main: {
                    name: '',
                    describe: '',
                    classifiy: '',
                    price: '',
                    addon: '',
                    subImages: ''
                },
                detail: '', //编辑器的内容
                content: '', //编辑器
                editorOption: {
                    // Some Quill options...
                }
            }

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            },
            ...mapState(['status'])
        },
        methods: {
            /* onEditorBlur(quill) {
                 console.log('editor blur!', quill)
             },
             onEditorFocus(quill) {
                 console.log('editor focus!', quill)
             },
             onEditorReady(quill) {
                 console.log('editor ready!', quill)
             },*/
            onEditorChange({quill, html, text}) {
                // console.log('editor change!', quill, html, text)
                this.content = html;
                console.log(text);
                this.detail = text;
            },
            handleSuccess(response, file, fileList) {
                this.main.subImages = response.data.uri;
            },
            submitAll() {
                let obj = {
                    name: this.main.name,
                    subtitle: this.main.describe,
                    mainImage: this.main.subImages,
                    detail: this.detail,
                    price: this.main.price,
                    stock: this.main.addon,
                    categoryId: 1,
                    status: 1,
                };
                this.$store.dispatch('GET_SAVE', obj);
                if (this.status === 0) {
                    alert('新增产品成功');
                    this.$router.push({
                        path: '/product'
                    })
                } else {
                    alert('新增产品失败,请检查商品信息是否填写完整');
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .title {
    @include MP(2px, 0);
    @include FontSize(28px)
  }

  .input-group {
    position: relative;
    display: flex;
    justify-content: center;
  }

  input::placeholder {
    color: red;
  }

  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
  }

  .input-group .form-control {
    position: relative;
    z-index: 1;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 26px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input-group-addon, .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
  }

</style>

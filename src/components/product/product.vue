<template>
  <div class="product_massage">
    <header>
      <span class="title">商品管理</span>
      <el-button type="primary"><i class="el-icon-circle-plus"></i>
        <router-link tag="span" to="/ProduceAdd">添加商品</router-link>
      </el-button>
    </header>

    <!--    查询-->
    <div class="search">
      <el-select v-model="value" placeholder="请选择查询条件">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--      &emsp;查询的输入框-->
      <el-input v-model="input" placeholder="请输入内容" class="inputTxt"></el-input>

    </div>

    <!--    表格-->
    <div class="main">
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="信息"
        >
          <template slot-scope="scope">
            <p> {{scope.row.name}}</p>
            <p> {{scope.row.subtitle}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.stae}}
            <el-button size="mini" type="warning" plain @click="change(scope.$index, scope.row)">{{scope.row.off}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
      <Pagination :total="Number(GoodsTotal)" :PageSize="5" @sorter="changePage"></Pagination>
    </div>

  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from "../Common/Pagination";

    export default {
        name: "product",
        components: {
            Pagination
        },
        data() {
            return {
                search: '',
                pagesize: 5,
                currentPage: 1,
                input: '',  //查询的信息
                options: [{
                    value: '0',
                    label: '按商品名称查询'
                }, {
                    value: '1',
                    label: '按商品id查询'
                }],
                value: '',
            }
        },
        computed: {
            
            //搜索
            list() {
                let arr = [];
                if (this.input === '') {
                    arr = this.tableData;
                    return arr
                }
                //filter 返回一个符合 条件的数组
                arr = this.tableData.filter((ele) => {
                    return ele.id == this.input || ele.name.indexOf(this.input) != -1
                });
                return arr;
            }
        },
        mounted() {
            this.$store.dispatch('GET_LIST', 1)
        },
        methods: {
            //点击改变页码
            changePage(page) {
                this.$store.dispatch('GET_LIST', page)
            },
            // 进入详情
            handleDetail(index, row) {
                this.$router.push({
                    query: row,
                    path: '/product/ProductDetail',
                });
                // console.log(row)
            },
            //编辑
            handleEdit(index, row) {
                this.$router.push({
                    query: row,
                    path: '/product/ProductEdit',
                });
            },
            // 修改上下架
            change(index, row) {

                if (row.status === 2) {
                    this.$network.setSaleStatus({
                        params: {
                            productId: row.id,
                            status: 1
                        }
                    }).then(res => {
                        console.log(res.data.status);
                        if (res.data.status === 0) {
                            alert(`确定修改为${row.off}吗`);
                            alert('修改产品销售状态成功');
                            this.$store.dispatch('GET_LIST', 1)
                        }
                    })
                } else if (row.status === 1) {
                    this.$network.setSaleStatus({
                        params: {
                            productId: row.id,
                            status: 2
                        }
                    }).then(res => {
                        if (res.data.status === 0) {
                            alert(`确定修改为${row.off}吗`);
                            alert('修改产品销售状态成功');
                            this.$store.dispatch('GET_LIST', 1)
                        }
                    })
                }

            }
        },


    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .form-control {
    @include Size(150px, 40px);
    border-radius: 5px;
  }

  .search {
    @include Size(100%, 45px);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .inputTxt {
      width: 150px;
    }
  }

  header {
    @include FlexSpace();
    @include Size(100%, 50px);

    .title {
      @include MP(2px, 0);
      @include FontSize(30px)
    }
  }


  .product_massage {
    @include Pd(10px);
    @include Size(100%, 100%);
    box-sizing: border-box;
  }
</style>

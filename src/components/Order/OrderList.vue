<template>
  <div>
    <span class="title">订单管理</span>

    <!--    查询-->
    <div class="search">
      <el-input value="按订单号查询" class="inputTxt"></el-input>
      <!--      &emsp;查询的输入框-->
      <el-input v-model="value" placeholder="请输入订单号" class="inputTxt" @input="inputLength"></el-input>
      <el-button type="primary" @click="searchList">查询</el-button>
    </div>

    <el-table
      :data="temp"
      style="width: 100%">
      <el-table-column
        label="订单号"
        width="180">
        <template slot-scope="scope">
          {{scope.row.orderItemVoList[0].orderNo}}
        </template>
      </el-table-column>
      <el-table-column
        prop="receiverName"
        label="收件人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="statusDesc"
        label="订单状态">
      </el-table-column>
      <el-table-column
        label="订单总价">
        <template slot-scope="scope">
          {{scope.row.orderItemVoList[0].totalPrice}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="Number(orderTotal)" :PageSize="5" @sorter="changePage"></Pagination>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from "../Common/Pagination";

    export default {
        name: "OrderList",
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                value: '',  //查询的输入框
                temp:[],  //展示
            }
        },
        computed: {
            ...mapState(['tempList']),  //原数组
            ...mapState(['orderTotal']),
            //搜索
            /*list() {
                let arr = [];
                if (this.value === '') {
                    arr = this.orderList;
                    return arr
                }
                arr = this.orderList.filter((ele) => {
                    return ele.orderNo == this.value
                });
                return arr;
            }*/
        },


        mounted() {
            this.$store.dispatch('GET_ORDERLIST', this.page)
            this.temp = this.tempList ;
            console.log( this.temp)
            // this.temp 全部的数据
        },
        methods: {
            //点击查看详情
            handleClick(index, row) {
                this.$router.push({
                    path: '/OrderListDetail',
                    query: {
                        orderNo: row.orderNo
                    }
                })
            },
            //点击改变页码
            changePage(page) {
                console.log(page)
                this.$store.dispatch('GET_ORDERLIST', page)
            },
            // 触发搜索  点击
            searchList() {
                this.$network.getOrderSearch({
                    params: {
                        orderNo: this.value
                    }
                }).then(res => {
                    if (res.data.status === 0) {
                        this.temp = res.data.data.list
                    } else {
                        console.log('查询失败')
                    }
                })
            },
            // input 改变
            inputLength() {
                if (this.value.length === 0) {
                    this.temp = this.tempList;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .title {
    @include MP(2px, 0);
    @include FontSize(24px)
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
</style>

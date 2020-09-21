<template>
  <div>
    <span class="title">查看订单</span> <br><br>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>订单编号：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{OrderListDetail.orderNo}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>创建时间：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{OrderListDetail.createTime}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>收件人：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white"><!--{{OrderListDetail.shippingVo.receiverName}}-->
          {{OrderListDetail.shippingVo.receiverProvince}}
          {{OrderListDetail.shippingVo.receiverCity}}
          {{OrderListDetail.shippingVo.receiverAddress}}
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>支付方式：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{OrderListDetail.paymentTypeDesc}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>订单状态：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{OrderListDetail.statusDesc}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"><b>订单金额：</b></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content white">{{OrderListDetail.payment}}</div>
      </el-col>
    </el-row>


    <el-table
      border
      :data="OrderListDetail.orderItemVoList"
      style="width: 100%">
      <el-table-column
        label="商品图片"
        width="180">
        <template slot-scope="scope">
          <img :src='"http://img.happymmall.com/"+scope.row.productImage' width="40">
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品信息"
        width="180">
      </el-table-column>
      <el-table-column
        prop="currentUnitPrice"
        label="单价">
      </el-table-column>

      <el-table-column
        prop="quantity"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="合计">
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
    export default {
        name: "OrderListDetail",
        data() {
            return {
                OrderListDetail: []
            }
        },
        mounted() {
            let row = this.$route.query;
            this.$network.getOrderDetail({
                params: {
                    orderNo: Number(row.orderNo)
                }
            }).then(res => {
                this.OrderListDetail = res.data.data;
                console.log(this.OrderListDetail.orderItemVoList)
            })
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .white {
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .title {
    @include MP(2px, 0);
    @include FontSize(24px)
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

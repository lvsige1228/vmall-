<template>
  <div>
    <span class="title">用户列表</span>

    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="dateFormat"
        label="日期"
        width="180">
      </el-table-column>
    </el-table>

    <Pagination :total="Number(total)" @sorter="changePage"></Pagination>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from "../Common/Pagination";

    export default {
        name: "UserList",
        components: {
            Pagination
        },
        data() {
            return {
                page: '' || 1,
            }
        },
        computed: {
            ...mapState(['userList']),
            ...mapState(['total'])
        },
        mounted() {
            this.$store.dispatch('GET_USER_LIST', 1)
        },
        methods: {
            changePage(page) {
                this.$store.dispatch('GET_USER_LIST', page)
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                var moment = require("moment");
                return moment(date).format("YYYY/MM/DD HH:mm:ss");
            },
        },


    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  .title {
    @include MP(2px, 0);
    @include FontSize(28px)
  }

</style>

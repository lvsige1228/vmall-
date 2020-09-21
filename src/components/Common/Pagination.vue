<template>
  <div>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="PageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:{
            total:Number,
            PageSize:Number,
        },
        data(){
            return{
                currentPage:1
            }
        },
        methods:{
            handleCurrentChange(page) {
                this.$emit('sorter',page)
            }
        }
    }
</script>

<style scoped>

</style>

export default {
  //获取到全部的数据
  GET_LIST(state, data) {
    data.item.forEach(ele => {
      if (ele.status === 2) {
        ele.stae = '已下架';
        ele.off = '上架';
      } else if (ele.status === 1) {
        ele.stae = '在售';
        ele.off = '下架';
      }
    });
    state.tableData = data.item;
    state.GoodsTotal = data.GoodsTotal;

  },
  //详情
  GET_DETAIL(state, data) {
    data.status == 2 ? data.status = '已下架' : '已上架';
    state.detailList = data;
  },
  // 新增 修改的返回值
  GET_SAVE(state, status) {
    // console.log(status);
    state.status = status;
  },
  GET_SAVEEdit(state, status) {
    // console.log(status);
    state.statusEdit = status;
  },
  //用户列表
  GET_USER_LIST(state, obj) {
    state.userList = obj.item;
    state.total = obj.total;
    console.log(obj)
  },
  // 品类管理的数据获取
  GET_CATEGORY(state, item) {
    state.category = item;
  },
  //查看子品类
  GET_SUB_CATEGORY(state,item){
    state.subCategory = item;
  },
  //获取订单列表
  GET_ORDERLIST(state,obj){
    state.tempList = obj.orderList;
    state.orderTotal = obj.total;
  },




}


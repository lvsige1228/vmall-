import network from "../network";

export default {
  //获取全部列表
  GET_LIST(context, page) {
    network.getList({
      params: {
        pageNum: page,
        pageSize: 5
      }
    }).then(res => {
      let obj = {
        GoodsTotal: res.data.data.total,
        item: res.data.data.list
      };

      context.commit('GET_LIST', obj);

    }).catch(err => {
      console.log(err)
    })
  },
  // 商品详情
  GET_DETAIL(context, row) {
    network.getDetail({
      params: {
        productId: row.id
      }
    }).then(res => {
      context.commit('GET_DETAIL', res.data.data)
    })
  },
  // 新增
  GET_SAVE(context, obj) {
    console.log(obj)
    network.getSave({
      params: {
        name: obj.name,
        subtitle: obj.subtitle,
        subImages: obj.subImages,
        mainImage: obj.mainImage,
        detail: obj.detail || '详情',
        price: obj.price,
        stock: obj.stock,
        status: obj.status,
        categoryId: obj.categoryId,

      }
    }).then(res => {
      context.commit('GET_SAVE', res.data.status)
    })
  },
  //编辑  通过id 先获取详情
  EDIT_SUBMIT(context, obj) {
    console.log(obj);
    network.getSave({
      params: {
        name: obj.name,
        subtitle: obj.subtitle,
        subImages: obj.subImages,
        mainImage: obj.mainImage,
        detail: obj.detail,
        price: obj.price,
        stock: obj.stock,
        status: obj.status,
        categoryId: obj.categoryId,
        id: obj.id,
      }
    }).then(res => {
      // console.log(res.data);
      context.commit('GET_SAVEEdit', res.data.status)
    })
  },
  // 用户列表
  GET_USER_LIST(context, page) {
    network.getUserList({
      params: {
        pageNum: page,
        pageSize: 8
      }
    }).then(res => {
      let obj = {
        item: res.data.data.list,
        total: res.data.data.total,
      };
      context.commit('GET_USER_LIST', obj)
    });
  },
  // 品类管理的数据获取
  GET_CATEGORY(context) {
    network.getCategory({}).then(res => {
      context.commit('GET_CATEGORY', res.data.data)
    });
  },
  // 修改的数据提交
  GET_SET_CATEGORY(context, obj) {
    network.getSetCategory({
      params: {
        categoryId: obj.id,
        categoryName: obj.str,
      }
    }).then(res => {
      context.commit('GET_SAVE', res.data.status)
    });
  },
  //添加新的子品类
  ADD_CATEGORY(context, val) {
    network.getAddCategory({
      params: {
        parentId: 0,
        categoryName: val
      }
    }).then(res => {
      console.log(res.data);
      context.commit('GET_SAVE',res.data.status)
    });
  },
  //查看子品类
  GET_SUB_CATEGORY(context,id){
    network.getCategory({
      params:{
        categoryId:id
      }
    }).then(res => {
      context.commit('GET_SUB_CATEGORY',res.data.data)
    });
  },
  //获取订单列表
  GET_ORDERLIST(context,page){
    // console.log(page)
    network.getOrderList({
       params:{
         pageSize:5,
         pageNum:page
       }
    }).then(res => {
      let obj = {
        orderList:res.data.data.list,
        total: res.data.data.total
      };
      // console.log(obj)
      context.commit('GET_ORDERLIST',obj)
    });
  },


}

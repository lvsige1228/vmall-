import {requset} from './core';
import {GET, POST, path} from './config';

const network = {
  getLogin(params) {  //登录
    return requset(POST, path.login, params)
  },
  getCount(params) {  //统计数量
    return requset(GET, path.count, params)
  },
  getList(params) { // 商品
    return requset(GET, path.list, params)
  },
  getSearch(params) {  //搜索
    return requset(GET, path.search, params)
  },
  getDetail(params) {  //详情
    return requset(GET, path.detail, params)
  },
  getUpload(params) {  //图片上传
    return requset(POST, path.upload, params)
  },
  getSave(params) {  ////添加新的
    return requset(GET, path.save, params)
  },
  getUserList(params){    //
    return requset(GET, path.userList, params)
  },
  getCategory(params){//品类管理
    return requset(GET, path.category, params)
  },
  getSetCategory(params){   //修改品类的名字
    return requset(GET, path.setCategory, params)
  },
  getDeepCategory(params){   // 获取品类子节点
    return requset(GET, path.deepCategory, params)
  },
  getAddCategory(params){   //添加品类
    return requset(GET, path.addCategory, params)
  },
  getOrderList(params){  //订单列表
    return requset(GET, path.orderList, params)
  },
  getOrderDetail(params){  //订单详情
    return requset(GET, path.orderDetail, params)
  },
  getOrderSearch(params){  // 订单搜索
    return requset(GET, path.orderSearch, params)
  },
  setSaleStatus(params){  // 产品上下架
    return requset(GET, path.setSaleStatus, params)
  }
};
export default network;

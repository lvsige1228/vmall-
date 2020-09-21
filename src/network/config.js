export const GET = 'get';
export const POST = 'post';
export const path = {
  login: '/api/user/login.do',  // 登录接口
  count: '/api/statistic/base_count.do', //统计
  list: '/api/product/list.do', //商品管理接口
  search:'/api/product/search.do', //搜索
  detail:'/api/product/detail.do', //详情
  upload:'/api/product/upload.do', //图片上传
  save:'/api/product/save.do', //添加新的
  userList:'/api/user/list.do', //用户列表
  category:'/api/category/get_category.do', //品类管理
  setCategory:'/api/category/set_category_name.do',  //修改品类的名字
  deepCategory:'/api/category/get_deep_category.do', //品类子节点
  addCategory:'/api/category/add_category.do', //添加品类
  orderList:"/api/order/list.do", //订单列表
  orderDetail:'/api/order/detail.do', //订单详情
  orderSearch:'/api/order/search.do',  // 搜索订单
  setSaleStatus:'/api/product/set_sale_status.do', //上下架

};


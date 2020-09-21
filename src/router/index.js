import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login/Login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/Error',
      name: 'Error',
      component:() => import('../components/Error'),
      meta: {
        title: '404'
      }
    },

    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld'),
      redirect: '/IndexA',
      meta: {
        title: 'Hello'
      },
      children: [
        {
          path: '/product',
          name: 'product',
          component: () => import('../components/product/product'),
          meta: {
            title: '商品管理'
          },
        },
        {
          path: '/product/ProductDetail',
          name: 'ProductDetail',
          component: () => import('../components/product/ProductDetail'),
          meta: {
            title: '商品详情'
          },
        },
        {
          path: '/product/ProductEdit',
          name: 'ProductEdit',
          component: () => import('../components/product/ProductEdit'),
          meta: {
            title: '编辑商品'
          },
        },
        {
          path: '/ProductCategory',
          name: 'ProductCategory',
          component: () => import('../components/product/Classify/ProductCategory'),
          meta: {
            title: '品类管理'
          },
        },
        // ProductCategorySubCate
        {
          path: '/ProductCategory/ProductCategorySubCate',
          name: 'ProductCategorySubCate',
          component: () => import('../components/product/Classify/ProductCategorySubCate'),
          meta: {
            title: '品类管理 子级品类'
          },
        },
        // ProductCategoryAdd
        {
          path: '/ProductCategoryAdd',
          name: 'ProductCategoryAdd',
          component: () => import('../components/product/Classify/ProductCategoryAdd'),
          meta: {
            title: '品类管理 增加品类'
          },
        },
        {
          path: '/IndexA',
          name: 'IndexA',
          component: () => import('../components/Index/Index'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/ProduceAdd',
          name: 'ProduceAdd',
          component: () => import('../components/product/ProduceAdd'),
          meta: {
            title: '添加商品'
          }
        },
        {
          path: '/UserList',
          name: 'UserList',
          component: () => import('../components/UserList/UserList'),
          meta: {
            title: '用户列表'
          }
        },
        {
          path: '/OrderList',
          name: 'OrderList',
          component: () => import('../components/Order/OrderList'),
          meta: {
            title: '订单列表'
          }
        },
        {
          path: '/OrderListDetail',
          name: 'OrderList',
          component: () => import('../components/Order/OrderListDetail'),
          meta: {
            title: '订单详情'
          }
        },
        {
          path: '/ECharts',
          name: 'ECharts',
          component: () => import('../components/ECharts/ECharts'),
          meta: {
            title: '图表'
          }
        },
        {
          path: '/BaiDuMap',
          name: 'BaiDuMap',
          component: () => import('../components/BaiDuMap/BaiDuMap'),
          meta: {
            title: '百度地图'
          }
        },
      ]
    }
  ],

});

router.beforeEach((to, from, next) => {
  document.title = `后端管理系统 | ${to.meta.title}`;
  const role = localStorage.getItem('userInfo');
  if (!role && to.path !== '/') {
    next('/');
  } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else if (to.matched.length === 0) {
    next('/Error');

  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/edit') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
});
export default router

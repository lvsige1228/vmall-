import Vue from 'vue'

import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import network from "./network";
import store from './store/index'
Vue.use(ElementUI);

import Vant from 'vant';
import 'vant/lib/index.css';

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(Vant);




import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'jZyYBwcNET7bWsgRfQnAPqoyKoNjiu3j'
})



Vue.config.productionTip = false;
Vue.prototype.$network = network;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

import {GET, POST, path} from './config';
import axios from 'axios';
import {Loading,Message} from "element-ui";

const instance = axios.create({
    // baseURL: 'http://admintest.happymmall.com/manage/',
    //设置axios为form-data
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function (data) {
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
});

// 创建loading实例
// var loading = null;
// 添加请求拦截器
/*instance.interceptors.request.use(function (config) {
    loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    Message(error);
    console.log("========>",error);
    return Promise.reject(error);
});*/

// 添加响应拦截器
/*instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    setTimeout(() => {
        loading.close();
    }, 1000);
    return response;
}, function (error) {
    // 对响应错误做点什么
    Message(error);
    console.log("========>",error);
    return Promise.reject(error);
});*/

export function requset(methods, url, params) {
    switch (methods) {
        case GET:
            return get(url, params);
        case POST:
            return post(url, params);
    }
}

function get(url, params) {
   return  instance.get(url, params)
}

function post(url, params) {
    return instance.post(url, params)
}

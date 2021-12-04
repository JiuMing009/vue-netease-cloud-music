import axios from 'axios';
import { Message } from 'element-ui';
import router from "../router";

// 添加请求拦截器，2021.9.10
axios.interceptors.request.use(config => {
    //如果存在token，请求携带token
    if (window.sessionStorage.getItem('token')) {
        config.headers['token'] = window.sessionStorage.getItem('token');
    }
    return config;
}, error => {
    console.log(error)
    return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        //这里简写可以分开判断
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({ message: success.data.msg });
            router.replace('/')
            return;
        }
        if (success.data.msg) {
            Message.success({ message: success.data.msg });
            router.replace('/')
        }
    }
    return success.data;

}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({ message: '服务器出错' })
        router.replace('/')
    }
    else if (error.response.status == 403) {
        Message.error({ message: '权限不足' })
        router.replace('/')
    }
    else if (error.response.status == 401) {
        Message.error({ message: '请登录' })
        router.replace('/')
    }
    else {
        if (error.response.data.msg) {
            Message.error({ message: error.response.msg });
            router.replace('/')
        }
        else {
            Message.error({ message: '未知错误' })
            router.replace('/')
        }
    }
    return;
});

//post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params
    })
}

//get请求
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: url,
    })
}

//put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params
    })
}

//delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params
    })
}
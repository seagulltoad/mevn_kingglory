import axios from 'axios'
import Vue from 'vue'
import router from './router'

// 
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 只有token不为空时候
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 全局捕获异常
http.interceptors.response.use(
    res => {
        // 正常处理
        return res
    },
    err => {
        if (err.response.data.message) {
            // 异常处理
            //console.log(err.response.data.message)
            // 弹出错误提示
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
            // 如果返回错误代码是401,则跳转到登录login
            if(err.response.status == 401){
                // console.log('login')
                router.push('/login')
            }
        }

        return Promise.reject(err)
    })

export default http;
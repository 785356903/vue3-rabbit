/** @format */

import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';
//创建一个axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  // headers: {'Authorization': 'foobar'}
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //1.从pinia获取token数据
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      //2按照后瑞的要求拼接土okn数据
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({ type: 'warning', message: error.response.data.message });
    //401 token 失效处理
    const userStore = useUserStore();
    if (error.response.status === 401) {
      // 清除用户数据
      // 跳转登录页面
      userStore.clearUserInfo();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default httpInstance;

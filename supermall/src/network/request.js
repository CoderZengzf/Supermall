import axios from "axios";
// http://152.136.185.210:7878/api/m5/detail?iid=1lrzvr8

export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err);
    return Promise.reject(err)
  })

  // 2.2. 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    console.log(err);
    return Promise.reject(err)

  })

  // 3.发送真正的网络请求
  return instance(config)
}

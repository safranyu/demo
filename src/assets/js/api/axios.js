import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例配置
let service = axios.create({
  // baseURL: 'http://bwwd.cs', //将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  timeout: 60000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   // 'sessionId':  Lockr.get("sessionId"),
  //   // 'authKey': Lockr.get("authKey"),
  // }
})
// if(localStorage.getItem('token')) {
//   service.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').replace(/(^\")|(\"$)/g, '');
// }
// 设置 post、put 初始化默认 Content-Type
// service.defaults.headers.post['Content-Type'] = 'application/json'
// service.defaults.headers.put['Content-Type'] = 'application/json'

// 初始化默认post header
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      // config.data = JSON.stringify(config.data) //这是转json模式
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data) //转换为表单模式
    }
    if(localStorage.getItem('token')) { //在请求头加上token
      config.headers.Authorization = `token ${localStorage.getItem('token')}`
      .replace(/(^\")|(\"$)/g, '')
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data } = response
    return data
  },
  (error) => {
    let info = {},
      { status, statusText, data } = error.response

    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
  return service
}

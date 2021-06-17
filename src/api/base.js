import { ACCESS_TOKEN } from '@/config/token-const'
import request from 'axios'
import cookies from '../utils/util.cookies'

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/mock'

const service = request.create({
  baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 60000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = cookies.get(ACCESS_TOKEN)
    // 响应时触发错误
    console.log(data.message)
  }
  return Promise.reject(error)
}
/**
 * request interceptor
 */
service.interceptors.request.use(config => {
  const token = cookies.get(ACCESS_TOKEN)
  if (token && token !== 'undefined') {
    config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

/**
 * response interceptor
 */
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.log(error)
    } else {
      console.log('Error', error.message)
    }
    return Promise.reject(error)
  }
)

export default service

import request from './base'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param data
 * @returns {*}
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

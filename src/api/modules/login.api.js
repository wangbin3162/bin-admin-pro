// import request from '../request'
import menuList from '@/router/menus'

/**
 * 登录方法
 */
export function login(data) {
  return new Promise((resolve, reject) => {
    if (data.username === 'admin' && data.password === '123456') {
      resolve({
        code: '00',
        message: '',
        data: {
          accessToken: '4291d7da9005377ec9aec4a71ea837f',
        },
      })
    } else {
      reject({
        code: '01',
        message: '账号或密码错误',
      })
    }
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return new Promise(resolve => {
    resolve({
      data: {
        code: '00',
        message: '',
        data: {
          functions: [...menuList],
          permissions: {},
          realName: 'Wang',
          roleCodes: 'ROLE_ADMIN',
          roleNames: '王彬',
          username: 'admin',
        },
      },
    })
  })
}

import { getInfo } from '@/api/login.api'
import { ACCESS_TOKEN } from '@/config/token-const'
import cookies from '@/utils/util.cookies'

export default {
  state: {
    token: '', // token
    roles: [],
    info: null // user的登录信息
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    // 登录
    setToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        try {
          cookies.set(ACCESS_TOKEN, token)
          commit('SET_TOKEN', token)
          commit('SET_ROLES', [])
          commit('SET_INFO', null)
          resolve(token)
        } catch (e) {
          reject(e)
        }
      })
    },
    // 登出
    logout({ commit }) {
      return new Promise((resolve) => {
        // 删除缓存的token
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // 删除cookie
        cookies.remove(ACCESS_TOKEN)
        resolve()
      })
    },
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          // console.log(result)
          // 判断角色权限是否存在,这里约定为roleCodes
          if (result.code === '0') {
            commit('SET_ROLES', result.data.roleCodes)
            commit('SET_INFO', result.data)
            resolve(response)
          } else { // 如果是403 即为无效的token则重定向到login页面
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

import { defineStore } from 'pinia'

const useUser = defineStore('user', {
  state: () => ({
    token: '', // token
    roles: [],
    userInfo: null, // user的登录信息
  }),
  getters: {},
  actions: {},
})

export default useUser

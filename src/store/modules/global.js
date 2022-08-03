import { defineStore } from 'pinia'

const useGlobal = defineStore('global', {
  state: () => ({
    searchVisible: false,
    settingVisible: false,
    weather: {},
  }),
  getters: {},
  actions: {},
})

export default useGlobal

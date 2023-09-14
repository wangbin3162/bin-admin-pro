import localforage from 'localforage'
import { deepCopy } from '@/utils/util'

/**
 * 本地存储数据库实例
 */
export default class DatasourceCreate {
  constructor(sourceName, driver = 'indexDB') {
    // 创建一个store
    this.store = localforage.createInstance({
      name: sourceName,
      driver: driver !== 'indexDB' ? localforage.LOCALSTORAGE : localforage.INDEXEDDB,
    })
  }

  /**
   * 获取库中的存储
   * @param {string} key storeKey，可以初始化时候指定
   * @returns
   */
  async getStorage(key) {
    if (!key) {
      console.warn('storeKey or key is null!')
      return
    }
    return await this.store.getItem(key)
  }

  /**
   * 设置存储
   * @param {string} key storeKey，可以初始化时候指定
   * @param {*} value 存储的内容
   * @returns
   */
  async setStorage(key, value) {
    if (!key) {
      console.warn('storeKey or key is null!')
      return
    }
    await this.store.setItem(key, deepCopy(value))

    return await this.getStorage(key)
  }
}

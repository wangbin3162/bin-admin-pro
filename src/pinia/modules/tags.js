import { defineStore } from 'pinia'
import { HOME_NAME, HOME_PATH } from '@/router/menus'

const useTags = defineStore('tags', {
  state: () => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    viewTags() {
      const visitedTabs = this.visitedViews.map(i => ({ key: i.name, title: i.title }))
      return [{ key: HOME_PATH, title: HOME_NAME, noClose: true, icon: '' }, ...visitedTabs]
    },
  },
  actions: {
    _addVisitedView(view) {
      if (this.visitedViews.some(v => v.name === view.name)) return
      this.visitedViews.push({ ...view, title: view.title || 'no-name' })
    },
    _addCacheView(view) {
      if (this.cachedViews.includes(view.name)) return
      this.cachedViews.push(view.name)
    },
    _deleteVisitedView(view) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.name === view.name) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    _deleteCachedView(view) {
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },
    addView(view) {
      this._addVisitedView(view)
      if (!view.noCache) {
        this._addCacheView(view)
      }
    },
    delView(view) {
      this._deleteVisitedView(view)
      this._deleteCachedView(view)
    },
    delOthersViews(view) {
      // 移除开启
      this.visitedViews = this.visitedViews.filter(v => v.name === view.name)
      // 移除缓存
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },
    delAllViews() {
      this.visitedViews = []
      this.cachedViews = []
    },
    // 刷新当前路由
    async refreshCurrentPage(router) {
      try {
        const { currentRoute } = router
        const path = currentRoute.value.fullPath
        const name = currentRoute.value.name
        this._deleteCachedView({ name })
        router.push({ path: `/redirect${path}` })
      } catch (e) {
        throw new Error(e)
      }
    },
  },
})

export default useTags

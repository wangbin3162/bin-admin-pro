<template>
  <div class="tags-view-container">
    <b-tabs v-model="activeTag" :data="viewTags" type="tag" closable context-menu ref="tabsRef"
            @change="handleSelect" @tab-select="handleRightClick" @tab-close="handleCloseTag">
      <template v-slot:menu>
        <li @click="refreshCurrentPage">
          <i class="b-iconfont b-icon-reload"></i>重新加载
        </li>
        <li :class="{'disabled':rightHome}" @click="closeSelected">
          <i class="b-iconfont b-icon-close"></i>关闭标签页
        </li>
        <li :class="{'disabled':rightHome}" @click="closeOthers">
          <i class="b-iconfont b-icon-pic-center"></i>关闭其他标签页
        </li>
        <li :class="{'disabled':rightHome}" @click="closeAll">
          <i class="b-iconfont b-icon-line"></i>关闭全部标签页
        </li>
      </template>
    </b-tabs>
    <div class="tags-view-ctrl">
      <span class="trigger" @click="refreshCurrentPage">
        <i class="b-iconfont b-icon-reload" style="transform: rotate(90deg);"></i>
      </span>
      <b-dropdown trigger="click" style="width: 32px;display: flex;" append-to-body @command="handleCommand">
        <span class="trigger"><i class="b-iconfont b-icon-down"></i></span>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item name="refreshSelected">
              <i class="b-iconfont b-icon-reload"></i> 重新加载
            </b-dropdown-item>
            <b-dropdown-item name="closeSelected" :disabled="currentHome">
              <i class="b-iconfont b-icon-close"></i> 关闭标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeOthers" divided :disabled="currentHome">
              <i class="b-iconfont b-icon-pic-center"></i> 关闭其他标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeAll" :disabled="currentHome">
              <i class="b-iconfont b-icon-line"></i> 关闭全部标签页
            </b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'
import { ERROR_PATH_LIST, HOME_PATH } from '@/router/menus'
import useMenu from '@/hooks/store/useMenu'
import useTagsView from '@/hooks/store/useTagsView'

export default {
  name: 'TagsView',
  setup() {
    const { $store, $router, $route } = useStoreRouter()
    const activeTag = ref('')
    const selectedTag = ref({})
    const tabsRef = ref(null)

    const { navMenuItems } = useMenu()
    const { visitedViews, viewTags, refreshCurrentPage } = useTagsView()

    // 所有动态的路由表paths
    const addRoutersPaths = computed(() => $store.state.menu.addRouters.map(v => `/${v.path}`))
    const rightHome = computed(() => selectedTag.value.key === HOME_PATH)
    const currentHome = computed(() => $route.path === `/${HOME_PATH}`)

    onMounted(() => {
      refresh()
    })
    watch(() => $route.path, (path) => {
      refresh()
    })

    function refresh() {
      const path = $route.path
      // 如果是重定向或者错误页面则跳过
      if (!addRoutersPaths.value.includes(path)) return
      addTags()
      moveToCurrentTag()
    }

    function addTags() {
      const { path } = $route
      if (currentHome.value) return
      const current = navMenuItems.value.find(item => `/${item.path}` === path)
      if (current) {
        $store.dispatch('tagsView/addView', { path: current.path, title: current.title })
      }
      return false
    }

    async function moveToCurrentTag() {
      await nextTick()
      activeTag.value = $route.path.slice(1)
    }

    // 选中一个tag
    function handleSelect(tag) {
      $router.push({ path: tag.key })
    }

    function handleRightClick(tag) {
      selectedTag.value = { ...tag }
    }

    function handleCloseTag(tag) {
      $store.dispatch('tagsView/delView', { path: tag.key, title: tag.title })
    }

    function closeSelected() {
      if (rightHome.value) {
        return
      }
      const selectedTagVal = selectedTag.value
      if (selectedTagVal.key === `/${HOME_PATH}`) return
      // 这里需要调用组件的关闭选择的tag
      tabsRef.value.closeSelectedTab(selectedTagVal)
    }

    // 关闭其他tags
    function closeOthers() {
      if (rightHome.value) {
        return
      }
      const selectedTagVal = selectedTag.value
      $router.push({ path: selectedTagVal.key })
      $store.dispatch('tagsView/delOthersViews', { path: selectedTagVal.key, title: selectedTagVal.title })
      tabsRef.value.moveToCurrentTab()
    }

    // 关闭所有
    async function closeAll() {
      if (rightHome.value) {
        return
      }
      await $store.dispatch('tagsView/delAllViews')
      await $router.push(`/${HOME_PATH}`)
      await nextTick()
      tabsRef.value.moveToCurrentTab()
    }

    function handleCommand(name) {
      handleRightClick({ key: activeTag.value })
      switch (name) {
        case 'refreshSelected':
          refreshCurrentPage()
          break
        case 'closeSelected':
          closeSelected()
          break
        case 'closeOthers':
          closeOthers()
          break
        case 'closeAll':
          closeAll()
          break
      }
    }

    return {
      tabsRef,
      rightHome,
      currentHome,
      selectedTag,
      activeTag,
      visitedViews,
      viewTags,
      refreshCurrentPage,
      handleSelect,
      handleRightClick,
      handleCloseTag,
      closeSelected,
      closeOthers,
      closeAll,
      handleCommand
    }
  }
}
</script>

<style lang="stylus">
.tags-view-container .bin-tabs-wrapper .contextmenu li {
  &.disabled {
    opacity: 1;
    cursor: not-allowed;
    color: #C0C4CC;
    &:hover {
      background: #fff;
    }
  }
}
</style>

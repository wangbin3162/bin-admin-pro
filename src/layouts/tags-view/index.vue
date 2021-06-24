<template>
  <div class="tags-view-container">
    <b-tabs v-model="activeTag" :data="viewTags" type="tag" closable context-menu ref="tabsRef"
            @change="handleSelect" @tab-select="handleRightClick" @tab-close="handleCloseTag">
      <template v-slot:menu>
        <li @click="refreshSelected"><i class="b-iconfont b-icon-reload"></i>重新加载</li>
        <li @click="closeSelected"><i class="b-iconfont b-icon-close"></i>关闭标签页</li>
        <li @click="closeOthers"><i class="b-iconfont b-icon-pic-center"></i>关闭其他标签页</li>
        <li @click="closeAll"><i class="b-iconfont b-icon-line"></i>关闭全部标签页</li>
      </template>
    </b-tabs>
    <div class="tags-view-ctrl">
      <span class="trigger" @click="refreshSelected">
        <i class="b-iconfont b-icon-reload" style="transform: rotate(90deg);"></i>
      </span>
      <b-dropdown trigger="click" style="width: 32px;display: flex;" append-to-body @command="handleCommand">
        <span class="trigger"><i class="b-iconfont b-icon-down"></i></span>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item name="refreshSelected">
              <i class="b-iconfont b-icon-reload"></i> 重新加载
            </b-dropdown-item>
            <b-dropdown-item name="closeSelected">
              <i class="b-iconfont b-icon-close"></i> 关闭标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeOthers" divided>
              <i class="b-iconfont b-icon-pic-center"></i> 关闭其他标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeAll">
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
import useStoreRouter from '@/hooks/use-store-router'
import { HOME_PATH, HOME_NAME } from '@/router/menus'

export default {
  name: 'TagsView',
  setup() {
    const { $store, $router, $route, mapGetter } = useStoreRouter()
    const activeTag = ref('')
    const selectedTag = ref({})
    const tabsRef = ref(null)

    const navMenuItems = computed(() => mapGetter().navMenuItems)
    const visitedViews = computed(() => mapGetter().visitedViews)
    const viewTags = computed(() => {
      const visitedTabs = visitedViews.value.map(i => ({ key: i.path, title: i.title }))
      return [{ key: HOME_PATH, title: HOME_NAME, noClose: true, icon: '' }, ...visitedTabs]
    })

    onMounted(() => {
      addTags()
      moveToCurrentTag()
    })
    watch(() => $route.path, (path) => {
      if (path.indexOf('/redirect') > -1) {
        return
      }
      addTags()
      moveToCurrentTag()
    })

    function addTags() {
      const { path } = $route
      if (!path || path === `/${HOME_PATH}`) return
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

    // 刷新当前view
    function refreshSelected() {
      $store.dispatch('tagsView/refreshCurrentPage', $router)
    }

    function closeSelected() {
      const selectedTagVal = selectedTag.value
      if (selectedTagVal.key === `/${HOME_PATH}`) return
      // 这里需要调用组件的关闭选择的tag
      tabsRef.value.closeSelectedTab(selectedTagVal)
    }

    // 关闭其他tags
    function closeOthers() {
      const selectedTagVal = selectedTag.value
      $router.push({ path: selectedTagVal.key })
      $store.dispatch('tagsView/delOthersViews', { path: selectedTagVal.key, title: selectedTagVal.title })
      tabsRef.value.moveToCurrentTab()
    }

    // 关闭所有
    async function closeAll() {
      await $store.dispatch('tagsView/delAllViews')
      await $router.push(`/${HOME_PATH}`)
      await nextTick()
      tabsRef.value.moveToCurrentTab()
    }

    function handleCommand(name) {
      handleRightClick({ key: activeTag.value })
      switch (name) {
        case 'refreshSelected':
          refreshSelected()
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
      selectedTag,
      activeTag,
      viewTags,
      handleSelect,
      handleRightClick,
      handleCloseTag,
      refreshSelected,
      closeSelected,
      closeOthers,
      closeAll,
      handleCommand
    }
  }
}
</script>

<template>
  <div class="tags-view-container">
    <b-tabs v-model="activeTag" :data="viewTags" type="tag" closable context-menu ref="tabsRef"
            @change="handleSelect" @tab-select="handleRightClick" @tab-close="handleCloseTag">
      <template v-slot:menu>
        <li @click="refreshSelected">刷新</li>
        <li @click="closeSelected">关闭</li>
        <li @click="closeOthers">关闭其他</li>
        <li @click="closeAll">关闭所有</li>
      </template>
    </b-tabs>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import useStoreRouter from '@/hooks/use-store-router'

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
      return [{ key: 'home', title: '首页', noClose: true, icon: '' }]
        .concat(visitedViews.value.map(i => ({ key: i.path, title: i.title })))
    })

    onMounted(() => {
      addTags()
      moveToCurrentTag()
      console.log(viewTags.value)
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
      if (!path || path === '/home') return
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
      if (selectedTagVal.key === '/home') return
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
      await $router.push('/home')
      await nextTick()
      tabsRef.value.moveToCurrentTab()
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
      closeAll
    }
  }
}
</script>

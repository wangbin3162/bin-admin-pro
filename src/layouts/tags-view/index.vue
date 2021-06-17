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
import { computed, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'TagsView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const activeTag = ref('')
    const selectedTag = ref({})
    const tabsRef = ref(null)

    const navMenu = computed(() => store.getters.navMenu)
    const navMenuItems = computed(() => store.getters.navMenuItems)
    const visitedViews = computed(() => store.getters.visitedViews)
    const viewTags = computed(() => {
      return [{ key: 'home', title: '首页', noClose: true }].concat(visitedViews.value.map(i => ({
        key: i.name, title: i.title
      })))
    })

    function addTags() {
      const { path } = route
      if (!path || path === '/home') return
      const current = navMenuItems.value.find(item => `/${item.name}` === path)
      if (current) {
        store.dispatch('tagsView/addView', { name: current.name, title: current.title })
      }
      return false
    }

    async function moveToCurrentTag() {
      await nextTick()
      activeTag.value = route.path.slice(1)
    }

    // 选中一个tag
    function handleSelect(tag) {
      router.push({ path: `/${tag.key}` })
    }

    function handleRightClick(tag) {
      selectedTag.value = { ...tag }
    }

    function handleCloseTag(tag) {
      store.dispatch('tagsView/delView', { name: tag.key, title: tag.title })
    }

    // 刷新当前view
    function refreshSelected() {
      const selectedTagVal = selectedTag.value
      const view = { name: selectedTagVal.key, title: selectedTagVal.title }
      store.dispatch('tagsView/delCachedView', view).then(() => {
        router.push({ path: `/redirect${route.fullPath}` })
      })
    }

    function closeSelected() {
      const selectedTagVal = selectedTag.value
      if (selectedTagVal.key === 'home') return
      // 这里需要调用组件的关闭选择的tag
      tabsRef.value.closeSelectedTab(selectedTagVal)
    }

    // 关闭其他tags
    function closeOthers() {
      const selectedTagVal = selectedTag.value
      router.push({ name: selectedTagVal.key })
      store.dispatch('tagsView/delOthersViews', { name: selectedTagVal.key, title: selectedTagVal.title })
      tabsRef.value.moveToCurrentTab()
    }

    // 关闭所有
    function closeAll() {
      router.push('/home')
      store.dispatch('tagsView/delAllViews')
      tabsRef.value.moveToCurrentTab()
    }

    return {
      tabsRef,
      selectedTag,
      activeTag,
      viewTags,
      addTags,
      moveToCurrentTag,
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

<style lang="stylus">
.tags-view-container {
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .bin-tabs-wrapper {
    .nav-wrapper {
      height: 32px;
      .tab-item {
        height: 28px;
        line-height: 28px;
        background: #fff;
        margin-right: 6px;
        color: #808695;
        &::before {
          content: none;
        }
        &:hover {
          color: #515a6e;
        }
        &.active {
          color: #1089ff;
        }
      }
    }
  }
  .bin-tabs-wrapper.tag .nav-wrap.is-scrollable .nav-next,
  .bin-tabs-wrapper.tag .nav-wrap.is-scrollable .nav-prev {
    line-height: 32px;
  }

}
</style>

<template>
  <div class="tags-view-container" :class="`tags-view-${setting.tagsType}`">
    <b-tabs
      v-model="activeTag"
      :data="viewTags"
      type="tag"
      closable
      context-menu
      ref="tabsRef"
      @change="handleSelect"
      @tab-select="handleRightClick"
      @tab-close="handleCloseTag"
    >
      <template v-slot:menu>
        <li @click="refreshCurrentPage">
          <i class="b-iconfont b-icon-reload"></i>
          重新加载
        </li>
        <li :class="{ disabled: rightHome }" @click="closeSelected">
          <i class="b-iconfont b-icon-close"></i>
          关闭标签页
        </li>
        <li :class="{ disabled: rightHome }" @click="closeOthers">
          <i class="b-iconfont b-icon-pic-center"></i>
          关闭其他标签页
        </li>
        <li :class="{ disabled: rightHome }" @click="closeAll">
          <i class="b-iconfont b-icon-line"></i>
          关闭全部标签页
        </li>
      </template>
    </b-tabs>
    <div class="tags-view-ctrl">
      <span class="trigger" title="刷新" @click="refreshCurrentPage">
        <i class="b-iconfont b-icon-reload" style="transform: rotate(90deg)"></i>
      </span>
      <b-dropdown trigger="click" style="width: 42px; display: flex" append-to-body @command="handleCommand">
        <span class="trigger"><i class="b-iconfont b-icon-down"></i></span>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item name="refreshSelected">
              <i class="b-iconfont b-icon-reload"></i>
              重新加载
            </b-dropdown-item>
            <b-dropdown-item name="closeSelected" :disabled="currentHome">
              <i class="b-iconfont b-icon-close"></i>
              关闭标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeOthers" divided :disabled="currentHome">
              <i class="b-iconfont b-icon-pic-center"></i>
              关闭其他标签页
            </b-dropdown-item>
            <b-dropdown-item name="closeAll" :disabled="currentHome">
              <i class="b-iconfont b-icon-line"></i>
              关闭全部标签页
            </b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
      <span
        class="trigger"
        :title="setting.contentFull ? '收缩' : '全屏'"
        @click="setting.contentFull = !setting.contentFull"
      >
        <i :class="`b-iconfont b-icon-${setting.contentFull ? 'compress' : 'expend'}`"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { HOME_PATH } from '@/router/menus'
import useMenu from '@/hooks/store/useMenu'
import useApp from '@/hooks/store/useApp'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'TagsView',
  setup() {
    const { tagsStore, storeToRefs } = useStore()
    const { visitedViews, viewTags } = storeToRefs(tagsStore)
    const route = useRoute()
    const router = useRouter()

    const activeTag = ref('')
    const selectedTag = ref({})
    const tabsRef = ref(null)

    const { navMenuItems, addRouters } = useMenu()
    const { setting } = useApp()

    // 所有动态的路由表name 拼接
    const addRoutersNames = computed(() => addRouters.value.map(v => v.name))
    const rightHome = computed(() => selectedTag.value.key === HOME_PATH)
    const currentHome = computed(() => route.name === HOME_PATH)

    watch(
      () => route.path,
      () => {
        refresh()
      },
      { immediate: true },
    )

    function refresh() {
      const name = route.name
      // 如果是重定向或者错误页面则跳过
      if (addRoutersNames.value.includes(name) || currentHome.value) {
        addTags()
        moveToCurrentTag()
      }
    }

    function addTags() {
      const { name } = route
      if (currentHome.value) return
      const current = navMenuItems.value.find(item => item.name === name)
      const currentRoute = addRouters.value.find(item => item.name === name)
      if (current && currentRoute) {
        tagsStore.addView({
          name: current.name,
          title: current.title,
          noCache: currentRoute.meta.noCache || false,
        })
      }
      return false
    }

    async function moveToCurrentTag() {
      await nextTick()
      activeTag.value = route.name
    }

    // 选中一个tag
    function handleSelect(tag) {
      router.push({ name: tag.key })
    }

    function handleRightClick(tag) {
      selectedTag.value = { ...tag }
    }

    function handleCloseTag(tag) {
      tagsStore.delView({ name: tag.key })
    }

    function closeSelected() {
      if (rightHome.value) {
        return
      }
      const selectedTagVal = selectedTag.value
      if (selectedTagVal.key === HOME_PATH) return
      // 这里需要调用组件的关闭选择的tag
      tabsRef.value.closeSelectedTab(selectedTagVal)
    }

    // 关闭其他tags
    function closeOthers() {
      if (rightHome.value) return
      const selectedTagVal = selectedTag.value
      router.push({ name: selectedTagVal.key })
      tagsStore.delOthersViews({ name: selectedTagVal.key })
      tabsRef.value.moveToCurrentTab()
    }

    // 关闭所有
    async function closeAll() {
      if (rightHome.value) {
        return
      }
      tagsStore.delAllViews()
      await router.push({ name: HOME_PATH })
      await nextTick()
      tabsRef.value.moveToCurrentTab()
    }

    async function refreshCurrentPage() {
      tagsStore.refreshCurrentPage(router)
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
      setting,
      visitedViews,
      viewTags,
      refreshCurrentPage,
      handleSelect,
      handleRightClick,
      handleCloseTag,
      closeSelected,
      closeOthers,
      closeAll,
      handleCommand,
    }
  },
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

<template>
  <div class="tags-view-container">
    <div :style="{ height: 'var(--v-tags-height)' }"></div>
    <div class="real-tags-view" :style="tagsViewStyle">
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
        <b-dropdown style="width: 42px; display: flex" append-to-body @command="handleCommand">
          <span class="trigger" flex="main:center cross:center">
            <i class="b-iconfont b-icon-down"></i>
          </span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { HOME_PATH } from '@/router/menus'
import useMenu from '@/hooks/store/useMenu'

const { storeToRefs, tagsStore, settingStore } = useStore()
const { tagsViewStyle } = storeToRefs(settingStore)
const { viewTags } = storeToRefs(tagsStore)

const route = useRoute()
const router = useRouter()

const activeTag = ref('')
const selectedTag = ref({})
const tabsRef = ref(null)

const { navMenuItems, addRouters } = useMenu()

// 所有动态的路由表name 拼接
const addRoutersNames = computed(() => addRouters.value.map(v => v.name))
const rightHome = computed(() => selectedTag.value.key === HOME_PATH)
const currentHome = computed(() => route.name === HOME_PATH)

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

function refresh() {
  const name = route.name
  // 如果是重定向或者错误页面则跳过
  if (addRoutersNames.value.includes(name) || currentHome.value) {
    addTags()
    moveToCurrentTag()
  }
}

watch(
  () => route.path,
  () => {
    refresh()
  },
  { immediate: true },
)
</script>

<style>
.tags-view-container {
  .real-tags-view {
    position: relative;
    box-sizing: content-box;
    display: flex;
    background-color: var(--v-tags-bg-color);
    height: 32px;
    position: fixed;
    z-index: 90;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      bottom: 0;
      background-color: var(--v-tags-border-color);
    }
  }
  .bin-tabs-wrapper {
    margin: 0 12px;
    width: calc(100% - 33px);
    .nav-wrapper {
      height: var(--v-tags-height);
      .tab-list {
        display: flex;
        align-items: center;
        height: var(--v-tags-height);
      }
      .tab-item {
        height: calc(var(--v-tags-height) - 8px);
        line-height: calc(var(--v-tags-height) - 8px);
        margin-right: 6px;
        font-size: var(--v-tags-font-size);
        color: var(--v-tags-text-color);
        padding: 0 8px;
        background-color: var(--v-tags-item-bg-color);
        border: 1px solid var(--v-tags-item-bg-color);
        &::before {
          content: unset;
        }
        &:hover {
          color: var(--v-tags-item-text-color);
        }
        .b-icon-close {
          margin-left: 0;
        }
        &.active {
          background: var(--v-tags-item-bg-color);
          color: var(--v-tags-item-text-color) !important;
          &.no-close {
            padding: 0 8px;
          }
          .b-icon-close {
            width: 14px;
            margin-left: 0;
            color: var(--v-tags-item-text-color);
          }
          .b-icon-close:hover {
            color: var(--bin-color-danger-light2);
          }
        }
      }
      .nav-prev,
      .nav-next {
        line-height: var(--v-tags-height);
      }
    }
    .contextmenu li {
      display: flex;
      align-items: center;
      i {
        margin-right: 4px;
      }
    }
  }

  .tags-view-ctrl {
    display: flex;
    .trigger {
      width: 32px;
      color: var(--v-tags-text-color);
      text-align: center;
      cursor: pointer;
      border-left: 1px solid #eee;
      &:hover i {
        color: var(--v-tags-text-hover-color);
      }
    }
  }
}
</style>

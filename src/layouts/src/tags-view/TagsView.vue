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
        <b-dropdown append-to-body @command="handleCommand">
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
import { useRoute, useRouter } from 'vue-router'
import { HOME_PATH } from '@/router/menus'
import useMenu from '@/hooks/store/useMenu'
import { useStore } from '@/pinia'
import { encodeName, decodeName } from '@/pinia/modules/tags'

const { storeToRefs, tagsStore, settingStore } = useStore()
const { tagsViewStyle } = storeToRefs(settingStore)
const { viewTags } = storeToRefs(tagsStore)

const route = useRoute()
const router = useRouter()

const activeTag = ref('')
const selectedTag = ref({})
const tabsRef = ref(null)

const { navMenuItems } = useMenu()

// 所有动态的路由表name 拼接
const rightHome = computed(() => selectedTag.value.name === HOME_PATH)
const currentHome = computed(() => route.name === HOME_PATH)

// 需要追加至viewTags的一些非接口返回的额外路由
const otherTags = []

function addTags() {
  const { path } = route
  if (currentHome.value) return
  const current = [...otherTags, ...navMenuItems.value].find(i => i.name === path.substring(1))

  if (current) {
    tagsStore.addView({
      name: current.name,
      title: current.title,
      noCache: current.noCache || false, // noCache暂时并不存在于接口返回值中，此处可用于后续扩展
    })
  }
  return false
}

async function moveToCurrentTag() {
  await nextTick()
  activeTag.value = encodeName(route.path.substring(1))
}

// 选中一个tag
function handleSelect(tag) {
  router.push('/' + tag.name)
}

function handleRightClick(tag) {
  selectedTag.value = { ...tag }
}

function handleCloseTag(tag) {
  tagsStore.delView({ name: decodeName(tag.key), title: tag.title })
}

function closeSelected() {
  if (rightHome.value) return

  const selectedTagVal = selectedTag.value
  if (selectedTagVal.name === HOME_PATH) return
  // 这里需要调用组件的关闭选择的tag
  tabsRef.value.closeSelectedTab(selectedTagVal)
}

// 关闭其他tags
async function closeOthers() {
  if (rightHome.value) return

  const selectedTagVal = selectedTag.value

  tagsStore.delOthersViews({
    name: decodeName(selectedTagVal.key),
    title: selectedTagVal.title,
  })

  await router.push('/' + decodeName(selectedTagVal.key))
  tabsRef.value.moveToCurrentTab()
}

// 关闭所有
async function closeAll() {
  if (rightHome.value) return
  tagsStore.delAllViews()
  await router.push('/')
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
  const name = route.path.substring(1)
  // 如果是重定向或者错误页面则跳过
  // 这里之前使用的addRoutersNames做判断，需要明确为什么使用路由表进行这种处理
  // addRoutersNames获取的只是拼接后的路由表内的路由name字段
  // navMenuItems为菜单接口返回，路由表根据navMenuItems进行拼接
  // 因此基于addRoutersNames的包含判断，理论上应该等同于基于navMenuItems的包含判断
  if (
    [...otherTags, ...navMenuItems.value].some(item => item.name === name) ||
    currentHome.value ||
    route.name === 'Inline'
  ) {
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
    height: var(--v-tags-height);
    position: fixed;
    z-index: 90;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      bottom: -1px;
      background-color: var(--v-tags-border-color);
    }
  }
  .bin-tabs-wrapper {
    margin: 0 12px;
    width: calc(100% - 33px);
    height: var(--v-tags-height);
    .nav-wrapper {
      height: var(--v-tags-height);
      .tab-list {
        display: flex;
        align-items: center;
        height: var(--v-tags-height);
      }
      .tab-item {
        display: inline-flex;
        align-items: center;
        height: calc(var(--v-tags-height) - 8px);
        margin-right: 6px;
        padding: 0 8px;
        font-size: var(--v-tags-font-size);
        border-radius: var(--v-tags-item-border-radius);
        color: var(--v-tags-text-color);
        background-color: var(--v-tags-item-bg-color);
        border: 1px solid var(--v-tags-item-border-color);
        &::before {
          content: unset;
        }
        &:hover {
          color: var(--v-tags-text-hover-color);
          background-color: var(--v-tags-item-bg-hover-color);
          border-color: var(--v-tags-item-border-hover-color);
        }
        .b-icon-close {
          margin-left: 0;
        }
        &.active {
          background-color: var(--v-tags-item-bg-active-color);
          color: var(--v-tags-text-active-color) !important;
          border-color: var(--v-tags-item-border-active-color);
          &.no-close {
            padding: 0 8px;
          }
          .b-icon-close {
            width: 14px;
            margin-left: 0;
            color: var(--v-tags-text-active-color);
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
      &.disabled {
        opacity: 1;
        cursor: not-allowed;
        color: var(--bin-color-text-disabled);
        &:hover {
          background: var(--bin-white-color);
        }
      }
    }
  }

  .tags-view-ctrl {
    display: flex;
    .trigger {
      width: var(--v-tags-height);
      height: var(--v-tags-height);
      color: var(--v-tags-text-color);
      text-align: center;
      cursor: pointer;
      border-left: 1px solid var(--v-tags-border-color);
      &:hover i {
        color: var(--v-tags-text-hover-color);
      }
    }
  }
}
</style>

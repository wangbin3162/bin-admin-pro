<template>
  <header-trigger icon="ellipsis" :rotate="90" @click="visible = true"></header-trigger>
  <!--设置抽屉-->
  <b-drawer v-model="visible" append-to-body :z-index="0">
    <div class="setting-panel">
      <h3 class="setting-theme-title">整体风格设置:</h3>
      <div>
        <div class="theme-tab">
          <b-tooltip content="亮色主题风格" append-to-body>
            <span @click="themChange('light')">
              <img src="@/assets/images/light.svg" alt="">
              <i v-if="theme === 'light'" class="b-iconfont b-icon-check"></i>
            </span>
          </b-tooltip>
        </div>
        <div class="theme-tab">
          <b-tooltip content="暗色主题风格" append-to-body>
            <span @click="themChange('dark')">
              <img src="@/assets/images/dark.svg" alt="">
              <i v-if="theme === 'dark'" class="b-iconfont b-icon-check"></i>
            </span>
          </b-tooltip>
        </div>
      </div>
      <b-divider></b-divider>
      <div class="setting-list-item">
        <span>是否开启多页签</span>
        <b-switch :model-value="showTagsView" @change="toggleTagsView">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>固定Header</span>
        <b-switch :model-value="fixedHeader" @change="changeFixedHeader">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>固定侧边栏</span>
        <b-switch :model-value="fixedAside" @change="changeFixedAside">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>菜单展开宽度</span>
        <b-input-number
          size="small"
          :step="8"
          :min="200"
          :max="256"
          :model-value="sidebarWidth"
          @change="changeSidebarWidth"
        ></b-input-number>
      </div>
    </div>
  </b-drawer>
</template>

<script>
import HeaderTrigger from '@/layouts/header-trigger'
import useSetting from '@/hooks/use-setting'
import { ref } from 'vue'

export default {
  name: 'Setting',
  components: { HeaderTrigger },
  setup() {
    const visible = ref(false)
    const {
      theme,
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      themChange,
      toggleSidebar,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth
    } = useSetting()

    return {
      visible,
      theme,
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      toggleSidebar,
      themChange,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth
    }
  }
}
</script>

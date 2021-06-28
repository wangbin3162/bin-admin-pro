<template>
  <header-trigger icon="setting" @click="visible = true"></header-trigger>
  <!--设置抽屉-->
  <b-drawer v-model="visible" append-to-body>
    <div class="setting-panel">
      <theme-panel />
      <h3 class="setting-title"><span>功能设置</span></h3>
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
import ThemePanel from '@/layouts/setting/theme-panel'

export default {
  name: 'Setting',
  components: { ThemePanel, HeaderTrigger },
  setup() {
    const visible = ref(false)
    const {
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      toggleSidebar,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth
    } = useSetting()

    return {
      visible,
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      toggleSidebar,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth
    }
  }
}
</script>

<style lang="stylus" scoped>
// 主题弹窗样式
.setting-panel {
  padding: 0 4px;
  .setting-title {
    position: relative;
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    background-color: #eeeeee;
    > span {
      position: absolute;
      background-color: #fff;
      padding: 0 12px;
      font-weight: 500;
      color: #303133;
      font-size: 15px;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .setting-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
  }
}
</style>

<template>
  <header-trigger icon="setting" @click="visible = true"></header-trigger>
  <!--设置抽屉-->
  <b-drawer v-model="visible" append-to-body :z-index="0">
    <div class="setting-panel">
      <h3 class="setting-title"><span>整体风格设置</span></h3>
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
      <h3 class="setting-title"><span>系统主题</span></h3>
      <div class="theme-picker">
        <span
          v-for="color in systemPrimaryColorList"
          :key="color"
          class="color-item"
          :class="{active:isActiveColor(systemPrimary,color)}"
          :style="{background:color}"
          @click="setSystemPrimary(color)"
        ></span>
      </div>
      <h3 class="setting-title"><span>菜单主题</span></h3>
      <div class="theme-picker">
        <span
          v-for="color in menuThemeColorList"
          :key="color"
          class="color-item"
          :class="{active:isActiveColor(menuTheme,color)}"
          :style="{background:color}"
          @click="setMenuTheme(color)"
        ></span>
      </div>
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
import { isHexColor, rgb2Hex } from '@/utils/color'

export default {
  name: 'Setting',
  components: { HeaderTrigger },
  setup() {
    const visible = ref(false)
    const {
      theme,
      menuTheme,
      systemPrimary,
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      themChange,
      toggleSidebar,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth,
      setMenuTheme,
      setSystemPrimary,
      systemPrimaryColorList,
      menuThemeColorList
    } = useSetting()

    function isActiveColor(color1, color2) {
      return isHexColor(color1) && isHexColor(color2) && color1 === color2
    }

    return {
      visible,
      theme,
      menuTheme,
      systemPrimary,
      showTagsView,
      sidebarWidth,
      fixedHeader,
      fixedAside,
      toggleSidebar,
      themChange,
      toggleTagsView,
      changeFixedHeader,
      changeFixedAside,
      changeSidebarWidth,
      setMenuTheme,
      setSystemPrimary,
      systemPrimaryColorList,
      menuThemeColorList,
      isActiveColor
    }
  }
}
</script>

<style lang="stylus" scoped>
// 主题弹窗样式
.setting-panel {
  padding: 0 4px;
  .theme-tab {
    position: relative;
    display: inline-flex;
    margin-right: 20px;
    height: 45px;
    cursor: pointer;
    .b-icon-check {
      position: absolute;
      right: 6px;
      bottom: 6px;
      font-size: 18px;
      color: #1890ff;
    }
  }
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
  .theme-picker {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;
    .color-item {
      cursor: pointer;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      border: 1px solid #eeeeee;
      &.active {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-color: var(--primary-color);
        &:after {
          color: inherit;
          font-family: "b-iconfont" !important;
          content: "\e829";
        }
      }
    }
  }
}
</style>

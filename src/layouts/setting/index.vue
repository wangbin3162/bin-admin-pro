<template>
  <header-trigger icon="setting" @click="toggleSetting"></header-trigger>
  <!--设置抽屉-->
  <b-drawer :model-value="settingVisible" append-to-body @close="toggleSetting">
    <div class="setting-panel">
      <theme-panel />
      <h3 class="setting-title"><span>功能设置</span></h3>

      <div class="setting-list-item">
        <span>菜单类型</span>
        <b-select v-model="setting.menuType" size="small" style="width: 150px">
          <b-option label="常规布局" value="default"></b-option>
          <b-option label="混合布局" value="mixed"></b-option>
        </b-select>
      </div>
      <div class="setting-list-item">
        <span>菜单宽度</span>
        <b-input-number
          size="small"
          :step="8"
          :min="200"
          :max="256"
          v-model="setting.sidebarWidth"
          style="width: 150px"
        ></b-input-number>
      </div>
      <!-- <div class="setting-list-item">
        <span>菜单固定</span>
        <b-switch v-model="setting.fixedAside">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>头部固定</span>
        <b-switch v-model="setting.fixedHeader">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div> -->
      <div class="setting-list-item">
        <span>多页签</span>
        <b-switch :model-value="setting.tagsView" @change="toggleTagsView">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item" v-if="setting.tagsView">
        <span>页签风格</span>
        <b-select v-model="setting.tagsType" size="small" style="width: 150px">
          <b-option label="卡片" value="card"></b-option>
          <b-option label="灵动" value="clever"></b-option>
          <b-option label="圆滑" value="smooth"></b-option>
        </b-select>
      </div>
      <div class="setting-list-item" v-if="setting.routerTransitionName">
        <span>路由动画</span>
        <b-select v-model="setting.routerTransitionName" size="small" style="width: 150px">
          <b-option label="fade-transverse" value="fade-transverse"></b-option>
          <b-option label="fade-scale" value="fade-scale"></b-option>
          <b-option label="fade-scale-move" value="fade-scale-move"></b-option>
          <b-option label="fade-down" value="fade-down"></b-option>
          <b-option label="zoom-in" value="zoom-in"></b-option>
          <b-option label="zoom-in-center" value="zoom-in-center"></b-option>
          <b-option label="move-left" value="move-left"></b-option>
          <b-option label="move-right" value="move-right"></b-option>
        </b-select>
      </div>
      <h3 class="setting-title"><span>顶栏设置</span></h3>
      <div class="setting-list-item">
        <span>菜单折叠</span>
        <b-switch v-model="setting.showCollapse" :disabled="setting.menuType === 'mixed'">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>菜单搜索</span>
        <b-switch v-model="setting.showSearch">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
      <div class="setting-list-item">
        <span>消息通知</span>
        <b-switch v-model="setting.showMessage">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>

      <div class="setting-list-item">
        <span>城市天气</span>
        <b-switch v-model="setting.showWeather">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </div>
    </div>
  </b-drawer>
</template>

<script>
import HeaderTrigger from '@/layouts/header-trigger/index.vue'
import useApp from '@/hooks/store/useApp'
import ThemePanel from './theme-panel.vue'

export default {
  name: 'Setting',
  components: { ThemePanel, HeaderTrigger },
  setup() {
    const { setting, settingVisible, toggleSetting, toggleTagsView } = useApp()
    return {
      setting,
      settingVisible,
      toggleSetting,
      toggleTagsView,
    }
  },
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

<template>
  <header-trigger icon="setting" tooltip="页面配置" @click="toggleSetting"></header-trigger>

  <!--设置抽屉-->
  <b-drawer :model-value="settingVisible" append-to-body @close="toggleSetting">
    <div class="setting-panel">
      <h3 class="setting-title"><span>主题设置</span></h3>
      <div class="p20">
        <div class="theme-tab">
          <span @click="setting.themeName = 'light'">
            <img src="@/assets/images/light.svg" alt="" />
            <i v-if="setting.themeName === 'light'" class="b-iconfont b-icon-check"></i>
          </span>
          明亮
        </div>
        <div class="theme-tab">
          <span @click="setting.themeName = 'dark'">
            <img src="@/assets/images/dark.svg" alt="" />
            <i v-if="setting.themeName === 'dark'" class="b-iconfont b-icon-check"></i>
          </span>
          暗黑
        </div>
      </div>

      <h3 class="setting-title"><span>菜单设置</span></h3>
      <div class="setting-list-item">
        <span>菜单类型</span>
        <b-select v-model="setting.menuType" size="small" style="width: 150px">
          <b-option label="常规布局" value="default"></b-option>
          <b-option label="混合布局" value="mixed"></b-option>
        </b-select>
      </div>
      <div class="setting-list-item" v-if="setting.routerTransitionName">
        <span>动画效果</span>
        <b-select v-model="setting.routerTransitionName" size="small" style="width: 150px">
          <b-option label="fade-in" value="fade-transverse"></b-option>
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
      <div class="setting-list-item">
        <span>菜单折叠</span>
        <b-switch
          v-model="setting.showCollapse"
          :disabled="setting.menuType === 'mixed'"
          size="small"
        />
      </div>

      <h3 class="setting-title"><span>导航设置</span></h3>
      <div class="setting-list-item">
        <span>多页签</span>
        <b-switch v-model="setting.tagsView" size="small" />
      </div>
      <div class="setting-list-item">
        <span>头部面包屑</span>
        <b-switch v-model="setting.showHeaderBreadcrumb" size="small" />
      </div>
      <div class="setting-list-item">
        <span>菜单搜索</span>
        <b-switch v-model="setting.showSearch" size="small" />
      </div>
      <div class="setting-list-item">
        <span>消息通知</span>
        <b-switch v-model="setting.showMessage" size="small" />
      </div>
      <div class="setting-list-item">
        <span>城市天气</span>
        <b-switch v-model="setting.showWeather" size="small" />
      </div>
    </div>
  </b-drawer>
</template>

<script setup>
import HeaderTrigger from '../header-trigger/HeaderTrigger.vue'
import { useStore } from '@/store'

const { appStore, storeToRefs, settingStore } = useStore()
const { settingVisible } = storeToRefs(appStore)
const { setting } = storeToRefs(settingStore)

function toggleSetting() {
  settingVisible.value = !settingVisible.value
}
</script>

<style scoped>
.setting-panel {
  width: 100%;
  padding: 0 4px;
  background-color: var(--v-theme-panel-bg);
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
    padding-top: 12px;
  }

  .theme-tab {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 45px;
    cursor: pointer;
    .b-icon-check {
      position: absolute;
      right: 30px;
      bottom: 18px;
      font-size: 18px;
      color: var(--v-theme-active-color);
    }
  }
}
</style>

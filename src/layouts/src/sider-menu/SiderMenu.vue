<template>
  <div class="sider-menu" :class="{ 'sider-menu-collapsed': !setting.sidebar }">
    <div class="sider-menu-inner">
      <b-scrollbar native>
        <b-menu
          :collapse-transition="false"
          :default-active="route.name"
          :default-openeds="getMenuItemNamePath(route.name)"
          @select="handleMenuSelect"
          unique-opened
          :collapse="!setting.sidebar"
        >
          <template v-for="menu in sideMenus" :key="menu.name">
            <MenuItem v-if="!menu.children" :menu="menu" />
            <Submenu v-else :menu="menu" />
          </template>
        </b-menu>
      </b-scrollbar>
    </div>
    <div
      class="collapse-button"
      v-if="setting.showCollapse"
      @click="setting.sidebar = !setting.sidebar"
    >
      <b-icon :name="setting.sidebar ? 'outdent' : 'indent'"></b-icon>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import { useRoute } from 'vue-router'
import useMenu from '@/hooks/store/useMenu'

const route = useRoute()
const { storeToRefs, settingStore } = useStore()
const { setting } = storeToRefs(settingStore)
const { getMenuItemNamePath, handleMenuSelect, sideMenus } = useMenu()
</script>

<style>
.sider-menu {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5715;
  transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  .collapse-button {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    cursor: pointer;
    color: var(--v-sider-collapse-btn-color);
    background-color: var(--v-sider-collapse-btn-bg);
    &:hover {
      background-color: var(--v-sider-collapse-btn-bg-hover);
    }
  }
  .sider-menu-inner {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 4px 8px;
  }
  &.sider-menu-collapsed {
    width: var(--v-sider-collapse-width);
    .sider-menu-inner {
      padding: 4px 0 48px;
    }
  }
}
</style>

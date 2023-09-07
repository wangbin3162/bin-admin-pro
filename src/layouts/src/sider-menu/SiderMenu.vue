<template>
  <div class="sider-menu" :class="{ 'sider-menu-collapsed': !setting.sidebar }">
    <div class="sider-menu-inner">
      <b-scrollbar>
        <b-menu
          unique-opened
          :default-active="activeMenu"
          :collapse="!setting.sidebar"
          @select="handleMenuSelect"
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
import { ref, watch } from 'vue'
import { useStore } from '@/pinia'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import { useRoute } from 'vue-router'
import useMenu from '@/hooks/store/useMenu'

const route = useRoute()
const { storeToRefs, settingStore } = useStore()
const { setting } = storeToRefs(settingStore)
const { allMenuItems, handleMenuSelect, sideMenus } = useMenu()
const activeMenu = ref('')

watch(
  () => route.path,
  path => {
    // 其实这里提出的要求就是期望根据url的变动通过path去索引到对应的name
    // 那么，前端的路由表内，name和path根据约定其实本质上是一样的，只不过可能大小写不同
    // 当然，动态参数的路由除外，不过在对应地方会有特殊处理
    // 因此可以根据当前allMenuItems与path, 统一他们的大小写既可以索引到对应的项目.
    const name = allMenuItems.value.find(
      item => item.name.toUpperCase() === path.substring(1).toUpperCase(),
    )?.name
    activeMenu.value = name
  },
  { immediate: true },
)
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
  }
  &.sider-menu-collapsed {
    width: var(--v-sider-collapse-width);
    .sider-menu-inner {
      padding: 4px 0 48px;
    }
  }
}
</style>

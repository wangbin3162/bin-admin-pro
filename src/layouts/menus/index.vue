<template>
  <div class="aside-menu" :style="{ width: setting.sidebarWidth }">
    <b-scrollbar>
      <b-menu
        :collapse-transition="false"
        :default-active="route.name"
        :default-openeds="getMenuItemNamePath(route.name)"
        @select="handleMenuSelect"
        unique-opened
        :collapse="!setting.sidebar"
      >
        <template v-for="menu in sideMenus" :key="menu.name">
          <menu-item v-if="!menu.children" :menu="menu"></menu-item>
          <submenu v-else :menu="menu"></submenu>
        </template>
      </b-menu>
    </b-scrollbar>
  </div>
</template>

<script setup>
import useApp from '@/hooks/store/useApp'
import MenuItem from '@/layouts/menus/menu-item.vue'
import Submenu from '@/layouts/menus/submenu.vue'
import { useRoute } from 'vue-router'
import useMenu from '@/hooks/store/useMenu'

defineOptions({
  name: 'AsideMenus',
})

const route = useRoute()
const { setting } = useApp()
const { getMenuItemNamePath, handleMenuSelect, sideMenus } = useMenu()
</script>

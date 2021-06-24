<template>
  <div class="aside-menu" :style="{width:sidebarWidth}">
    <b-scrollbar>
      <b-menu
        :collapse-transition="false"
        :default-active="activeMenu"
        @select="handleMenuSelect"
        unique-opened
        :collapse="!sidebar">
        <template v-for="(menu, menuIndex) in navMenu" :key="menuIndex">
          <menu-item v-if="!menu.children" :menu="menu"></menu-item>
          <submenu v-else :menu="menu"></submenu>
        </template>
      </b-menu>
    </b-scrollbar>
  </div>
</template>

<script>
import useSetting from '@/hooks/use-setting'
import MenuItem from '@/layouts/menus/menu-item'
import Submenu from '@/layouts/menus/submenu'
import { ref, watch } from 'vue'
import useStoreRouter from '@/hooks/use-store-router'
import useMenu from '@/hooks/use-menu'

export default {
  name: 'AsideMenus',
  components: { Submenu, MenuItem },
  setup() {
    const { $route } = useStoreRouter()
    const activeMenu = ref('')
    const openNames = ref([])
    const { sidebar, menuTheme, sidebarWidth, navMenu } = useSetting()
    const { getMenuItemNamePath, handleMenuSelect } = useMenu()

    watch(() => $route.path, (path) => {
      // 展开的菜单
      openNames.value = getMenuItemNamePath(path)
      activeMenu.value = path.replace('/', '')
    }, { immediate: true })

    return {
      sidebar,
      sidebarWidth,
      menuTheme,
      navMenu,
      activeMenu,
      handleMenuSelect
    }
  }
}
</script>

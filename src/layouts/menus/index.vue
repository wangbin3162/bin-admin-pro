<template>
  <div class="aside-menu" :style="{ width: setting.sidebarWidth }">
    <b-scrollbar>
      <b-menu
        :collapse-transition="false"
        :default-active="activeMenu"
        @select="handleMenuSelect"
        unique-opened
        :collapse="!setting.sidebar"
      >
        <template v-for="(menu, menuIndex) in navMenu" :key="menuIndex">
          <menu-item v-if="!menu.children" :menu="menu"></menu-item>
          <submenu v-else :menu="menu"></submenu>
        </template>
      </b-menu>
    </b-scrollbar>
  </div>
</template>

<script>
import useApp from '@/hooks/store/useApp'
import MenuItem from '@/layouts/menus/menu-item.vue'
import Submenu from '@/layouts/menus/submenu.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMenu from '@/hooks/store/useMenu'

export default {
  name: 'AsideMenus',
  components: { Submenu, MenuItem },
  setup() {
    const route = useRoute()
    const activeMenu = ref('')
    const openNames = ref([])
    const { setting } = useApp()
    const { getMenuItemNamePath, handleMenuSelect, navMenu } = useMenu()

    watch(
      () => route.name,
      name => {
        // 展开的菜单
        openNames.value = getMenuItemNamePath(name)
        activeMenu.value = name
      },
      { immediate: true },
    )

    return {
      setting,
      navMenu,
      activeMenu,
      handleMenuSelect,
    }
  },
}
</script>

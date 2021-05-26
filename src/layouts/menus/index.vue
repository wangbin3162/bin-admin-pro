<template>
  <div class="aside-menu" :style="{width:sidebarWidth}">
    <b-scrollbar>
      <b-menu
        background-color="#001529"
        :collapse-transition="false"
        :default-active="activeMenu"
        @select="handleMenuSelect"
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
import useSetting from '@/layouts/use-setting'
import MenuItem from '@/layouts/menus/menu-item'
import Submenu from '@/layouts/menus/submenu'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'AsideMenus',
  components: { Submenu, MenuItem },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const activeMenu = ref('')
    const openNames = ref([])
    const { sidebar, sidebarWidth, navMenu, navMenuItems, addRouters } = useSetting()

    // 获取菜单项名称路径
    function getMenuItemNamePath(name) {
      const activeRoute = navMenuItems.value.find(item => `/${item.name}` === name)
      return activeRoute ? activeRoute.parents : []
    }

    function handleMenuSelect(index) {
      const path = `/${index}`
      if (path === route.fullPath) {
        router.push({ path: `/redirect${route.fullPath}` })
        return
      }
      if (index === 'home' || addRouters.value.findIndex(item => item.path === index) > -1) {
        router.push({ path })
      } else {
        router.push('/404')
      }
    }

    watch(() => route, (val) => {
      // 展开的菜单
      openNames.value = getMenuItemNamePath(val.path)
      activeMenu.value = val.path.replace('/', '')
      console.log(openNames.value, activeMenu.value)
    }, { immediate: true })

    return {
      sidebar,
      sidebarWidth,
      navMenu,
      activeMenu,
      handleMenuSelect
    }
  }
}
</script>

<style lang="stylus">
.aside-menu {
  .bin-menu {
    .bin-menu-item-group__title {
      color: rgba(255, 255, 255, .5);
    }
    .bin-submenu__title {
      color: rgba(255, 255, 255, .85);
      &:hover {
        color: #fff;
      }
    }
    .bin-menu-item {
      color: rgba(255, 255, 255, .85);
      &:hover {
        color: #fff;
      }
      &.is-active {
        color: #fff;
        background: #1089ff !important;
      }
    }
    &.bin-menu--collapse {
      .bin-submenu.is-active {
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #0960bd;
          content: '';
          z-index: 1;
        }
      }
    }
  }
  .bin-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.bin-menu--popup {
  z-index: 100;
  min-width: 180px;
  border: none;
  padding: 5px 0;
  .bin-menu-item, .bin-submenu__title {
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
}
</style>

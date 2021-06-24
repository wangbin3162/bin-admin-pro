<template>
  <b-breadcrumb class="header-breadcrumb" separator="/">
    <b-breadcrumb-item v-for="item in levelList" :key="item.path">
      <b-dropdown @command="handleMenuSelect" v-if="showDropdown&&item.children.length">
        <span class="breadcrumb-item">{{ item.title }}<i class="b-iconfont b-icon-down"></i></span>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item
              v-for="child in item.children"
              :key="child.path"
              :name="child.path"
              :disabled="child.children.length>0"
            >{{ child.title }}
            </b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
      <span v-else class="no-redirect">{{ item.title }}</span>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
import useStoreRouter from '@/hooks/use-store-router'
import { computed, ref, watch } from 'vue'
import { DASHBOARD_MENUS, HOME_PATH } from '@/router/menus'
import useMenu from '@/hooks/use-menu'

export default {
  name: 'HeaderBreadcrumb',
  props: {
    simple: Boolean
  },
  setup(props) {
    const levelList = ref([])
    const { $route } = useStoreRouter()
    const { getBreadcrumbData, handleMenuSelect } = useMenu()
    const showDropdown = computed(() => {
      return !props.simple
    })

    watch(() => $route.path, (path) => {
      levelList.value = getBreadcrumbData(path)
    }, { immediate: true })

    return {
      showDropdown,
      levelList,
      handleMenuSelect
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-breadcrumb {
  display: inline-block;
  font-size: 14px;
  color: rgba(0, 0, 0, .45);
  .breadcrumb-item {
    font-weight: normal;
    color: rgba(0, 0, 0, .65);
    outline: none;
    .b-icon-down {
      margin-left: 4px;
      font-size: 12px;
    }
    &:hover {
      color: var(--primary-color);
    }
  }
  .no-redirect {
    font-weight: normal;
    color: rgba(0, 0, 0, .45);
    cursor: text;
  }
}
</style>

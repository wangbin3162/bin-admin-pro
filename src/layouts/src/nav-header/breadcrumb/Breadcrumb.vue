<template>
  <b-breadcrumb class="header-breadcrumb" separator="/">
    <b-breadcrumb-item v-for="item in levelList" :key="item.name">
      <b-dropdown @command="handleMenuSelect" v-if="showDropdown && item.children?.length">
        <span class="breadcrumb-item">
          {{ item.title }}
          <i class="b-iconfont b-icon-down"></i>
        </span>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item
              v-for="child in item.children"
              :key="child.name"
              :name="child.name"
              :disabled="child.children.length > 0"
            >
              {{ child.title }}
            </b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
      <span v-else class="no-redirect">{{ item.title }}</span>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import useMenu from '@/hooks/store/useMenu'

const props = defineProps({
  simple: Boolean,
})

const levelList = ref([])
const route = useRoute()
const { getBreadcrumbData, handleMenuSelect } = useMenu()
const showDropdown = computed(() => !props.simple)

watch(
  () => route.name,
  name => {
    levelList.value = getBreadcrumbData(name)
  },
  { immediate: true },
)
</script>

<style scoped>
.header-breadcrumb {
  display: inline-block;
  font-size: 14px;
  color: var(--v-header-text-color);
  padding-left: 20px;
  .breadcrumb-item {
    font-weight: normal;
    color: var(--v-header-text-color);
    outline: none;
    .b-icon-down {
      margin-left: 4px;
      font-size: 12px;
    }
    &:hover {
      color: var(--bin-color-primary);
    }
  }
  .no-redirect {
    font-weight: normal;
    color: var(--v-header-text-color);
    cursor: text;
  }
  :deep(.bin-separator) {
    margin: 0 6px;
    color: var(--v-header-text-color);
  }
}
</style>

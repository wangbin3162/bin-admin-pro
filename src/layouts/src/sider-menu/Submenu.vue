<template>
  <b-submenu :index="menu.name">
    <template #title>
      <i v-if="menu.icon" :class="`b-iconfont b-icon-${menu.icon}`"></i>
      <span>{{ menu.title }}</span>
    </template>
    <template v-for="child in menu.children" :key="child.name">
      <MenuItem v-if="!child.children" :menu="child" />
      <Submenu v-else :menu="child" />
    </template>
  </b-submenu>
</template>

<script setup>
import MenuItem from './MenuItem.vue'

defineOptions({
  name: 'Submenu',
})

defineProps({
  menu: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})
</script>

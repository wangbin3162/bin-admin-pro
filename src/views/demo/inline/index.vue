<template>
  <page-wrapper>
    <div class="iframe-con">inline</div>
  </page-wrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useMenu from '@/hooks/store/useMenu'

const loading = ref(true)
const $route = useRoute()
const { allMenuItems } = useMenu()
const src = computed(() => {
  const name = $route.path.substring(1)
  const curMenu = allMenuItems.value.find(item => item.name === name)
  return curMenu?.url + '?_usageMode=inline' || ''
})

function handleLoad() {
  loading.value = false
}
</script>

<style lang="stylus" scoped>
.iframe-con {
  height: 100%;
  padding: 20px;
  background: var(--v-g-bg-color);
}
</style>

<template>
  <page-wrapper>
    <div class="iframe-con">params: {{ params }}</div>
  </page-wrapper>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const params = computed(() => $route.params)
</script>

<style scoped>
.iframe-con {
  height: 100%;
  padding: 20px;
  background: var(--v-g-bg-color);
}
</style>

<template>
  <header-trigger icon="skin" tooltip="主题配置" @click="toggleTheme" />
  <theme-config v-model="themeVisible" />
</template>

<script setup>
import HeaderTrigger from '../header-trigger/HeaderTrigger.vue'
import { ThemeConfig } from '@/theme'
import { useStore } from '@/store'

const { appStore, storeToRefs } = useStore()
const { themeVisible } = storeToRefs(appStore)

function toggleTheme() {
  themeVisible.value = !themeVisible.value
}
</script>

<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/store'

onMounted(() => {
  const { settingStore } = useStore()
  settingStore.loadApp()
})
</script>

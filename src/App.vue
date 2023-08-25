<template>
  <b-config-provider themeName="dark" :theme="{ colorPrimary: 'rgb(22,293,255)' }">
    <router-view />
  </b-config-provider>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/store'

onMounted(() => {
  const { settingStore } = useStore()
  settingStore.loadApp()
})
</script>

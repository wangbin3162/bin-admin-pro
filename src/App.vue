<template>
  <b-config-provider>
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

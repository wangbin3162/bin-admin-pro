<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue'
import useStoreRouter from '@/hooks/use-store-router'

export default {
  setup() {
    const { $store } = useStoreRouter()
    onMounted(async () => {
      await $store.dispatch('loadApp')
    })
  }
}
</script>

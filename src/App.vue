<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue'
import useStoreRouter from '@/hooks/useStoreRouter'

export default {
  setup() {
    const { $store } = useStoreRouter()
    onMounted(async () => {
      await $store.dispatch('app/loadApp')
    })
  }
}
</script>

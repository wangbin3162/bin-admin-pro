<template>
  <header-trigger icon="setting" @click="toggleSetting"></header-trigger>
</template>

<script setup>
import HeaderTrigger from '../header-trigger/HeaderTrigger.vue'
import { useStore } from '@/store'

const { appStore, storeToRefs } = useStore()
const { settingVisible } = storeToRefs(appStore)

function toggleSetting() {
  settingVisible.value = !settingVisible.value
}
</script>

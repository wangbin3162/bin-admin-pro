<template>
  <b-config-provider abstract :themeName="themeName" :theme="themeConfigRef">
    <router-view />
  </b-config-provider>
</template>

<script setup>
import { useThemeInit, themeConfigRef } from '@/hooks/theme'

const { themeName } = useThemeInit()
</script>

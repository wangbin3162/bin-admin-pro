<template>
  <b-config-provider :themeName="themeName" :theme="themeConfigRef">
    <router-view />
  </b-config-provider>
</template>

<script setup>
import { useTheme } from '@/hooks/theme'

const { themeName, themeConfigRef } = useTheme()
</script>

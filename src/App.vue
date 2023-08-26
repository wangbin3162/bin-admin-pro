<template>
  <b-config-provider :themeName="themeName">
    <router-view />
  </b-config-provider>
</template>

<script setup>
import { useTheme } from '@/hooks/theme'

const { themeName } = useTheme()
</script>

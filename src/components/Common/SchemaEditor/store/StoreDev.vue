<template>
  <b-ace-editor
    :model-value="
      JSON.stringify({ canvas, shortcuts, comps, selectedCom, hoveredComId, areaData }, null, 2)
    "
    height="700px"
  />
</template>

<script setup>
import { canvas } from './useSchema'
import { shortcuts } from './useShortcuts'
import { comps, selectedCom, hoveredComId, areaData } from './useCom'
</script>

<template>
  <b-tooltip placement="bottom" append-to-body popper-class="tt-bar-popper">
    <button
      class="menu-item"
      :class="[
        { 'is-active': isActive ? isActive() : null },
        { 'is-disabled': isDisabled ? isDisabled() : null },
      ]"
      @click="action"
    >
      <svg class="remix">
        <use :xlink:href="`${iconUrl}#ri-${icon}`" />
      </svg>
    </button>
    <template #content>
      <div flex="dir:top cross:center" style="font-size: 12px;">
        <div>{{ title }}</div>
        <div v-if="hotKey">{{ hotKey }}</div>
      </div>
    </template>
  </b-tooltip>
</template>

<script setup>
import { ref } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  hotKey: {
    type: String,
  },
  action: {
    type: Function,
    required: true,
  },
  isActive: {
    type: Function,
    default: null,
  },
  isDisabled: {
    type: Function,
    default: () => false,
  },
})

const iconUrl = ref(remixiconUrl)
</script>

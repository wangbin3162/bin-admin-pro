<template>
  <div class="page-footer" :style="pageFooterStyle">
    <div class="page-footer__left">
      <slot name="left" />
    </div>
    <slot name="center" />
    <div class="page-footer__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
defineOptions({
  name: 'PageFooter',
})

const { storeToRefs, settingStore } = useStore()
const { pageFooterStyle } = storeToRefs(settingStore)
</script>

<style>
.page-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  height: 45px;
  line-height: 44px;
  background: #fff;
  border-top: 1px solid var(--v-g-border-color);
  box-shadow: 0 -6px 8px -8px rgba(0, 0, 0, 0.08), 0 -9px 10px 0 rgba(0, 0, 0, 0.05);
  transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>

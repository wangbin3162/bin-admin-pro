<template>
  <transition name="zoom-in-top">
    <ul class="contextmenu" v-show="visible" :style="style">
      <li @click="deleteElement">
        <b-icon name="delete"></b-icon>
        删除{{ data.type === 'line' ? '线' : '节点' }}
      </li>
    </ul>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['delete'])

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const visible = computed(() => props.data.show)
const style = computed(() => ({
  left: props.data.left,
  top: props.data.top,
}))

function deleteElement() {
  emit('delete')
}
</script>

<style scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  list-style-type: none;
  padding: 4px 0;
  border-radius: var(--bin-border-base-radius);
  font-size: var(--bin-base-font-size);
  color: var(--bin-color-text-default);
  border: 1px solid var(--bin-border-color-light);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  li {
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    line-height: 1em;
    list-style: none;
    color: var(--bin-color-text-default);
    &:hover {
      background: var(--bin-color-primary-light5);
      color: var(--bin-color-primary);
    }
  }
}
</style>

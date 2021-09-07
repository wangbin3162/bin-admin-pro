<template>
  <ul v-if="tag==='ul'" ref="dragRef">
    <slot></slot>
  </ul>
  <div v-else ref="dragRef">
    <slot></slot>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Sortable from 'sortablejs'
import { deepCopy } from '@/utils/util'

export default {
  name: 'Draggable',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    modelValue: {
      type: Array,
    },
    group: {
      type: [String, Object],
    },
    handle: {
      type: String,
    },
    ghostClass: {
      type: String,
    },
    dragClass: {
      type: String,
    },
    animation: {
      type: Number,
    },
    sort: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: String,
    },
    forceFallback: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'start', 'end'],
  setup(props, { emit }) {
    const defaultOptions = {
      forceFallback: props.forceFallback,
      animation: props.animation,
      ghostClass: props.ghostClass,
      dragClass: props.dragClass,
      group: props.group,
      handle: props.handle,
      sort: props.sort,
      filter: props.filter,
    }
    const dragRef = ref(null)
    const list = ref([])

    function emitValue() {
      emit('update:modelValue', list.value)
    }

    watch(() => props.modelValue, val => {
      list.value = deepCopy(val)
    }, { immediate: true, deep: true })

    let sortInstance = null
    onMounted(() => {
      if (sortInstance) sortInstance.destroy()
      const el = dragRef.value
      if (!el) return
      sortInstance = Sortable.create(el, {
        ...defaultOptions,
        onStart: (evt) => {
          emit('start', evt)
        },
        onUpdate: ({ newIndex, oldIndex }) => {
          const $li = el.children[newIndex]
          const $oldLi = el.children[oldIndex]
          // 先删除移动的节点
          el.removeChild($li)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
            el.insertBefore($li, $oldLi)
          } else {
            el.insertBefore($li, $oldLi.nextSibling)
          }
          // 更新items数组
          const targetRow = list.value.splice(oldIndex, 1)[0]
          list.value.splice(newIndex, 0, targetRow)
          // 下一个tick就会走patch更新
          emitValue()
        },
        onEnd: (evt) => {
          emit('end', evt)
        },
      })
    })
    onBeforeUnmount(() => {
      if (sortInstance) {
        sortInstance.destroy()
        sortInstance = null
      }
    })
    return {
      list,
      dragRef,
    }
  },
}
</script>

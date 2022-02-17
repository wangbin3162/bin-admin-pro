<template>
  <div class="key-value-wrapper">
    <ul class="mapping-list" ref="listRef">
      <li
        v-for="(item,index) in list"
        :key="index"
        class="mapping-item"
      >
        <drag-handle></drag-handle>
        <label>
          <b-input v-model="list[index].key" placeholder="key" clearable @input="inputChange"></b-input>
        </label>
        <label>
          <b-input v-model="list[index].value" placeholder="value" clearable @input="inputChange"></b-input>
        </label>
        <i class="destroy b-iconfont b-icon-delete" @click="handleRemove(index)"></i>
      </li>
    </ul>
    <div class="mt-8 mb-8" v-if="showAdd">
      <b-button icon="plus-circle" type="text" @click="handleAdd">新增</b-button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { deepCopy } from '@/utils/util'
import useSortable from '@/hooks/useSortable'
import DragHandle from '@/components/Common/DragHandle/index.vue'

export default {
  name: 'KeyValueMapping',
  components: { DragHandle },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
    showAdd: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const list = ref([])
    const { listRef } = useSortable(list, emitValue)

    // 数据变化后更新操作mapping
    watch(() => props.modelValue, (val) => {
      list.value = deepCopy(val)
    }, { immediate: true, deep: true })

    function inputChange() {
      emitValue()
    }

    function emitValue() {
      emit('update:modelValue', list.value)
    }

    function handleAdd() {
      list.value.push({ key: '', value: '' })
      emitValue()
    }

    function handleRemove(index) {
      list.value.splice(index, 1)
      emitValue()
    }

    return {
      listRef,
      list,
      inputChange,
      handleAdd,
      handleRemove,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.key-value-wrapper {
  .mapping-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .mapping-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      height: 44px;
      label {
        word-break: break-all;
        display: block;
        line-height: 1;
        flex: 1;
        font-size: 14px;
        transition: color .4s;
        padding-left: 8px;
      }
      i {
        flex-shrink: 0;
      }
      .destroy {
        margin-left: 8px;
        width: 24px;
        font-size: 18px;
        color: #f5222d;
        transition: color .2s ease-out;
        cursor: pointer;
        &:hover {
          color: #f74e57;
        }
      }
    }
  }
  .blue-background-class {
    position: relative;
    font-size: 0;
    border: 1px dashed getColor() !important;
    &::after {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff !important;
      background-image: linear-gradient(getLighten5(), getLighten3(), getLighten5()) !important;
    }
  }
  .drag-item-class {
    background: #fff !important;
    border: 1px solid getColor() !important;
  }
}
</style>

<template>
  <div ref="selectWrapper" class="bin-autocomplete" v-click-outside:[popperPaneRef]="handleClose">
    <b-popper
      ref="popper"
      v-model:visible="popperVisible"
      placement="bottom-start"
      append-to-body
      :popper-class="`bin-select__popper ${popperClass}`"
      manual-mode
      theme="light"
      pure
      trigger="click"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      :show-arrow="false"
      :offset="5"
      transition="zoom-in-top"
    >
      <template #trigger>
        <div class="select-trigger">
          <b-input
            v-model="currentValue"
            :size="size"
            autocomplete="off"
            :clearable="clearable"
            :disabled="disabled"
            :placeholder="placeholder"
            @input="debouncedInput"
          />
        </div>
      </template>

      <b-select-menu>
        <b-scrollbar
          v-show="list.length > 0 && !loading"
          ref="scrollbar"
          tag="ul"
          wrap-class="bin-select-dropdown__wrap"
          view-class="bin-select-dropdown__list"
        >
          <li
            v-for="(item, index) in list"
            :key="index"
            class="bin-select-dropdown__item"
            @click.stop="selectOptionClick(item)"
          >
            <slot name="item" v-bind="item">
              {{ item }}
            </slot>
          </li>
        </b-scrollbar>
        <p v-if="emptyText" class="bin-select-dropdown__empty">
          <b-icon v-show="loading" name="loading" class="icon-is-rotating"></b-icon>
          {{ emptyText }}
        </p>
      </b-select-menu>
    </b-popper>
  </div>
</template>

<script>
import { nextTick, computed, ref, watch, provide, reactive } from 'vue'
import { debounce, typeOf, deepCopy } from '@/utils/util'
import BSelectMenu from './select-dropdown.vue'

export default {
  name: 'BAutocomplete',
  components: { BSelectMenu },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    popperClass: {
      type: String,
      default: '',
    },
    debounce: {
      type: Number,
      default: 300,
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      validator: value => {
        return ['small', 'large', 'default', 'mini', ''].includes(value)
      },
    },
    clearable: Boolean,
    disabled: Boolean,

    fetchSuggestions: Function,
  },
  emits: ['update:modelValue', 'input', 'select'],
  setup(props, { emit }) {
    const selectWrapper = ref(null)
    const popper = ref(null)
    const currentValue = ref('')
    const loading = ref(false)
    const list = ref([])
    const popperVisible = ref(false)

    const emptyText = computed(() => {
      if (loading.value) {
        return '加载中'
      } else {
        if (list.value.length === 0) {
          return '暂无匹配数据'
        }
      }
      return null
    })

    const popperPaneRef = computed(() => popper.value?.popperRef)

    watch(
      () => props.modelValue,
      val => {
        setCurrentVal(val)
      },
      { immediate: true },
    )

    function setCurrentVal(value) {
      if (value === currentValue.value) return
      currentValue.value = value
    }

    const handleInput = value => {
      nextTick(() => {
        if (popperVisible.value) popper.value?.update?.()
      })
      fetchList()
      setCurrentVal(value)
      emit('update:modelValue', value)
      emit('input', value)
    }

    const setList = val => {
      list.value = deepCopy(val)
      loading.value = false
    }

    const selectOptionClick = item => {
      emit('select', item)
      handleClose()
    }

    const debouncedInput = debounce(handleInput, props.debounce)

    // 执行输入建议操作
    async function fetchList() {
      const querySearch = props.fetchSuggestions
      if (querySearch && typeOf(querySearch) === 'function') {
        try {
          loading.value = true
          popperVisible.value = true
          // 更新输入值并返回回调函数
          await querySearch(currentValue.value, setList)
        } catch (error) {
          setList([])
          console.log(error)
        }
      }
    }

    const handleClose = () => {
      popperVisible.value = false
    }

    provide(
      'AutoInput',
      reactive({
        props,
        selectWrapper,
      }),
    )

    return {
      selectWrapper,
      popper,
      currentValue,
      debouncedInput,
      list,
      loading,
      emptyText,
      selectOptionClick,
      popperVisible,
      handleClose,
      popperPaneRef,
    }
  },
}
</script>

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <b-form :model="data" :rules="rules" ref="formRef">
    <div class="custom-render-node" :class="[`node-level-${level}`, `node_${data.parent}`]">
      <div style="width: calc(100% - 75px - 600px)">
        <div class="title">
          <b-form-item prop="name" v-if="isEdit">
            <b-input v-model="data.name" placeholder="参数名称" />
          </b-form-item>
          <label class="label" v-else>{{ data.name }}</label>
        </div>
      </div>

      <div class="input" style="width: 600px; padding: 0 4px">
        <b-space>
          <div style="width: 340px">
            <b-input v-if="isEdit" v-model="data.des" placeholder="参数说明" />
            <label class="label" v-else>{{ data.des || '--' }}</label>
          </div>
          <div style="width: 240px">
            <b-dropdown
              @command="name => (data.paramType = name)"
              placement="right-start"
              v-if="isEdit"
            >
              <a href="javascript:void(0)" class="f-s-12 pl-8 pr-8" style="line-height: 32px">
                {{ data.paramType }}
              </a>
              <template #dropdown>
                <b-dropdown-menu>
                  <b-dropdown-item name="Object">Object</b-dropdown-item>
                  <b-dropdown-item name="Array">Array</b-dropdown-item>
                  <b-dropdown-item name="String">String</b-dropdown-item>
                </b-dropdown-menu>
              </template>
            </b-dropdown>
            <label class="label" v-else>{{ data.paramType }}</label>
          </div>
        </b-space>
      </div>

      <div
        class="ctrl"
        v-if="isEdit"
        style="width: 75px; line-height: 32px; padding: 0 4px"
        flex="main:right"
      >
        <b-icon
          v-if="data.paramType === 'Array'"
          name="Storedprocedure"
          type="button"
          color="var(--bin-color-warning)"
          title="批量导入"
          @click="emit('import')"
        ></b-icon>
        <b-dropdown @command="name => emit(name)">
          <b-icon name="plus-circle" type="button" color="var(--bin-color-success)"></b-icon>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item name="append-level">增加同级节点</b-dropdown-item>
              <b-dropdown-item name="append" v-if="data.paramType !== 'String'">
                增加子节点
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
        <b-icon
          name="minus-circle"
          type="button"
          color="var(--bin-color-danger)"
          title="移除当前节点"
          @click="emit('remove')"
        ></b-icon>
      </div>
    </div>
  </b-form>
</template>

<script setup>
import { computed, reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import { renderNodeForms } from './formValid'
/**
 * 自定义树结构节点，可根据实际情况进行设置
 */
defineOptions({ name: 'RenderNode' })

const emit = defineEmits(['append', 'append-level', 'import', 'remove'])

const props = defineProps({
  root: {
    type: Array,
    default: () => [],
  },
  node: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
})

const level = computed(() => (props.node.parents ? props.node.parents.length : 0))

// 校验函数
const validateName = async (rule, value, callback) => {
  if (/^[A-z_;]+\w*$/.test(value)) {
    callback()
  } else {
    callback(new Error('名称只能以_或字母开头'))
  }
}

const validateNameSame = async (rule, value, callback) => {
  // 获取父级节点，
  const parent = props.node.parent
  // 如果parent不存在，则需要查看是否存在重复
  if (parent === undefined) {
    // 获取根节点集合
    const rootNodes = props.root.filter(i => i.parent === undefined).map(i => i.node)
    if (
      rootNodes.findIndex(i => i.parent !== props.data.parent && i.name === props.data.name) > -1
    ) {
      callback(new Error('同层级存在同名参数！'))
    }
  } else {
    // 如果parent存在，则需要获取同层级的node节点
    const children = props.root[parent].node.children
    if (
      children.findIndex(i => i.parent !== props.data.parent && i.name === props.data.name) > -1
    ) {
      callback(new Error('同层级存在同名参数！'))
    }
  }

  callback()
}

const rules = reactive({
  name: [
    { required: true, message: '必填项', trigger: 'blur' },
    { validator: validateName, trigger: 'blur' },
    { validator: validateNameSame, trigger: 'blur' },
  ],
})

const formRef = ref(null)

onMounted(() => {
  if (props.isEdit) renderNodeForms.value.set(props.data.parent, formRef.value)
})

onBeforeUnmount(() => {
  if (props.isEdit) renderNodeForms.value.delete(props.data.parent)
})
</script>

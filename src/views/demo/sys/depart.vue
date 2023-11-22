<template>
  <page-wrapper>
    <b-layout has-sider :collapsedWidth="24">
      <template #sider>
        <base-tree
          ref="treeRef"
          tree-title="部门列表"
          show-filter
          :fetch="getDepartTree"
          @select-change="handleSelect"
          @command="handleCommand"
        >
          <template #ctrl>
            <b-dropdown-item name="root" divided>增加根节点</b-dropdown-item>
            <b-dropdown-item name="child" :disabled="!currentNode">增加子节点</b-dropdown-item>
          </template>
        </base-tree>
      </template>
      <div>
        <b-card :bordered="false" class="card-panel" shadow="never">
          <template #header>
            <div flex="main:justify cross:center" style="font-weight: normal">
              <div class="top">
                <iconfont icon="apartment" color="primary" bg round></iconfont>
                <span class="ml-5">编辑部门</span>
              </div>
              <div class="right">
                <b-button
                  v-if="currentNode"
                  type="text"
                  size="small"
                  @click="handleCommand('child')"
                >
                  新增子部门
                </b-button>
              </div>
            </div>
          </template>
          <div style="position: relative; min-height: 100px; overflow: hidden">
            <transition name="fade-in">
              <div style="position: absolute; width: 100%">
                <b-alert v-show="pageStatus.isNormal">点选左侧部门，进行编辑操作</b-alert>
              </div>
            </transition>
            <transition name="fade-transverse">
              <div class="pt-8" v-if="!pageStatus.isNormal">
                <b-row>
                  <b-col span="14">
                    <b-form
                      ref="formRef"
                      :model="copyNode"
                      :rules="ruleValidate"
                      label-width="100px"
                      label-suffix=":"
                    >
                      <b-form-item label="父级组织">
                        <b-input v-model="copyNode.parentName" disabled></b-input>
                      </b-form-item>
                      <b-form-item label="部门名称" prop="text">
                        <b-input
                          v-model="copyNode.text"
                          placeholder="输入部门名称"
                          clearable
                        ></b-input>
                      </b-form-item>
                      <b-form-item label="部门编码" prop="deptCode">
                        <b-input
                          v-model="copyNode.deptCode"
                          placeholder="输入部门编码"
                          clearable
                        ></b-input>
                      </b-form-item>
                      <b-form-item label="部门状态">
                        <b-switch
                          size="large"
                          v-model="copyNode.status"
                          true-value="1"
                          false-value="0"
                        >
                          <template #open><span>启用</span></template>
                          <template #close><span>禁用</span></template>
                        </b-switch>
                      </b-form-item>
                      <b-form-item label="部门描述">
                        <b-input
                          v-model="copyNode.desc"
                          type="textarea"
                          placeholder="输入部门描述"
                        ></b-input>
                      </b-form-item>
                      <b-form-item>
                        <b-button type="primary" @click="handleSubmit" :loading="editLoading">
                          {{ pageStatus.isCreate ? '提交数据' : '更新数据' }}
                        </b-button>
                        <b-button @click="handleResetForm">重置</b-button>
                      </b-form-item>
                    </b-form>
                  </b-col>
                </b-row>
              </div>
            </transition>
          </div>
        </b-card>
      </div>
    </b-layout>
  </page-wrapper>
</template>

<script setup>
import { getDepartTree } from '@/api/modules/depart.api'
import { ref } from 'vue'
import { deepCopy } from '@/utils/util'
import { Message } from 'bin-ui-design'
import useForm from '@/hooks/service/useForm'

defineOptions({
  name: 'SysDepart',
})

const treeRef = ref(null)
const currentNode = ref(null)
const copyNode = ref({})

const flatStateBuffer = ref({})

const {
  formRef,
  editStatus,
  pageStatus,
  editLoading,
  openCreate,
  openEdit,
  backNormal,
  submitForm,
  resetForm,
} = useForm()

function handleSelect(node, flatState) {
  if (node.selected) {
    currentNode.value = node
    flatStateBuffer.value = flatState
    handleEdit()
  } else {
    cancel()
  }
}

function handleCommand(name) {
  if (name === 'root') {
    handleCreate()
  }
  if (name === 'child') {
    handleCreate()
    const current = currentNode.value
    copyNode.value.parentId = current.id
    copyNode.value.parentName = current.text
  }
}

function resetFormData(edit = 'edit') {
  if (edit === 'edit') {
    const flatState = flatStateBuffer.value
    const current = currentNode.value
    const parentKey = flatState[current.nodeKey].parent
    const parentNode = parentKey || parentKey === 0 ? flatState[parentKey].node : {}
    copyNode.value = current
      ? {
          ...deepCopy(current),
          parentId: parentKey === 0 ? '' : parentNode.id,
          parentName: parentNode.text,
        }
      : {}
    return
  }
  // 创建模式
  copyNode.value = {
    text: '',
    deptCode: '',
    status: '1',
    desc: '',
    parentId: '',
    parentName: undefined,
  }
}

function cancel() {
  currentNode.value = null
  flatStateBuffer.value = null
  copyNode.value = {}
  backNormal()
}

function handleCreate() {
  resetFormData('create')
  openCreate()
}

function handleEdit() {
  resetFormData('edit')
  openEdit()
}

function handleSubmit() {
  submitForm(() => {
    editLoading.value = true
    const status = pageStatus.value
    setTimeout(() => {
      Message.success(`${status.isCreate ? '新增' : '修改'}成功！`)
      backNormal()
      const keys = currentNode.value ? [currentNode.value.nodeKey] : []
      treeRef.value && treeRef.value.reloadTree(keys)
      editLoading.value = false
    }, 1000)
  })
}

function handleResetForm() {
  resetFormData(editStatus.value)
  resetForm()
}

const ruleValidate = {
  text: [{ required: true, message: '部门名称必填', trigger: 'blur' }],
  deptCode: [{ required: true, message: '部门编码必填', trigger: 'blur' }],
}
</script>

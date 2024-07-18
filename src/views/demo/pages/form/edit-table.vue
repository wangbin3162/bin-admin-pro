<template>
  <page-wrapper desc="编辑表格，可以设置父级元素为edit-table来开启编辑表格的样式">
    <b-form :model="list" label-width="85px" ref="formRef" label-position="top">
      <b-collapse-wrap title="编辑表格" shadow="none">
        <template #right>
          <debug-modal :data="list" />
        </template>
        <div class="edit-table" style="padding: 10px 24px">
          <b-table
            :columns="columns"
            :data="list"
            noDataText="暂无参数"
            draggable
            drag-handle=".drag"
            max-height="420"
            @drag-drop="handleDragDrop"
          >
            <template #handle>
              <drag-handle />
            </template>
            <template #name="{ index }">
              <b-form-item :rules="validateRules.name" :prop="index + '.name'">
                <b-input type="text" v-model="list[index].name" clearable></b-input>
              </b-form-item>
            </template>
            <template #age="{ index }">
              <b-form-item :rules="validateRules.age" :prop="index + '.age'">
                <b-input-number
                  type="text"
                  v-model="list[index].age"
                  arrow-up-icon="plus"
                  arrow-down-icon="minus"
                ></b-input-number>
              </b-form-item>
            </template>
            <template #birthday="{ index }">
              <b-form-item :rules="validateRules.birthday" :prop="index + '.birthday'">
                <b-date-picker
                  v-model="list[index].birthday"
                  type="date"
                  placeholder="选择日期"
                ></b-date-picker>
              </b-form-item>
            </template>
            <template #hobby="{ index }">
              <b-form-item :rules="validateRules.hobby" :prop="index + '.hobby'">
                <b-select v-model="list[index].hobby" clearable>
                  <b-option v-for="(val, key) in hobbyMap" :key="key" :value="key" :label="val">
                    {{ val }}
                  </b-option>
                </b-select>
              </b-form-item>
            </template>
            <template #address="{ index }">
              <b-form-item :rules="validateRules.address" :prop="index + '.address'">
                <b-input type="text" v-model="list[index].address"></b-input>
              </b-form-item>
            </template>
            <template #action="{ index }">
              <action-button
                type="text"
                icon="minus-circle"
                color="danger"
                is-icon
                tooltip="移除"
                message="确定移除此项吗？"
                confirm
                @click="handleRemove(index)"
              ></action-button>
            </template>
          </b-table>
          <div class="mt-8">
            <b-button icon="plus" dashed style="width: 100%" @click="handleAdd">新增</b-button>
          </div>
        </div>
      </b-collapse-wrap>
    </b-form>
  </page-wrapper>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import { Message } from 'bin-ui-design'

defineOptions({
  name: 'EditTable',
})

const formRef = ref(null)
const tableRef = ref(null)

const hobbyMap = { 1: '吃饭', 2: '睡觉', 3: '打豆豆' }
const columns = [
  { title: ' ', slot: 'handle', width: 24, align: 'center' },
  { title: '姓名', slot: 'name' },
  { title: '年龄', slot: 'age' },
  { title: '出生日期', slot: 'birthday' },
  { title: '爱好', slot: 'hobby' },
  { title: '地址', slot: 'address' },
  { title: ' ', slot: 'action', width: 50, align: 'center' },
]

const validateRules = reactive({
  name: [{ required: true, message: '必填项', trigger: 'blur' }],
  age: [{ required: true, message: '必填项', trigger: 'change' }],
  birthday: [{ required: true, message: '必填项', trigger: 'change' }],
  hobby: [{ required: true, message: '必填项', trigger: 'change' }],
  address: [{ required: true, message: '必填项', trigger: 'blur' }],
})

const list = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    hobby: '1',
    address: '北京市朝阳区芍药居',
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    hobby: '1',
    address: '北京市海淀区西二旗',
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    hobby: '3',
    address: '上海市浦东新区世纪大道',
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    hobby: '1',
    address: '深圳市南山区深南大道',
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    hobby: '2',
    address: '南京市龙眠大道',
  },
])

function handleAdd() {
  const row = {
    name: '',
    age: null,
    birthday: '',
    hobby: '',
    address: '',
  }
  list.value.push(row)
}

function handleRemove(index) {
  list.value.splice(index, 1)
}

function submitForm() {
  formRef.value.validate(valid => {
    if (valid) {
      Message.success('success submit!!')
    } else {
      Message.error('error submit!!')
      return false
    }
  })
}

function handleDragDrop(newList, newIndex) {
  list.value = [...newList]
  nextTick(() => tableRef.value && tableRef.value.clickCurrentRow(newIndex))
}

function resetForm() {
  formRef.value.resetFields()
}
</script>

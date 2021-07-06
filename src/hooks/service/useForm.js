import { computed, ref, watch } from 'vue'

/**
 * 表单操作、状态内容定义
 */
export default function useForm(moduleName = '') {
  const formRef = ref(null) // form组件
  const editStatus = ref('normal')
  const editLoading = ref(false)

  const editStatusMap = computed(() => ({
    normal: '默认',
    detail: moduleName + '详情',
    edit: '修改' + moduleName,
    create: '新增' + moduleName
  }))
  const editTitle = computed(() => editStatusMap.value[editStatus.value])
  const pageStatus = computed(() => ({
    isNormal: editStatus.value === 'normal',
    isCreate: editStatus.value === 'create',
    isEdit: editStatus.value === 'edit',
    isDetail: editStatus.value === 'detail'
  }))

  watch(() => editStatus.value, () => {
    window.scrollTo(0, 0)
  })

  function openDetail() {
    editStatus.value = 'detail'
  }

  function openCreate() {
    editStatus.value = 'create'
    formRef.value && formRef.value.resetFields()
  }

  function openEdit() {
    editStatus.value = 'edit'
    formRef.value && formRef.value.resetFields()
  }

  function backNormal() {
    editStatus.value = 'normal'
  }

  return {
    formRef,
    editLoading
  }
}

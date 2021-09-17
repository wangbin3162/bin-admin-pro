import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import { Message } from 'bin-ui-next'

export default function useCubePage() {
  const router = useRouter()
  const route = useRoute()

  const dataset = reactive({
    id: '',
    workspaceId: '',
    datasetName: '未命名',
  })

  // 返回
  const handleBack = (backUrl) => {
    router.push(backUrl || '/')
  }

  // 保存
  const handleSave = () => {
    Message.success(`保存 [ ${dataset.datasetName} ] 成功`)
  }

  const getBaseInfo = () => {
    dataset.datasetName = dataset.id === 'dataset_0001' ? '数据集（空）' : '数据集'
  }

  watch(() => route.path, (path) => {
    if (path !== '/schema/cube') return
    const { id, workspaceId } = route.query
    if (id && workspaceId) {
      dataset.id = id
      dataset.workspaceId = workspaceId
      getBaseInfo()
    } else {
      Message.error({
        message: '没有请求参数，即将关闭此页面！',
        // onClose: window.close,
      })
    }
  }, { immediate: true })

  return {
    dataset,
    handleSave,
    handleBack,
  }
}

<template>
  <div class="cube-bi">
    CubeBi
    <p>{{ query }}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { Message } from 'bin-ui-next'

export default {
  name: 'Cube',
  setup() {
    const route = useRoute()
    const query = ref({
      id: '',
      workspaceId: '',
    })

    watch(() => route.path, () => {
      console.log(route.query)
      const { id, workspaceId } = route.query
      if (id && workspaceId) {
        query.value.id = id
        query.value.workspaceId = workspaceId
      } else {
        Message.error({
          message: '没有请求参数，即将关闭此页面！',
          // onClose: window.close,
        })
      }
    }, { immediate: true })
    return {
      query,
    }
  },
}
</script>

<style scoped>

</style>

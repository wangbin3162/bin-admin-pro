<template>
  <page-wrapper>
    <div>
      <b-button type="primary" @click="goEdit">点击进行流程编排操作</b-button>
    </div>
  </page-wrapper>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineOptions({
  name: 'VueFlowCustom',
})

const router = useRouter()

function goEdit() {
  router.push('/flow-editor')
}
</script>

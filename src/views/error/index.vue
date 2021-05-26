<template>
  <error404></error404>
</template>

<script>
import { useRoute } from 'vue-router'
import Error404 from '@/views/error/Error404'

export default {
  name: 'ErrorPage',
  components: { Error404 },
  props: {
    // 状态码
    status: {
      type: Number,
      default: 404
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { query } = useRoute()
    console.log(query)
    return {}
  }
}
</script>

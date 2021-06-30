<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '0'}">
    <template #header>
      <div class="top" style="font-weight: normal;">
        <iconfont icon="check-square" color="warning" bg round></iconfont>
        <span class="ml-5">待办事项</span>
      </div>
    </template>
    <div class="todos">
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'todos'
}
</script>

<style scoped>

</style>

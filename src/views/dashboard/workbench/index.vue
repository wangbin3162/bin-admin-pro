<template>
  <div class="workplace">
    <top-box />
    <div class="work-center">
      <b-row :gutter="16">
        <b-col span="14">
          <project-box />
          <dynamic-box />
        </b-col>
        <b-col span="10">
          <quick-link />
          <div class="banner">
            <img src="@/assets/images/bg/work.png" alt="work" />
          </div>
          <todo-list />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import TopBox from './top-box.vue'
import ProjectBox from './project-box.vue'
import DynamicBox from './dynamic-box.vue'
import QuickLink from './quick-link.vue'
import TodoList from './todo-list.vue'

export default {
  name: 'WorkBench',
  components: { TodoList, QuickLink, DynamicBox, TopBox, ProjectBox },
}
</script>

<style scoped>
.work-center {
  margin: 16px;
  .banner {
    padding: 16px;
    margin: 16px 0;
    background: #fff;
    text-align: center;
    img {
      height: 260px;
    }
  }
}
</style>

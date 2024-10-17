<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{ padding: '0' }">
    <template #header>
      <div flex="main:justify cross:center" style="font-weight: normal">
        <div class="top">
          <iconfont icon="check-square" color="warning" bg round></iconfont>
          <span class="ml-5">待办事项</span>
        </div>
        <b-tooltip content="新增代办">
          <b-icon name="plus-circle" type="button" @click="handleAdd"></b-icon>
        </b-tooltip>
      </div>
    </template>

    <draggable
      v-model="todolist"
      class="todo-list"
      tag="ul"
      item-key="element"
      v-bind="{
        animation: 200,
        ghostClass: 'ghost',
        dragClass: 'drag-item-class',
        forceFallback: true,
        handle: '.drag',
      }"
    >
      <template #item="{ element, index }">
        <li class="todo" :class="[{ done: element.done }, { edit: editIndex === index }]">
          <i class="b-iconfont b-icon-menu drag"></i>
          <span class="toggle" @click="toggleCheck(index)">
            <b-icon name="check"></b-icon>
          </span>
          <label v-if="editIndex === index">
            <b-input
              v-model="editText"
              size="small"
              v-focus
              @enter="inputBlur(index)"
              @blur="inputBlur(index)"
            />
          </label>
          <label v-else @dblclick="dbClickEdit(index)">{{ element.text }}</label>
          <i class="destroy b-iconfont b-icon-close" @click="removeOne(index)"></i>
        </li>
      </template>
    </draggable>
    <footer class="footer">
      <span class="count">
        <strong>{{ leftCount }}</strong>
        项未完成
      </span>
      <span class="count">
        <strong>{{ todoLabel }}</strong>
      </span>
    </footer>
  </b-card>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/pinia'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  setup() {
    const editIndex = ref(-1)
    const editText = ref('')

    const { appStore, storeToRefs } = useStore()

    const { todolist, leftCount, todoLabel } = storeToRefs(appStore)

    function handleAdd() {
      if (editIndex.value > -1) {
        editIndex.value = -1
        editText.value = ''
        return
      }
      todolist.value.push({ text: '', done: false })
      editIndex.value = todolist.value.length - 1
      editText.value = ''
    }

    function dbClickEdit(index) {
      editIndex.value = index
      editText.value = todolist.value[index].text
    }

    function inputBlur(index) {
      const text = editText.value
      if (text === '') {
        if (index > -1) {
          removeOne(index)
        }
      } else {
        todolist.value[index].text = text
        editIndex.value = -1
      }
    }

    function toggleCheck(index) {
      todolist.value[index].done = !todolist.value[index].done
    }

    function removeOne(index) {
      todolist.value.splice(index, 1)
    }

    return {
      editIndex,
      editText,
      todolist,
      leftCount,
      todoLabel,
      handleAdd,
      inputBlur,
      removeOne,
      dbClickEdit,
      toggleCheck,
    }
  },
}
</script>

<style scoped>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  .todo {
    position: relative;
    font-size: 24px;
    height: 44px;
    border-bottom: 1px solid #ededed;
    .drag {
      position: absolute;
      top: 12px;
      left: 6px;
      font-size: 16px;
      cursor: grab;
      z-index: 1;
    }
    .toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      position: absolute;
      top: 12px;
      left: 32px;
      border: 1px solid #dddddd;
      border-radius: 50%;
      opacity: 0.5;
      cursor: pointer;
      i {
        display: none;
        font-size: 16px;
      }
    }
    label {
      word-break: break-all;
      padding: 15px 15px 15px 64px;
      display: block;
      line-height: 1;
      font-size: 14px;
      transition: color 0.4s;
    }
    .destroy {
      display: none;
      position: absolute;
      top: 12px;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      font-size: 18px;
      color: #fba7ab;
      transition: color 0.2s ease-out;
      cursor: pointer;
      &:hover {
        color: #f74e57;
      }
    }
    &.edit {
      label {
        padding: 9px 60px 7px 64px;
      }
    }
    &.done {
      .toggle {
        border-color: #bae7a3;
        background-color: #f6fcf4;
        opacity: 1;
        i {
          color: #52c41a;
          display: block;
        }
      }
      label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
    &:hover {
      .destroy {
        display: block;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  position: relative;
  padding: 10px 15px;
  height: 40px;
  text-align: left;
  border-top: 1px solid #e6e6e6;
  font-size: 12px;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2),
      0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
}
.ghost {
  opacity: 0.8;
  background: #86c2ff;
}
</style>

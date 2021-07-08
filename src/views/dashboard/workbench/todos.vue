<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '0'}">
    <template #header>
      <div flex="main:justify cross:center" style="font-weight: normal;">
        <div class="top">
          <iconfont icon="check-square" color="warning" bg round></iconfont>
          <span class="ml-5">待办事项</span>
        </div>
        <b-tooltip content="新增代办">
          <b-icon name="plus-circle" type="button" @click="handleAdd"></b-icon>
        </b-tooltip>
      </div>
    </template>
    <ul class="todo-list" ref="listRef">
      <li
        v-for="item in list"
        :key="item._rowKey"
        :data-key="item._rowKey"
        class="todo"
        :class="[{done:item.done},{edit: editIndex === item._index}]"
      >
        <i class="handle drag b-iconfont b-icon-menu"></i>
        <span class="toggle" @click="toggleCheck(item._index)">
          <b-icon name="check"></b-icon>
        </span>
        <label v-if="editIndex === item._index">
          <b-input
            ref="inputRef"
            v-model="editText"
            size="small"
            clearable
            @enter="inputBlur(item._index)"
            @blur="inputBlur(item._index)"
          ></b-input>
        </label>
        <label v-else @dblclick="dbClickEdit(item._index)">{{ item.text }}</label>
        <i class="destroy b-iconfont b-icon-close" @click="removeOne(item._index)"></i>
      </li>
    </ul>
    <footer class="footer">
      <span class="count"><strong>{{ leftCount }}</strong>项未完成</span>
      <span class="count"><strong>{{ todoLabel }}</strong></span>
    </footer>
  </b-card>
</template>

<script>
import useTodos from '@/hooks/store/useTodos'
import { nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { deepCopy, generateId } from '@/utils/util'
import Sortable from 'sortablejs'
import Iconfont from '@/components/Iconfont/iconfont'

let rowKey = 1

export default {
  name: 'todos',
  components: { Iconfont },
  setup() {
    const editIndex = ref(-1)
    const editText = ref('')
    const inputRef = ref(null)
    const listRef = ref(null)
    const {
      todos,
      todoLabel,
      leftCount,
      saveTodos
    } = useTodos()
    const list = ref(todos.value)
    let sortInstance = null
    watch(todos, (val) => {
      list.value = makeData()
    }, { immediate: true })

    onMounted(() => {
      if (sortInstance) sortInstance.destroy()
      const el = listRef.value
      sortInstance = Sortable.create(el, {
        animation: 150,
        ghostClass: 'ghost',
        handle: '.drag',
        onEnd: (evt) => {
          const {
            newIndex,
            oldIndex
          } = evt
          const newData = deepCopy(list.value)
          const targetRow = newData.splice(oldIndex, 1)[0]
          newData.splice(newIndex, 0, targetRow)
          updateState(newData)
        }
      })
    })

    function updateState(list) {
      saveTodos(list)
    }

    onBeforeUnmount(() => {
      if (sortInstance) {
        sortInstance.destroy()
        sortInstance = null
      }
    })

    async function handleAdd() {
      if (editIndex.value > -1) {
        editIndex.value = -1
        editText.value = ''
        return
      }
      list.value.push({
        _index: list.value.length,
        text: '',
        done: false
      })
      editIndex.value = list.value.length - 1
      editText.value = ''
      await nextTick()
      inputRef.value && inputRef.value.focus()
    }

    async function dbClickEdit(index) {
      editIndex.value = index
      editText.value = list.value[index].text
      await nextTick()
      inputRef.value && inputRef.value.focus()
    }

    function inputBlur(index) {
      const text = editText.value
      if (text === '') {
        if (index > -1) { // 为空时候移除这个
          list.value.splice(index, 1)
        }
      } else {
        list.value[index].text = text
        editIndex.value = -1
        updateState(list.value)
      }
    }

    function toggleCheck(index) {
      list.value[index].done = !list.value[index].done
      updateState(list.value)
    }

    function removeOne(index) {
      list.value.splice(index, 1)
      updateState(list.value)
    }

    // 重新组织ID
    function makeData() {
      const data = deepCopy(todos.value)
      data.forEach((row, index) => {
        row._index = index
        row._rowKey = generateId() + rowKey++
      })
      return data
    }

    return {
      editIndex,
      editText,
      list,
      todos,
      todoLabel,
      leftCount,
      inputRef,
      listRef,
      handleAdd,
      inputBlur,
      removeOne,
      dbClickEdit,
      toggleCheck
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/mixins.styl"
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
      cursor: grab;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      top: 12px;
      left: 6px;
      font-size: 12px;
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
      transition: color .4s;
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
      transition: color .2s ease-out;
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
  .count {

  }
  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, .2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, .2);
  }
}
.ghost {
  opacity: 0.8;
  background: #86c2ff;
}
</style>

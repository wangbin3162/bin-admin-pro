<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '0'}">
    <template #header>
      <div class="top" style="font-weight: normal;">
        <iconfont icon="check-square" color="warning" bg round></iconfont>
        <span class="ml-5">待办事项</span>
      </div>
    </template>
    <ul class="todo-list">
      <li class="todo">
        <span class="toggle">
          <b-icon name="check"></b-icon>
        </span>
        <label>star this repository</label>
        <i class="destroy b-iconfont b-icon-close"></i>
      </li>
      <li class="todo done">
        <span class="toggle">
          <b-icon name="check"></b-icon>
        </span>
        <label>star this repository</label>
        <i class="destroy b-iconfont b-icon-close"></i>
      </li>
    </ul>
    <footer class="footer"></footer>
  </b-card>
</template>

<script>
export default {
  name: 'todos'
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
    height: 46px;
    border-bottom: 1px solid #ededed;
    .toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      position: absolute;
      top: 10px;
      left: 10px;
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
      padding: 15px 15px 15px 50px;
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
    &.done {
      .toggle {
        border-color: #bae7a3;
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
  }
}
.footer {
  color: #777;
  position: relative;
  padding: 10px 15px;
  height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
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
</style>

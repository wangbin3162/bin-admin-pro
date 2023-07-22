<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="tt-divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MenuItem from './MenuItem.vue'
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

const items = reactive([
  {
    icon: 'arrow-go-back-line',
    title: '撤销',
    hotKey: 'Ctrl Z',
    action: () => props.editor.chain().focus().undo().run(),
    isDisabled: () => !props.editor.can().chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: '重做',
    hotKey: 'Shift Ctrl Z',
    action: () => props.editor.chain().focus().redo().run(),
    isDisabled: () => !props.editor.can().chain().focus().redo().run(),
  },
  {
    icon: 'format-clear',
    title: '清除格式',
    action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'paragraph',
    title: '正文',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: 'h-1',
    title: '标题1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: '标题2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    icon: 'h-3',
    title: '标题3',
    action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 3 }),
  },
  {
    icon: 'h-4',
    title: '标题4',
    action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 4 }),
  },
  {
    icon: 'h-5',
    title: '标题5',
    action: () => props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 5 }),
  },
  {
    icon: 'h-6',
    title: '标题6',
    action: () => props.editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 6 }),
  },
  {
    type: 'divider',
  },
  {
    icon: 'bold',
    title: '粗体',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: 'italic',
    title: '斜体',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: '删除线',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  {
    icon: 'underline',
    title: '下划线',
    action: () => props.editor.chain().focus().toggleUnderline().run(),
    isActive: () => props.editor.isActive('underline'),
  },
  {
    icon: 'code-view',
    title: '行内代码',
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'font-color',
    title: '文字颜色',
    action: () => props.editor.chain().setColor('#F98181').run(),
  },
  {
    icon: 'mark-pen-line',
    title: '背景颜色',
    action: () => props.editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'list-unordered',
    title: '无序列表',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: '有序列表',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'list-check-2',
    title: '任务列表',
    action: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: '代码块',
    action: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive('codeBlock'),
  },
  {
    icon: 'double-quotes-l',
    title: '插入引用',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: '插入分割线',
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'table-2',
    title: '插入表格',
    action: () =>
      props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    icon: 'delete-bin-6-line',
    title: '删除表格',
    action: () => props.editor.chain().focus().deleteTable().run(),
  },
  {
    icon: 'merge-cells-horizontal',
    title: '合并拆分单元格',
    action: () => props.editor.chain().focus().mergeOrSplit().run(),
  },
  {
    icon: 'insert-row-top',
    title: '上面添加一行',
    action: () => props.editor.chain().focus().addRowBefore().run(),
  },
  {
    icon: 'insert-row-bottom',
    title: '下面添加一行',
    action: () => props.editor.chain().focus().addRowAfter().run(),
  },
  {
    icon: 'delete-row',
    title: '删除行',
    action: () => props.editor.chain().focus().deleteRow().run(),
  },
  {
    icon: 'insert-column-left',
    title: '左边添加一列',
    action: () => props.editor.chain().focus().addColumnBefore().run(),
  },
  {
    icon: 'insert-column-right',
    title: '右边添加一列',
    action: () => props.editor.chain().focus().addColumnAfter().run(),
  },
  {
    icon: 'delete-column',
    title: '删除列',
    action: () => props.editor.chain().focus().deleteColumn().run(),
  },
  {
    icon: 'sip-line',
    title: '单元格背景色',
    action: () => props.editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    icon: 'image-line',
    title: '图片',
    action: () => {
      console.log('点击图片上传')
      const url = window.prompt('URL')

      if (url) {
        props.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
])
</script>

<template>
  <div class="bin-tiptap" v-if="editor">
    <MenuBar class="editor-header" :editor="editor" />
    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script>
/**
 * 依赖
 * @tiptap/pm
 * @tiptap/vue-3
 * @tiptap/starter-kit
 * @tiptap/extension-underline
 * @tiptap/extension-highlight
 * @tiptap/extension-text-style
 * @tiptap/extension-color
 * remixicon https://remixicon.com/
 *
 */
export default { name: 'BinTiptap' }
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// 部分功能需要安装插件
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'

import MenuBar from './Menu/MenuBar.vue'
import './style.stylus'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // 展开现有属性,?.是可选链操作符,可以自行百度(懂的大佬当我没说)
      ...this.parent?.(),

      // 添加新的属性
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => ({
          'data-background-color': attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`,
        }),
      },
    }
  },
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextStyle,
    Underline,
    Color,
    Image,
    Highlight.configure({ multicolor: true }),
    // 表格
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
  ],
  onUpdate: event => {
    const { editor } = event
    emit('update:modelValue', editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  value => {
    if (!editor.value) return
    const isSame = editor.value.getHTML() === value
    if (isSame) return
    editor.value.commands.setContent(value, false)
  },
  { immediate: true },
)

onBeforeUnmount(() => editor.value?.destroy())
</script>

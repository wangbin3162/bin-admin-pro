<template>
  <page-wrapper desc="通过官方库拿到用户输入，执行，输出，用于展示部分代码以及表现形式">
    <div style="height: 500px">
      <Repl :editor="Codemirror" />
    </div>
  </page-wrapper>
</template>

<script setup>
import { Repl } from '@vue/repl'
import Codemirror from '@vue/repl/codemirror-editor'
</script>

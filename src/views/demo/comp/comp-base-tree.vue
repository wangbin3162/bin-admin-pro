<template>
  <page-wrapper desc="页面内容为Mock数据，仅作示例使用。">
    <b-space :size="16" alignment="flex-start">
      <base-tree
        tree-title="基础树"
        :fetch="getDepartTree"
        @select-change="handleSelect"
      ></base-tree>
      <base-tree
        tree-title="可搜索"
        :fetch="getDepartTree"
        show-filter
        @select-change="handleSelect"
      ></base-tree>
      <base-tree
        tree-title="搜索位置"
        :fetch="getDepartTree"
        show-filter
        filter-position="inner"
        @select-change="handleSelect"
      ></base-tree>
      <base-tree
        tree-title="开启多选"
        :fetch="getDepartTree"
        show-checkbox
        @select-change="handleSelect"
        @check-change="handleChecked"
      ></base-tree>
    </b-space>
    <b-divider></b-divider>
    <b-space :size="16" alignment="flex-start">
      <base-tree
        tree-title="render函数"
        :fetch="data"
        :render="renderContent"
        @select-change="handleSelect"
      ></base-tree>
      <base-tree
        tree-title="自定义render"
        :fetch="getDepartTree"
        :render="renderContent2"
        @select-change="handleSelect"
      ></base-tree>
      <base-tree
        tree-title="额外操作"
        :fetch="getDepartTree"
        @select-change="handleSelect"
      >
        <b-dropdown @command="handleCommand">
          <a href="javascript:void(0)">
            增加部门
            <b-icon name="down"></b-icon>
          </a>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item name="root" selected>增加根节点</b-dropdown-item>
              <b-dropdown-item name="child" :disabled="!currentNode">增加子节点</b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </base-tree>
      <base-tree
        tree-title="插入操作"
        :fetch="getDepartTree"
        @select-change="handleSelect"
        @command="handleCommand"
      >
        <template #ctrl>
          <b-dropdown-item name="root" divided>增加根节点</b-dropdown-item>
          <b-dropdown-item name="child" :disabled="!currentNode">增加子节点</b-dropdown-item>
        </template>
      </base-tree>
    </b-space>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper'
import { getDepartTree } from '@/api/modules/depart.api'
import BaseTree from '@/components/Common/BaseTree'
import { h } from 'vue'

export default {
  name: 'CompBaseTree',
  components: {
    BaseTree,
    PageWrapper
  },
  data() {
    return {
      getDepartTree,
      data: [
        {
          title: 'parent 1',
          expand: true,
          render: ({ root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%'
              }
            }, [
              h('span', data.title),
              h('i', {
                class: ['b-iconfont', 'b-icon-plus-square'],
                style: {
                  fontSize: '16px',
                  color: '#1089ff'
                },
                onClick: () => {
                  this.append(data)
                }
              })
            ])
          },
          children: [
            { title: 'child 1-1' },
            { title: 'child 1-2' }
          ]
        }
      ],
      currentNode: null
    }
  },
  methods: {
    renderContent({ root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%'
        }
      }, [
        h('span', data.title),
        h('span', { style: { display: 'inline-block' } }, [
          h('i', {
            class: ['b-iconfont', 'b-icon-plus-circle'],
            style: { fontSize: '16px', color: '#5d6d7e' },
            onClick: (e) => {
              e.stopPropagation()
              this.append(data)
            }
          }),
          h('i', {
            class: ['b-iconfont', 'b-icon-minus-circle'],
            style: { fontSize: '16px', color: '#f5222d' },
            onClick: (e) => {
              e.stopPropagation()
              this.remove(root, node, data)
            }
          })
        ])
      ])
    },
    renderContent2({ root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%'
        }
      }, [
        h('span', data.text),
        h('span', { style: { display: 'inline-block' } }, [
          h('i', {
            class: ['b-iconfont', 'b-icon-plus-square-fill'],
            style: { fontSize: '18px', color: '#5d6d7e' },
            onClick: (e) => {
              e.stopPropagation()
              this.$message(`给[${data.text}]增加子节点`)
            }
          }),
          h('i', {
            class: ['b-iconfont', 'b-icon-minus-square-fill'],
            style: { fontSize: '18px', color: '#f5222d' },
            onClick: (e) => {
              e.stopPropagation()
              this.$message(`移除[${data.text}]`)
            }
          })
        ])
      ])
    },
    append(data) {
      const children = data.children || []
      data.expand = true
      children.push({ title: 'new node' })
      data.children = children
      this.data = [...this.data]
    },
    remove(root, node, data) {
      console.log(root, node, data)
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    handleSelect(node) {
      console.log('-------comp-base-tree-------')
      this.currentNode = node
      console.log('----------------------------')
    },
    handleChecked(checked) {
      console.log('-------depart-------')
      console.log(checked)
      console.log('--------------------')
    },
    handleCommand(name) {
      this.$message('click on item: ' + JSON.stringify(name))
    }
  }
}
</script>

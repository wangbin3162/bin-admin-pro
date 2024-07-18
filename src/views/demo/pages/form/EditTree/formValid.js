import { ref } from 'vue'

export const renderNodeForms = ref(new Map())

// 初始化引用
export function initFormMaps() {
  renderNodeForms.value.clear()
}

// 校验全部节点form
export function validAllForm() {
  const allValidate = [...renderNodeForms.value.values()].map(i => i.value.validate())

  return new Promise(resolve => {
    Promise.all(allValidate).then(async valids => {
      resolve(valids.every(i => i))
    })
  })
}

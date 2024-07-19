import { ref } from 'vue'

export const renderNodeForms = ref(new Map())

// 初始化引用（注意，这里需要找一个合适的时机去进行初始化，保证渲染前执行一次）
export function initFormMaps() {
  renderNodeForms.value.clear()
}

// 校验全部节点form
export function validAllForm() {
  const allForms = [...renderNodeForms.value.values()]

  return new Promise(resolve => {
    const valids = []
    // 安全验证
    allForms.forEach(f => {
      if (f && f.validate) valids.push(f.validate())
    })
    console.log('------- valid EditTree allNode Form -------')
    console.log(allForms, valids)
    console.log('-------------------------------------------')

    Promise.all(valids).then(async valids => {
      resolve(valids.every(i => i))
    })
  })
}

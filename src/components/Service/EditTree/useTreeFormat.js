/**
 * 将拉平的结构数组转换成树形结构
 * @param {*} arr
 */
function formatTree(arr = []) {
  if (!Array.isArray(arr) || arr.length === 0) return []

  let result = []
  let map = {}
  // 本次遍历的目的是为了防止在arr数据混乱的情况下，下面的【map[pid]】找不到对应的值
  arr.forEach((item, index) => {
    map[item.parent] = index // 以id为key，下标为value，方便后面根据pid，找到原来数组的下标，然后添加children
  })

  arr.forEach(item => {
    item.children = []
    const pid = item.belongParent
    if (pid) {
      let parent = arr[map[pid]]['children']
      // 可能原来的数据存在一定混乱，这样可以更加严谨一点，不报push属性找不到的错
      if (Array.isArray(parent)) {
        parent.push(item)
      } else {
        parent = [item]
      }
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 将树结构拉平成一个带有次序的数组
 * @param {*} arr
 */
function formatArr(arr = []) {
  const flat = []
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i]
    const node = ele.node
    // 父元素id，如果存在父元素，则获取父元素的id
    const pId = ele.parent > -1 ? arr[ele.parent].node.parent : ''
    const parents = ele.parents ?? []
    // 组合parentsName
    const names = []
    parents.forEach(p => names.push(arr[p].node.name))
    flat.push({
      belongParent: pId,
      parent: node.parent,
      name: node.name,
      des: node.des,
      paramType: ele.node.paramType,
      // 追加的参数
      parentName: names.join(','),
      level: parents.length + 1,
      sort: i,
    })
  }
  return flat
}

export { formatTree, formatArr }

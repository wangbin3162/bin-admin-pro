import{a9 as f,l as _,k as b,e as g,w as n,E as o,o as v,c as e,b as x,m as h}from"./vendor-839e8736.js";import"./chunk-brace-3ad28406.js";const I=`import Sortable from 'sortablejs'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * sortable hooks\uFF0C\u7528\u4E8E\u521B\u5EFA\u62D6\u62FD\u6392\u5E8F\u5217\u8868
 * @param list \u5217\u8868list<ref>
 * @param endFun \u62D6\u62FD\u7ED3\u675F\u4E8B\u4EF6\u51FD\u6570
 * @param option \u5176\u4ED6sortable\u914D\u7F6E\u9879
 */
export default function useSortable(list, endFun, option = {}) {
  const defaultOptions = {
    animation: 150,
    ghostClass: 'blue-background-class',
    // ************* \u62D6\u52A8\u5BF9\u8C61\u79FB\u52A8\u6837\u5F0F
    dragClass: 'drag-item-class',
    // ************* \u7981\u7528html5\u539F\u751F\u62D6\u62FD\u884C\u4E3A
    forceFallback: true,
    handle: '.drag'
  }
  const listRef = ref(null)
  let sortInstance = null
  onMounted(() => {
    if (sortInstance) sortInstance.destroy()
    const el = listRef.value
    if (!el) return
    sortInstance = Sortable.create(el, {
      ...defaultOptions,
      ...option,
      onUpdate: ({ newIndex, oldIndex }) => {
        const $li = el.children[newIndex]
        const $oldLi = el.children[oldIndex]
        // \u5148\u5220\u9664\u79FB\u52A8\u7684\u8282\u70B9
        el.removeChild($li)
        // \u518D\u63D2\u5165\u79FB\u52A8\u7684\u8282\u70B9\u5230\u539F\u6709\u8282\u70B9\uFF0C\u8FD8\u539F\u4E86\u79FB\u52A8\u7684\u64CD\u4F5C
        if (newIndex > oldIndex) {
          el.insertBefore($li, $oldLi)
        } else {
          el.insertBefore($li, $oldLi.nextSibling)
        }
        // \u66F4\u65B0items\u6570\u7EC4
        const targetRow = list.value.splice(oldIndex, 1)[0]
        list.value.splice(newIndex, 0, targetRow)
        // \u4E0B\u4E00\u4E2Atick\u5C31\u4F1A\u8D70patch\u66F4\u65B0
      },
      onEnd: (evt) => {
        endFun && endFun()
      }
    })
  })
  onBeforeUnmount(() => {
    if (sortInstance) {
      sortInstance.destroy()
      sortInstance = null
    }
  })
  return {
    listRef
  }
}
`,w={name:"FuncKeyValue",setup(){const a=_([{key:"1",value:"a"},{key:"2",value:"b"},{key:"3",value:"c"}]),t=b(()=>JSON.stringify(a.value,null,2));return{mapping:a,mappingJson:t,STR:I}}},k={class:"p16"};function y(a,t,S,l,V,B){const i=o("key-value-mapping"),c=o("b-divider"),s=o("b-ace-editor"),r=o("b-collapse-wrap"),d=o("b-col"),p=o("b-row"),u=o("page-container");return v(),g(u,{desc:"\u57FA\u7840\u6620\u5C04\u914D\u7F6E\u793A\u4F8B\uFF0C\u53EF\u62D6\u52A8\u6392\u5E8F\uFF0C\u5E76\u5C01\u88C5\u4E86\u901A\u7528\u7684hook\u94A9\u5B50\u51FD\u6570\uFF0C\u53EF\u8FDB\u884C\u590D\u7528\u3002"},{default:n(()=>[e(p,{gutter:16},{default:n(()=>[e(d,{span:"12"},{default:n(()=>[e(r,{title:"\u6620\u5C04\u914D\u7F6E",shadow:"none"},{default:n(()=>[x("div",k,[e(i,{modelValue:l.mapping,"onUpdate:modelValue":t[0]||(t[0]=m=>l.mapping=m)},null,8,["modelValue"]),e(c,{align:"left"},{default:n(()=>[h("\u5B9E\u9645\u5B58\u50A8\u503C")]),_:1}),e(s,{"model-value":l.mappingJson,readonly:""},null,8,["model-value"])])]),_:1})]),_:1}),e(d,{span:"12"},{default:n(()=>[e(r,{title:"useSortable",shadow:"none"},{default:n(()=>[e(s,{"model-value":l.STR,lang:"typescript",readonly:"",theme:"sqlserver",height:"850px",snippets:!1},null,8,["model-value"])]),_:1})]),_:1})]),_:1})]),_:1})}const F=f(w,[["render",y]]);export{F as default};

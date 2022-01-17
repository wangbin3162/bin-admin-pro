import{P as I}from"./page-wrapper-9f84d1de.js";import{h as w}from"./index-8d450888.js";import{D as x,u as C}from"./index-1a224772.js";import{a5 as h,f as g,n as R,J as t,o as _,A as b,B as u,F as B,K as S,u as n,w as r,q as y,g as U,c as j}from"./vendor-b1bd3f83.js";import"./chunk-bin-ui-next-48b1c960.js";import"./chunk-brace-f547fd93.js";const F={name:"KeyValueMapping",components:{DragHandle:x},props:{modelValue:{type:Array,default(){return[]}}},emits:["update:modelValue"],setup(m,{emit:a}){const o=g([]),{listRef:e}=C(o,d);R(()=>m.modelValue,s=>{o.value=w(s)},{immediate:!0,deep:!0});function f(){d()}function d(){a("update:modelValue",o.value)}function p(){o.value.push({key:"",value:""}),d()}function i(s){o.value.splice(s,1),d()}return{listRef:e,list:o,inputChange:f,handleAdd:p,handleRemove:i}}},$={class:"key-value-wrapper"},K={class:"mapping-list",ref:"listRef"},A=["onClick"],J={class:"mt-8 mb-8"},L=y("\u65B0\u589E");function M(m,a,o,e,f,d){const p=t("drag-handle"),i=t("b-input"),s=t("b-button");return _(),b("div",$,[u("ul",K,[(_(!0),b(B,null,S(e.list,(v,l)=>(_(),b("li",{key:l,class:"mapping-item"},[n(p),u("label",null,[n(i,{modelValue:e.list[l].key,"onUpdate:modelValue":c=>e.list[l].key=c,placeholder:"key",clearable:"",onInput:e.inputChange},null,8,["modelValue","onUpdate:modelValue","onInput"])]),u("label",null,[n(i,{modelValue:e.list[l].value,"onUpdate:modelValue":c=>e.list[l].value=c,placeholder:"value",clearable:"",onInput:e.inputChange},null,8,["modelValue","onUpdate:modelValue","onInput"])]),u("i",{class:"destroy b-iconfont b-icon-delete",onClick:c=>e.handleRemove(l)},null,8,A)]))),128))],512),u("div",J,[n(s,{icon:"plus-circle",type:"text",onClick:e.handleAdd},{default:r(()=>[L]),_:1},8,["onClick"])])])}var N=h(F,[["render",M],["__scopeId","data-v-75a06e4a"]]);const O=`import Sortable from 'sortablejs'
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
`,T={name:"CompKeyValue",components:{KeyValueMapping:N,PageWrapper:I},setup(m){const a=g([{key:"1",value:"a"},{key:"2",value:"b"},{key:"3",value:"c"}]),o=U(()=>JSON.stringify(a.value,null,2));return{mapping:a,mappingJson:o,STR:O}}},q={class:"p16"},D=y("\u5B9E\u9645\u5B58\u50A8\u503C");function E(m,a,o,e,f,d){const p=t("key-value-mapping"),i=t("b-divider"),s=t("b-ace-editor"),v=t("b-collapse-wrap"),l=t("b-col"),c=t("b-row"),k=t("page-wrapper");return _(),j(k,{desc:"\u57FA\u7840\u6620\u5C04\u914D\u7F6E\u793A\u4F8B\uFF0C\u53EF\u62D6\u52A8\u6392\u5E8F\uFF0C\u5E76\u5C01\u88C5\u4E86\u901A\u7528\u7684hook\u94A9\u5B50\u51FD\u6570\uFF0C\u53EF\u8FDB\u884C\u590D\u7528\u3002"},{default:r(()=>[n(c,{gutter:16},{default:r(()=>[n(l,{span:"12"},{default:r(()=>[n(v,{title:"\u6620\u5C04\u914D\u7F6E",shadow:"none"},{default:r(()=>[u("div",q,[n(p,{modelValue:e.mapping,"onUpdate:modelValue":a[0]||(a[0]=V=>e.mapping=V)},null,8,["modelValue"]),n(i,{align:"left"},{default:r(()=>[D]),_:1}),n(s,{"model-value":e.mappingJson,readonly:""},null,8,["model-value"])])]),_:1})]),_:1}),n(l,{span:"12"},{default:r(()=>[n(v,{title:"useSortable",shadow:"none"},{default:r(()=>[n(s,{"model-value":e.STR,lang:"typescript",readonly:"",theme:"sqlserver",height:"850px",snippets:!1},null,8,["model-value"])]),_:1})]),_:1})]),_:1})]),_:1})}var X=h(T,[["render",E]]);export{X as default};

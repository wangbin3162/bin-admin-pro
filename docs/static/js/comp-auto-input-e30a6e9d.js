import{a9 as g,l as v,B as f,e as k,w as l,E as a,o as x,c as p,b as n,t as h,m as w}from"./vendor-f584ffdc.js";import"./chunk-brace-3ad28406.js";const E={name:"CompAutoInput",setup(){const s=v(""),e=v([]);let u=null;const t=()=>[{value:"vue",link:"https://github.com/vuejs/vue"},{value:"element",link:"https://github.com/ElemeFE/element"},{value:"cooking",link:"https://github.com/ElemeFE/cooking"},{value:"mint-ui",link:"https://github.com/ElemeFE/mint-ui"},{value:"vuex",link:"https://github.com/vuejs/vuex"},{value:"vue-router",link:"https://github.com/vuejs/vue-router"},{value:"babel",link:"https://github.com/babel/babel"},{value:"bin-ui",link:"https://github.com/wangbin3162/bin-ui"},{value:"bin-ui-next",link:"https://github.com/wangbin3162/bin-ui-next"}],d=o=>{console.log("\u9009\u4E2D\u5EFA\u8BAE\u9879",o),s.value=o.value},_=(o,c)=>{const i=o?e.value.filter(r=>r.value.toLowerCase().includes(o.toLowerCase())):e.value;clearTimeout(u),u=setTimeout(()=>{c(i)},3e3*Math.random())};return f(()=>{e.value=t()}),{current:s,links:e,querySearch:_,handleSelect:d}}},S={class:"p24",style:{"min-height":"500px"}},V={flex:"main:justify"},y={style:{"font-size":"12px",color:"#999"}},C={class:"pt-16"};function j(s,e,u,t,d,_){const o=a("b-autocomplete"),c=a("b-alert"),i=a("b-collapse-wrap"),r=a("page-container");return x(),k(r,{desc:"\u8F93\u5165\u5EFA\u8BAE/\u81EA\u52A8\u586B\u5145\u63A7\u4EF6"},{default:l(()=>[p(i,{title:"\u8F93\u5165\u5EFA\u8BAE\u57FA\u672C\u7528\u6CD5",shadow:"none"},{default:l(()=>[n("div",S,[p(o,{modelValue:t.current,"onUpdate:modelValue":e[0]||(e[0]=m=>t.current=m),"fetch-suggestions":t.querySearch,placeholder:"Please input",clearable:"",onSelect:t.handleSelect},{item:l(({value:m,link:b})=>[n("div",V,[n("div",null,h(m),1),n("div",y,h(b),1)])]),_:1},8,["modelValue","fetch-suggestions","onSelect"]),n("div",C,[p(c,null,{default:l(()=>[w("current: "+h(t.current),1)]),_:1})])])]),_:1})]),_:1})}const F=g(E,[["render",j]]);export{F as default};
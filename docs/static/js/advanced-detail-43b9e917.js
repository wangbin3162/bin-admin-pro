import{a9 as h,G as n,e as y,w as t,o as k,b as o,c as e,m as l}from"./vendor-1f5bb866.js";import"./chunk-brace-3ad28406.js";const v={name:"AdvancedDetail",data(){return{columns:[{title:"\u59D3\u540D",key:"name"},{title:"\u5DE5\u53F7",key:"no"},{title:"\u6240\u5C5E\u5206\u7EC4",key:"dept"}],data:[{name:"Wang",no:"001",dept:"\u524D\u7AEF\u7EC4"},{name:"\u90ED\u5C0F\u5B81",no:"002",dept:"\u524D\u7AEF\u7EC4"},{name:"\u7EA6\u4FEE\u4E9A",no:"003",dept:"\u524D\u7AEF\u7EC4"},{name:"\u674E\u5C0F\u7EA2",no:"004",dept:"\u540E\u7AEF\u7EC4"},{name:"\u5F20\u5C0F\u53D1",no:"005",dept:"\u6D4B\u8BD5\u7EC4"}],activeTab:"tab0"}}},g={class:"p16"},w=o("h2",null,"\u9879\u76EE\u5F00\u53D1\u8FDB\u5EA6\uFF08\u7F16\u53F7\uFF1A10000\uFF09",-1),V=o("br",null,null,-1),x={class:"p20"},T={class:"p20"},B={class:"p20"},N={class:"p20"};function W(A,p,C,D,s,J){const a=n("b-desc-item"),d=n("b-tag"),u=n("b-desc"),b=n("b-tabs"),_=n("b-step"),i=n("b-steps"),c=n("b-collapse-wrap"),f=n("b-table"),m=n("page-container");return k(),y(m,null,{header:t(()=>[o("div",g,[w,V,e(u,null,{default:t(()=>[e(a,{label:"\u8D23\u4EFB\u4EBA"},{default:t(()=>[l("Wang")]),_:1}),e(a,{label:"\u5BA1\u6279\u4EBA"},{default:t(()=>[l("Jack")]),_:1}),e(a,{label:"\u521B\u5EFA\u65F6\u95F4"},{default:t(()=>[l("2021-06-30")]),_:1}),e(a,{label:"\u5F53\u524D\u72B6\u6001"},{default:t(()=>[e(d,{type:"success",dot:""},{default:t(()=>[l("\u5F00\u53D1")]),_:1})]),_:1}),e(a,{label:"\u9879\u76EE\u63CF\u8FF0"},{default:t(()=>[l("\u5F53\u524D\u9879\u76EE\u7684\u63CF\u8FF0")]),_:1})]),_:1}),e(b,{modelValue:s.activeTab,"onUpdate:modelValue":p[0]||(p[0]=r=>s.activeTab=r),type:"tag",data:[{key:"tab0",title:"\u6D41\u7A0B\u8FDB\u5EA6"},{key:"tab1",title:"\u57FA\u672C\u4FE1\u606F"},{key:"tab2",title:"\u9879\u76EE\u4FE1\u606F"},{key:"tab3",title:"\u9879\u76EE\u4EBA\u5458"}]},null,8,["modelValue"])])]),default:t(()=>[e(c,{title:"\u6D41\u7A0B\u8FDB\u5EA6",shadow:"none"},{default:t(()=>[o("div",x,[e(i,{current:1},{default:t(()=>[e(_,{title:"\u521B\u5EFA\u9879\u76EE",content:"\u521B\u5EFA\u65F6\u95F4\uFF1A2021-06-30"}),e(_,{title:"\u9700\u6C42\u8BC4\u5BA1",content:"\u8BC4\u5BA1\u65F6\u95F4\uFF1A2021-07-05"}),e(_,{title:"\u5F00\u53D1\u6D4B\u8BD5",content:"\u5F00\u53D1\u65F6\u95F4\uFF1A2021-08-31"}),e(_,{title:"\u90E8\u7F72\u4E0A\u7EBF",content:"\u4E0A\u7EBF\u65F6\u95F4\uFF1A2021-10-01"})]),_:1})])]),_:1}),e(c,{title:"\u57FA\u672C\u4FE1\u606F",shadow:"none"},{default:t(()=>[o("div",T,[e(u,null,{default:t(()=>[e(a,{label:"\u8D1F\u8D23\u4EBA"},{default:t(()=>[l("Wang")]),_:1}),e(a,{label:"\u5BA1\u6279\u4EBA"},{default:t(()=>[l("Jack")]),_:1}),e(a,{label:"\u62DF\u5B9A\u5B8C\u6210\u65F6\u95F4"},{default:t(()=>[l("2021-06-30")]),_:1}),e(a,{label:"\u5F53\u524D\u72B6\u6001"},{default:t(()=>[e(d,{type:"success",dot:""},{default:t(()=>[l("\u5F00\u53D1")]),_:1})]),_:1}),e(a,{label:"\u7D27\u6025\u7A0B\u5EA6"},{default:t(()=>[e(d,{type:"danger"},{default:t(()=>[l("\u7D27\u6025")]),_:1})]),_:1})]),_:1})])]),_:1}),e(c,{title:"\u9879\u76EE\u4FE1\u606F",shadow:"none"},{default:t(()=>[o("div",B,[e(u,null,{default:t(()=>[e(a,{label:"\u9879\u76EE\u540D\u79F0"},{default:t(()=>[l("\u57FA\u7840Admin\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF")]),_:1}),e(a,{label:"\u9879\u76EE\u7C7B\u578B"},{default:t(()=>[l("\u524D\u7AEF\u72EC\u7ACB\u9879\u76EE")]),_:1}),e(a,{label:"\u9879\u76EE\u72B6\u6001"},{default:t(()=>[e(d,{type:"success"},{default:t(()=>[l("\u6B63\u5E38")]),_:1})]),_:1}),e(a,{label:"\u9879\u76EE\u76EE\u6807"},{default:t(()=>[l("\u5B9E\u73B0admin\u540E\u53F0\u7BA1\u7406\u6A21\u677F\uFF0C\u65B9\u4FBF\u4E2D\u53F0\u7CFB\u7EDF\u7684\u6784\u5EFA\u3002")]),_:1}),e(a,{label:"\u9879\u76EE\u63CF\u8FF0"},{default:t(()=>[l(" \u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u8FD9\u91CC\u662F\u63CF\u8FF0 ")]),_:1})]),_:1})])]),_:1}),e(c,{title:"\u9879\u76EE\u4EBA\u5458",shadow:"none"},{default:t(()=>[o("div",N,[e(f,{columns:s.columns,data:s.data,size:"small"},null,8,["columns","data"])])]),_:1})]),_:1})}const U=h(v,[["render",W]]);export{U as default};
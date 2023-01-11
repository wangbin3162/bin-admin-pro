import{l as d,B as C,e as N,w as l,E as n,o as $,c as e,b as _,m as c,ay as M}from"./vendor-839e8736.js";import{a as O}from"./chunk-bin-ui-next-70a7e619.js";import"./chunk-brace-3ad28406.js";const T={class:"p10"},U={class:"p10"},D=_("br",null,null,-1),E={class:"p10"},J={class:"pt-8"},q={class:"pt-8"},W={__name:"func-graphviz",setup(F){const V=d("digraph G {Hello -> World}"),v=d("digraph G {a -> b}"),h=d(v.value),j=`digraph G {

subgraph cluster_0 {
  style=filled;
  color=lightgrey;
  node [style=filled,color=white];
  a0 -> a1 -> a2 -> a3;
  label = "process #1";
}

subgraph cluster_1 {
  node [style=filled];
  b0 -> b1 -> b2 -> b3;
  label = "process #2";
  color=blue
}
start -> a0;
start -> b0;
a1 -> b3;
b2 -> a3;
a3 -> a0;
a3 -> end;
b3 -> end;

start [shape=Mdiamond];
end [shape=Msquare];
}`,z=d({foo:["bar","buzz"],bar:["foo"],norf:["worble","buzz"],worf:["worble"],fizz:["buzz"]}),g=d("digraph G {a -> b}"),f=d(JSON.stringify(z.value,null,2)),y=d(!1),w=d(!0);function k(){const t=M("svg").datum();console.log(t)}function m(){try{const t=JSON.parse(f.value);z.value=t,O("Json \u8F6C\u6362\u6210\u529F"),console.log(Object.entries(t)),g.value=G(t),console.log(g.value)}catch{console.log("json is not right")}}function G(t){const a=y.value?`[arrowsize=.4, color=grey, style="rounded"]
`:`
`,u=w.value?`
  ranksep = 2.0;
  graph [rankdir=LR,bb="0,0,412.05,372.8"];
  node [margin=".3,.1",shape=box,height=.3, style="rounded,filled", color="lightgreen", fillcolor="lightgreen"];
  edge [style=solid,arrowhead=normal,arrowtail=dot];`:"";return Object.entries(t).reduce((o,[p,r])=>r.reduce((b,i)=>b+` "${p}" -> "${i}" ${a}`,o),`digraph G { ${u} 
 `)+"}"}return C(()=>{m(f.value)}),(t,a)=>{const u=n("b-ace-editor"),o=n("b-col"),p=n("Graphviz"),r=n("b-row"),b=n("b-collapse-wrap"),i=n("b-tag"),B=n("b-button"),x=n("b-checkbox"),S=n("page-container");return $(),N(S,null,{default:l(()=>[e(b,{title:"\u57FA\u7840\u7528\u6CD5",shadow:"none",class:"mb-16"},{default:l(()=>[_("div",T,[e(r,{gutter:20},{default:l(()=>[e(o,{span:14},{default:l(()=>[e(u,{"model-value":V.value,readonly:"",lang:"dot",height:"200"},null,8,["model-value"])]),_:1}),e(o,{span:10},{default:l(()=>[e(p,{id:"code1",code:V.value},null,8,["code"])]),_:1})]),_:1})])]),_:1}),e(b,{title:"\u4EE3\u7801\u7F16\u8F91\u7528\u6CD5",shadow:"none",class:"mb-16"},{default:l(()=>[_("div",U,[e(r,{gutter:20},{default:l(()=>[e(o,{span:14},{default:l(()=>[e(r,{gutter:20},{default:l(()=>[e(o,{span:12},{default:l(()=>[e(i,null,{default:l(()=>[c("\u7F16\u8F91\u4EE3\u7801")]),_:1}),e(u,{modelValue:h.value,"onUpdate:modelValue":a[0]||(a[0]=s=>h.value=s),onBlur:a[1]||(a[1]=s=>v.value=h.value),lang:"dot",height:"200"},null,8,["modelValue"])]),_:1}),e(o,{span:12},{default:l(()=>[e(i,null,{default:l(()=>[c("\u793A\u4F8B\u4EE3\u7801")]),_:1}),e(u,{"model-value":j,readonly:"",lang:"dot",height:"200"})]),_:1})]),_:1}),D,e(B,{onClick:k},{default:l(()=>[c("\u83B7\u53D6\u8F6C\u6362\u6570\u636E")]),_:1})]),_:1}),e(o,{span:10},{default:l(()=>[e(p,{id:"code2",code:v.value},null,8,["code"])]),_:1})]),_:1})])]),_:1}),e(b,{title:"\u6570\u636E\u8F6C\u6362\u7528\u6CD5",shadow:"none",class:"mb-16"},{default:l(()=>[_("div",E,[e(r,{gutter:20},{default:l(()=>[e(o,{span:14},{default:l(()=>[e(r,{gutter:20},{default:l(()=>[e(o,{span:12},{default:l(()=>[e(i,null,{default:l(()=>[c("json \u5BF9\u8C61")]),_:1}),e(u,{modelValue:f.value,"onUpdate:modelValue":a[2]||(a[2]=s=>f.value=s),onBlur:m,lang:"json",height:"200"},null,8,["modelValue"])]),_:1}),e(o,{span:12},{default:l(()=>[e(i,null,{default:l(()=>[c("\u8F6C\u6362\u540E\u5B57\u7B26\u4E32")]),_:1}),e(u,{"model-value":g.value,readonly:"",lang:"dot",height:"200"},null,8,["model-value"])]),_:1}),e(o,{span:24},{default:l(()=>[_("div",J,[e(x,{modelValue:y.value,"onUpdate:modelValue":a[3]||(a[3]=s=>y.value=s),onChange:m},null,8,["modelValue"]),c(' \u542F\u7528\u5355\u4E2A\u8282\u70B9\u8FDE\u7EBF\u6837\u5F0F [arrowsize=.4, color=grey, style="rounded"] ')])]),_:1}),e(o,{span:24},{default:l(()=>[_("div",q,[e(x,{modelValue:w.value,"onUpdate:modelValue":a[4]||(a[4]=s=>w.value=s),onChange:m},null,8,["modelValue"]),c(" \u542F\u7528\u5168\u5C40\u901A\u7528\u6837\u5F0F ")])]),_:1})]),_:1})]),_:1}),e(o,{span:10},{default:l(()=>[e(p,{id:"code3",code:g.value},null,8,["code"])]),_:1})]),_:1})])]),_:1})]),_:1})}}};export{W as default};

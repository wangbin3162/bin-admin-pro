import{m as K,r as v,af as M,q as O,o as C,a as Q,g as W,v as A,K as e,w as t,j as F,i as H,Q as a,L as c,f as b,G as J}from"./vendor-B29aizbt.js";import{u as X}from"./useTable-DHoJP-Dx.js";import{e as Y,l as Z,p as ee,h as te,g as ne}from"./cross-tab-msg-BFjpPYXU.js";import{n as y}from"./chunk-bin-ui-design-DOxaRq58.js";import{_ as ae}from"./index-ClfN5yDe.js";import"./chunk-brace-BklEY0pF.js";import"./index-CtCeQG2m.js";import"./chunk-mockjs-CGXE1Baq.js";const me=Object.assign({name:"ExcelList"},{__name:"index",setup(oe){const i=K({page:1,size:10,name:"",isPublish:""}),h=v(null),r=v(!1),p=M(),x=[{title:"序号",width:70,align:"center",type:"index"},{title:"表单名称",key:"name"},{title:"上报数量",key:"reportCount"},{title:"记录个数",key:"records"},{title:"发布",width:100,align:"center",slot:"isPublish"},{title:"操作",width:200,align:"center",slot:"action"}],{loading:g,list:w,total:D,handleSearch:d,getListData:m,pageChange:T}=X(Y,i);d();function q(){i.name="",d()}function V(){let n=p.resolve({path:"/excel-edit",query:{}});window.open(n.href,"_blank")}function $({id:n}){let l=p.resolve({path:"/excel-edit",query:{id:n}});window.open(l.href,"_blank")}function z({id:n}){ee(n).then(()=>{y.success("发布成功！"),m()})}function L({id:n}){te(n).then(()=>{y.success("删除成功！"),m()})}async function P({id:n}){const l=await ne(n);r.value=!0,await J(),h.value.open(l)}function B(){r.value=!1}function E({id:n}){let l=p.resolve({path:"/data-edit",query:{tempId:n}});window.open(l.href,"_blank")}const R=Z(m);return O(R),(n,l)=>{const N=a("b-input"),k=a("b-form-item"),_=a("b-button"),S=a("b-form"),s=a("action-button"),f=a("b-divider"),j=a("b-table"),U=a("b-page"),G=a("base-table"),I=a("page-wrapper");return C(),Q("div",null,[W(e(I,null,{default:t(()=>[e(G,null,{filter:t(()=>[e(S,{"label-width":"95px"},{default:t(()=>[e(k,{label:"表单名称"},{default:t(()=>[e(N,{modelValue:i.name,"onUpdate:modelValue":l[0]||(l[0]=o=>i.name=o),clearable:""},null,8,["modelValue"])]),_:1}),e(k,{"label-width":"16px"},{default:t(()=>[e(_,{type:"primary",loading:c(g),onClick:c(d)},{default:t(()=>[b("查询")]),_:1},8,["loading","onClick"]),e(_,{onClick:q},{default:t(()=>[b("重置")]),_:1})]),_:1})]),_:1})]),action:t(()=>[e(_,{type:"primary",icon:"plus",onClick:V},{default:t(()=>[b("新增")]),_:1})]),page:t(()=>[e(U,{total:c(D),current:i.page,"page-size":i.size,"show-total":"",onChange:c(T)},null,8,["total","current","page-size","onChange"])]),default:t(()=>[e(j,{columns:x,data:c(w),loading:c(g),size:"small"},{isPublish:t(({row:o})=>[e(s,{type:"text",icon:"play-circle",color:"success","is-icon":"",tooltip:"发布",message:"确定发布当前报表么?",confirm:"",disabled:o.isPublish==="1",onClick:u=>z(o)},null,8,["disabled","onClick"])]),action:t(({row:o})=>[e(s,{type:"text",icon:"edit-square","is-icon":"",tooltip:"编辑",onClick:u=>$(o)},null,8,["onClick"]),e(f,{type:"vertical"}),e(s,{type:"text",icon:"file-add",color:"#fa8c16","is-icon":"",tooltip:"数据填报",onClick:u=>E(o)},null,8,["onClick"]),e(f,{type:"vertical"}),e(s,{type:"text",icon:"filesearch",color:"#13c2c2","is-icon":"",tooltip:"查看数据",onClick:u=>P(o)},null,8,["onClick"]),e(f,{type:"vertical"}),e(s,{type:"text",icon:"delete",color:"danger","is-icon":"",tooltip:"删除",confirm:"",onClick:u=>L(o)},null,8,["onClick"])]),_:1},8,["data","loading"])]),_:1})]),_:1},512),[[A,!r.value]]),r.value?(C(),F(ae,{key:0,ref_key:"dataTableRef",ref:h,onClose:B},null,512)):H("",!0)])}}});export{me as default};
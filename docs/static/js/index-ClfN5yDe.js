import{i as y}from"./index-CtCeQG2m.js";import{l as L,r as j,f as R}from"./cross-tab-msg-BFjpPYXU.js";import{r as l,af as T,m as z,q as K,Q as o,o as M,j as O,w as i,K as n,f as Q,i as U}from"./vendor-B29aizbt.js";import{n as A}from"./chunk-bin-ui-design-DOxaRq58.js";const W=Object.assign({name:"SysRole"},{__name:"index",emits:["close"],setup(F,{expose:C,emit:g}){const k=g,r=l(!1),p=T(),a=z({tempId:""}),c=l([]),s=l({}),u=l(!1),v=l([]);function w(){const e=y(s.value.mapping);c.value=[{title:"序号",width:70,align:"center",type:"index"}],e.forEach((t,m)=>{m<5&&c.value.push({title:t.fieldTitle,key:t.fieldName})}),c.value.push({title:"操作",width:150,align:"center",slot:"action"})}function x(){let e=p.resolve({path:"/data-edit",query:{tempId:a.tempId}});window.open(e.href,"_blank")}function I({id:e}){let t=p.resolve({path:"/data-edit",query:{tempId:a.tempId,id:e}});window.open(t.href,"_blank")}function q({id:e}){let t=p.resolve({path:"/data-edit-simple",query:{tempId:a.tempId,id:e}});window.open(t.href,"_blank")}function D({id:e}){j(e).then(()=>{A.success("删除成功！"),d()})}async function d(){try{u.value=!0;const{rows:e}=await R(a);v.value=e.map(t=>({id:t.id,tempId:t.tempId,tempName:t.tempName,...t.data}))}catch(e){console.log(e)}u.value=!1}function N(e){r.value=!0,s.value=y(e),a.tempId=e.id,w(),d()}function S(){r.value=!1,k("close")}C({open:N});const $=L(d);return K($),(e,t)=>{const m=o("b-button"),_=o("action-button"),h=o("b-divider"),V=o("b-table"),B=o("base-table"),E=o("page-wrapper");return r.value?(M(),O(E,{key:0,title:`${s.value.name?`[${s.value.name}] `:""}数据查看`,"show-close":"",onClose:S},{default:i(()=>[n(B,null,{action:i(()=>[n(m,{type:"primary",icon:"plus",onClick:x},{default:i(()=>[Q("新增")]),_:1})]),default:i(()=>[n(V,{columns:c.value,data:v.value,loading:u.value,size:"small"},{action:i(({row:f})=>[n(_,{type:"text",icon:"edit-square","is-icon":"",tooltip:"编辑",onClick:b=>I(f)},null,8,["onClick"]),n(h,{type:"vertical"}),n(_,{type:"text",icon:"edit","is-icon":"",tooltip:"表单编辑",onClick:b=>q(f)},null,8,["onClick"]),n(h,{type:"vertical"}),n(_,{type:"text",icon:"delete",color:"danger","is-icon":"",tooltip:"删除",confirm:"",onClick:b=>D(f)},null,8,["onClick"])]),_:1},8,["columns","data","loading"])]),_:1})]),_:1},8,["title"])):U("",!0)}}});export{W as _};
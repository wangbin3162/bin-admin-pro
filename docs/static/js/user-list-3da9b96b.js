import{u as x}from"./useTable-6b4fd502.js";import{g as L}from"./user.api-88509b1a.js";import{a as w}from"./chunk-bin-ui-next-26581f77.js";import{a5 as S,A as q,l as M,K as N,e as B,w as a,E as l,o as v,c as t,b as n,a as b,O as D,t as d,m as r,j as R,F as V}from"./vendor-88b93d8c.js";import"./index-f99750e2.js";import"./chunk-brace-34d79ec3.js";const I={name:"UserList",setup(){const y=q({page:1,size:10}),c=M([]),{loading:h,list:o,total:C,getListData:k,pageChange:p,pageSizeChange:i}=x(L,y);function u(s){w.success(`\u590D\u5236ID\uFF1A${s}\u6210\u529F\uFF01`)}function m(s,_){c.value[_].roles=s}return N(()=>o.value,s=>{c.value=s.map(_=>({..._,expand:!1}))}),k(),{query:y,roleMap:{admin:"\u7BA1\u7406\u5458",user:"\u666E\u901A\u7528\u6237",op:"\u5B9E\u65BD\u4EBA\u5458"},roleMapStyle:{admin:"purple",user:"blue",op:"volcano"},loading:h,list:o,copyList:c,total:C,pageChange:p,pageSizeChange:i,handleCopy:u,setRole:m}}},U={class:"list-wrap"},E={class:"list-item-meta"},F=["src"],T={class:"list-item-meta-name"},j={class:"list-item-id"},A=r("\u590D\u5236"),K={class:"list-item-email mt-8"},O={class:"list-item-action mt-8",flex:"cross:center"},G={key:0,class:"list-item-action mt-8"},H=r(" \u7BA1\u7406\u5458 "),J=r(" \u666E\u901A\u7528\u6237 "),P=r(" \u5B9E\u65BD\u4EBA\u5458 "),Q={class:"mt-16 t-center"};function W(y,c,h,o,C,k){const p=l("b-skeleton"),i=l("b-divider"),u=l("b-button"),m=l("b-tag"),s=l("action-button"),_=l("b-page"),z=l("page-container");return v(),B(z,{desc:"\u5305\u542B\u4FE1\u606F\u7684\u5217\u8868\uFF0C\u5E26\u6709\u5E38\u89C4\u64CD\u4F5C\u3002\u672C\u9875\u9762\u4E5F\u7528\u4F5C\u793A\u4F8B\uFF0C\u5B9E\u9645\u64CD\u4F5C\u4EE5\u4E1A\u52A1\u9700\u6C42\u81EA\u884C\u7F16\u5199\u3002",bg:""},{default:a(()=>[t(p,{loading:o.loading},{template:a(()=>[t(p,{animation:""}),t(i),t(p,{animation:""}),t(i),t(p,{animation:""}),t(i)]),default:a(()=>[n("ul",U,[(v(!0),b(V,null,D(o.copyList,(e,f)=>(v(),b("li",{key:e.id,class:"user-list-item"},[n("div",E,[n("img",{src:e.avatar,alt:"",class:"avatar"},null,8,F),n("div",T,d(e.realName),1)]),n("div",j,[n("span",null,"ID:"+d(e.id),1),t(u,{size:"mini",icon:"file-copy",onClick:g=>o.handleCopy(e.id)},{default:a(()=>[A]),_:2},1032,["onClick"])]),n("div",K,"\u90AE\u7BB1\u5730\u5740\uFF1A"+d(e.email),1),n("div",O,[t(m,{type:e.verify?"success":"danger"},{default:a(()=>[r(d(e.verify?"\u5DF2\u8BA4\u8BC1":"\u672A\u8BA4\u8BC1"),1)]),_:2},1032,["type"]),t(m,{type:o.roleMapStyle[e.roles]},{default:a(()=>[r(d(o.roleMap[e.roles]),1)]),_:2},1032,["type"]),t(u,{icon:e.expand?"minus-square":"plus-square",size:"small",style:{"margin-left":"16px"},onClick:g=>e.expand=!e.expand},{default:a(()=>[r(d(e.expand?"\u6536\u8D77\u64CD\u4F5C":"\u5C55\u5F00\u64CD\u4F5C"),1)]),_:2},1032,["icon","onClick"])]),e.expand?(v(),b("div",G,[t(s,{"button-props":{type:e.roles!=="admin"?"primary":null,size:"mini",disabled:e.roles==="admin"},onClick:g=>o.setRole("admin",f),message:"\u8BBE\u7F6E\u89D2\u8272\u4E3A\u7BA1\u7406\u5458\u5417\uFF1F",confirm:""},{default:a(()=>[H]),_:2},1032,["button-props","onClick"]),t(i,{type:"vertical"}),t(s,{"button-props":{type:e.roles!=="user"?"primary":null,size:"mini",disabled:e.roles==="user"},onClick:g=>o.setRole("user",f),message:"\u8BBE\u7F6E\u89D2\u8272\u4E3A\u666E\u901A\u7528\u6237\u5417\uFF1F",confirm:""},{default:a(()=>[J]),_:2},1032,["button-props","onClick"]),t(i,{type:"vertical"}),t(s,{"button-props":{type:e.roles!=="op"?"primary":null,size:"mini",disabled:e.roles==="op"},onClick:g=>o.setRole("op",f),message:"\u8BBE\u7F6E\u89D2\u8272\u4E3A\u5B9E\u65BD\u4EBA\u5458\u5417\uFF1F",confirm:""},{default:a(()=>[P]),_:2},1032,["button-props","onClick"])])):R("",!0)]))),128))])]),_:1},8,["loading"]),n("div",Q,[t(_,{total:o.total,current:o.query.page,"onUpdate:current":c[0]||(c[0]=e=>o.query.page=e),"page-size":o.query.size,"show-elevator":"","show-sizer":"","show-total":"",onChange:o.pageChange,onSizeChange:o.pageSizeChange},null,8,["total","current","page-size","onChange","onSizeChange"])])]),_:1})}var te=S(I,[["render",W],["__scopeId","data-v-4a8284de"]]);export{te as default};
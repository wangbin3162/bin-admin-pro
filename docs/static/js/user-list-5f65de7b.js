var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(a,t,s)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;import{u as r}from"./useTable-a1c93573.js";import{g as l}from"./user.api-e15e15d1.js";import{a as p}from"./chunk-bin-ui-next-169a0b5b.js";import{_ as c}from"./index-ee15fc0f.js";import{_ as u}from"./page-wrapper-d233775a.js";import{y as m,f as d,n as g,a7 as f,a8 as y,J as b,o as v,c as C,w as h,u as k,B as z,A as j,K as _,t as w,q as x,a as O,F as S}from"./vendor-fe3131ae.js";import"./index-e9e85ee6.js";import"./chunk-brace-7f859248.js";const q={name:"UserList",components:{PageWrapper:u,ActionButton:c},setup(){const e=m({page:1,size:10}),c=d([]),{loading:u,list:f,total:y,getListData:b,pageChange:v,pageSizeChange:C}=r(l,e);return g((()=>f.value),(e=>{c.value=e.map((e=>{return r=((e,a)=>{for(var t in a||(a={}))i.call(a,t)&&n(e,t,a[t]);if(s)for(var t of s(a))o.call(a,t)&&n(e,t,a[t]);return e})({},e),a(r,t({expand:!1}));var r}))})),b(),{query:e,roleMap:{admin:"管理员",user:"普通用户",op:"实施人员"},roleMapStyle:{admin:"purple",user:"blue",op:"volcano"},loading:u,list:f,copyList:c,total:y,pageChange:v,pageSizeChange:C,handleCopy:function(e){p.success(`复制ID：${e}成功！`)},setRole:function(e,a){c.value[a].roles=e}}}};f("data-v-7ea61195");const P={class:"list-wrap"},D={class:"list-item-meta"},I=["src"],L={class:"list-item-meta-name"},M={class:"list-item-id"},R=x("复制"),A={class:"list-item-email mt-8"},B={class:"list-item-action mt-8"},U={key:0,class:"list-item-action mt-8"},E=x(" 管理员 "),F=x(" 普通用户 "),J=x(" 实施人员 "),K={class:"mt-16 t-center"};y(),q.render=function(e,a,t,s,i,o){const n=b("b-skeleton"),r=b("b-divider"),l=b("b-button"),p=b("b-tag"),c=b("action-button"),u=b("b-page"),m=b("page-wrapper");return v(),C(m,{desc:"包含信息的列表，带有常规操作。本页面也用作示例，实际操作以业务需求自行编写。",bg:""},{default:h((()=>[k(n,{loading:s.loading},{template:h((()=>[k(n,{animation:""}),k(r),k(n,{animation:""}),k(r),k(n,{animation:""}),k(r)])),default:h((()=>[z("ul",P,[(v(!0),j(S,null,_(s.copyList,((e,a)=>(v(),j("li",{key:e.id,class:"user-list-item"},[z("div",D,[z("img",{src:e.avatar,alt:"",class:"avatar"},null,8,I),z("div",L,w(e.realName),1)]),z("div",M,[z("span",null,"ID:"+w(e.id),1),k(l,{size:"mini",icon:"file-copy",onClick:a=>s.handleCopy(e.id)},{default:h((()=>[R])),_:2},1032,["onClick"])]),z("div",A,"邮箱地址："+w(e.email),1),z("div",B,[k(p,{type:e.verify?"success":"danger"},{default:h((()=>[x(w(e.verify?"已认证":"未认证"),1)])),_:2},1032,["type"]),k(p,{type:s.roleMapStyle[e.roles]},{default:h((()=>[x(w(s.roleMap[e.roles]),1)])),_:2},1032,["type"]),k(l,{icon:e.expand?"minus-square":"plus-square",size:"mini",style:{"margin-left":"16px"},onClick:a=>e.expand=!e.expand},{default:h((()=>[x(w(e.expand?"收起操作":"展开操作"),1)])),_:2},1032,["icon","onClick"])]),e.expand?(v(),j("div",U,[k(c,{"button-props":{type:"admin"!==e.roles?"primary":null,size:"mini",disabled:"admin"===e.roles},onClick:e=>s.setRole("admin",a),message:"设置角色为管理员吗？",confirm:""},{default:h((()=>[E])),_:2},1032,["button-props","onClick"]),k(r,{type:"vertical"}),k(c,{"button-props":{type:"user"!==e.roles?"primary":null,size:"mini",disabled:"user"===e.roles},onClick:e=>s.setRole("user",a),message:"设置角色为普通用户吗？",confirm:""},{default:h((()=>[F])),_:2},1032,["button-props","onClick"]),k(r,{type:"vertical"}),k(c,{"button-props":{type:"op"!==e.roles?"primary":null,size:"mini",disabled:"op"===e.roles},onClick:e=>s.setRole("op",a),message:"设置角色为实施人员吗？",confirm:""},{default:h((()=>[J])),_:2},1032,["button-props","onClick"])])):O("",!0)])))),128))])])),_:1},8,["loading"]),z("div",K,[k(u,{total:s.total,current:s.query.page,"onUpdate:current":a[0]||(a[0]=e=>s.query.page=e),"page-size":s.query.size,"show-elevator":"","show-sizer":"","show-total":"",onChange:s.pageChange,onSizeChange:s.pageSizeChange},null,8,["total","current","page-size","onChange","onSizeChange"])])])),_:1})},q.__scopeId="data-v-7ea61195";export{q as default};
import{g as M}from"./user.api-BrjfsMWw.js";import{u as j}from"./useTable-CF2UehQz.js";import{a8 as F,m as T,r as w,n as E,o as _,j as x,w as o,Q as l,K as a,a as q,R as K,F as C,i as Q,f as r,t as k,b as R}from"./vendor-B29aizbt.js";import"./index-C63pl2jy.js";import"./chunk-bin-ui-design-CMJ2EfEK.js";import"./chunk-brace-BklEY0pF.js";import"./chunk-mockjs-CGXE1Baq.js";const A={name:"SearchList",setup(){const c=T({page:1,size:10,name:"",roles:"",status:"",date:"",email:""}),t=w(!1),p=w([]),{loading:e,list:f,total:g,getListData:i,pageChange:d,pageSizeChange:m}=j(M,c);return E(f,u=>{p.value=u.map(b=>({...b,expand:!1}))}),i(),{expand:t,query:c,loading:e,roleMap:{admin:"管理员",user:"普通用户",op:"实施人员"},total:g,copyList:p,getListData:i,pageChange:d,pageSizeChange:m,columns:[{title:"姓名",key:"realName"},{title:"登录名",key:"username"},{title:"邮箱",key:"email"},{title:"角色",slot:"roles"},{title:"出生日期",key:"createDate"},{title:"操作",width:100,align:"center",slot:"action"}]}}},G={flex:"main:justify"};function H(c,t,p,e,f,g){const i=l("b-input"),d=l("b-form-item"),m=l("b-option"),u=l("b-select"),b=l("b-date-picker"),s=l("b-button"),v=l("b-form"),z=l("b-icon"),y=l("b-dropdown-item"),L=l("b-dropdown-menu"),h=l("b-dropdown"),S=l("action-button"),U=l("b-table"),N=l("b-page"),B=l("base-table"),D=l("page-wrapper");return _(),x(D,{desc:"基础表格的查询列表，带有常规操作。"},{default:o(()=>[a(B,null,{filter:o(()=>[a(v,{"label-width":"95px"},{default:o(()=>[a(d,{label:"用户名称"},{default:o(()=>[a(i,{modelValue:e.query.name,"onUpdate:modelValue":t[0]||(t[0]=n=>e.query.name=n),clearable:""},null,8,["modelValue"])]),_:1}),a(d,{label:"用户角色"},{default:o(()=>[a(u,{modelValue:e.query.roles,"onUpdate:modelValue":t[1]||(t[1]=n=>e.query.roles=n),clearable:""},{default:o(()=>[(_(!0),q(C,null,K(e.roleMap,(n,V)=>(_(),x(m,{key:V,label:n,value:V},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e.expand?(_(),q(C,{key:0},[a(d,{label:"状态"},{default:o(()=>[a(u,{modelValue:e.query.status,"onUpdate:modelValue":t[2]||(t[2]=n=>e.query.status=n),clearable:""},{default:o(()=>[a(m,{label:"启用",value:"1"}),a(m,{label:"禁用",value:"0"})]),_:1},8,["modelValue"])]),_:1}),a(d,{label:"邮箱"},{default:o(()=>[a(i,{modelValue:e.query.email,"onUpdate:modelValue":t[3]||(t[3]=n=>e.query.email=n),clearable:""},null,8,["modelValue"])]),_:1}),a(d,{label:"日期"},{default:o(()=>[a(b,{modelValue:e.query.date,"onUpdate:modelValue":t[4]||(t[4]=n=>e.query.date=n),clearable:""},null,8,["modelValue"])]),_:1})],64)):Q("",!0),a(d,null,{default:o(()=>[a(s,null,{default:o(()=>[r("重置")]),_:1}),a(s,{type:"primary",loading:e.loading},{default:o(()=>[r("查询")]),_:1},8,["loading"]),a(s,{type:"text",icon:e.expand?"up":"down",onClick:t[5]||(t[5]=n=>e.expand=!e.expand)},{default:o(()=>[r(k(e.expand?"收起":"展开"),1)]),_:1},8,["icon"])]),_:1})]),_:1})]),action:o(()=>[R("div",G,[a(s,{type:"primary",icon:"plus-circle"},{default:o(()=>[r("新增")]),_:1}),a(h,{style:{"margin-left":"20px"}},{dropdown:o(()=>[a(L,null,{default:o(()=>[a(y,null,{default:o(()=>[r("刷新")]),_:1}),a(y,null,{default:o(()=>[r("删除")]),_:1})]),_:1})]),default:o(()=>[a(s,null,{default:o(()=>[r(" 更多操作 "),a(z,{name:"down"})]),_:1})]),_:1})])]),page:o(()=>[a(N,{total:e.total,current:e.query.page,"page-size":e.query.size,"show-sizer":"","show-total":"",onChange:e.pageChange,onSizeChange:e.pageSizeChange},null,8,["total","current","page-size","onChange","onSizeChange"])]),default:o(()=>[a(U,{columns:e.columns,data:e.copyList,loading:e.loading,border:""},{roles:o(({row:n})=>[r(k(e.roleMap[n.roles]),1)]),action:o(()=>[a(S,{type:"text"},{default:o(()=>[r("编辑")]),_:1})]),_:1},8,["columns","data","loading"])]),_:1})]),_:1})}const Z=F(A,[["render",H]]);export{Z as default};
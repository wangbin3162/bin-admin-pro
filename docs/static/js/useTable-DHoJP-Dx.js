import{x as y,y as z,t as L}from"./index-CtCeQG2m.js";import{r as o,p as R,q as b}from"./vendor-B29aizbt.js";function x(l,t={},r=!0,c="rows"){const a=o(null),f=o(!1),i=o(0),u=o([]);async function n(){if(l){try{s(!0);const e=await l(t);u.value=c?e[c]:e,i.value=r?e.total||0:e.list.length}catch(e){L("userTable/getListData",e)}s(!1)}}async function v(){r&&t.page&&(t.page=1),await n()}function s(e){f.value=e}async function h(e){t.page=e,await n()}async function p(e){t.page=1,t.size=e,await n()}function g(){var d;const e=(d=a.value.value)==null?void 0:d.getBoundingClientRect();e.width,e.height}function w(){i.value=0,u.value=[]}return R(()=>{y(a.value,g)}),b(()=>{z(a.value,g)}),{tableWrapRef:a,loading:f,total:i,list:u,getListData:n,handleSearch:v,setLoading:s,pageChange:h,pageSizeChange:p,closePage:w}}export{x as u};
import{v as z,w as L,t as y}from"./index-C63pl2jy.js";import{r as o,p as R,q as b}from"./vendor-B29aizbt.js";function B(l,t={},r=!0,c="rows"){const a=o(null),f=o(!1),i=o(0),u=o([]);async function n(){if(l){try{s(!0);const e=await l(t);u.value=c?e[c]:e,i.value=r?e.total||0:e.list.length}catch(e){y("userTable/getListData",e)}s(!1)}}async function d(){r&&t.page&&(t.page=1),await n()}function s(e){f.value=e}async function h(e){t.page=e,await n()}async function p(e){t.page=1,t.size=e,await n()}function g(){var v;const e=(v=a.value.value)==null?void 0:v.getBoundingClientRect();e.width,e.height}function w(){i.value=0,u.value=[]}return R(()=>{z(a.value,g)}),b(()=>{L(a.value,g)}),{tableWrapRef:a,loading:f,total:i,list:u,getListData:n,handleSearch:d,setLoading:s,pageChange:h,pageSizeChange:p,closePage:w}}export{B as u};
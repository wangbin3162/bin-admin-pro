import{p as a,r as t,t as e}from"./index-c2ebc9d7.js";import{f as n,j as i,k as s}from"./vendor-b1b195f8.js";function l(l,o={},u=!0,c="rows"){const g=n(null),r=n(!1),f=n(0),p=n([]);async function v(){if(l){try{d(!0);const a=await l(o);p.value=c?a[c]:a,f.value=u?a.total||0:a.list.length}catch(a){e("userTable/getListData",a)}d(!1)}}function d(a){r.value=a}function h(){var a;null==(a=g.value.value)||a.getBoundingClientRect()}return i((()=>{a(g.value,h)})),s((()=>{t(g.value,h)})),{tableWrapRef:g,loading:r,total:f,list:p,getListData:v,handleSearch:async function(){u&&o.page&&(o.page=1),await v()},setLoading:d,pageChange:async function(a){o.page=a,await v()},pageSizeChange:async function(a){o.page=1,o.size=a,await v()}}}export{l as u};
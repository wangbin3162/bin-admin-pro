import{H as s}from"./index-e9e85ee6.js";import{_ as e}from"./error404-a4f35f68.js";import{f as r,J as t,o as a,A as i,B as o,t as u,u as n,w as l,q as c}from"./vendor-fe3131ae.js";import"./chunk-bin-ui-next-169a0b5b.js";import"./chunk-brace-7f859248.js";const b={name:"Error404",setup:()=>({status:r(404),errorMessage:r("抱歉，你访问的页面不存在！"),HOME_PATH:s})},d={class:"system-error-page"},f={class:"bin-result"},m=o("div",{class:"bin-result-icon bin-result-image"},[o("img",{src:e,alt:"404"})],-1),p={class:"bin-result-title"},v={class:"bin-result-subtitle"},_={class:"bin-result-extra"},g=c("返回上级"),k=c("返回首页");b.render=function(s,e,r,c,b,j){const H=t("b-button"),x=t("router-link"),M=t("b-space");return a(),i("div",d,[o("div",f,[m,o("div",p,u(c.status),1),o("div",v,u(c.errorMessage),1),o("div",_,[n(M,null,{default:l((()=>[n(H,{background:"",onClick:e[0]||(e[0]=e=>s.$router.back())},{default:l((()=>[g])),_:1}),n(x,{to:{path:c.HOME_PATH}},{default:l((()=>[n(H,{type:"primary"},{default:l((()=>[k])),_:1})])),_:1},8,["to"])])),_:1})])])])};export{b as default};
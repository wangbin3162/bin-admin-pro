import{H as p}from"./index-5fdfc667.js";import{_ as m}from"./auth-01333a12.js";import{a5 as b,m as i,E as a,o as f,a as v,b as t,t as c,c as s,w as o,e as l}from"./vendor-9d1dd954.js";import"./chunk-bin-ui-next-dcc3f7c4.js";import"./chunk-brace-bd816051.js";const h={name:"Error500",setup(){const r=i(403),e=i("\u62B1\u6B49\uFF0C\u60A8\u65E0\u6743\u8BBF\u95EE\u6B64\u9875\u9762\uFF01");return{status:r,errorMessage:e,HOME_PATH:p}}},g={class:"system-error-page"},k={class:"bin-result"},x=t("div",{class:"bin-result-icon bin-result-image"},[t("img",{src:m,alt:"403"})],-1),y={class:"bin-result-title"},E={class:"bin-result-subtitle"},H={class:"bin-result-extra"},M=l("\u8FD4\u56DE\u4E0A\u7EA7"),B=l("\u8FD4\u56DE\u9996\u9875");function C(r,e,N,n,T,V){const _=a("b-button"),d=a("router-link"),u=a("b-space");return f(),v("div",g,[t("div",k,[x,t("div",y,c(n.status),1),t("div",E,c(n.errorMessage),1),t("div",H,[s(u,null,{default:o(()=>[s(_,{background:"",onClick:e[0]||(e[0]=$=>r.$router.back())},{default:o(()=>[M]),_:1}),s(d,{to:{path:n.HOME_PATH}},{default:o(()=>[s(_,{type:"primary"},{default:o(()=>[B]),_:1})]),_:1},8,["to"])]),_:1})])])])}const S=b(h,[["render",C]]);export{S as default};
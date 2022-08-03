import{l as v,t as g,i as k,_ as x}from"./index-81afa469.js";import{a9 as L,aA as V,E as i,o as f,a as h,b as e,F as K,O as S,t as q,c as s,w as r,L as u,e as b,ac as C,ad as F}from"./vendor-23852376.js";import"./chunk-bin-ui-next-2203239f.js";import"./chunk-brace-bd816051.js";const I="/bin-admin-pro/static/png/login-code-8c841f1c.png";const z={name:"Login",data(){return{formLogin:{username:"admin",password:"admin",captcha:"v9am"},loading:!1,rules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],captcha:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]},doodle:`:doodle {
          @grid: 1x8 / 100vmin;
        }
        @place-cell: center;
        width: @rand(40vmin, 80vmin);
        height: @rand(40vmin, 80vmin);
        transform: translate(@rand(-200%, 200%), @rand(-60%, 60%)) scale(@rand(.8, 1.8)) skew(@rand(45deg));
        clip-path: polygon(
          @r(0, 30%) @r(0, 50%),
          @r(30%, 60%) @r(0%, 30%),
          @r(60%, 100%) @r(0%, 50%),
          @r(60%, 100%) @r(50%, 100%),
          @r(30%, 60%) @r(60%, 100%),
          @r(0, 30%) @r(60%, 100%)
        );
        background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf);
        opacity: @rand(.3, .8);
        position: relative;
        top: @rand(-80%, 80%);
        left: @rand(-80%, 80%);
        animation: colorChange @rand(6.1s, 16.1s) infinite @rand(-.5s, -2.5s) linear alternate;
        @keyframes colorChange {
          100% {
            left: 0;
            top: 0;
            filter: hue-rotate(360deg);
          }
        }`}},methods:{...V(k,["setToken"]),submit(){this.$refs.loginForm.validate(async t=>{if(t){try{this.loading=!0;const{data:o}=await v(this.formLogin);await this.loginSuccess(o)}catch(o){g("login/requestFailed",o)}this.loading=!1}})},async loginSuccess(t){if(t.code==="00"){const o=t.data.accessToken;await this.setToken(o);const _=this.$route.query.redirect||"/";await this.$router.push({path:_})}else g("login/requestFailed",t)}}},d=t=>(C("data-v-b64a5550"),t=t(),F(),t),N={class:"page-login"},B={class:"layer area"},T={class:"circles"},A={class:"g-bg"},E={class:"layer"},U={class:"content",flex:"dir:top main:justify cross:center box:justify"},j=d(()=>e("div",{class:"header"},[e("p",{class:"header-motto"},"\u5F00\u7BB1\u5373\u7528\u7684\u4E2D\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF")],-1)),D={class:"main",flex:"dir:top main:center cross:center"},O=d(()=>e("div",{class:"page-login--logo"},[e("img",{src:x,alt:"logo"}),e("span",null,"BIN-ADMIN-PRO")],-1)),M={class:"form"},P=d(()=>e("span",{class:"login-code"},[e("img",{src:I,alt:"code"})],-1)),R=b(" \u767B\u5F55 "),G=d(()=>e("div",{class:"footer"},[e("p",{class:"footer-copyright"},[b(" bin admin pro \u7B80\u7248\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDFvue3 \u91CD\u6784\u7248 "),e("a",{href:"https://github.com/wangbin3162/bin-admin-pro",target:"_blank"},"github")])],-1));function H(t,o,_,J,n,l){const c=i("b-icon"),m=i("b-input"),p=i("b-form-item"),y=i("b-button"),w=i("b-form");return f(),h("div",N,[e("div",B,[e("ul",T,[(f(),h(K,null,S(10,a=>e("li",{key:a})),64))])]),e("div",A,[e("css-doodle",null,q(n.doodle),1)]),e("div",E,[e("div",U,[j,e("div",D,[O,e("div",M,[s(w,{ref:"loginForm","label-position":"top",rules:n.rules,model:n.formLogin,size:"large"},{default:r(()=>[s(p,{prop:"username"},{default:r(()=>[s(m,{type:"text",modelValue:n.formLogin.username,"onUpdate:modelValue":o[0]||(o[0]=a=>n.formLogin.username=a),placeholder:"\u7528\u6237\u540D[admin,wang]",onKeydown:u(l.submit,["enter"])},{prefix:r(()=>[s(c,{name:"user",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"password"},{default:r(()=>[s(m,{type:"password",modelValue:n.formLogin.password,"onUpdate:modelValue":o[1]||(o[1]=a=>n.formLogin.password=a),placeholder:"\u5BC6\u7801[admin,123456]",onKeydown:u(l.submit,["enter"])},{prefix:r(()=>[s(c,{name:"lock",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"captcha"},{default:r(()=>[s(m,{type:"text",modelValue:n.formLogin.captcha,"onUpdate:modelValue":o[2]||(o[2]=a=>n.formLogin.captcha=a),placeholder:"- - - -",style:{width:"68%"},onKeydown:u(l.submit,["enter"])},{prefix:r(()=>[s(c,{name:"bulb",size:"16"})]),_:1},8,["modelValue","onKeydown"]),P]),_:1}),s(y,{onClick:l.submit,loading:n.loading,type:"primary",class:"button-login",size:"large"},{default:r(()=>[R]),_:1},8,["onClick","loading"])]),_:1},8,["rules","model"])])]),G])])])}const Z=L(z,[["render",H],["__scopeId","data-v-b64a5550"]]);export{Z as default};

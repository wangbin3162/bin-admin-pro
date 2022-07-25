import{l as w,t as g,_ as x}from"./index-8ae97dfa.js";import{a5 as k,o as f,z as h,A as e,F as V,J as L,t as q,u as s,d as a,I as i,G as u,a9 as I,aa as K,q as b}from"./vendor-e04737d2.js";import"./chunk-bin-ui-next-cc573c7a.js";import"./chunk-brace-34d79ec3.js";var z="/bin-admin-pro/static/png/login-code-8c841f1c.png";const C={name:"Login",data(){return{formLogin:{username:"admin",password:"admin",captcha:"v9am"},loading:!1,rules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],captcha:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]},doodle:`:doodle {
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
        }`}},methods:{submit(){this.$refs.loginForm.validate(async t=>{if(t){try{this.loading=!0;const{data:o}=await w(this.formLogin);await this.loginSuccess(o)}catch(o){g("login/requestFailed",o)}this.loading=!1}})},async loginSuccess(t){if(t.code==="00"){const o=t.data.accessToken;await this.$store.dispatch("user/setToken",o);const _=this.$route.query.redirect||"/";await this.$router.push({path:_})}else g("login/requestFailed",t)}}},d=t=>(I("data-v-487aa9ca"),t=t(),K(),t),F={class:"page-login"},S={class:"layer area"},N={class:"circles"},B={class:"g-bg"},T={class:"layer"},U={class:"content",flex:"dir:top main:justify cross:center box:justify"},j=d(()=>e("div",{class:"header"},[e("p",{class:"header-motto"},"\u5F00\u7BB1\u5373\u7528\u7684\u4E2D\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF")],-1)),A={class:"main",flex:"dir:top main:center cross:center"},D=d(()=>e("div",{class:"page-login--logo"},[e("img",{src:x,alt:"logo"}),e("span",null,"BIN-ADMIN-PRO")],-1)),E={class:"form"},G=d(()=>e("span",{class:"login-code"},[e("img",{src:z,alt:"code"})],-1)),J=b(" \u767B\u5F55 "),M=d(()=>e("div",{class:"footer"},[e("p",{class:"footer-copyright"},[b(" bin admin pro \u7B80\u7248\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDFvue3 \u91CD\u6784\u7248 "),e("a",{href:"https://github.com/wangbin3162/bin-admin-pro",target:"_blank"},"github")])],-1));function O(t,o,_,P,r,l){const c=i("b-icon"),m=i("b-input"),p=i("b-form-item"),y=i("b-button"),v=i("b-form");return f(),h("div",F,[e("div",S,[e("ul",N,[(f(),h(V,null,L(10,n=>e("li",{key:n})),64))])]),e("div",B,[e("css-doodle",null,q(r.doodle),1)]),e("div",T,[e("div",U,[j,e("div",A,[D,e("div",E,[s(v,{ref:"loginForm","label-position":"top",rules:r.rules,model:r.formLogin,size:"large"},{default:a(()=>[s(p,{prop:"username"},{default:a(()=>[s(m,{type:"text",modelValue:r.formLogin.username,"onUpdate:modelValue":o[0]||(o[0]=n=>r.formLogin.username=n),placeholder:"\u7528\u6237\u540D[admin,wang]",onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(c,{name:"user",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"password"},{default:a(()=>[s(m,{type:"password",modelValue:r.formLogin.password,"onUpdate:modelValue":o[1]||(o[1]=n=>r.formLogin.password=n),placeholder:"\u5BC6\u7801[admin,123456]",onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(c,{name:"lock",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"captcha"},{default:a(()=>[s(m,{type:"text",modelValue:r.formLogin.captcha,"onUpdate:modelValue":o[2]||(o[2]=n=>r.formLogin.captcha=n),placeholder:"- - - -",style:{width:"68%"},onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(c,{name:"bulb",size:"16"})]),_:1},8,["modelValue","onKeydown"]),G]),_:1}),s(y,{onClick:l.submit,loading:r.loading,type:"primary",class:"button-login",size:"large"},{default:a(()=>[J]),_:1},8,["onClick","loading"])]),_:1},8,["rules","model"])])]),M])])])}var X=k(C,[["render",O],["__scopeId","data-v-487aa9ca"]]);export{X as default};

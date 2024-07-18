import{a8 as P,p as G,aX as j,Q as a,o as u,a as k,K as e,w as o,b as t,f as g,a9 as x,aa as R,r as v,aY as V,aZ as B,j as h,i as A,L as F}from"./vendor-B29aizbt.js";import"./chunk-brace-BklEY0pF.js";const C="/bin-admin-pro/static/json/animation-CSs_EkTY.json",N="/bin-admin-pro/static/png/apng_test-BePWO4iS.png",T="/bin-admin-pro/static/png/css_sprites-CKiJPukc.png",U="/bin-admin-pro/static/png/css_sprites1-A0KG13Xg.png",L="/bin-admin-pro/static/json/lottie-Bu2dVtL-.json",M="/bin-admin-pro/static/pag/pag_test-C6sSnxUl.pag";function S(n){return new URL(Object.assign({"../../../../assets/images/effects/animation.json":C,"../../../../assets/images/effects/apng_test.png":N,"../../../../assets/images/effects/css_sprites.png":T,"../../../../assets/images/effects/css_sprites1.png":U,"../../../../assets/images/effects/lottie.json":L,"../../../../assets/images/effects/pag_test.pag":M})[`../../../../assets/images/effects/${n}`],import.meta.url).href}const I=n=>(x("data-v-7a40a389"),n=n(),R(),n),J=I(()=>t("p",null," 1、 关键帧动效，需要使用sprites雪碧图或者序列帧图进行播放和调用，实际情况最好是制作成雪碧图来减少图片多次请求。 ",-1)),H=I(()=>t("p",null,"2、 雪碧图实现依赖于各种坐标，这种做法不够灵活",-1)),K=I(()=>t("a",{href:"https://www.toptal.com/developers/css/sprite-generator/",target:"_blank"}," 雪碧图制作 ",-1)),O=I(()=>t("a",{href:"https://tinypng.com/",target:"_blank"},"png压缩工具",-1)),q=`
import { onMounted } from 'vue'
import animation from 'bin-keyframe-animation'
import { getImageUrl } from './util'

let images = [getImageUrl('css_sprites.png')]
let map = [
  '-10 -10',
  '-430 -10',
  '-10 -430',
  '-430 -430',
  '-850 -10',
  '-850 -430',
  '-10 -850',
  '-430 -850',
  '-850 -850',
  '-1270 -10',
  '-1270 -430',
  '-1270 -850',
  '-10 -1270',
  '-430 -1270',
  '-850 -1270',
  '-1270 -1270',
]
let repeatAnimation
let running = false
function click() {
  if (!repeatAnimation) return
  if (running) {
    running = false
    repeatAnimation.pause()
  } else {
    running = true
    repeatAnimation.restart()
  }
}

onMounted(() => {
  const el = document.getElementById('sprites')

  repeatAnimation = animation().loadImage(images).changePosition(el, map, images[0]).repeatForever()
  repeatAnimation.start(80)
  running = true
})
`,D={__name:"keyframe",setup(n){let i=[S("css_sprites.png")],r=["-10 -10","-430 -10","-10 -430","-430 -430","-850 -10","-850 -430","-10 -850","-430 -850","-850 -850","-1270 -10","-1270 -430","-1270 -850","-10 -1270","-430 -1270","-850 -1270","-1270 -1270"],l,s=!1;function _(){l&&(s?(s=!1,l.pause()):(s=!0,l.restart()))}return G(()=>{const c=document.getElementById("sprites");l=j().loadImage(i).changePosition(c,r,i[0]).repeatForever(),l.start(80),s=!0}),(c,p)=>{const d=a("b-divider"),m=a("b-alert"),b=a("b-col"),f=a("b-ace-editor"),$=a("b-collapse-wrap"),E=a("b-row");return u(),k("div",null,[e(m,{"show-icon":""},{desc:o(()=>[J,H,t("p",null,[g(" 2、 "),K,e(d,{type:"vertical"}),O])]),default:o(()=>[g(" 说明 ")]),_:1}),e(E,{gutter:16},{default:o(()=>[e(b,{span:"12"},{default:o(()=>[t("div",{id:"sprites",class:"rabbit",onClick:_})]),_:1}),e(b,{span:"12"},{default:o(()=>[e($,{title:"代码示例"},{default:o(()=>[e(f,{"model-value":q,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},W=P(D,[["__scopeId","data-v-7a40a389"]]),X="/bin-admin-pro/static/png/apng_test-BePWO4iS.png",Y={},w=n=>(x("data-v-ee7c65d6"),n=n(),R(),n),z=w(()=>t("p",null," 1、关键帧导出后，可以制作apng用来直接显示动画，但这种方式不受代码控制，动画速率等只能在AE中进行调整后，导出序列帧再用转换工具进行转换 ",-1)),Q=w(()=>t("p",null," 2、好处就是使用十分方便，无需编码直接当成普通图片进行引用即可，比较推荐用于背景或者icon动效这种可以不受控制的内容 ",-1)),Z=w(()=>t("a",{href:"https://www.zhangxinxu.com/sp/apng/",target:"_blank"},"APNG合成工具",-1)),tt=w(()=>t("a",{href:"https://tinypng.com/",target:"_blank"},"png压缩工具",-1)),et=w(()=>t("div",{class:"rabbit"},[t("img",{src:X})],-1));function at(n,i){const r=a("b-divider"),l=a("b-alert"),s=a("b-col"),_=a("b-row");return u(),k("div",null,[e(l,{"show-icon":""},{desc:o(()=>[z,Q,t("p",null,[g(" 2、 "),Z,e(r,{type:"vertical"}),tt])]),default:o(()=>[g(" 说明 ")]),_:1}),e(_,{gutter:16},{default:o(()=>[e(s,{span:"24"},{default:o(()=>[et]),_:1}),e(s,{span:"12"})]),_:1})])}const ot=P(Y,[["render",at],["__scopeId","data-v-ee7c65d6"]]),y=n=>(x("data-v-f408c1eb"),n=n(),R(),n),nt=y(()=>t("p",null," 1、Lottie 是 Airbnb 开源的一套跨平台的完整的动画效果解决方案,设计师可以使用 AE 设计动画之后,使用 Lottic 提供的 Bodymovin 插件将设计好的动画导出成 JSON 格式 ",-1)),st=y(()=>t("p",null,"2、好处就是大小很小，且可以自由进行控制和使用，矢量",-1)),it=y(()=>t("a",{href:"http://airbnb.io/lottie/#/web",target:"_blank"},"lottie docs",-1)),lt=y(()=>t("a",{href:"https://github.com/airbnb/lottie-web",target:"_blank"},"lottie-web",-1)),rt=y(()=>t("a",{href:"https://lottiefiles.com/",target:"_blank"},"lottiefiles",-1)),ct={flex:""},pt="https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json",_t=`
// 首先需要准备好AE导出的lottie json文件，或者可以加载lottieFiles 中的网络地址
// 安装lottie-web插件进行实现，代码如下
// 更多api参考官网，可以对动画进行更精准的操作

import { ref, onMounted } from 'vue'
import { getImageUrl } from '../util'
import lottie from 'lottie-web'

const imgRef1 = ref(null)
const imgRef2 = ref(null)

const localPath = getImageUrl('animation.json')
const webPath = 'https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json'

async function init() {
  lottie.loadAnimation({
    container: imgRef1.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: localPath,
  })
  lottie.loadAnimation({
    container: imgRef2.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: webPath,
  })
}

onMounted(() => {
  init()
})
`,dt={__name:"lottie",setup(n){const i=v(null),r=v(null),l=S("animation.json");async function s(){V.loadAnimation({container:i.value,renderer:"svg",loop:!0,autoplay:!0,path:l}),V.loadAnimation({container:r.value,renderer:"svg",loop:!0,autoplay:!0,path:pt})}return G(()=>{s()}),(_,c)=>{const p=a("b-divider"),d=a("b-alert"),m=a("b-col"),b=a("b-ace-editor"),f=a("b-collapse-wrap"),$=a("b-row");return u(),k("div",null,[e(d,{"show-icon":""},{desc:o(()=>[nt,st,t("p",null,[g(" 2、 "),it,e(p,{type:"vertical"}),lt,e(p,{type:"vertical"}),rt])]),default:o(()=>[g(" 说明 ")]),_:1}),e($,{gutter:16},{default:o(()=>[e(m,{span:"12"},{default:o(()=>[t("div",ct,[t("div",{class:"rabbit",ref_key:"imgRef1",ref:i},null,512),t("div",{class:"rabbit",ref_key:"imgRef2",ref:r},null,512)])]),_:1}),e(m,{span:"12"},{default:o(()=>[e(f,{title:"代码示例"},{default:o(()=>[e(b,{"model-value":_t,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},ut=P(dt,[["__scopeId","data-v-f408c1eb"]]),mt=t("p",null,"1、pag是腾讯推出的一套完整的动效工作流解决方案。",-1),gt=t("p",null," 2、能够一键将设计师在 AE （Adobe After Effects）中制作的动效内容导出成素材文件，并快速上线应用于几乎所有的主流平台。 ",-1),bt=t("a",{href:"https://pag.art/",target:"_blank"},"官网",-1),ft=t("a",{href:"https://pag.art/docs/sdk.html#web-%E7%AB%AF%E6%8E%A5%E5%85%A5",target:"_blank"}," docs ",-1),ht=`
// libpag SDK 的运行需要依赖于 libpag.js 和 libpag.wasm 文件
// 可以简单的理解为 libpag.js 是代理层，libpag.wasm 是核心层。
// libpag.wasm 的加载需要通过引入 libpag.js 后调用 PAGInit() 接口进行实例化
// 通过Npm调用之后，需要借助打包工具把 node_modules 下的 libpag/lib/libpag.wasm 文件打包到最终产物中
// 使用 locateFile 钩子返回 libpag.wasm 文件的路径，这样才能确保在网络请求中能加载到 libpag.wasm 文件

import copy from 'rollup-plugin-copy'

export default ({ mode }) => {
  const dirRoot = process.cwd()

  const env = loadEnv(mode, dirRoot)
  const isProd = process.env.NODE_ENV === 'production'

  return defineConfig({
    base: isProd ? env.VITE_PUBLIC_PATH : '/',
    plugins: [
      vue(),
      copy({
        targets: [
          {
            src: './node_modules/libpag/lib/libpag.wasm',
            dest: isProd ? 'docs/' : 'public/',
          },
        ],
        hook: isProd ? 'writeBundle' : 'buildStart',
      }),
    ],
  })
}

// 实际调用时用法示例
// 注意：因为 PAG Web 版是单线程的 SDK，所以我们不建议同屏播放多个 PAGView。具体使用方式见官方文档。
// https://pag.art/docs/web-play-pagfile.html
import { ref, onMounted } from 'vue'
import { PAGInit } from 'libpag'
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
})
const imgRef = ref(null)

async function init() {
  // 实例化 PAG
  const PAG = await PAGInit()
  // 获取 PAG 素材数据
  const buffer = await fetch(props.url).then(response => response.arrayBuffer())
  // 加载 PAG 素材为 PAGFile 对象
  const pagFile = await PAG.PAGFile.load(buffer)
  // 将画布尺寸设置为 PAGFile的尺寸
  const canvas = imgRef.value
  canvas.width = pagFile.width()
  canvas.height = pagFile.height()
  // 实例化 PAGView 对象
  const pagView = await PAG.PAGView.init(pagFile, canvas, { useScale: false })
  pagView.setRepeatCount(0)
  // 播放 PAGView
  await pagView.play()
}

onMounted(() => {
  init()
})
`,vt={__name:"pag",props:{url:{type:String,default:""}},setup(n){const i=n,r=v(null);async function l(){const s=await B(),_=await fetch(i.url).then(m=>m.arrayBuffer()),c=await s.PAGFile.load(_),p=r.value;p.width=c.width(),p.height=c.height();const d=await s.PAGView.init(c,p,{useScale:!1});d.setRepeatCount(0),await d.play()}return G(()=>{l()}),(s,_)=>{const c=a("b-divider"),p=a("b-alert"),d=a("b-col"),m=a("b-ace-editor"),b=a("b-collapse-wrap"),f=a("b-row");return u(),k("div",null,[e(p,{"show-icon":""},{desc:o(()=>[mt,gt,t("p",null,[g(" 2、 "),bt,e(c,{type:"vertical"}),ft])]),default:o(()=>[g(" 说明 ")]),_:1}),e(f,{gutter:16},{default:o(()=>[e(d,{span:"12"},{default:o(()=>[t("canvas",{class:"rabbit",ref_key:"imgRef",ref:r},null,512)]),_:1}),e(d,{span:"12"},{default:o(()=>[e(b,{title:"代码示例"},{default:o(()=>[e(m,{"model-value":ht,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},wt={class:"panel"},yt={class:"content-box"},At={__name:"index",setup(n){const i=v("tab1"),r=v([{key:"tab1",title:"关键帧"},{key:"tab2",title:"APNG"},{key:"tab3",title:"Lottie"},{key:"tab4",title:"Pag"}]);return(l,s)=>{const _=a("b-tabs"),c=a("page-wrapper");return u(),h(c,{desc:"多种动效使用方案，实际使用的时候根据实际需求进行不同方案的选择。以达到最好的动效方案。"},{default:o(()=>[t("div",wt,[e(_,{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=p=>i.value=p),data:r.value,type:"card"},null,8,["modelValue","data"]),t("div",yt,[i.value==="tab1"?(u(),h(W,{key:0})):A("",!0),i.value==="tab2"?(u(),h(ot,{key:1})):A("",!0),i.value==="tab3"?(u(),h(ut,{key:2})):A("",!0),i.value==="tab4"?(u(),h(vt,{key:3,url:F(S)("pag_test.pag")},null,8,["url"])):A("",!0)])])]),_:1})}}},It=P(At,[["__scopeId","data-v-e591a21b"]]);export{It as default};

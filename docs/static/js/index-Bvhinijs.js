import{a8 as A,p as h,aW as x,R as o,o as d,a as P,K as n,w as i,b as t,f as _,r as w,aX as I,aY as V,j as v,i as y,L as E}from"./vendor-B7whOB5j.js";import"./chunk-brace-DF1jSkZr.js";const j="/bin-admin-pro/static/json/animation-CSs_EkTY.json",B="/bin-admin-pro/static/png/apng_test-BePWO4iS.png",S="/bin-admin-pro/static/png/css_sprites-CKiJPukc.png",F="/bin-admin-pro/static/png/css_sprites1-A0KG13Xg.png",C="/bin-admin-pro/static/json/lottie-Bu2dVtL-.json",N="/bin-admin-pro/static/pag/pag_test-C6sSnxUl.pag";function G(g){return new URL(Object.assign({"../../../../assets/images/effects/animation.json":j,"../../../../assets/images/effects/apng_test.png":B,"../../../../assets/images/effects/css_sprites.png":S,"../../../../assets/images/effects/css_sprites1.png":F,"../../../../assets/images/effects/lottie.json":C,"../../../../assets/images/effects/pag_test.pag":N})[`../../../../assets/images/effects/${g}`],import.meta.url).href}const T=`
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
`,U={__name:"keyframe",setup(g){let e=[G("css_sprites.png")],u=["-10 -10","-430 -10","-10 -430","-430 -430","-850 -10","-850 -430","-10 -850","-430 -850","-850 -850","-1270 -10","-1270 -430","-1270 -850","-10 -1270","-430 -1270","-850 -1270","-1270 -1270"],p,r=!1;function l(){p&&(r?(r=!1,p.pause()):(r=!0,p.restart()))}return h(()=>{const a=document.getElementById("sprites");p=x().loadImage(e).changePosition(a,u,e[0]).repeatForever(),p.start(80),r=!0}),(a,s)=>{const c=o("b-divider"),m=o("b-alert"),b=o("b-col"),f=o("b-ace-editor"),k=o("b-collapse-wrap"),R=o("b-row");return d(),P("div",null,[n(m,{"show-icon":""},{desc:i(()=>[s[3]||(s[3]=t("p",null," 1、 关键帧动效，需要使用sprites雪碧图或者序列帧图进行播放和调用，实际情况最好是制作成雪碧图来减少图片多次请求。 ",-1)),s[4]||(s[4]=t("p",null,"2、 雪碧图实现依赖于各种坐标，这种做法不够灵活",-1)),t("p",null,[s[0]||(s[0]=_(" 2、 ")),s[1]||(s[1]=t("a",{href:"https://www.toptal.com/developers/css/sprite-generator/",target:"_blank"}," 雪碧图制作 ",-1)),n(c,{type:"vertical"}),s[2]||(s[2]=t("a",{href:"https://tinypng.com/",target:"_blank"},"png压缩工具",-1))])]),default:i(()=>[s[5]||(s[5]=_(" 说明 "))]),_:1}),n(R,{gutter:16},{default:i(()=>[n(b,{span:"12"},{default:i(()=>[t("div",{id:"sprites",class:"rabbit",onClick:l})]),_:1}),n(b,{span:"12"},{default:i(()=>[n(k,{title:"代码示例"},{default:i(()=>[n(f,{"model-value":T,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},$=A(U,[["__scopeId","data-v-7a40a389"]]),L="/bin-admin-pro/static/png/apng_test-BePWO4iS.png",M={};function J(g,e){const u=o("b-divider"),p=o("b-alert"),r=o("b-col"),l=o("b-row");return d(),P("div",null,[n(p,{"show-icon":""},{desc:i(()=>[e[3]||(e[3]=t("p",null," 1、关键帧导出后，可以制作apng用来直接显示动画，但这种方式不受代码控制，动画速率等只能在AE中进行调整后，导出序列帧再用转换工具进行转换 ",-1)),e[4]||(e[4]=t("p",null," 2、好处就是使用十分方便，无需编码直接当成普通图片进行引用即可，比较推荐用于背景或者icon动效这种可以不受控制的内容 ",-1)),t("p",null,[e[0]||(e[0]=_(" 2、 ")),e[1]||(e[1]=t("a",{href:"https://www.zhangxinxu.com/sp/apng/",target:"_blank"},"APNG合成工具",-1)),n(u,{type:"vertical"}),e[2]||(e[2]=t("a",{href:"https://tinypng.com/",target:"_blank"},"png压缩工具",-1))])]),default:i(()=>[e[5]||(e[5]=_(" 说明 "))]),_:1}),n(l,{gutter:16},{default:i(()=>[n(r,{span:"24"},{default:i(()=>e[6]||(e[6]=[t("div",{class:"rabbit"},[t("img",{src:L})],-1)])),_:1}),n(r,{span:"12"})]),_:1})])}const H=A(M,[["render",J],["__scopeId","data-v-ee7c65d6"]]),K={flex:""},O="https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json",W=`
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
`,q={__name:"lottie",setup(g){const e=w(null),u=w(null),p=G("animation.json");async function r(){I.loadAnimation({container:e.value,renderer:"svg",loop:!0,autoplay:!0,path:p}),I.loadAnimation({container:u.value,renderer:"svg",loop:!0,autoplay:!0,path:O})}return h(()=>{r()}),(l,a)=>{const s=o("b-divider"),c=o("b-alert"),m=o("b-col"),b=o("b-ace-editor"),f=o("b-collapse-wrap"),k=o("b-row");return d(),P("div",null,[n(c,{"show-icon":""},{desc:i(()=>[a[4]||(a[4]=t("p",null," 1、Lottie 是 Airbnb 开源的一套跨平台的完整的动画效果解决方案,设计师可以使用 AE 设计动画之后,使用 Lottic 提供的 Bodymovin 插件将设计好的动画导出成 JSON 格式 ",-1)),a[5]||(a[5]=t("p",null,"2、好处就是大小很小，且可以自由进行控制和使用，矢量",-1)),t("p",null,[a[0]||(a[0]=_(" 2、 ")),a[1]||(a[1]=t("a",{href:"http://airbnb.io/lottie/#/web",target:"_blank"},"lottie docs",-1)),n(s,{type:"vertical"}),a[2]||(a[2]=t("a",{href:"https://github.com/airbnb/lottie-web",target:"_blank"},"lottie-web",-1)),n(s,{type:"vertical"}),a[3]||(a[3]=t("a",{href:"https://lottiefiles.com/",target:"_blank"},"lottiefiles",-1))])]),default:i(()=>[a[6]||(a[6]=_(" 说明 "))]),_:1}),n(k,{gutter:16},{default:i(()=>[n(m,{span:"12"},{default:i(()=>[t("div",K,[t("div",{class:"rabbit",ref_key:"imgRef1",ref:e},null,512),t("div",{class:"rabbit",ref_key:"imgRef2",ref:u},null,512)])]),_:1}),n(m,{span:"12"},{default:i(()=>[n(f,{title:"代码示例"},{default:i(()=>[n(b,{"model-value":W,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},D=A(q,[["__scopeId","data-v-f408c1eb"]]),X=`
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
`,Y={__name:"pag",props:{url:{type:String,default:""}},setup(g){const e=g,u=w(null);async function p(){const r=await V(),l=await fetch(e.url).then(m=>m.arrayBuffer()),a=await r.PAGFile.load(l),s=u.value;s.width=a.width(),s.height=a.height();const c=await r.PAGView.init(a,s,{useScale:!1});c.setRepeatCount(0),await c.play()}return h(()=>{p()}),(r,l)=>{const a=o("b-divider"),s=o("b-alert"),c=o("b-col"),m=o("b-ace-editor"),b=o("b-collapse-wrap"),f=o("b-row");return d(),P("div",null,[n(s,{"show-icon":""},{desc:i(()=>[l[3]||(l[3]=t("p",null,"1、pag是腾讯推出的一套完整的动效工作流解决方案。",-1)),l[4]||(l[4]=t("p",null," 2、能够一键将设计师在 AE （Adobe After Effects）中制作的动效内容导出成素材文件，并快速上线应用于几乎所有的主流平台。 ",-1)),t("p",null,[l[0]||(l[0]=_(" 2、 ")),l[1]||(l[1]=t("a",{href:"https://pag.art/",target:"_blank"},"官网",-1)),n(a,{type:"vertical"}),l[2]||(l[2]=t("a",{href:"https://pag.art/docs/sdk.html#web-%E7%AB%AF%E6%8E%A5%E5%85%A5",target:"_blank"}," docs ",-1))])]),default:i(()=>[l[5]||(l[5]=_(" 说明 "))]),_:1}),n(f,{gutter:16},{default:i(()=>[n(c,{span:"12"},{default:i(()=>[t("canvas",{class:"rabbit",ref_key:"imgRef",ref:u},null,512)]),_:1}),n(c,{span:"12"},{default:i(()=>[n(b,{title:"代码示例"},{default:i(()=>[n(m,{"model-value":X,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},z={class:"panel"},Q={class:"content-box"},Z={__name:"index",setup(g){const e=w("tab1"),u=w([{key:"tab1",title:"关键帧"},{key:"tab2",title:"APNG"},{key:"tab3",title:"Lottie"},{key:"tab4",title:"Pag"}]);return(p,r)=>{const l=o("b-tabs"),a=o("page-wrapper");return d(),v(a,{desc:"多种动效使用方案，实际使用的时候根据实际需求进行不同方案的选择。以达到最好的动效方案。"},{default:i(()=>[t("div",z,[n(l,{modelValue:e.value,"onUpdate:modelValue":r[0]||(r[0]=s=>e.value=s),data:u.value,type:"card"},null,8,["modelValue","data"]),t("div",Q,[e.value==="tab1"?(d(),v($,{key:0})):y("",!0),e.value==="tab2"?(d(),v(H,{key:1})):y("",!0),e.value==="tab3"?(d(),v(D,{key:2})):y("",!0),e.value==="tab4"?(d(),v(Y,{key:3,url:E(G)("pag_test.pag")},null,8,["url"])):y("",!0)])])]),_:1})}}},nt=A(Z,[["__scopeId","data-v-e591a21b"]]);export{nt as default};

import { createApp } from 'vue'
import App from './App.vue'
// 引入通用样式
import '@/style/normalize.scss'
import '@/style/common.scss'
// 引入路由
import router from './router/index'
// 自定义指令
import { directive } from '@/directive/index';
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// element主题修改
import '@/style/ele.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入Pinia
import pinia from '@/store/index'
// 引入通用工具方法
import utils from '@/utils/index'
const app = createApp(App)

directive(app)
app.use(utils).use(ElementPlus,{locale: zhCn}).use(router).use(pinia).mount('#app')
// element-plus全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 网页适配
window.addEventListener("resize", setBodyZoom)
function setBodyZoom(): void {
    if($utils.systemDevice.isMobile()) return
    let zoom: Number
    if (window.innerWidth < 1920) {
        zoom = window.innerWidth / 1920
    } else {
        zoom = 1
    }
    let style: any = window.document.body.style
    style.zoom = zoom
    style.setProperty("--yl-zoom", String(zoom))
}
setBodyZoom()
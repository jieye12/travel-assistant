import { createApp } from 'vue'
import App from '@/App.vue'
// 路由
import router from '@/router/index.ts'
// style
import '@/style/common.scss'
// pinia
import { createPinia } from 'pinia'
// icons
import '@/assets/icons/iconfont.css'
// echarts
// import * as echarts from 'echarts'
// 
// import JsonViewer from "vue-json-viewer"
import JsonViewer from "vue-json-viewer"
import 'vue-json-viewer/style.css'
// 
import 'element-plus/dist/index.css'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
app.use(JsonViewer)
// app.config.globalProperties.$echarts = echarts

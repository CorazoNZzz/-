// 导入Vue的核心模块
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入根组件和路由
import App from './App.vue'
import router from './router'

// 创建应用实例
const app = createApp(App)

// 全局注册Element Plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus) // 使用Element Plus

// 挂载应用
app.mount('#app')

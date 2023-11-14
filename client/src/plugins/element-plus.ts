import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { App } from 'vue'

export default {
    install(app: App): void {
        app.use(ElementPlus, { size: 'small', zIndex: 3000 })
    }
}
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import BlogHome from '@/pages/blog-home.vue'
import BlogImage from '@/components/blog-image'
import '@/styles/root.css'

export default {
    extends: DefaultTheme,
    enhanceApp: (ctx: EnhanceAppContext) => {
        const { app } = ctx
        app.component('BlogHome', BlogHome)
        app.component('BlogImage', BlogImage)
    }
}

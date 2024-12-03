import { defineConfig } from 'vitepress'
import path from 'path'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: '微光宝盒',
    description: '微光宝盒的博客',
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
            { text: '所有文章', link: '/archives' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            },
            ...sidebar
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    },
    vite: {
        resolve: {
            // In production site build, we want to import naive-ui from node_modules
            alias: [
                {
                    find: '@/components',
                    replacement: path.resolve(__dirname, '../src/components')
                },
                {
                    find: '@/pages',
                    replacement: path.resolve(__dirname, '../src/pages')
                },
                {
                    find: '@/utils',
                    replacement: path.resolve(__dirname, '../src/utils')
                }
            ]
        }
    }
})

import { defineConfig } from 'vitepress'
import path from 'path'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: '微光宝盒',
    description: '微光宝盒的博客',
    outDir: './dist',
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        resetButtonTitle: '清除查询条件',
                        noResultsText: '无法找到相关结果',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭'
                            // selectKeyAriaLabel?: string
                            // navigateUpKeyAriaLabel?: string
                            // navigateDownKeyAriaLabel?: string
                            // closeKeyAriaLabel?: string
                        }
                    }
                }
            }
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: '所有文章', link: '/archives' }
        ],

        sidebar,

        socialLinks: [{ icon: 'github', link: 'https://github.com/glimmer-treasure' }],

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        }
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
                },
                {
                    find: '@/types',
                    replacement: path.resolve(__dirname, '../src/types')
                },
                {
                    find: '@/styles',
                    replacement: path.resolve(__dirname, '../src/styles')
                }
            ]
        }
    }
})

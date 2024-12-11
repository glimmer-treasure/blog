import { createContentLoader } from 'vitepress'

interface Post {
    title: string
    url: string
    timestamp: number
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/**/*.md', {
    transform(rawData) {
        // 根据需要对原始数据进行 map、sort 或 filter
        // 最终的结果是将发送给客户端的内容
        return rawData
            .map((item) => {
                const { url, frontmatter } = item
                const timestamp = +new Date(item.frontmatter.date)
                return {
                    title: frontmatter.title,
                    url,
                    timestamp
                }
            })
            .sort((a, b) => {
                return +new Date(b.timestamp) - +new Date(a.timestamp)
            })
    }
})

import { glob } from 'glob';
import path from 'node:path';
import process from 'node:process'
import matter from 'gray-matter';
import type { DefaultTheme } from 'vitepress';

const rootPath = process.cwd()
const postsDir = path.resolve(rootPath, './posts')
const files = glob.sync(`${postsDir}/**/*.md`)

let allPosts: Array<DefaultTheme.SidebarItem> = []

files.forEach((postPath) => {
    const file = matter.read(postPath);
    const postInfo = {
        text: file.data.title,
        link: `/${path.relative(rootPath, postPath).slice(0, -3)}`
    }
    allPosts.push(postInfo)
})

console.log(allPosts)

export default [
    {
        text: '所有文章',
        items: allPosts
    }
]
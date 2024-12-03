import { getPosts } from '../utils/posts'
import { getDrafts } from '../utils/drafts'

export default [
    {
        text: '所有文章',
        items: getPosts()
    },
    {
        text: '草稿',
        items: getDrafts()
    }
]

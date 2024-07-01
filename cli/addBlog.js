import dayjs from 'dayjs'
import { Command } from 'commander';
import inquirer from 'inquirer';
import DatePrompt from "inquirer-date-prompt";
import fse from 'fs-extra'
import process from 'node:process'
import path from 'node:path'

inquirer.registerPrompt("date", DatePrompt);

const prompt = inquirer.createPromptModule();

const getTitle = async () => {
    const question = {
        name: 'title',
        message: '请输入博客标题:',
        type: 'input',
        validate(input) {
            if (['', null, undefined].includes(input)) {
                return '必须输入博客的标题：'
            }
            return true
        }
    }
    const answers = await prompt([question])
    return answers[question.name]
}

const getDate = async () => {
    const question = {
        name: 'date',
        message: '请输入博客创建的日期:',
        type: 'date',
        default: new Date(),
        clearable: true,
    }
    const answers = await prompt([question])
    const timestamp = answers[question.name] ?? Date.now()
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

const getAuthor = async () => {
    const question = {
        name: 'author',
        message: '请输入博客作者:',
        type: 'input',
    }
    const answers = await prompt([question])
    return answers[question.name] ?? ''
}

const getCategories = async () => {
    const question = {
        name: 'categories',
        message: '请输入博客的分类(以空格分隔):',
        type: 'input',
    }
    const answers = await prompt([question])
    const categories = answers[question.name].split(' ').filter((category) => !['', null, undefined].includes(category))
    return [...new Set(categories)]
}

const getTags = async () => {
    const question = {
        name: 'tags',
        message: '请输入博客的标签(以空格分隔):',
        type: 'input',
    }
    const answers = await prompt([question])
    const tags = answers[question.name].split(' ').filter((tag) => !['', null, undefined].includes(tag))
    return [...new Set(tags)]
}

const getBlogFrontMatter = async () => {
    let content = ''
    let frontMatter = new Map()
    const title = await getTitle()
    frontMatter.set('title', title)
    const date = await getDate()
    frontMatter.set('date', date)
    const author = await getAuthor()
    frontMatter.set('author', author)
    const categories = await getCategories()
    frontMatter.set('categories', categories)
    const tags = await getTags()
    frontMatter.set('tags', tags)
    const entires = [...frontMatter.entries()]
    entires.forEach(([key, value]) => {
        if (!Array.isArray(value)) {
            content += `${key}: ${value}\n`
        } else {
            content += `${key}:\n`
            value.forEach((item) => {
                content += `\t- ${item}\n`
            })
        }
    })
    content = `---\n${content}---\n`
    frontMatter.set('_content', content)
    return frontMatter
}

const createBlog = async (blogDir, frontMatter) => {
    let blogPath = ''
    if (!blogDir) {
        blogPath = path.resolve(process.cwd(), `drafts/${frontMatter.get('title')}.md`)
    } else {
        blogPath = path.resolve(blogDir, `${frontMatter.get('title')}.md`)
    }
    console.log('blogPath', blogPath)
    await fse.outputFile(blogPath, frontMatter.get('_content'))
}

const makeAddBlogCommand = () => {
    const addBlog =  new Command('add');
    addBlog
    .argument('[path]', '添加博客的默认目录')
    .action(async (path) => {
        const frontMatter = await getBlogFrontMatter()
        await createBlog(path, frontMatter)
    })
    return addBlog
}

export default makeAddBlogCommand
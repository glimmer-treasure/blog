import dayjs from 'dayjs'
import { Command } from 'commander';
import inquirer from 'inquirer';
import DatePrompt from "inquirer-date-prompt";

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
    const title = await getTitle()
    content = `title: ${title}\n`
    const date = await getDate()
    content += `date: ${date}\n`
    const author = await getAuthor()
    content += `author: ${author}\n`
    const categories = await getCategories()
    content += `categories:\n`
    categories.forEach((category) => {
        content += `\t- ${category}\n`
    })
    const tags = await getTags()
    content += `tags:\n`
    tags.forEach((tag) => {
        content += `\t- ${tag}\n`
    })
    return content
}

const makeAddBlogCommand = () => {
    const addBlog =  new Command('add');
    addBlog.action(async () => {
        const frontMatter = await getBlogFrontMatter()
        console.log(frontMatter)
    })
    return addBlog
}

export default makeAddBlogCommand
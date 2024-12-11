import MiniSearch, { type SearchResult } from 'minisearch'
import localSearchIndex from '@localSearchIndex'
import { useData } from 'vitepress'
import { shallowRef, watchEffect, markRaw, useId, ref } from 'vue'
import { debounce } from '@/utils/debounce'

interface Item {
    content: string
    href: string
    key: string | undefined
}

export function useMiniSearch() {
    const vitePressData = useData()
    const { localeIndex, theme } = vitePressData
    const searchIndexData = shallowRef(localSearchIndex)
    const engine = shallowRef()
    const result = ref<Item[]>([])

    watchEffect(async () => {
        const jsonData = (await searchIndexData.value[localeIndex.value]?.())?.default
        const miniSearch = MiniSearch.loadJSON(jsonData, {
            fields: ['title', 'titles', 'text'],
            storeFields: ['title', 'titles'],
            searchOptions: {
                fuzzy: 0.2,
                prefix: true,
                boost: { title: 4, text: 2, titles: 1 },
                ...(theme.value.search?.provider === 'local' && theme.value.search.options?.miniSearch?.searchOptions)
            },
            ...(theme.value.search?.provider === 'local' && theme.value.search.options?.miniSearch?.options)
        })
        engine.value = markRaw(miniSearch)
    })

    const search = (fliterText: string) => {
        const data: Array<SearchResult> = engine.value.search(fliterText)
        result.value = data.map((item) => {
            const { titles, title, id } = item
            titles.push(title)
            const content = titles.join(' > ')
            const href = id
            return {
                content,
                href,
                key: useId()
            }
        })
    }

    return {
        search: debounce(search, { duration: 300 }),
        result
    }
}

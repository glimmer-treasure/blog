import MiniSearch, { type SearchResult } from 'minisearch'
import localSearchIndex from '@localSearchIndex'
import { useData } from 'vitepress'
import { shallowRef, watchEffect, markRaw } from 'vue'

export function useMiniSearch() {
    const vitePressData = useData()
    const { localeIndex, theme } = vitePressData
    const searchIndexData = shallowRef(localSearchIndex)
    const engine = shallowRef()

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

    return {
        search: (fliterText: string) => engine.value.search(fliterText)
    }
}

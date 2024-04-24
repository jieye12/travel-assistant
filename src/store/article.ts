import { defineStore } from 'pinia'
const useArticle = defineStore('article',
    {
        state: () => {
            return {
                articleId: 1
            }
        },
        getters: {
            getArticleId(): any {
                return this.articleId
            },
        },
        actions: {
            saveArticleId(id: number) {
                this.articleId = id
            }
        }
    }
)
export default useArticle
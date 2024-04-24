import request from "@/utils/request";
enum API {
    GETARTICLE_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Forum/viewArticleList',
    GETARTICLEDETAIL_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Forum/seeArticle',
}
export const reqGetArticle = (current: number, count: number) => request.get<any, any>(API.GETARTICLE_URL + `?current=${current}` + `&count=${count}`)
export const reqGetArticleDetail = (id: any) => request.get<any, any>(API.GETARTICLEDETAIL_URL + `?id=${id}`)
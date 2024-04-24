import request from "@/utils/request";
enum API {
    CREATEFAVORITE_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Plan/createFavorites',

    GETFAVORITES_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Plan/showFavoritesList',

    COLLECTCITY_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Plan/choiceCityNode',
    COLLECTATTRACTION_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/Plan',
    // 
    GETPLAN_URL = 'http://39.101.77.2:9091/TravelPlan/Plan/showFollowRoute'
}
export const reqCreateFavorites = (name: any) => request.get<any, any>(API.CREATEFAVORITE_URL + `?name=${name}`)
export const reqGetFavoritesList = () => request.get<any, any>(API.GETFAVORITES_URL)
// export const reqCollectAttraction = (data: any) => request.post<any, any>(API.COLLECTATTRACTION_URL, data)
export const reqCollectCity = (data: any) => request.post<any, any>(API.COLLECTCITY_URL, data)
export const reqGetPlan = (id: any) => request.get<any, any>(API.GETPLAN_URL + `?id=${id}`)

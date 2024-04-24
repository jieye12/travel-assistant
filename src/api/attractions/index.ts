import request from '@/utils/request'
enum API {
    // 39.101.77.2: 9091
    PopularAttractionRankings_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/PopularAttractionRankings",
    PopularCityRankings_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/PopularCityRankings",
    GetMoreAttractions_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetMoreAttractions",
    GetMoreCity_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetMoreCity",
    GetAttractionInformation_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetAttractionInformation",
    GetCityInformation_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetCityInformation",
    GetAttractionByName_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetAttractionByName",
    GetCityByName_URL = 'http://39.101.77.2:9091/' + "TravelPlan/CityAndAttraction/GetCityByName",


}
export const reqPopularAttractionRankings = () => request.get<any, any>(API.PopularAttractionRankings_URL)
export const reqPopularCityRankings = () => request.get<any, any>(API.PopularCityRankings_URL)
export const getMoreAttractions = (count: number, type: string) => request.get<any, any>(API.GetMoreAttractions_URL + `?count=${count}` + `&type=${type}`)
export const getMoreCity = (count: number) => request.get<any, any>(API.GetMoreCity_URL + `?count=${count}`)
export const getAttractionByName = (name: string) => request.get<any, any>(API.GetAttractionByName_URL + `?name=${name}`)
export const getAttractionInformation = (id: number) => request.get<any, any>(API.GetAttractionInformation_URL + `?id=${id}`)
export const getCityByName = (name: string) => request.get<any, any>(API.GetCityByName_URL + `?name=${name}`)
export const getCityInformation = (id: number) => request.get<any, any>(API.GetCityInformation_URL + `?id=${id}`)
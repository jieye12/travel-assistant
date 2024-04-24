import request from '../../utils/request'

enum API {
    // http://192.168.31.205:9091
    LOGIN_URL = 'http://39.101.77.2:9091/' + 'TravelPlan/UserInfo/login'
}
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data)
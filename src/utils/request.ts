import axios from 'axios'
// import qs from 'qs'
import { ElMessage } from "element-plus"
//
// import useUserStore from '@/store/modules/user'
// axios.defaults.headers.common['token'] = `${window.localStorage.getItem('token')}`
// axios.defaults.headers.common['userId'] = `${window.localStorage.getItem('userId')}`

let request = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        "userId": window.localStorage.getItem("userId"),
        "token": window.localStorage.getItem("token")
    }
})
request.interceptors.request.use((config) => {
    // let useStore = useUserStore()
    // if (useStore.token) {
    //     config.headers.token = useStore.token
    // }
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    // }
    return config
})
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401:
            message = "TOKEN过期"
            break
        case 403:
            message = "无权访问"
            break
        case 404:
            message = "请求地址错误"
            break
        case 500:
            message = "服务器出现了问题"
            break
        default:
            message = "网络出现了问题"
            break
    }
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})
export default request

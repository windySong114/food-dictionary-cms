import axios, { type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import config from './config'
import useUserStore from "@/store/modules/user"

// create an axios instance
const service = axios.create({
    baseURL: config.BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    (option:any) => {
        const userStore = useUserStore()
        if(userStore.token){
            option.headers!['token'] = userStore.token
        }
        if(!option.headers['Content-Type']){
            option.headers['Content-Type'] = "application/x-www-form-urlencoded"
        }
        return option
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    (async response => {
        // ArrayBuff请求方式
        if(response.config.responseType == 'arraybuffer' ){
            return [true,response]
        }
        if(response.config.responseType == 'blob'){
            if (response.data.type == 'application/json') {
                const fileReader = new FileReader()
                fileReader.readAsText(response.data, 'utf-8')
                let json = await new Promise((re, rj) => {
                    fileReader.onload = function () {
                        re(JSON.parse(fileReader.result as any))
                    }
                }) as any
                
                ElMessage({
                    message: json.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return [false, json]
            }

            return [true, response.data]
        }

        const res = response.data
        const isSuc = res.code == 200
        
        if(!isSuc){
            if(!(response.config as RequestOption).banAutoToast){

                ElMessage({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            // TOKEN失效
            if (res.code == 400) {
                const userStore = useUserStore()
                userStore.requestLogout()
                location.reload()
            }
        }
        return [isSuc,res]
    }) as (res:AxiosResponse)=>Promise<ArrayResult & AxiosResponse>,
    async error => {
        let response = error.response
        try{
            ElMessage({
                message: response.data.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return [false, response.data]
        }catch{
            ElMessage({
                message: error.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        
        return Promise.reject([false, error])
    }
)

export default {
    request:service as (config:RequestOption)=>Promise<ArrayResult>
} 

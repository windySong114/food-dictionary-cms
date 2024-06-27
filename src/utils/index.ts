import type { App } from 'vue';
import https from '@/utils/request'
import formatTime from '@/utils/formatTime'
import systemDevice from '@/utils/systemDevice'
import list from '@/utils/list'
import msg from '@/utils/msg'
import string from '@/utils/string'
import config from '@/utils/config'
import popSystem from '@/components/pop-system/pop-system.vue'

const utils = {
    https, // 网路请求
    formatTime, // 时间处理方法相关
    config, // 全局基础配置
    systemDevice, // 系统设备相关
    list, // 处理列表型数据
    msg, // 消息提示
    string, // 字符串相关
}

let $mockList:any[] = []
for(let i =0;i<25;i++){
    $mockList.push({
        id:i,
        mock:parseInt((1000000*Math.random()).toString()).toString(),
        children:[
            { id: i + '_1', mock: parseInt((1000000 * Math.random()).toString()).toString() },
            { id: i + '_2', mock: parseInt((1000000 * Math.random()).toString()).toString() },
            { id: i + '_3', mock: parseInt((1000000 * Math.random()).toString()).toString() },
        ]
    })
}

const utilsPlugin = {
    install: (app:App) => {
        window.$utils = utils // 挂载window给ts使用
        app.config.globalProperties.$utils = utils // 挂载vue给模板使用
        app.config.globalProperties.$mockList = $mockList;
        let comRecord = {
            popSystem
        } as const
        for(let key in comRecord){
            app.component(key,comRecord[key as keyof typeof comRecord]);
        }
    }
}

export default utilsPlugin
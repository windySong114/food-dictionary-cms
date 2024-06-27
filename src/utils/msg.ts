
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

function success(msg: string) {
    return ElMessage.success(msg)
}

function error(msg: string) {
    return ElMessage.error(msg)
}

function warning(msg: string) {
    return ElMessage.warning(msg)
}

async function confirm(msg: string, title = '确认', type: 'warning' | 'success' | 'error' | 'info' = 'warning') {
    try {
        const res = await ElMessageBox.confirm(msg, title, {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type,
        })
        return [true, res]
    } catch (err) {
        return [false, err]
    }
}

async function getString(msg: string, title = '请输入', isRequired = false, maxLength = 1000):Promise<YlArrayResult<string>> {
    try{
        const res = await ElMessageBox.prompt(msg, title, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputType: 'textarea',
            inputValidator(value: string) {
                if (!value && isRequired) {
                    return '请输入'
                }
                if (value.length > maxLength) {
                    return `最大长度为${maxLength}`
                }
                return true
            }
        })
        return [true,res.value]
    } catch (err){
        return [false,err as string]
    }
}

function loading(msg = '请稍候') {
    return ElLoading.service({
        lock: true,
        text: msg,
        background: 'rgba(0, 0, 0, 0.1)',
    })
}


export default {
    success,
    error,
    warning,
    confirm,
    loading,
    getString
}
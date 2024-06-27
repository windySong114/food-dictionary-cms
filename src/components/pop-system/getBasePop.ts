import {ref} from 'vue'
export default function getBasePop(){
    var title = ref('设置')
    var width = ref('500px')
    var isShow = ref(false)    
    var resolve:any = null
    var reject:any = null
    var top = ref('15vh')

    /**
     * 
     * @param result resolve的参数
     */
    function closePop(result:ArrayResult = [false,null]) {
        isShow.value = false
        resolve(result)
    }

    function showPop():Promise<ArrayResult<any>> {
        isShow.value = true
        console.log(isShow.value,'swd')
        return new Promise((re,rj)=>{
            resolve = re
            reject = rj
        })
    }

    function resetWin() {
        title.value = '设置'
        width.value = '500px'
        top.value = '20vh'
    }

    return {
        title, 
        width, 
        isShow, 
        closePop, 
        showPop, 
        top, 
        resetWin
    }
}
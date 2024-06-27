// 声明文件，定义全局变量
/* 全局 */
import utils from '@/utils/index.ts'

declare global {
	var $utils: typeof utils
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $utils: typeof utils,
		$mockList: Array<{id:string,mock:string}>,
    }
}

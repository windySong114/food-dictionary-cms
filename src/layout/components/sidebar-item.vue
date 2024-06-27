<template>
    <div class="__sidebar-item">
        <el-menu-item v-if="showingChildren.length == 0" 
            :index="vo.path" 
            class="submenu-title-noDropdown" 
            @click="toPage(vo.path)">
            <title-item :vo="vo"/>
        </el-menu-item>

        <el-sub-menu v-else 
            :index="vo.path" 
            popper-append-to-body 
            popper-class="__siderbar-sub-menu">
            <template #title>
                <title-item :vo="vo" />
            </template>
            <sidebar-item v-for="childItem in vo.children" 
                :key="childItem.path" 
                :vo="childItem"
                :base-path="resolvePath(childItem.path)" 
                class="nest-menu" />
        </el-sub-menu>
    </div>
</template>

<script lang="ts">
export default {
    name: "sidebar-item"
}
</script>

<script lang="ts" setup>
import path from 'path-browserify'
import { computed, PropType } from 'vue'
import titleItem from './title-item.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
    // 菜单项
    vo: {
        type: Object as PropType<RouteItem>,
        default: ()=>{
            return {}
        }
    },
    // 基础路径
    basePath: {
        type: String,
        default: ""
    }
});

// 显示的子菜单
var showingChildren = computed(() => {
    if (!props.vo.children) {
        return []
    }
    return props.vo.children
})

function resolvePath(routePath: string) {
    return path.resolve(props.basePath, routePath)
}

// 页面跳转
function toPage(path:string){
    //正则匹配 格式：${外链地址} 提取并打开该地址
    let reg = new RegExp(/(?<=\$\{).*?(?=\})/);
    if(reg.test(path)){
        let links:Array<any> = path.match(reg) || [];
        window.open(links[0] || '','_blank');
    }else if(/_BLANK_/.test(path)){
        window.open(location.href.replace(location.hash,'#'+path))
    }else{
        router.push(path)
    }
}
</script>

<style lang="scss" scoped>
.__siderbar-sub-menu{
    .el-menu-item{
        &:hover,&.is-active{
            color: $menuFontActiveColor;
            background-color: $menuActiveBg;
        }
    }
}
</style>
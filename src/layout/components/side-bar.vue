<template>
    <el-scrollbar class="__scrollbar-box" :class="{ 'min-sidebar-box': isSideBarScale }" wrap-class="scrollbar-wrapper">
        <el-menu :collapse="isSideBarScale" 
            :default-active="activeMenu"  
            :unique-opened="false" 
            :collapse-transition="false" 
            mode="vertical">
            <template v-for="routeItem in showSideBar">
                <sidebar-item v-if="!routeItem.meta?.hidden" 
                    class="sidebar-item" 
                    :key="routeItem.path" 
                    :vo="(routeItem as RouteItem)"
                    :base-path="routeItem.path" />
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { STATIC_ROUTES } from "@/router/routes.ts"
import sidebarItem from './sidebar-item.vue'
import useUserStore from "@/store/modules/user"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { isSideBarScale } = storeToRefs(userStore)
const route = useRoute()

let {
    activeMenu,
    showSideBar
} = (()=>{
    // 选中的菜单
    let activeMenu = computed(()=>{
        return (route.meta?.id || route.path) as string
    })

    // 全部菜单
    let showSideBar = computed(()=>{
        // 所有用于展示的菜单
        let sideList = [] as RouteItem[]
        // 获取来自服务端的动态菜单
        let serverList = [] as RouteItem[]
        // 获取静态菜单
        let sideVo = STATIC_ROUTES.find((item:RouteItem)=>{
            return item.name == 'layout'
        })
        if(sideVo){
            sideList = sideList.concat(sideVo.children,serverList)
        }
        return sideList
    })

    return {
        activeMenu,
        showSideBar
    }
})()
</script>

<style lang="scss" scoped>
.__scrollbar-box {
    flex-shrink: 0;
    width: $sideBarWidth;
    background-color: #FFFFFF;
    transition: width 0.28s;
    overflow-x: hidden;
    height: $sideBarInnerHeight;
    &.min-sidebar-box{
        width: 64px;
        &:deep(.el-menu){
            .el-sub-menu__icon-arrow{
                display: none;
            }
            .img-icon{
                margin-right: 0;
            }
            .el-sub-menu{
                .el-sub-menu__title{
                    margin: 0;
                    padding: 0;
                    color: #000000;
                    display: flex;
                    justify-content: center;
                }
            }
            .title-label{
                display: none;
            }
            .el-menu-item{
                margin-left:0;
                margin-right: 0;
            }
        }
    }
    .sidebar-item{
        &>.el-menu-item{
            font-weight: bold;
        }
        &>.el-sub-menu>.el-sub-menu__title{
            font-weight: bold;
        }
    }
    &:deep(.el-menu){
        border:none;
        .el-menu-item{
            color: $menuFontColor;
            border-radius: $menuRadio;
            margin: $menuMargin;
            background: $menuBg;
            &:hover,.is-active{
                color: $menuFontActiveColor;
                background-color: $menuActiveBg;
            }
        }
        .submenu-title-noDropdown{
            margin: 0 0px;
        }
    }
}
</style>
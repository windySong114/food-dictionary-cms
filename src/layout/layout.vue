<template>
    <div class="__layout-box">
        <div class="side-box">
            <div class="logo-box" :class="{ 'min-sidebar-box': isSideBarScale }">蔬果厨房</div>
            <div class="side-bar-box">
                <side-bar></side-bar>
            </div>
        </div>
        <div class="content-box">
            <div class="header-box">
                <nav-bar></nav-bar>
                <tags-view v-if="!route.meta._isHideSidebar"></tags-view>
            </div>
            <div class="main-box">
                <div class="wrap-box" :class="{'full-box': route.meta._isHideSidebar }">
                    <router-view v-slot="{ Component }">
                        <keep-alive :include="includeList">
                            <component :is="Component" :key="route.path" />
                        </keep-alive>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import sideBar from "./components/side-bar.vue"
import tagsView from "./components/tags-view.vue"
import navBar from "./components/nav-bar.vue"
import { useRoute } from 'vue-router'
import useUserStore from "@/store/modules/user"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { isSideBarScale } = storeToRefs(userStore)
const route = useRoute()
// 缓存组件列表
let includeList = computed(() => {
    return []
})
</script>

<style scoped lang="scss">
.__layout-box {
    width: calc(100vw / var(--yl-zoom));
    height: calc(100vh / var(--yl-zoom));
    background: $full-bg-color;
    display: flex;
    position: relative;
    .side-box {
        z-index: 2;
        background-color: $menuBg;
        box-shadow: rgba(0, 0, 0, .05) 0px 8px 15px;
        .logo-box {
            width: $sideBarWidth;
            height: $sideBarLogoHeight;
            overflow: hidden;
            color: $main-color;
            font-weight: bold;
            font-size: 20px;
            white-space: nowrap;
            line-height: 60px;
            text-overflow: ellipsis;
            transition: all 0.28s;
            display: flex;
            justify-content: center;
            align-items: center;
            &.min-sidebar-box {
                width: 64px;
                opacity: 0;
            }
        }
    }
    .content-box {
        flex-grow: 1;
        margin-top: $sideBarMarginTop;
        margin-bottom: $sideBarMarginTop;
        margin-right: $sideBarMarginLeft;
        overflow-x: hidden;
        height: $sideBarHeight;
        z-index: 1;
        .header-box {
            height: calc( $navBarHeight + $tagsViewHeight );
            flex-shrink: 0;
            background-color: #FFFFFF;
            box-shadow: rgba(0, 0, 0, .05) 8px 0px 15px;
        }
        .main-box {
            margin-left: $mainMarginLeft;
            margin-top: $mainMarginTop;
            margin-right: $mainMarginRight;
            margin-bottom: $mainMarginBottom;
            .wrap-box {
                margin-top: $mainScrollMarginTop;
                min-height: $contentHeight;
                box-shadow: 0px 7px 10px 0px rgba(0, 41, 120, 0.04);
                border-radius:  5px;
                overflow: hidden;
                &.full-box {
                    height: auto;
                }
            }
        }
    }
}
</style>
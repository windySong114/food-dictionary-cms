<template>
    <div class="__nav-bar" :class="{'full-box': route.meta._isHideSidebar,'min-sidebar-box':isSideBarScale }">
        <div class="scale-box" @click="changeSideBarScale">
            <el-icon v-show="isSideBarScale" :size="24"><Expand /></el-icon>
            <el-icon v-show="!isSideBarScale" :size="24"><Fold /></el-icon>
        </div>
        <bread-crumb></bread-crumb>
        <div class="user-info-box">
            <div class="badge-box">
                <el-badge :show-zero="false" :value="200" :max="99" class="item">
                    <el-icon :size="24"><Bell /></el-icon>
                </el-badge>                
            </div>
            <div class="info-item">{{ userInfo.nickname || '用户-0527' }}</div>
            <el-dropdown style="flex-shrink: 0;" trigger="hover">
                <div class="avatar-box">
                    <img src="@/assets/user/default.png" class="avatar-icon">
                    <el-icon :size="24"><CaretBottom /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                        <el-dropdown-item divided @click.native="logout">
                            <span style="display:block;">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import breadCrumb from './bread-crumb.vue'
import { useRoute } from 'vue-router';
import useUserStore from "@/store/modules/user"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { isSideBarScale, userInfo } = storeToRefs(userStore)
const route = useRoute()
// 切换左侧菜单展开/收起
function changeSideBarScale(){
    userStore.changeSideBarScale();
}
// 退出登录
function logout(){
    userStore.requestLogout()
}
</script>

<style scoped lang="scss">
.__nav-bar {
    width: calc(100% - $sideBarWidth - $sideBarWidthMargin);
    height: $navBarHeight;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    right: 0;
    z-index: $fixedHeadZIndex;
    display: flex;
    align-items: center;
    padding-right: 20px;
    transition: all .28s;
    &.full-box {
        width: 100%;
    }
    &.min-sidebar-box{
        width: calc(100% - 60px - $sideBarWidthMargin);
    }
    .scale-box{
        width: $navBarHeight;
        height: 100%;
        color: #606060;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color .28s;
        -webkit-tap-highlight-color:transparent;
        &:hover{
            background-color:  rgba(0, 0, 0, .025);
        }
    }
    .user-info-box{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .badge-box{
            flex-shrink: 0;
            padding: 0 12px;
            cursor: pointer;
        }
        .info-item{
            flex-shrink: 0;
            font-size: 14px;
            margin: 0 10px;
        }
        .avatar-box{
            display: flex;
            align-items: center;
            cursor: pointer;
            .avatar-icon{
                width: 36px;
                height: 36px;
            }
        }
    }
}
</style>
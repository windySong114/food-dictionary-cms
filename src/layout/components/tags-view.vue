<template>
    <div class="__tags-view" :class="{'full-box': route.meta._isHideSidebar,'min-sidebar-box':isSideBarScale }">
        <div @click="gotoView(item)" class="tag-item" :class="{active:activeIndex == index,'has-close':tagsViewList.length>1}" v-for="(item,index) in tagsViewList">
            {{getName(item)}}
            <el-dropdown class="dropdowm-con" :hide-on-click="false" @command="handleMenuCommand($event,index)" v-if="tagsViewList.length > 1">
                <el-icon @click.stop="closeTag(item,index)"  class="close-btn"><Close /></el-icon>
                <template #dropdown>
                    <el-dropdown-menu >
                        <el-dropdown-item v-for="item in CMD_LIST" :command="item">{{item}}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name:"tags-view"
    }
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import useUserStore from "@/store/modules/user"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { isSideBarScale, tagsViewList } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()

// 获取标签名称
function getName(item:TagsViewItem){
    return item.meta.title ? item.meta.title : item.path
}

// 通过点击标签进行页面跳转
function gotoView(item:TagsViewItem){
    if(item.path!=route.path){
        router.push({
            path: item.path,
            query: item.query || {}
        })
    }
}

// 关闭标签
function closeTag(item:TagsViewItem,index:number){
    if(tagsViewList.value.length > 1){
        if(activeIndex.value == index){
            // 如果是当前页面,则跳转到上一页面，或第一页
            let targetIndex = activeIndex.value == 0 ? 1 : (activeIndex.value-1)
            gotoView(tagsViewList.value[targetIndex])
        }
        // 删掉
        userStore.removeTagByIndex(index)
    }
}

// 当前标签所在索引
let activeIndex = computed(()=>{
    return tagsViewList.value.findIndex(item=>{
        return item.path == route.path
    })
})

const CMD_LIST = {
    CLOSE_OTHER : '关闭其它',
    CLOSE_RIGHT : '关闭右侧'
} as const

// 操作菜单命令
function handleMenuCommand(cmd:typeof CMD_LIST[keyof typeof CMD_LIST],clickIndex:number){
    let CMD_FUNS_MAP = {
        [CMD_LIST.CLOSE_OTHER]:()=>{
            // 先设为当前，然后把其他全关了
            if(activeIndex.value != clickIndex){
                gotoView(tagsViewList.value[clickIndex])
            }
            userStore.clearTag([clickIndex])
        },
        [CMD_LIST.CLOSE_RIGHT]:()=>{
            if(activeIndex.value > clickIndex){
                gotoView(tagsViewList.value[clickIndex])
            }
            let leftList:number[] = []
            for(let i = 0;i<=clickIndex;i++){
                leftList.push(i)
            }
            userStore.clearTag(leftList)
        }
    }
    CMD_FUNS_MAP[cmd]()
}
</script>

<style lang="scss" scoped>
.__tags-view{
    position: fixed;
    top: $navBarHeight;
    right: 0;
    z-index: $fixedHeadZIndex;
    width: calc(100% - $sideBarWidth - $sideBarWidthMargin);
    height: $tagsViewHeight;
    background: #FFFFFF;
    border-top: 1px solid $main-gray;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    flex-wrap: nowrap;
    transition: all .28s;
    &.full-box {
        width: 100%;
    }
    &.min-sidebar-box{
        width: calc(100% - 60px - $sideBarWidthMargin);
    }
}
.tag-item{
    height: 24px;
    line-height: 23px;
    border: solid 1px #CCCCCC;
    color:#CCCCCC;
    padding: 0 12px;
    font-size: 15px;
    background-color: white;
    white-space: nowrap;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 18px;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    text-overflow: ellipsis;
    position: relative;
    .close-btn{
        color:#CCCCCC;
    }
    &.has-close{
        padding-right: 30px;
    }
    &.active,&:hover{
        color:$main-color !important;
        border: solid 1px $main-color;
        font-weight: bold;
        flex-shrink: 0;
        .close-btn{
            color:$main-color !important;
        }
    }
    .dropdowm-con{
        position: static;
        .close-btn{
            position: absolute;
            right: 7px;
            top: 5px;
            &:hover{
                border:1px $main-color solid;
                border-radius: 50%;
            }
        }
    }
}
</style>
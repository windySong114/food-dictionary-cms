<template>
    <component :class="{ active, menu: hasChildren }" 
        class="img-icon" 
        v-if="vo.meta?.icon" 
        :is="iconComponent">
    </component>
    <span class="title-label" 
        :class="{ active, menu: hasChildren }" 
        slot="title" 
        v-if="vo.meta?.title">
        {{ vo.meta?.title }}
    </span>
</template>

<script lang="ts">
export default {
    name: "title-item"
}
</script>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import * as ICON_LIST from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
// import PERMISSION_TYPE from '@/modules/system/enums/PERMISSION_TYPE'

const route = useRoute()
const props = defineProps({
    // 菜单项
    vo: {
        type: Object as PropType<RouteItem>,
        default: ()=>{
            return {}
        }
    },
});

// 是否显示图标组件
let iconComponent = computed(()=>{
    if(props.vo.meta?.icon){
        return ICON_LIST[props.vo.meta.icon as keyof typeof ICON_LIST]
    }
    return false
})

// 选中的菜单
let active = computed(()=>{
    return props.vo.path == route.path
})

// 是否有子菜单
let hasChildren = computed(()=>{
    if(!props.vo.children){
        return false
    }
    let showChildList = props.vo.children.filter(item=>{
        return item.meta.hidden && item.type == 1
    })
    return showChildList.length > 0
})
</script>

<style lang="scss" scoped>
.__title-item {}
.img-icon {
    width: 20px;
    object-fit: contain;
    margin-right: 10px;
    flex-shrink: 0;
}
.active{
    color:$main-color; 
}
</style>
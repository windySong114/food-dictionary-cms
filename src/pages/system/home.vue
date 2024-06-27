<template>
    <div class="__home-box">
        <el-button @click="onRoleDetail(null)" type="primary" icon="Plus">新增</el-button>
        <pop-role-detail ref="角色详情弹窗"></pop-role-detail>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getRoleListApi, updatePublishStatusApi, deleteRoleApi } from "@/api/system";
import popRoleDetail from './components/pop-role-detail.vue'
import type { ROLE_VO } from "./vo/ROLE_VO"

let 角色详情弹窗 = ref(null as any as InstanceType<typeof popRoleDetail>)
let {
    queryForm
} = (()=>{
    let queryForm = ref({
        name:""
    } as ROLE_VO)

    return {
        queryForm
    }
})()

let {
    COLS,
    onRoleDetail,
    changePublish,
    onDeleteRole
} = (()=>{
    onMounted(()=>{})
    let COLS:Array<YlColItem> = [
        {
            label:"角色名称",
            field:"name"
        },
        {
            label:"备注说明",
            field:"remark"
        },
    ]

    // 新增/编辑角色
    async function onRoleDetail(vo:ROLE_VO|null){
        let [suc,res] = await 角色详情弹窗.value.openPop(vo)
        if(!suc) return console.log('弹窗关闭')
        if(!res) return console.log('弹窗取消')
        // 更新列表
    }

    // 切换发布状态
    async function changePublish(status:string|number,roleId:string){
        let [suc,res] = await updatePublishStatusApi(roleId)
        if(!suc) return
        $utils.msg.success('操作成功')
        // 更新列表
    }

    // 删除角色
    async function onDeleteRole(roleId:string){
        let [suc,res] = await deleteRoleApi(roleId)
        if(!suc) return
        $utils.msg.success('操作成功')
        // 更新列表
    }

    return {
        COLS,
        onRoleDetail,
        changePublish,
        onDeleteRole
    }
})()
</script>

<style lang="scss" scoped>
.__home-box{
    padding: 24px;
    background-color: #FFFFFF;
}
</style>
<template>
    <pop-system :title="title" :isShow="isShow" @onConfirm="onSave" @onClose="closeSysPop" >
        <el-form class="__pop-role-detail" ref="表单" :model="formData" :rules="RULES">
            <el-form-item label="角色名称：" prop="name" label-width="100px">
                <el-input placeholder="请输入角色名称" :min="0" :max="50" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status" label-width="100px">
                <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="备注说明：" prop="remark" label-width="100px">
                <el-input :rows="3" placeholder="请输入备注说明" type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
    </pop-system>
</template>

<script lang="ts">
export default {
    name: "pop-role-detail"
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { saveRoleApi } from "@/api/system";
import popSystem from "@/components/pop-system/pop-system.vue"
import getBasePop from "@/components/pop-system/getBasePop"
import type { ROLE_VO } from "../vo/ROLE_VO"
import { inflate } from 'zlib';
var {title,isShow,closePop,showPop} = getBasePop()
const 表单 = ref(null as any)

let {
    RULES,
    formData,
    clearForm,
    onSave
} = (()=>{
    // 验证规则
    const RULES = {
        name: {
            required: true,
            trigger: 'blur',
            message: "请输入角色名称"
        },
        status: {
            required: true,
            trigger: 'blur',
            message: "请选择状态"
        },
    }

    // 表单数据
    let formData = ref({
        id: "",
        name: "",
        status: 0,
        remark: "",
    } as ROLE_VO)

    // 清空表单
    function clearForm(){
        formData.value.id = ""
        formData.value.name = ""
        formData.value.status = 0
        formData.value.remark = ""
    }

    // 保存表单
    async function onSave(){
        let data = {
            roleName: formData.value.name,
            status: formData.value.status,
            remark: formData.value.remark
        } as any
        if(!$utils.string.isEmpty(formData.value.id)){
            data.roleId = formData.value.id
        }
        try{
            await 表单.value.validate();
            let [suc,res] = await saveRoleApi(data);
            if(!suc) return
            $utils.msg.success('操作成功')
            closePop([true, {}])
        } catch(err){}
    }

    return {
        RULES,
        formData,
        clearForm,
        onSave
    }
})()

let {
    closeSysPop,
    openPop
} = (()=>{
    // 关闭系统弹窗
    function closeSysPop(isCancel:boolean){
        closePop([isCancel, null])
    }

    // 打开弹窗
    function openPop(data:ROLE_VO){
        if(data) {
            title.value = "编辑角色"
            formData.value = JSON.parse(JSON.stringify(data))
        }else{
            clearForm()
            title.value = "新增角色"
        }
        return showPop()
    }

    return {
        closeSysPop,
        openPop
    }
})()

defineExpose({
    openPop
})
</script>

<style lang="scss" scoped>
.__pop-role-detail {
    padding: 24px 32px 12px;
}
</style>
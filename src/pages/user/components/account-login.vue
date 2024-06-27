<template>
    <div class="__form-box">
        <div class="title-box">
            <div>蔬果厨房</div>
            <div style="margin-top: 4px;">后台管理系统</div>
        </div>
        <el-form ref="表单" :model="formData" :rules="RULES">
            <!-- 账号 -->
            <el-form-item prop="username" class="form-item">
                <el-input prefix-icon="" type="text" clearable autocomplete="on" placeholder="用户名" v-model="formData.username">
                    <template v-slot:prefix>
                        <img class="user-icon" src="@/assets/user/user-icon.png" alt="">
                    </template>
                </el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item prop="password" class="form-item">
                <el-input type="password" clearable show-password placeholder="密码" v-model="formData.password">
                    <template v-slot:prefix>
                        <img class="lock-icon" src="@/assets/user/lock-icon.png" alt="">
                    </template>
                </el-input>
            </el-form-item>

            <!-- 验证码 -->
            <el-form-item prop="verifyCode" class="form-item">
                <el-input style="width: 210px" type="text" clearable v-model="formData.verifyCode" placeholder="验证码">
                    <template v-slot:prefix>
                        <img class="key-icon" src="@/assets/user/key-icon.png" alt="">
                    </template>
                </el-input>
                <img class="verify-code-box" :src="imgBase64" @click="requestVerifyCode" />
            </el-form-item>
            <div class="btn-box" type="primary" :loading="loading" @click="onLogin">登录</div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getVerifyCodeApi } from "@/api/user";
import useUserStore from "@/store/modules/user"
import { useRouter } from 'vue-router';
const router =  useRouter()
const userStore = useUserStore()
const 表单 = ref(null as any)

let {
    RULES,
    formData,
    loading,
    imgBase64,
    requestVerifyCode,
    onLogin
} = (()=>{
    const RULES = {
        username: {
            required: true,
            trigger: 'blur',
            message: "请输入用户名"
        },
        password: {
            required: true,
            trigger: 'blur',
            message: "请输入密码"

        },
        verifyCode: {
            required: true,
            trigger: 'blur',
            message: "请输入验证码"
        }
    }

    onMounted(()=>{
        requestVerifyCode()
    })

    // 登录加载中
    let loading = ref(false)
    // 验证码
    let imgBase64 = ref("" as string)
    // 表单数据
    let formData = ref({
        username: "",
        password: "",
        verifyCode: "",
    } as UserInfo)

    // 获取验证码
    async function requestVerifyCode() {
        let [suc,res] = await getVerifyCodeApi()
        if(!suc) return
        imgBase64.value = res.data || ""
    }
    
    // 用户登录
    async function onLogin() {
        let data = {
            username: formData.value.username,
            password: formData.value.password,
            verifyCode: formData.value.verifyCode
        } as UserInfo
        try{
            await 表单.value.validate();
            let isSuc = await userStore.requestLogin(data);
            if(!isSuc) return requestVerifyCode()
            router.push('/')
        } catch(err){}
    }

    return {
        RULES,
        formData,
        loading,
        imgBase64,
        requestVerifyCode,
        onLogin
    }
})()
</script>

<style lang="scss" scoped>
.__form-box {
    position: relative;
    .title-box{
        text-align: center;
        margin-bottom: 60px;
        font-weight: bold;
        color: #005EFE;
        font-size: 40px;
    }
    .form-item{
        margin-bottom: 34px;
        .user-icon{
            width: 18px;
            height: 20px;
        }
        .lock-icon{
            width: 16px;
            height: 20px;
        }
        .key-icon{
            width: 20px;
            height: 20px;
        }
        .verify-code-box{
            width: 120px;
            height: 46px;
            margin-left: 10px;
            border-radius: 2px;
            border: 1px solid #060606;
        }
    }
    .form-item :deep(.el-input__wrapper) {
        background-color: #EFF3F8;
        border-radius: 8px;
        box-shadow: 0 0 0 0px;
        border: none;
    }
    .form-item :deep(.el-input__inner) {
        background-color: #EFF3F8!important;
        height: 46px;
        padding: 12px 0;
    }
    .btn-box{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 38px;
        width: 100%;
        height: 50px;
        border-radius: 6px;
        background: #005EFE;
        color: #FFFFFF;
        font-size: 16px;
        cursor: pointer;
        letter-spacing: 2px;
        text-indent: 2px;
    }
}
</style>
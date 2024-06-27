<template>
    <el-dialog :model-value="isShow"
        :title="title"
        :width="width+'px'"
        :close-on-click-modal="false"
        append-to-body
        :before-close="onClose">
        <div class="dialog-header-box">
            <div class="title-box">{{ title }}</div>
            <div class="icon-box" @click="onClose">
                <el-icon :size="24"><CircleClose /></el-icon>
            </div>
        </div>
        <div class="container-box">
            <slot></slot>
        </div>
        <template #footer>
            <el-button type="danger" @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//注册事件
const emits = defineEmits(["onConfirm", "onClose"]);
const props = defineProps({
    // 标题
    title: {
        type: String,
        default: "标题",
    },
    // 宽度
    width: {
        type: Number,
        default: 540
    },
    // 是否显示
    isShow: {
        type: Boolean,
        default: false
    }
});

let {
    onConfirm,
    onClose,
    onCancel,
} = (()=>{
    // 确认弹窗
    const onConfirm = () => {
        emits("onConfirm");
    };
    // 关闭弹窗
    const onClose = () => {
        emits("onClose",false);
    };
    // 取消弹窗
    const onCancel = () =>{
        emits("onClose",true);
    };

    return {
        onConfirm,
        onClose,
        onCancel
    }
})()
</script>

<style lang="scss" scope>
.dialog-header-box{
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    background-color: #0F75FF;
    .title-box{
        flex-grow: 1;
        color: #FFFFFF;
        font-size: 16px;
        letter-spacing: 1px;
        text-indent: 1px;
    }
    .icon-box{
        color: #FFFFFF;
        cursor: pointer;
    }
}
.container-box {
    overflow-x: initial;
    overflow-y: auto;
}
.el-dialog{
    padding: 0px;
    border-radius: 8px;
    overflow: hidden;
    .el-dialog__header {
        display: none;
    }
    .el-dialog__headerbtn {
        .el-dialog__close {
            color: #fff;
        }
    }
    .el-dialog__body {
        padding: 0px;
    }
}
.el-dialog__footer {
    padding: 16px;
    border-top: 1px solid #e8eaec !important;
}
</style>

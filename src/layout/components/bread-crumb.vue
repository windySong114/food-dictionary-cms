<template>
    <el-breadcrumb separator="/" class="__breadcrumb-box">
        <el-breadcrumb-item v-for="item in tabs">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
// 获取当前路由
const route = useRoute();
// 定义面包屑数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
// 监听路由变化的操作
const getBredcrumb = () => {
    // 获取title不为空的
    let matched = route.matched.filter((item) => item.meta && item.meta.title);
    // 判断第一个是否是首页，不是，构造一个首页
    // const first = matched[0];
    // if (first.path !== "/home") {
    //     matched = [{ path: "/home", meta: { title: "首页" } } as any].concat(
    //         matched
    //     );
    // }
    // 设置面包屑数据
    tabs.value = matched;
};
// 解决刷新数据丢失
getBredcrumb()
// 监听当前路由的变化
watch(
  () => route.path,
  () => getBredcrumb()
);
</script>

<style lang="scss" scoped>
.__breadcrumb-box {
    margin-left: 8px;
}
:deep(.el-breadcrumb__item) {
    font-size: 14px;
}
</style>

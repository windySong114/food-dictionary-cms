<template>
    <div class="__login-box">
        <div class="content-box">
            <div class="shell-box">
                <account-login></account-login>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import accountLogin from './components/account-login.vue'
</script>

<style lang="scss" scoped>
.__login-box {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/user/login-bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    display:flex;
    align-items:center;
    justify-content:center;
    .content-box{
        position: relative;
        width: 1467px;
        height: 749px;
        background-image: url('@/assets/user/login-bg2.png');
        background-size: cover;
    }
}

@media only screen and (max-width: 600px) {
    .content-box {
        background-image:none;
    }
    .shell-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
    }
}

@media only screen and (min-width: 600px) {
    .shell-box {
        position: absolute;
        right: 120px;
        margin-top: 110px;
    }
}
</style>
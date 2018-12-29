<template id="app">
    <div>
        <transition mode="in-out" name="fade">
            <router-view class="page" :key="$route.path"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */  { opacity: 0; }
</style>
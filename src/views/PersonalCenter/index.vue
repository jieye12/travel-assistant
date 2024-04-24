<template>
    <div>
        <h1>个人中心</h1>
    </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(()=>{
    console.log(route.meta.nav);
    const nav:string = String(route.meta.nav)
    window.localStorage.setItem("activeNav",nav)
})
</script>

<style lang="scss" scoped></style>
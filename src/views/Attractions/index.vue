<template>
    <div class="all">
        <div class="main">
            <!-- 城市 -->
            <city></city>
            <!-- 景点 -->
            <destination></destination>
        </div>
    </div>
</template>

<script lang="ts" setup>
import city from './Session/PopularCity/index.vue'
import destination from './Session/PopularAttraction/index.vue'

</script>

<style lang="scss" scoped>
.all {
    width: 100%;

    .carousel {
        img {
            width: 100%;
            height: 500px;
        }
    }

    .main {
        width: 60%;
        min-width: 1200px;
        margin: 10px auto;

    }
}
</style>
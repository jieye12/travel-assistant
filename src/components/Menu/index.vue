<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item :index="item.path" @click="goRoute">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" @click="goRoute">
                <template>
                    <span>{{ item.children[0].title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <span>{{ item.title }}</span>
            </template>
            <menuItem :menuList="item.children">
            </menuItem>
        </el-sub-menu>
    </template>
</template>
<script setup lang="ts">
import menuItem from './index.vue'
import { useRouter } from 'vue-router'
defineProps(['menuList'])
const goRoute = (vc: any) => {
    const router = useRouter()
    router.push(vc.index)
}
</script>
<style lang="scss" scoped>
.el-menu-item {
    display: inline-block;
    width: 20%;
    // color: #ffffff;
}

span {
    display: inline-block;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    // color: #ffffff;
}

.el-menu-item__content {
    text-align: center;

}
</style>
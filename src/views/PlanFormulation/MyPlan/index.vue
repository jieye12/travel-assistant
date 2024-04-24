<template>
    <div class="all">
        <el-card v-for="(item, index) in plans" :key="item.id" @click="notshow(index)">
            <div class="left">
                <div class="name">{{ item.planName }}</div>
                <div class="number">
                    <span>
                        <i>{{ item.cityCount }}</i>
                        个城市
                    </span>
                    <span>
                        <i>{{ item.attractionCount }}</i>
                        个景点
                    </span>
                </div>
            </div>
            <div class="right">
                <div class="wrapper" @click.stop="show(index)">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
            <el-card class="operation" v-show="showOperation[index]">
                <div class="route1" @click="turnToScreen(item.id)">
                    查看线性路径1
                </div>
                <div class="route2" @click="turnToPersonalProduction(item.id)">
                    查看线性路径2
                </div>
                <div>删除</div>
            </el-card>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { reqGetFavoritesList, reqGetPlan } from '@/api/plan/index'
import usePlan from '@/store/plan.ts'
const planStore = usePlan()
const router = useRouter()

const plans = ref([
])
let showOperation = ref<boolean[]>([])
for (let i = 0; i < plans.value.length; i++) {
    showOperation.value[i] = false
}
const show = (index: number) => {
    showOperation.value[index] = true
}
const notshow = (index: number) => {
    showOperation.value[index] = false
}
//创建收藏夹
// const res = await reqCreateFavorites("2024五一计划")
// console.log(res);
onMounted(async () => {
    const res = await reqGetFavoritesList()
    plans.value = res.data
})
const turnToScreen = (id: number) => {
    planStore.savePlanId(id)
    router.push("/screen")
}
const turnToPersonalProduction = (id: number) => {
    planStore.savePlanId(id)
    router.push("/personal_production")
}
</script>
<style lang="scss" scoped>
.all {
    width: 60%;
    margin: 0 auto;

    .el-card {
        margin: 5px 0;
        position: relative;
        overflow: visible;

        ::v-deep .el-card__body {
            display: flex;
            justify-content: space-between;
        }

        .left {
            .name {
                font-size: 20px;
                margin-bottom: 10px;
            }

            .number {
                color: #86909c;
                font-size: 12px;

                span {
                    display: inline-block;
                    margin-right: 10px;

                    i {
                        // font-style: normal;
                        color: red;
                        font-size: 14px;
                    }
                }
            }
        }

        .right {
            .wrapper {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: aliceblue;
                text-align: center;
                line-height: 60px;
            }
        }

        .operation {
            padding: 5px 0px;
            box-sizing: border-box;

            ::v-deep .el-card__body {
                display: block;
                padding: 0;
            }

            position: absolute;
            // display: block;
            right: 10px;
            top: 20px;

            z-index: 80;

            div {
                padding: 5px 20px;
                box-sizing: border-box;
            }

            div:hover {
                // background-color: beige;
                background-color: azure;
                // background-color: #86909c;
            }

        }

    }
}
</style>
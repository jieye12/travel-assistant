<template>
    <div class="contain" style="background-color: #f2f3f5;">
        <div class="all" v-if="load">
            <div class="top">
                <div class="left">
                    <img :src="cityInformation.imageUrl" alt="">
                </div>
                <div class="right">
                    <div class="name">
                        {{ cityInformation.name }}
                    </div>
                    <div class="description">
                        {{ cityInformation.description }}
                    </div>
                </div>
            </div>
            <div class="lists">
                <h2>风景名胜</h2>
                <ul>
                    <li v-for="item in cityInformation.attractions" :key="item.id" @click="turnToAttractionDetails">
                        <div class="image">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="title">
                            {{ item.name }}
                        </div>
                        <div class="rating">
                            {{ item.popular }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="collect">
            <div class="content" @click="showPlan">
                <i class="iconfont icon-shoucang" title="收藏"></i>
            </div>
        </div>
        <el-dialog v-model="dialogTableVisible" title="请选择收藏夹" center>
            <div class="title">选择你喜欢的城市或景点，以便生成相应的旅行计划</div>
            <div class="lists">
                <ul>
                    <li v-for="(item, index) in plans" :key="index">
                        <div class="left">
                            <div class="name">{{ item.planName }}</div>
                            <div class="number">
                                <span>{{ item.cityCount + '个城市' }}</span>
                                <span>{{ item.attractionCount + '个景点' }}</span>
                            </div>
                        </div>
                        <div class="right">
                            <el-checkbox :value="selectedArr[index]" :key="index"
                                v-model="selectedArr[index]"></el-checkbox>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <el-button type="primary" @click="collect()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getCityInformation } from '@/api/attractions/index';
import { reqCollectCity } from '@/api/plan/index'
import useCityAndAttractionStore from '@/store/cityAndAttraction';
import { reqGetFavoritesList } from '@/api/plan/index'
import { ElNotification } from 'element-plus';
const cityStore = useCityAndAttractionStore()
const load = ref(false)
let id: number
onMounted(async () => {
    id = cityStore.getSelectedCityId
    const res = await getCityInformation(id)
    cityInformation.value = res.data
    load.value = true
})
// 

const dialogTableVisible = ref(false)
const router = useRouter();
const cityInformation = ref()
const plans: any = ref([
])
const showPlan = async () => {
    const res = await reqGetFavoritesList()
    plans.value = res.data
    dialogTableVisible.value = true
}

const selectedArr = ref([])
const collect = async () => {
    let cityId = []
    cityId.push(id)
    const reqData = {
        cityId: cityId,
        planId: 4
    }

    const res = await reqCollectCity(reqData)
    if (res.code == '0') {
        dialogTableVisible.value = false
        ElNotification({
            type: 'success',
            message: '添加成功',
        });
    }
    else {
        dialogTableVisible.value = false
        ElNotification({
            type: 'error',
            message: '添加失败',
        });
    }

}
const turnToAttractionDetails = () => {
    router.push("/attraction_details")
}
</script>
<style lang="scss" scoped>
.all {
    width: 70%;
    margin: 20px auto;
    text-align: center;
    background-color: #ffffff;
    overflow: hidden;

    .top {
        display: flex;
        padding: 20px 30px;
        box-sizing: border-box;

        .left {
            margin-right: 20px;

            img {
                width: 500px;
                border-radius: 20px;
            }

        }

        .right {
            .name {
                text-align: center;
                font-size: 20px;
                font-weight: 700;
                margin: 10px 0;
            }

            .description {
                text-indent: 2em;
                font-size: 16px;
                text-align: left;
            }
        }
    }

    .lists {
        width: 100%;

        h2 {
            text-align: center;
            margin: 20px auto;
        }

        ul {
            // min-width: 1100px;
            // margin: auto;
            text-align: left;
            margin-left: 20px;

            li {
                display: inline-block;
                width: 18%;
                margin-bottom: 20px;
                margin-right: 10px;

                .image {
                    img {
                        // width: 200px;
                        width: 100%;
                        height: 110px;
                        border-radius: 10px;
                    }
                }

                .title {
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .rating {
                    text-align: center;
                    font-size: 20px;
                    font-style: italic;
                    color: red;
                }
            }
        }
    }
}

.collect {
    position: absolute;
    top: 200px;
    right: 50px;

    .content {
        width: 100px;

        i {
            display: inline-block;
            width: 60px;
            height: 60px;
            background-color: #ffffff;
            text-align: center;
            line-height: 60px;
            border-radius: 50%;
            font-size: 40px;
        }
    }
}

.el-dialog {
    height: 500px;

    .title {
        font-size: 12px;
        text-align: center;
        margin-top: -20px;
    }

    .lists {
        ul {
            li {
                padding-right: 20px;
                padding-bottom: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #282f38;

                .left {
                    .name {
                        font-size: 20px;
                        margin-bottom: 5px;
                    }

                    .number {
                        padding-left: 20px;

                        span {
                            display: inline-block;
                            font-size: 12px;
                            margin-right: 10px;
                        }
                    }
                }

                .right {
                    .el-checkbox {
                        zoom: 1.5;
                    }
                }
            }
        }
    }

    .bottom {
        .el-button {
            margin-left: 500px;
        }
    }
}
</style>
<template>
    <div class="all" v-if="load">
        <h1>热门城市推荐</h1>
        <div class="lists">
            <ul>
                <li v-for="item in cities" :key="item.id" @click="turnToCityDetail(item.id)">
                    <div class="image">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="description">
                        <div class="city">{{ item.name }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="more">
            <span @click="turnToCityPage()">查看更多</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useCityAndAttractionStore from '@/store/cityAndAttraction';
const cityStore = useCityAndAttractionStore()
const router = useRouter()
const cities = ref()
const load = ref(false)
onMounted(() => {
    cities.value = cityStore.getCities
    load.value = true
})
const turnToCityDetail = (id: number) => {
    cityStore.saveCityId(id)
    router.push("/city_details")
}
const turnToCityPage = () => {
    router.push("/city_page")
}
</script>
<style lang="scss" scoped>
.all {
    margin: 0 auto;

    h1 {
        text-align: center;
        margin: 10px 0 20px;
    }

    .lists {
        margin: auto;

        ul {
            li {
                display: inline-block;
                width: 20%;
                padding: 5px;
                box-sizing: border-box;

                .image {
                    img {
                        width: 100%;
                        height: 150px;
                    }
                }

                .description {
                    .city {
                        text-align: center;
                        font-size: 20px;
                    }
                }
            }
        }
    }

    .more {
        width: 100%;
        text-align: center;

        span {
            display: inline-block;
            width: 150px;
            height: 40px;
            color: aqua;
            font-weight: 700;
            line-height: 40px;
            margin: 10px auto;
            border: 2px solid #00ffff;
        }
    }
}
</style>
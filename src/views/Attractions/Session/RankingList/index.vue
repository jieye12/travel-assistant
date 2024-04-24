<template>
    <div class="rankingList">
        <h1>top排行榜</h1>
        <div class="content">
            <div class="city">
                <h2>热门城市排行榜</h2>
                <ul>
                    <li v-for="(item, index) in cities" :key="item.id" @click="turnToCityDetails()">
                        <span class="no">{{ index + 1 }}</span>
                        <span class="details">{{ item.name }}</span>
                        <span class="heat">{{ item.popular }}</span>
                    </li>
                </ul>
            </div>
            <div class="attractions">
                <h2>热门景点排行榜</h2>
                <ul>
                    <li v-for="(item, index) in attractions" :key="item.id" @click="turnToAttractionDetails()">
                        <span class="no">{{ index + 1 }}</span>
                        <span class="details">{{ item.name }}</span>
                        <span class="heat">{{ item.popular }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import useCityAndAttractionStore from '@/store/cityAndAttraction';
const store1 = useCityAndAttractionStore()
// import { numericConversion } from '@/utils/numericConversion'
const attractions = ref()
const cities = ref()
onMounted(async () => {
    attractions.value = await store1.getAttractions
    cities.value = await store1.getCities
    await nextTick();
})
const turnToCityDetails = () => {
    router.push("/city_details")
}
const turnToAttractionDetails = () => {
    router.push("/attraction_details")
}
</script>
<style lang="scss" scoped>
.rankingList {
    h1 {
        text-align: center;
    }

    .content {
        display: flex;
        justify-content: space-between;

        .city,
        .attractions {
            width: 50%;
            padding: 0 50px;

            h2 {
                text-align: center;
                margin: 20px auto;
            }

            li {
                margin: 5px 0;
                font-size: 16px;

                span {
                    display: inline-block;
                }

                .no {
                    width: 50px;
                    text-align: center;
                    font-weight: 700;
                }

                .details {
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .heat {
                    text-align: right;
                    // text-align: center;
                    font-style: italic;
                    color: red;
                    margin-left: 50px;
                }
            }

            li:hover {
                background-color: #f3f3f3;
                font-weight: 700;
            }
        }
    }
}
</style>
<template>
    <div class="all" v-if="load">
        <div class="top">
            <div class="left">
                <img :src="attractionDetails.imageUrl" alt="">
            </div>
            <div class="right">
                <div class="name">
                    {{ attractionDetails.name }}
                </div>
                <div class="description">
                    {{ attractionDetails.description }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAttractionInformation } from '@/api/attractions/index';
const attractionDetails = ref()
const load = ref(false)
const initData = async () => {
    const res = await getAttractionInformation(1)
    console.log(res);
    // return res
    attractionDetails.value = res.data
}
onMounted(() => {
    // attractionDetails.value = initData().data
    initData()
    load.value = true
    // await nextTick()
    // console.log(attractionDetails.value);

})
</script>
<style lang="scss" scoped>
.all {
    width: 60%;
    margin: 20px auto;

    .top {
        display: flex;

        .left {
            margin-right: 20px;

            img {
                width: 500px;
                height: 300px;
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

            .operation {
                text-align: center;
                height: 30px;
                // font-size: 15px;
                line-height: 30px;

                i {
                    font-size: 30px;
                }

                span {
                    display: inline-block;
                    font-size: 20px;
                    line-height: 30px;
                }

                i:hover {
                    color: red;
                }
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
            min-width: 1100px;
            margin: auto;

            li {
                display: inline-block;
                width: 20%;
                margin-bottom: 20px;

                .image {
                    img {
                        width: 200px;
                        border-radius: 10px;
                    }
                }

                .title {
                    text-align: center;
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
</style>
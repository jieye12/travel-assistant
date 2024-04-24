<template>
  <div class="all" v-if="load">
    <h1>热门景点推荐</h1>
    <div class="lists">
      <ul>
        <li v-for="item in cities" :key="item.id" @click="turnToAttractionDetail()">
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
      <span @click="turnToAttractionPage()">查看更多</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// import { reqPopularCityRankings } from '@/api/attractions/index'
import useCityAndAttractionStore from '@/store/cityAndAttraction';
const cityStore = useCityAndAttractionStore()
const router = useRouter()
const cities = ref()
const load = ref(false)
onMounted(async () => {
  cities.value = cityStore.getAttractions
  load.value = true
  await nextTick()
})
const turnToAttractionDetail = () => {
  router.push("/attraction_details")
}
const turnToAttractionPage = () => {
  router.push("/attraction_page")
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
<!-- <template>
  <div class="all">
    <h1>热门景点推荐</h1>
    <div class="main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="名山大川" name="mountainAndRiver">
          <layout></layout>
        </el-tab-pane>
        <el-tab-pane label="江河湖泊" name="riverAndLake">
          <layout></layout>
        </el-tab-pane>
        <el-tab-pane label="城市建筑" name="citybuilding">
          <layout></layout>
        </el-tab-pane>
        <el-tab-pane label="小镇古寨" name="townAndVillage">
          <layout></layout>
        </el-tab-pane>
        <el-tab-pane label="名胜古迹" name="celebritiesAndMonument">
          <layout></layout>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

import Layout from '@/components/Layout/index.vue'

const activeName = ref('mountainAndRiver')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>
<style lang="scss" scoped>
.all {
  h1 {
    text-align: center;
    margin: 10px 0 20px;
  }
}
</style> -->
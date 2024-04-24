<template>
  <div class="all">
    <div class="top">
      <div class="search">
        <input v-model="cityName" placeholder="请输入城市名称" type="text">
        <button @click="search()">搜索</button>
      </div>
    </div>
    <div class="shows">
      <ul>
        <li v-for="city in cities" :key="city.id" @click="turnToCityDetails(city.id)">
          <div class="left">
            <img :src="city.imageUrl" alt="">
          </div>
          <div class="right">
            <div class="city">{{ city.name }}</div>
            <div class="rating">
              <span class="rate">当前热度：</span>
              <span>{{ city.popular }}</span>
            </div>
            <div class="attractions">
              <span class="recommend">推荐：</span>
              <span v-for="item in city.attractions" :key="item.id">
                {{ item.attraction }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getMoreCity, getCityByName } from '@/api/attractions/index'
import { useRouter } from 'vue-router'
import useCityAndAttractionStore from '@/store/cityAndAttraction';
const cityStore = useCityAndAttractionStore()
const router = useRouter()
const cities = ref()
onMounted(async () => {
  const res = await getMoreCity(0)
  cities.value = res.data
})
const cityName = ref("")
const search = async () => {
  const res = await getCityByName(cityName.value)
  cities.value = res.data
  nextTick()
}
const turnToCityDetails = (id: number) => {
  cityStore.saveCityId(id)
  router.push("/city_details")
}
</script>
<style lang="scss" scoped>
.all {
  width: 60%;
  margin: 0 auto;

  .top {
    .search {
      margin: 10px auto;
      width: 650px;

      input {
        height: 20px;
        padding: 20px 0;
        width: 500px;
        display: inline-block;
        border: 1px solid #28b76c;
        font-size: 15px;
        text-indent: 31px;
        outline: none;
        vertical-align: middle;
        border-radius: 5px;
      }

      button {
        display: inline-block;
        width: 140px;
        height: 60px;
        line-height: 60px;
        background-color: #28b76c;
        border: 1px solid #28b76c;
        vertical-align: middle;
        border-radius: 5px;
        font-size: 15px;
      }
    }
  }

  .shows {
    li {
      display: flex;

      .left {
        img {
          width: 400px;
          border-radius: 10px;
        }
      }

      .right {
        width: 50%;
        padding: 50px 0;

        .city {
          text-align: center;
          font-weight: 700;
          font-size: 20px;
        }

        .rating {
          padding-left: 20px;

          span {
            display: inline-block;
            margin: 5px 10px;
            font-style: italic;
            color: #c3c3c3;
          }

          .rate {
            font-weight: 700;
            color: black;
          }
        }

        .attractions {
          padding-left: 20px;

          span {
            display: inline-block;
            margin: 0 10px;
          }

          .recommend {
            font-weight: 700;
            color: red;
          }
        }
      }
    }
  }
}
</style>
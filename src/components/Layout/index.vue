<template>
  <div>
    <div class="lists">
      <div class="left" @click="turnToAttractionDetails()">
        <img :src="leftImg.imgUrl" alt="">
        <div class="title">{{ leftImg.name }}</div>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item, index) in rightImg" :key="index" @click="turnToAttractionDetails()">
            <img :src="item.imgUrl" alt="">
            <div class="title">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="more">
      <span @click="turnToAttractionPage()">查看更多</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { reqPopularAttractionRankings } from '@/api/attractions/index'
// import useCityAndAttractionStore from '@/store/cityAndAttraction'
// const useAttraction = useCityAndAttractionStore()
// const mountainAndRiver = ref()
const leftImg = ref()
const rightImg = ref()
// const load = ref(false)
// onMounted(async () => {
//   // mountainAndRiver.value = useAttraction.getAttractions
//   // leftImg.value = ref(mountainAndRiver.value[0])
//   // rightImg.value = ref(mountainAndRiver.value.splice(1))
//   const res = await reqPopularAttractionRankings()
//   mountainAndRiver.value = res.data
//   leftImg.value = ref(mountainAndRiver.value[0])
//   rightImg.value = ref(mountainAndRiver.value.splice(1))
//   load.value = true
// })
import Changbaishan from '@/assets/images/attractions/changbaishan.jpg'
import Huashan from '@/assets/images/attractions/huashan.jpg'
import Laojunshan from '@/assets/images/attractions/laojunshan.jpg'
import Emeishan from '@/assets/images/attractions/emeishan.jpg'
import Taishan from '@/assets/images/attractions/taishan.jpeg'
import Hengshan from '@/assets/images/attractions/hengshan.jpg'
import Songshan from '@/assets/images/attractions/songshan.jpeg'
const mountainAndRiver = ref([
  {
    id: 1,
    name: "长白山",
    imgUrl: Changbaishan,
    // 白山市
  },
  {
    id: 2,
    name: "华山",
    imgUrl: Huashan,
    // 渭南市
  },
  {
    id: 3,
    name: "老君山",
    imgUrl: Laojunshan,
    // 洛阳
  },
  {
    id: 4,
    name: "峨眉山",
    imgUrl: Emeishan,
    // 乐山
  },
  {
    id: 5,
    name: "泰山",
    imgUrl: Taishan,
    // 泰安
  },
  {
    id: 6,
    name: "衡山",
    imgUrl: Hengshan,
    // 衡阳
  },
  {
    id: 7,
    name: "嵩山",
    imgUrl: Songshan,
    // 郑州
  }
])
leftImg.value = ref(mountainAndRiver.value[0])
rightImg.value = ref(mountainAndRiver.value.splice(1))
const router = useRouter()
// 名山大川

const turnToAttractionDetails = () => {
  router.push("/attraction_details")
}
const turnToAttractionPage = () => {
  router.push("/attraction_page")
}
// 江河湖泊
// 城市建筑
// 小镇古寨
// 名胜古迹
</script>
<style lang="scss" scoped>
.lists {
  display: flex;

  .left {
    width: 40%;
    box-sizing: border-box;
    padding: 2px 0;

    img {
      width: 100%;
      height: 388px;
    }
  }

  .right {
    width: 60%;

    ul {
      li {
        display: inline-block;
        width: 33%;
        box-sizing: border-box;
        padding: 2px 5px;

        img {
          width: 100%;
          height: 180px;
        }
      }
    }
  }

  .title {
    text-align: center;
    font-size: 20px;
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
</style>
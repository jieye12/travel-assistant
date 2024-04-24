<template>
  <div class="all">
    <div class="top">
      <div class="search">
        <input v-model="searchAttraction" placeholder="请输入景点名称" type="text">
        <button @click="search()">搜索</button>
      </div>
    </div>
    <div class="shows">
      <ul>
        <li v-for="(attraction, index) in attractions" :key="index" @click="turnToAttractionDetails()">
          <div class="left">
            <img :src="attraction.imageUrl" alt="">
          </div>
          <div class="right">
            <div class="name">{{ attraction.name }}</div>
            <div class="city">{{ attraction.city }}</div>
            <div class="rating">
              <span class="rate">当前热度：</span>
              <span>{{ attraction.popular }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMoreAttractions, getAttractionByName } from '@/api/attractions';
import { useRouter } from 'vue-router'
const router = useRouter()
const attractions = ref()
onMounted(async () => {
  const res = await getMoreAttractions(10, "名胜古迹")
  console.log(res);
  attractions.value = res.data
})
const searchAttraction = ref("")
const search = async () => {
  const res = await getAttractionByName(searchAttraction.value)
  console.log(res);
  attractions.value = res.data
}
const turnToAttractionDetails = () => {
  router.push("/attraction_details")
}
</script>
<style lang="scss" scoped>
.all {
  width: 60%;
  margin: 0 auto;

  .top {
    .search {
      margin: 10px auto 20px;
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
        padding: 10px 0;

        .name {
          text-align: center;
          font-weight: 700;
          font-size: 20px;
        }

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
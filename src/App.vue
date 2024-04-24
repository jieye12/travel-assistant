<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import useCityAndAttractionStore from '@/store/cityAndAttraction'
import { reqPopularAttractionRankings, reqPopularCityRankings } from '@/api/attractions/index'
const cityAndAttraction = useCityAndAttractionStore()
const router = useRouter()
const init = async () => {
  const popularAttractions = await reqPopularAttractionRankings()
  const popularCities = await reqPopularCityRankings()
  cityAndAttraction.saveCities(popularCities.data)
  cityAndAttraction.saveAttractions(popularAttractions.data)
}
onMounted(async () => {
  init()
  await nextTick()
  router.push("/login")
})
</script>
<style scoped></style>

<template>
  <div class="all" v-if="a">
    <h1>文章详情页</h1>
    <div class="content">
      {{ details.context }}
    </div>
    <div class="bottom">
      <el-tag type="info">
        {{ details.tags }}
      </el-tag>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { reqGetArticleDetail } from '@/api/forum/index'
import useArticle from '@/store/article.ts'
const articleStore = useArticle()
const details = ref("")
const a = ref(false)
onMounted(async () => {
  let id = articleStore.getArticleId
  const res = await reqGetArticleDetail(id)
  console.log(res);
  details.value = res.data
  nextTick()
  a.value = true
})
</script>
<style lang="scss" scoped>
.all {
  width: 70%;
  margin: 0 auto;
  background-color: aqua;
  min-height: 800px;
}
</style>
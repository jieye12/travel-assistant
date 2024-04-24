<template>
  <div class="container">
    <div class="all">
      <div class="search">
        <div class="in">
          <input type="text" placeholder="输入要搜索的文章信息" v-model="articleInfo">
        </div>
      </div>
      <div class="articles">
        <ul>
          <li v-for="(article, index) in  articles " :key="article.id" @click="turnToArticleDetails(article.id)">
            <div class="top">
              <img :src="avatarArr[index % 5]" alt="">
              <span>{{ article.user.username }}</span>
              <span>{{ article.createTime }}</span>
            </div>
            <div class="main">
              <div class="left">
                <div class="title">{{ article.forumName }}</div>
                <div class="sketch">{{ article.desc }}</div>
                <div class="type">

                  <el-tag type="info" v-for="item in article.tags[0].split(' ')">
                    {{ item }}
                  </el-tag>
                </div>
              </div>
              <div class="right">
                <img :src="article.imgUrl" alt="">
              </div>
            </div>
            <!--  -->
          </li>
        </ul>
      </div>
    </div>
    <div class="fixed">
      <div class="publish">
        <i class="iconfont icon-qufabu" title="去发布" @click="turnToPublish()"></i>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Avatar1 from '@/assets/images/avatar/avatar1.jpg'
import Avatar2 from '@/assets/images/avatar/avatar2.jpg'
import Avatar3 from '@/assets/images/avatar/avatar3.png'
import Avatar4 from '@/assets/images/avatar/avatar4.jpeg'
import Avatar5 from '@/assets/images/avatar/avatar5.jpg'
import useArticle from '@/store/article.ts'
const articleStore = useArticle()
import { useRouter } from 'vue-router'
import { reqGetArticle } from '@/api/forum/index'
const avatarArr = ref([Avatar1, Avatar2, Avatar3, Avatar4, Avatar5])
const router = useRouter()
const turnToArticleDetails = (id: number) => {
  articleStore.saveArticleId(id)
  router.push("/articel_details")
}
const turnToPublish = () => {
  router.push("/publish")
}
const articles = ref<[]>()
onMounted(async () => {
  const res = await reqGetArticle(0, 0)
  console.log(res);
  articles.value = res.data.forums
})
const articleInfo = ref("")

</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 70%;
  margin: 20px auto;
  // background-color: aqua;

  .all {
    width: 80%;
    margin: 10px auto;

    .search {
      text-align: center;
      display: flex;
      align-items: center;
      color: #c3c3c3;
      // margin-left: 200px;
      margin: 20px 0 20px 200px;

      .in {
        white-space: nowrap;

        input {
          height: 10px;
          outline: none;
          display: inline-block;
          padding: 10px 10px;
          border-radius: 15px 0 0 15px;
          border: 1px solid #c3c3c3;
          line-height: 30px;
          vertical-align: middle;
          font-size: 12px;
        }

        input::-webkit-input-placeholder {
          color: #c3c3c3;
          font-style: italic;
        }
      }

      .in::after {
        white-space: nowrap;
        content: "搜索";
        display: inline-block;
        height: 30px;
        width: 50px;
        border-radius: 0 15px 15px 0;
        line-height: 30px;
        color: red;
        vertical-align: middle;
        border: 1px solid #c3c3c3;
        border-left: none;
      }

      .publish {
        span {
          padding: 5px 20px;
          display: inline-block;
          border: 1px solid #c3c3c3;
          height: 20px;
          margin-left: 500px;
          background-color: aquamarine;
        }
      }
    }

    .articles {
      ul {
        li {
          .top {
            line-height: 40px;

            img {
              display: inline-block;
              width: 40px;
              border-radius: 50%;
              vertical-align: middle;
            }

            span {
              display: inline-block;
              margin: 0 50px 0 20px;
              font-size: 12px;
            }

          }

          .main {
            display: flex;
            padding-left: 50px;
            margin: 10px 0;

            .left {
              // width: 60%;
              width: 500px;

              .title {
                font-weight: 700;
                font-size: 15px;
              }

              .sketch {
                text-indent: 2em;
                line-height: 20px;
                font-size: 12px;
                color: #c3c3c3;
                white-space: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }

              .type {
                .el-tag {
                  display: inline-block;
                  height: 20px;
                  line-height: 20px;
                  margin: 5px 10px;
                  vertical-align: middle;

                  .el-tag__content {
                    display: inline-block;
                    height: 30px;
                  }
                }
              }
            }

            .right {
              margin: 5px 0 0 20px;

              img {
                height: 100px;
              }
            }
          }
        }
      }
    }
  }

  .fixed {
    position: absolute;
    top: 50px;
    right: 50px;

    .publish {
      i {
        display: inline-block;
        font-size: 40;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        background-color: aliceblue;
      }

    }
  }
}
</style>
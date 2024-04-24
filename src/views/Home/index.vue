<template>
    <div class="all">
        <div class="top">
            <div class="nav">
                <el-menu :default-active="activeMenu" router mode="horizontal" unique-opened active-text-color="red">
                    <menuItem :menuList="menuList">
                    </menuItem>
                </el-menu>
            </div>
            <div class="personal">
                <div class="notLogged" v-if="!loginState">
                    <span>
                        <router-link to="/login">登录 | 注册</router-link>
                    </span>
                </div>
                <div class="logged" v-else>
                    <div class="avatar">
                        <img src="../../assets/images/avatar/avatar1.jpg" alt="">
                    </div>
                    <div class="nickName">
                        <router-link to="/personal_center">jieye</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <footer>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStateStore } from '@/store';
import menuItem from '@/components/Menu/index.vue'
import { storeToRefs } from 'pinia';
// 

const activeMenu = computed(() => {
    const router = useRouter()
    const { meta, path } = router.currentRoute.value
    if (meta.matchPath2) {
        return meta.matchPath2
    }
    else {
        return path
    }
})
// 
const login = useLoginStateStore()
const { loginState } = storeToRefs(login)
// 导航栏各栏绑定一个仓库的共享值，route.meta中确定该值
const menuList = [
    {
        title: "首页",
        path: "/attractions",
    },

    // {
    //     title: "计划制定",
    //     path: "/plan_formulation",
    //     children: [
    //         {
    //             title: "我的计划",
    //             path: "/my_plan"
    //         },
    //         {
    //             title: "个人制作",
    //             path: "/personal_production"
    //         },
    //         {
    //             title: "echarts图表测试",
    //             path: "/test"
    //         },
    //         {
    //             title: "@antv/x6",
    //             path: "/test2"
    //         },
    //         {
    //             title: "路径测试图",
    //             path: "/path_test"
    //         }, {
    //             title: "最终版本",
    //             path: '/last'
    //         }
    //     ]
    // },
    {
        title: "My Plan",
        path: "/my_plan"
    },
    {
        title: "自制路径图",
        path: "/test2"
    },
    {
        title: "社区论坛",
        path: "/forum"
    },
]
</script>

<style lang="scss" scoped>
.all {
    width: 100%;

    .top {
        // background-color: $nav_background_color;
        color: #fff;
        width: 100%;
        height: $nav_height;
        line-height: $nav_height;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        // border-bottom: 1px solid #dcdfe6;

        .nav {
            width: 50%;

            .el-menu {
                display: flex;
                text-align: center;
                justify-content: space-between;
                // justify-content: center;
                --el-menu-hover-text-color: red;
                // --el-menu-hover-bg-color:#000000;
                border: none;
                // background-color: $nav_background_color;
                height: $nav_height;
                color: #fff;
            }
        }

        .personal {
            .notLogged {
                span {
                    display: inline-block;
                    margin: 0 8px;
                }
            }

            .logged {
                display: flex;

                .avatar {
                    img {
                        height: $nav_height;
                        border-radius: 50%;
                    }
                }

                .nickName {
                    margin-left: 20px;
                }
            }
        }
    }

    .main {
        max-height: 80%;
        min-height: calc(100vh - $nav_height);
        padding-top: 10px;
    }

    footer {
        width: 100%;
        height: 100px;
        background-color: $nav_background_color;

        .active {
            color: red;

        }
    }
}
</style>
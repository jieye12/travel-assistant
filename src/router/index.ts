import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import("@/views/Home/index.vue")
// 登录注册
const Login = () => import("@/views/Login/index.vue")
// 首页--城市/景点
const Attractions = () => import("@/views/Attractions/index.vue")
const CityPage = () => import("@/views/Attractions/CityPage/index.vue")
const AttractionPage = () => import("@/views/Attractions/AttractionPage/index.vue")
const CityDetails = () => import("@/views/Attractions/CityDetails/index.vue")
const AttractionDetails = () => import("@/views/Attractions/AttractionDetails/index.vue")
// 论坛
const Forum = () => import("@/views/Community/Forum/index.vue")
const ArticleDetails = () => import("@/views/Community/Forum/Details/index.vue")
// const Publish = () => import("@/views/Community/Publish/index.vue")
// 计划
const MyPlan = () => import("@/views/PlanFormulation/MyPlan/index.vue")
const PersonalProduction = import("@/views/PlanFormulation/PersonalProduction/index.vue")
const Test = () => import("@/views/PlanFormulation/EchartsTest/index.vue")
const Test2 = () => import("@/views/PlanFormulation/Test/index.vue")
const PathTest = () => import("@/views/PlanFormulation/Path/index.vue")
const Last = () => import("@/views/PlanFormulation/Last/index.vue")
// 个人页
// const PersoanlCenter = () => import("@/views/PersonalCenter/index.vue")
// const Information = () => import("@/views/PersonalCenter/Information/index.vue")
// const Records = () => import("@/views/PersonalCenter/Records/index.vue")
// 
const Screen = () => import("@/views/Screen/index.vue")
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            children: [
                // 首页
                {
                    path: "/attractions",
                    component: Attractions,
                    meta: {
                        nav: "attractions"
                    }
                },
                {
                    path: "/city_page",
                    component: CityPage,
                    meta: {
                        nav: "attractions"
                    }
                },
                {
                    path: "/attraction_page",
                    component: AttractionPage,
                    meta: {
                        nav: "attractions"
                    }
                },
                {
                    path: "/city_details",
                    component: CityDetails,
                    meta: {
                        nav: "attractions"
                    }
                },
                {
                    path: "/attraction_details",
                    component: AttractionDetails,
                    meta: {
                        nav: "attractions"
                    }
                },
                // 社区
                {
                    path: "/forum",
                    component: Forum,
                    meta: {
                        nav: "community",
                    }
                },
                {
                    path: "/articel_details",
                    component: ArticleDetails,
                },
                // {
                //     path: "/publish",
                //     component: Publish,
                //     meta: {
                //         nav: "community",
                //     }
                // },
                //计划
                {
                    path: "/my_plan",
                    component: MyPlan,
                    meta: {
                        nav: "plan",
                    }
                },
                {
                    path: "/test",
                    component: Test,
                    meta: {
                        nav: "plan",
                    }
                },
                // 个人中心
                // {
                //     path: "/personal_center",
                //     component: PersoanlCenter,
                //     children: [
                //         {
                //             path: "/information",
                //             component: Information,
                //             meta: {
                //                 nav: "personal"
                //             }
                //         },
                //         {
                //             path: "/records",
                //             component: Records,
                //             meta: {
                //                 nav: "personal"
                //             }
                //         },
                //     ]
                // },
            ]
        },
        // 登录
        {
            path: "/login",
            component: Login,
            meta: {
                nav: "login"
            }
        },
        // 画图界面
        {
            path: "/personal_production",
            component: PersonalProduction,
            meta: {
                nav: "plan",
            }
        },
        {
            path: "/test2",
            component: Test2
        },
        {
            path: "/path_test",
            component: PathTest
        },
        {
            path: "/last",
            component: Last
        },
        {
            path: "/screen",
            component: Screen
        }
    ]
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (token) {
        next();
    }
    else {
        const nextRouter = [
            '/',
            '/login',
            '/attractions',
            '/city_page',
            '/attraction_page',
            '/city_details',
            '/attraction_details',
            '/forum',
            '/persona;_production',
            '/test2',
            '/path_test',
        ]
        if (nextRouter.includes(to.path)) {
            next();
        }
        else {
            next({
                path: '/login',
                query: { from: to.path }
            })
        }
    }
})
export default router
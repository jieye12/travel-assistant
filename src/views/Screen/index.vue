<template>
    <div class="all">
        <div class="left">
            <div class="city" ref="city"></div>
        </div>
        <div class="center">
            <div class="echarts map" id="relation" ref="map"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
// import ava from '@/assets/images/avatar.jpg'
import chinaJson from './Map/china.json'
import shanxiJson from './Map/shanxi.json'
import henanJson from './Map/henan.json'
// import xianJson from './Map/xian.json'
// import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { useRouter } from 'vue-router'
import { reqGetPlan } from '@/api/plan/index'

const router = useRouter()
echarts.registerMap("china", chinaJson as any)
const city = ref()
const map = ref()
const myMap = ref()
const timeFn = ref();
const provinces = ref({
    '陕西': shanxiJson,
    '河南': henanJson,
})
const initLeft = () => {
    const leftData: any = [
        {
            city: "西安",
            value: 3500,
        },
        {
            city: "北京",
            value: 3200,
        }, {
            city: "上海",
            value: 3100,
        }, {
            city: "广州",
            value: 3100,
        }, {
            city: "深圳",
            value: 3000,
        }, {
            city: "杭州",
            value: 2900,
        }, {
            city: "重庆",
            value: 2800,
        }, {
            city: "成都",
            value: 2700,
        }, {
            city: "哈尔滨",
            value: 2600,
        }, {
            city: "大连",
            value: 2500,
        }, {
            city: "郑州",
            value: 2400,
        }, {
            city: "拉萨",
            value: 2400,
        }, {
            city: "兰州",
            value: 2300,
        }, {
            city: "郑州",
            value: 2200,
        }, {
            city: "洛阳",
            value: 2000,
        }, {
            city: "广东",
            value: 1000,
        }, {
            city: "宁夏",
            value: 800,
        }, {
            city: "长沙",
            value: 600,
        }, {
            city: "宁夏",
            value: 400,
        }, {
            city: "福州",
            value: 200,
        },
    ]
    const cities: any = []
    const values: any = []
    for (let i = leftData.length - 1; i >= 0; i--) {
        cities.push(leftData[i].city)
        values.push(leftData[i].value)
    }
    let myCity = echarts.init(city.value)
    let cityOption: any = {
        grid: {
            x: 20,
            y: 20,
            x2: 20,
            y2: 50,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            splitLine: {    //分割线
                show: false,
                lineStyle: {
                    color: '#5e97b5',
                    width: 1,
                    opacity: .5,
                }
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#5e97b5',  //更改坐标轴文字颜色
                    fontSize: 12      //更改坐标轴文字大小
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#5e97b5' //更改坐标轴颜色
                }
            }
            // 

        },
        yAxis: {
            splitLine: { show: false },
            data: cities,
            // data: ['陕西', '河南', '北京', '上海', '广州', '深圳', '广东', '四川', '重庆', '浙江'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',  //更改坐标轴文字颜色
                    fontSize: 12      //更改坐标轴文字大小
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#5e97b5' //更改坐标轴颜色
                }
            }
        },
        series: [{
            name: 'bar',
            type: 'bar',
            barWidth: 15,
            top: 0,
            // bottom: 50,
            itemStyle: {
                normal: {
                    barBorderRadius: 15,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#4cfdf7' },
                            { offset: 1, color: '#2a72eb' }
                        ]
                    )
                }
            },
            // data: [650, 700, 800, 900, 1000, 1200, 1300, 1400, 1500, 1600]
            data: values
        }]
    }
    myCity.setOption(cityOption)
    myCity.on('click', (params) => {
        console.log(params);
        router.push("/attractions")
    })
}
const loadMap = (mapCode: any, name: any) => {
    echarts.registerMap(name, mapCode);
    let option: any = {
        geo: {
            map: name,
            roam: true,
            left: 40,
            top: 80,
            bottom: 20,
            right: 20,
            label: {
                show: true,
                color: "white",
                fontSize: 14
            },
            itemStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "#022960",
                        },
                        {
                            offset: 1,
                            color: "#023481"
                        }
                    ],
                    global: false
                },
                borderColor: "#179FCB",
                shadowColor: "rgba(23,159,203,0.5)",
                shadowBlur: 17,
            },
            emphasis: {
                itemStyle: {
                    color: "#1369CD",
                },
                label: {
                    color: "#82B9F8",
                }
            },
        },
        tooltip: {
            show: true,
            formatter: (params: any) => {
                return `${params.name}`
                // params.name + ':' + params.value
                // params.data['value']
            }
        },
        series: [
            // 西安-》北京
            // 西安-》杭州
            // 北京-》白山
            {
                type: "lines",
                effect: {
                    show: true,
                    symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                    period: 6,
                    trailLength: 0,
                    symbolSize: 16,
                    color: "#ff8800",
                },
                data: [
                    {
                        coords: [
                            [108.946306, 34.347436],
                            [116.405285, 39.904989]
                        ],
                        lineStyle: {
                            color: "white",
                            // type: "dashed",
                            curveness: 0.1,
                            opacity: 0.9
                        }
                    }
                ]
            },
            {
                type: "lines",
                effect: {
                    show: true,
                    symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                    period: 6,
                    trailLength: 0,
                    symbolSize: 16,
                    color: "#ff8800",
                },
                data: [
                    {
                        coords: [
                            [108.946306, 34.347436],
                            [120.161693, 30.280059]
                        ],
                        lineStyle: {
                            color: "white",
                            // type: "dashed",
                            curveness: 0.1,
                            opacity: 0.9
                        }
                    }
                ]
            },
            {
                type: "lines",
                effect: {
                    show: true,
                    symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                    period: 6,
                    trailLength: 0,
                    symbolSize: 16,
                    color: "#ff8800",
                },
                data: [
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [126.427839, 41.942505]
                        ],
                        lineStyle: {
                            color: "white",
                            // type: "dashed",
                            curveness: 0.1,
                            opacity: 0.9
                        }
                    }
                ]
            },
            // 北京
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    // brushType: "fill",
                    scale: 4,
                },
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        offset: [5, 0]
                    }
                },
                symbol: "circle",
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        show: false,
                        // color: "#E0C896",
                        color: '#00ff00'
                    }
                },
                data: [
                    {
                        value: [116.405285, 39.904989]
                    }
                ]
            },
            // 白山
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4,
                },
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        offset: [5, 0]
                    }
                },
                symbol: "circle",
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        // color: "#E0C896",
                        color: '#00ff00'
                    }
                },
                data: [
                    {
                        value: [126.427839, 41.942505],
                    }
                ]
            },
            // 西安
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4,
                },
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        offset: [5, 0]
                    }
                },
                symbol: "circle",
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        // color: "#E0C896",
                        color: '#ff0000'
                    }
                },
                data: [
                    {
                        value: [108.946306, 34.347436]
                    }
                ]
            },
            // 杭州
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4,
                },
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        offset: [5, 0]
                    }
                },
                symbol: "circle",
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        // color: "#E0C896",
                        color: '#00ff00'
                    }
                },
                data: [
                    {
                        value: [120.161693, 30.280059]
                    }
                ]
            },
        ]
    };
    myMap.value.setOption(option)
    // }
}
onMounted(async () => {
    const res = await reqGetPlan(4)
    console.log(res);

    // 左侧柱状图
    initLeft()
    // 地图
    myMap.value = echarts.init(map.value)
    loadMap(chinaJson, 'china')
    myMap.value.on('click', (params: any) => {
        console.log("进入下一级地图");
        clearTimeout(timeFn.value);
        timeFn.value = setTimeout(function () {
            let name: keyof typeof Object = params.name
            let mapCode: any = (provinces.value as any)[name]
            if (!mapCode) {
                return
            }
            loadMap(mapCode, name)
        })
    })
    myMap.value.on('dblclick', () => {
        clearTimeout(timeFn.value)
        loadMap(chinaJson, 'china')
    })
    // myMap.value.setOption({
    //     geo: {
    //         map: "china",
    //         // roam: true,
    //         left: 40,
    //         top: 80,
    //         bottom: 20,
    //         right: 20,
    //         label: {
    //             show: true,
    //             color: "white",
    //             fontSize: 14
    //         },
    //         itemStyle: {
    //             color: {
    //                 type: "linear",
    //                 x: 0,
    //                 y: 0,
    //                 x2: 0,
    //                 y2: 1,
    //                 colorStops: [
    //                     {
    //                         offset: 0,
    //                         color: "#022960",
    //                     },
    //                     {
    //                         offset: 1,
    //                         color: "#023481"
    //                     }
    //                 ],
    //                 global: false
    //             },
    //             borderColor: "#179FCB",
    //             shadowColor: "rgba(23,159,203,0.5)",
    //             shadowBlur: 17,
    //         },
    //         emphasis: {
    //             itemStyle: {
    //                 color: "#1369CD",
    //             },
    //             label: {
    //                 color: "#82B9F8",
    //             }
    //         },
    //     },
    //     series: [
    //         {
    //             type: "lines",
    //             effect: {
    //                 show: true,
    //                 symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
    //                 period: 6,
    //                 trailLength: 0,
    //                 symbolSize: 16,
    //                 color: "#ff8800",
    //             },
    //             data: [
    //                 {
    //                     coords: [
    //                         [116.405285, 39.904989],
    //                         [119.306239, 26.075302]
    //                     ],
    //                     lineStyle: {
    //                         color: "white",
    //                         type: "dashed",
    //                         curveness: 0.1
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             type: "effectScatter",
    //             coordinateSystem: "geo",
    //             zlevel: 2,
    //             rippleEffect: {
    //                 period: 4,
    //                 brushType: "stroke",
    //                 scale: 4,
    //             },
    //             label: {
    //                 normal: {
    //                     show: false,
    //                     position: "right",
    //                     offset: [5, 0]
    //                 }
    //             },
    //             symbol: "circle",
    //             symbolSize: 10,
    //             itemStyle: {
    //                 normal: {
    //                     color: "#E0C896",
    //                 }
    //             },
    //             data: [
    //                 {
    //                     value: [116.405285, 39.904989]
    //                 }
    //             ]
    //         },
    //         {
    //             type: "effectScatter",
    //             coordinateSystem: "geo",
    //             zlevel: 2,
    //             rippleEffect: {
    //                 period: 4,
    //                 brushType: "stroke",
    //                 scale: 4,
    //             },
    //             label: {
    //                 normal: {
    //                     show: false,
    //                     position: "right",
    //                     offset: [5, 0]
    //                 }
    //             },
    //             symbol: "circle",
    //             symbolSize: 10,
    //             itemStyle: {
    //                 normal: {
    //                     color: "#E0C896",
    //                 }
    //             },
    //             data: [
    //                 {
    //                     value: [119.306239, 26.075302]
    //                 }
    //             ]
    //         },
    //     ]
    // })

})
// 文章部分
// const articles = ref([
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 2,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 3,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,

//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,

//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },
//     {
//         id: 1,
//         avatar: ava,
//         content: "陕西承诺书纪念币被读后VB的是VB覅就看见发你的",
//         line: 0,
//     },

// ])
// const turnToForum = () => {
//     router.push("/forum")
// }
</script>
<style lang="scss" scoped>
.all {
    display: flex;
    // height: 100vh;
    min-height: 100vh;
    background-color: #013954;
    // background-color: #031c24;

    .left {
        // min-width: 600px;
        width: 35%;
        // background-color: #031c24;

        .city {
            margin-top: 5%;
            height: 90%;
            // background-color: #031c24;
        }

    }

    .center {
        flex: 1;
        // min-width: 800px;
        // height: 80%;
        // background-color: #031c24;

        .map {
            height: 100%;
        }
    }

    // .right {
    //     width: 300px;
    //     // height: 90%;

    //     .article {
    //         background-color: #031c24;
    //         margin-top: 10%;
    //         height: 400px;
    //         // position: relative;
    //         // height: 80%;
    //         overflow: hidden;

    //         .item {
    //             display: flex;
    //             margin: 20px 0;
    //             justify-content: space-between;

    //             .avatar {
    //                 img {
    //                     width: 40px;
    //                     border-radius: 50%;
    //                 }
    //             }

    //             .content {
    //                 width: 210px;
    //                 overflow: hidden;
    //                 text-overflow: ellipsis;
    //                 white-space: nowrap;
    //                 color: #ffffff;
    //                 font-size: 12px;
    //                 line-height: 40px;
    //             }

    //         }
    //     }
    // }
}
</style>
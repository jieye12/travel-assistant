<template>
    <div class="all">
        <div class="echarts" id="relation" style="width:100%;height:1000px;" ref="map"></div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJson from '../Path/china.json'
echarts.registerMap("china", chinaJson as any)
const map = ref()
onMounted(() => {
    let myMap = echarts.init(map.value, 'dark')
    myMap.setOption({
        geo: {
            map: "china",
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
        series: [
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
                            [119.306239, 26.075302]
                        ],
                        lineStyle: {
                            color: "white",
                            type: "dashed",
                            curveness: 0.1
                        }
                    }
                ]
            },
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
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: "#E0C896",
                    }
                },
                data: [
                    {
                        value: [116.405285, 39.904989]
                    }
                ]
            },
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
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: "#E0C896",
                    }
                },
                data: [
                    {
                        value: [119.306239, 26.075302]
                    }
                ]
            },
        ]
    })
})
// 注册大地图->个省份中心店信息-》 各省份数据（鼠标悬浮展示）->
</script>
<style lang="scss" scoped></style>
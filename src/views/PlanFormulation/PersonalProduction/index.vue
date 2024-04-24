<template>
    <div>
        <div class="echarts" id="relation" style="width:100%;height:1000px;"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
const data = [
    // 主路径
    {
        name: "主路径",
        tooltip: {
            formatter: "旅行主路径"
        },
        symbolSize: 0.1,
        value: [1000, 620],
        x: 800,
        y: 400,
        fixed: true,
        draggable: true,
        category: 1,
        label: {
            color: "#35c2ff",
            position: 'bottom',
            fontSize: 26,
            fontWeight: 1000
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    // 城市路径标题
    {
        name: "西安路径",
        tooltip: {
            formatter: "城市路径---西安"
        },
        symbolSize: 0.1,
        value: [300, 1000],
        x: 800,
        y: 400,
        fixed: true,
        draggable: true,
        category: 2,
        label: {
            color: "#B340FF",
            position: 'bottom',
            fontSize: 20,
            fontWeight: 1000
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "北京路径",
        tooltip: {
            formatter: "城市路径---北京"
        },
        symbolSize: 0.1,
        value: [600, 300],
        x: 800,
        y: 400,
        fixed: true,
        draggable: true,
        category: 2,
        label: {
            color: "#40FF43",
            position: 'bottom',
            fontSize: 20,
            fontWeight: 1000
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "乐山路径",
        tooltip: {
            formatter: "城市路径---乐山"
        },
        symbolSize: 0.1,
        value: [900, 950],
        x: 800,
        y: 400,
        fixed: true,
        draggable: true,
        category: 2,
        label: {
            color: "#FF4640",
            position: 'bottom',
            fontSize: 20,
            fontWeight: 1000
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "杭州路径",
        tooltip: {
            formatter: "城市路径---杭州"
        },
        symbolSize: 0.1,
        value: [0, 150],
        x: 800,
        y: 400,
        fixed: true,
        draggable: true,
        category: 2,
        label: {
            color: "#001EFF",
            position: 'bottom',
            fontSize: 20,
            fontWeight: 1000
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    // 城市路径
    {
        name: "西安",
        tooltip: {
            formatter: "{b}: 19999<br />"
        },
        symbol: 'circle',
        symbolSize: [40, 40],
        value: [300, 600],
        x: 800,
        y: 400,
        fixed: true,
        // draggable: false,
        category: 3,
        label: {
            color: "#FFF",
            position: 'bottom',
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#ff0000"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "杭州",
        tooltip: {
            formatter: "{b}: 19999<br />"
        },
        symbol: 'circle',
        symbolSize: [20, 20],
        value: [0, 600],
        x: 800,
        y: 400,
        fixed: true,
        // draggable: false,
        category: 3,
        label: {
            color: "#FFF",
            position: 'bottom',
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#ffffff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "北京",
        tooltip: {
            formatter: "{b}: 19999<br />"
        },
        symbol: 'circle',
        symbolSize: [28, 28],
        value: [600, 600],
        x: 800,
        y: 400,
        fixed: true,
        // draggable: false,
        category: 3,
        label: {
            color: "#FFF",
            position: 'bottom',
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#000000"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "白山",
        tooltip: {
            formatter: "{b}: 19999<br />"
        },
        symbol: 'circle',
        symbolSize: [30, 30],
        value: [900, 600],
        x: 800,
        y: 400,
        fixed: true,
        // draggable: false,
        category: 3,
        label: {
            color: "#FFF",
            position: 'bottom',
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#000000"
                },
                {
                    offset: 1,
                    color: "#f1f1f1"
                }
                ])
            }
        }
    },
    // 景点路径
    // 西安
    {
        name: "钟楼",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [250, 700],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "回民街",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [350, 700],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "华清宫",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [200, 800],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "兵马俑",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [300, 900],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "大雁塔",
        category: 3,
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            // color: "#efefef",
            color: '#00ff00'
            // position: 'bottom',
        },
        value: [350, 800],
        x: 1000,
        y: 1000,
        fixed: true,
        itemStyle: {
            normal: {

                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ]),
                // color: '#ffffff',
            }
        }
    },
    // 北京
    {
        name: "颐和园",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [540, 550],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "故宫",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [500, 500],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "长城",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [460, 400],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    // 白山
    {
        name: "长白山",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [900, 700],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "Tedori Gorge",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [900, 800],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    // 杭州
    {
        name: "灵隐寺",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
        },
        value: [70, 520],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
    {
        name: "杭州植物园",
        symbol: 'circle',
        symbolSize: [20, 20],
        label: {
            color: "#efefef",
            // position: 'bottom',
        },
        value: [90, 420],
        x: 1000,
        y: 1000,
        fixed: true,
        category: 3,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#157eff"
                },
                {
                    offset: 1,
                    color: "#35c2ff"
                }
                ])
            }
        }
    },
]
onMounted(() => {
    let myChart = echarts.init(document.getElementById("relation"), 'dark');
    let option = ({
        title: {
            text: '计划生成路线图',
            textStyle: {
                color: 'white',
                fontSize: 30
            },
            x: 'center',
            top: 10
        },
        //不设置背景颜色就是透明色
        backgroundColor: '#000',
        xAxis: {
            show: true,
            min: 0,
            max: 1200,
            // type: "value",
            //开启x轴坐标
            axisPointer: {
                show: true
            },
        },
        yAxis: {
            show: true,
            min: 0,
            max: 1200,
            //   type: "value",
            //开启y轴坐标
            axisPointer: {
                show: true
            },
        },
        tooltip: {},
        //  legend: {
        //     show: false
        //  },
        series: [{
            type: "graph",
            // layout: "force",
            zlevel: 5,
            draggable: false,
            coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

            // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
            // edgeLabel: {
            //   normal: {
            //     textStyle: {
            //       fontSize: 60
            //     }
            //   }
            // },
            symbol: "rect",
            // symbol:"image://url"
            symbolOffset: ["15%", 0],

            label: {
                position: "inside",
                normal: {
                    show: true,
                    position: 'inside',
                }
            },
            data: data,
            links: [
                // 西安
                {
                    source: "西安",
                    target: "杭州",
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        normal: {
                            color: "#12b5d0",
                            color: '#ff0000'
                        },
                    }
                },
                {
                    source: "西安",
                    target: "北京",
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        normal: {
                            // color: "#12b5d0",
                            color: '#ff0000'
                        }
                    }
                },
                {
                    source: "北京",
                    target: "吉林",
                    lineStyle: {
                        normal: {
                            // color: "#12b5d0",
                        }
                    }
                },

                {
                    source: "西安",
                    target: "钟楼",
                    lineStyle: {
                        width: 2,
                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        },
                    },
                    symbol: ['none', 'arrow']
                },

                {
                    source: "西安",
                    target: "回民街",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },

                {
                    source: "钟楼",
                    target: "华清宫",
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        normal: {
                            curveness: -0.1,
                        }

                    }
                },
                {
                    source: "回民街",
                    target: "大雁塔",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                {
                    source: "大雁塔",
                    target: "兵马俑",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                // 北京
                {
                    source: "北京",
                    target: "白山",
                    lineStyle: {
                        normal: {
                            color: '#ff0000'
                        }
                    },
                    symbol: ['none', 'arrow'],
                },
                {
                    source: "北京",
                    target: "颐和园",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                {
                    source: "颐和园",
                    target: "故宫",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                {
                    source: "故宫",
                    target: "长城",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                // 白山
                {
                    source: "白山",
                    target: "长白山",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            // curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                {
                    source: "长白山",
                    target: "Tedori Gorge",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            // curveness: -0.1,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                // 杭州
                {
                    source: "杭州",
                    target: "灵隐寺",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: 0.4,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
                {
                    source: "灵隐寺",
                    target: "杭州植物园",
                    lineStyle: {

                        normal: {
                            // color: "#12b5d0",
                            curveness: 0.2,
                        }
                    },
                    symbol: ['none', 'arrow']

                },
            ],
            lineStyle: {
                normal: {
                    opacity: 0.6, //线条透明度
                    color: "#53B5EA",
                    curveness: 0, //站点间连线曲度，0表示直线
                    width: 2 //线条宽度
                }
            }
        },
        {
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            zlevel: 7,
            animation: true,
            effect: {
                show: true,
                period: 5,
                trailLength: 0.71,
                symbolSize: 14,
                symbol: "circle",
                loop: true,
                color: 'yellow'
                //   color: "rgba(55,155,255,0.5)"
            },
            lineStyle: {
                normal: {
                    // color: "green",
                    width: 0,
                    curveness: 0  //动画线路的曲度
                }
            },

            // data: [
            //     {  //一号线
            //         coords: [
            //             [5, 600],
            //             [1130, 600]
            //         ]
            //     },
            //     {  //二号线
            //         coords: [
            //             [680, 50],
            //             [680, 1050]
            //         ]
            //     },
            //     //   {  //三号线
            //     //     coords: [
            //     //       [280, 350],
            //     //       [1040, 1080]
            //     //     ]
            //     //   }
            // ]
        },
        ]
    });
    myChart.setOption(option);
})
</script>
<style lang="scss" scoped></style>
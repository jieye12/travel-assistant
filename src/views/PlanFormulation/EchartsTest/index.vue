<template>
    <div class="all">
        <div class="echarts" id="relation" style="width:100%;height:1000px;"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const nodesData: any = ref([
    {
        id: 1,
        name: "西安",
        type: "1",
        size: "60",
        children: [
            {
                id: 1,
                name: "大唐不夜城",
                type: "2",
                size: "40",
            },
            {
                id: 2,
                name: "大唐芙蓉园",
                type: "2",
                size: "40",
            }, {
                id: 3,
                name: "兴庆宫",
                type: "2",
                size: "40",
            }, {
                id: 4,
                name: "青龙寺",
                type: "2",
                size: "40",
            }
        ]
    },
    {
        id: 2,
        name: "北京",
        type: "1",
        size: "60",
        children: [
            {
                id: 1,
                name: "天安门广场",
                type: "3",
                size: "40"
            },
            {
                id: 2,
                name: "故宫",
                type: "3",
                size: "40"
            }
        ]
    },
    {
        id: 3,
        name: "长白山",
        type: "2",
        size: "40"
    }
])
// echarts.registerMap("china",)
onMounted(() => {
    console.log(nodesData.value);
    let myChart = echarts.init(document.getElementById("relation"), 'dark');
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: "默认计划智行推荐",
            x: "center",
            textStyle: {
                fontWeight: 'bolder',
            },
            textAlign: "center",
        },
        tooltip: {
            formatter: function (param: any) {
                // console.log("输出",param);
                //tooltip这里的formatter参数param可以得到series中的data数据
                return param.data.des;
            }
        },
        series: [
            {
                type: "graph",
                layout: "force",
                symbolSize: [50, 50],
                focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启

                // edgeSymbol: ["none", "arrow"], //边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头
                edgeSymbol: ["none", "none"],
                edgeSymbolSize: [10, 10],
                force: {
                    repulsion: 2500, //节点之间的斥力因子
                    edgeLength: [200, 100]
                },
                draggable: true,
                //定义节点的样式
                itemStyle: {
                    // color: "#eba844"
                    color: "#00FFFF",

                },
                autoCurveness: 0.01,
                //连线的样式
                lineStyle: {
                    width: 2,
                    color: "#00ff00"
                },
                //连线上的标记样式
                edgeLabel: {
                    show: true,
                    formatter: function (param: any) {
                        //tooltip这里的formatter参数param可以得到series中的data数据
                        return param.data.value;
                    },
                    color: "#ffffff"
                },
                //节点上是否显示文字
                label: {
                    show: true,
                    fontWeight: "bold",
                    fontSize: 18
                },
                data: [
                    // 节点1
                    {
                        name: "西安",
                        category: 1,
                        symbol: "circle",
                        symbolSize: [120, 120],
                        itemStyle: {
                            color: "#ff0000",
                            border: "1px solid #ff0000"
                        },
                        tooltip: {

                        }
                    },
                    {
                        name: "大唐不夜城",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]
                    },
                    {
                        name: "大唐芙蓉园",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    {
                        name: "钟楼",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]
                    },
                    {
                        name: "兴庆宫",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    // 北京
                    {
                        name: "北京",
                        category: 2,
                        // symbol: "rect",
                        symbol: "circle",
                        symbolSize: [100, 100],
                        itemStyle: {
                            color: "#00ff00",
                        }
                    },
                    {
                        name: "天安门广场",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    {
                        name: "故宫",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    // 杭州
                    {
                        name: "杭州",
                        category: 2,
                        symbol: "circle",
                        symbolSize: [100, 100],
                        itemStyle: {
                            color: "#00ff00",
                        }
                    },
                    {
                        name: "西湖",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    {
                        name: "灵隐寺",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    },
                    // 长白山
                    {
                        name: "吉林",
                        category: 2,
                        symbol: "circle",
                        symbolSize: [100, 100],
                        itemStyle: {
                            color: "#00ff00",
                        }
                    },
                    {
                        name: "长白山",
                        category: 3,
                        symbol: "circle",
                        symbolSize: [80, 80]

                    }
                ],
                links: [
                    {
                        source: "西安",
                        target: "大唐不夜城",
                        value: "推荐",
                    },
                    // {
                    //     source: "西安",
                    //     target: "大唐芙蓉园",
                    //     value: "",
                    // },
                    // {
                    //     source: "西安",
                    //     target: "钟楼",
                    //     value: "",
                    // },
                    {
                        source: "西安",
                        target: "兴庆宫",
                        value: "",
                    },
                    {
                        source: "大唐不夜城",
                        target: "大唐芙蓉园",
                        value: "",
                        symbol: ["none", "arrow"],
                        // symbolSize: [20, 20]
                    },
                    {
                        source: "大唐芙蓉园",
                        target: "钟楼",
                        value: "",
                        symbol: ["none", "arrow"]
                    },
                    {
                        source: "钟楼",
                        target: "兴庆宫",
                        value: "",
                        symbol: ["none", "arrow"]
                    },
                    {
                        source: "西安",
                        target: "北京",
                        // value: ""
                    },
                    {
                        source: "西安",
                        target: "杭州",
                        value: ""
                    },
                    // 
                    {
                        source: "北京",
                        target: "天安门广场",
                        value: "推荐"
                    },
                    {
                        source: "北京",
                        target: "故宫",
                        value: ""
                    },
                    {
                        source: "北京",
                        target: "吉林",
                        value: ""
                    },
                    {
                        source: "天安门广场",
                        target: "故宫",
                        symbol: ["none", "arrow"],
                        value: ""
                    },
                    {
                        source: "北京",
                        target: "西安",
                        symbol: ["none", "arrow"]
                    },
                    // 
                    {
                        source: "杭州",
                        target: "西湖",
                        value: ""
                    },
                    {
                        source: "杭州",
                        target: "灵隐寺",
                        value: ""
                    },
                    // 
                    {
                        source: "吉林",
                        target: "长白山",
                        value: "十年之约",
                        symbol: ["none", "arrow"]
                    }

                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
</script>
<style lang="scss" scoped>
.all {
    text-align: center;
}
</style>

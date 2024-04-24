<template>
    <div class="all">
        <div class="echarts" id="map" style="width:100%;height:1000px;"></div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, nextTick } from 'vue'
import chinaJson from './china.json'
import shanxi from './provinces/shanxi/shanxi.json'
import henan from './provinces/henan/henan.json'
import xian from './provinces/shanxi/xian.json'
//各省份的地图json文件
// type stringKey = Record<string, string>
interface obj {
    [key: string]: any;
}
const provinces = ref({
    '上海': xian,
    '河北': '/asset/get/s/data-1482909799572-Hkgu_yWSg.json',
    '山西': '/asset/get/s/data-1482909909703-SyCA_JbSg.json',
    '内蒙古': '/asset/get/s/data-1482909841923-rkqqdyZSe.json',
    '辽宁': '/asset/get/s/data-1482909836074-rJV9O1-Hg.json',
    '吉林': '/asset/get/s/data-1482909832739-rJ-cdy-Hx.json',
    '黑龙江': '/asset/get/s/data-1482909803892-Hy4__J-Sx.json',
    '江苏': '/asset/get/s/data-1482909823260-HkDtOJZBx.json',
    '浙江': '/asset/get/s/data-1482909960637-rkZMYkZBx.json',
    '安徽': '/asset/get/s/data-1482909768458-HJlU_yWBe.json',
    '福建': '/asset/get/s/data-1478782908884-B1H6yezWe.json',
    '江西': '/asset/get/s/data-1482909827542-r12YOJWHe.json',
    '山东': '/asset/get/s/data-1482909892121-BJ3auk-Se.json',
    '河南': henan,
    '湖北': '/asset/get/s/data-1482909813213-Hy6u_kbrl.json',
    '湖南': '/asset/get/s/data-1482909818685-H17FOkZSl.json',
    '广东': '/asset/get/s/data-1482909784051-BJgwuy-Sl.json',
    '广西': '/asset/get/s/data-1482909787648-SyEPuJbSg.json',
    '海南': '/asset/get/s/data-1482909796480-H12P_J-Bg.json',
    '四川': '/asset/get/s/data-1482909931094-H17eKk-rg.json',
    '贵州': '/asset/get/s/data-1482909791334-Bkwvd1bBe.json',
    '云南': '/asset/get/s/data-1482909957601-HkA-FyWSx.json',
    '西藏': '/asset/get/s/data-1482927407942-SkOV6Qbrl.json',
    '陕西': shanxi,
    '甘肃': '/asset/get/s/data-1482909780863-r1aIdyWHl.json',
    '青海': '/asset/get/s/data-1482909853618-B1IiOyZSl.json',
    '宁夏': '/asset/get/s/data-1482909848690-HJWiuy-Bg.json',
    '新疆': '/asset/get/s/data-1482909952731-B1YZKkbBx.json',
    '北京': '/asset/get/s/data-1482818963027-Hko9SKJrg.json',
    '天津': '/asset/get/s/data-1482909944620-r1-WKyWHg.json',
    '重庆': '/asset/get/s/data-1482909775470-HJDIdk-Se.json',
    '香港': '/asset/get/s/data-1461584707906-r1hSmtsx.json',
    '澳门': '/asset/get/s/data-1482909771696-ByVIdJWBx.json',
})
// const cities = ref({
//     '西安': xian,
// })
const map = ref();
const timeFn = ref();
// 
//各省份的数据
const provinceData: obj = [{
    name: '北京',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '天津',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '上海',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '重庆',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '河北',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '河南',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '云南',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '辽宁',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '黑龙江',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '湖南',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '安徽',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '山东',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '新疆',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '江苏',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '浙江',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '江西',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '湖北',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '广西',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '甘肃',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '山西',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '内蒙古',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
},
{
    name: '陕西',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
},
{
    name: '吉林',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '福建',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '贵州',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '广东',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '青海',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '西藏',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '四川',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '宁夏',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '海南',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '台湾',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '香港',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}, {
    name: '澳门',
    value: 1,
    itemStyle: {
        normal: {
            color: '#48D1CC',
        }
    }
}]
for (var i = 0; i < provinceData.length; i++) {
    provinceData[i].value = Math.round(Math.random() * 100);
}
// 连线信息
const lineData = [
    [{ name: '陕西' }, { name: '北京', value: 100 }],
    [{ name: "陕西" }, { name: "上海", value: 100 }],
    [{ name: "陕西" }, { name: "广州", value: 100 }],
    [{ name: "陕西" }, { name: "河南", value: 100 }],
    [{ name: "陕西" }, { name: "新疆", value: 100 }],
    [{ name: "陕西" }, { name: "陕西", value: 100 }]
]
const convertData = (data: any) => {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i]
        let fromCoord = (geoCoordMap as any)[dataItem[0].name]
        let toCoord = (geoCoordMap as any)[dataItem[1].name]
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
            })
        }
        return res
    }
}
onMounted(async () => {
    // 改变选中省份的颜色
    const test = ['陕西', '河南', '北京', '上海'];
    provinceData.filter((element: any) => {
        if (test.includes(element.name)) {
            element['itemStyle']['normal']['color'] = '#00ff00'
        }
    })
    // 连线数据

    // 
    map.value = echarts.init(document.getElementById("map") as HTMLDivElement, 'dark')
    loadMap(chinaJson, "china")
    await nextTick()
    map.value.on('click', (params: any) => {
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
    map.value.on('dblclick', () => {
        clearTimeout(timeFn.value)
        loadMap(chinaJson, 'china')
        console.log("返回上一级地图");

    })
})
const loadMap = (mapCode: any, name: any) => {
    echarts.registerMap(name, mapCode);
    // 获取节点
    console.log(mapCode.features);
    const newNodes = []
    mapCode.features.forEach((element: any) => {
        newNodes.push({
            name: element.properties.name,
            arr: element.properties.cp
        })
    })

    // 设置series
    let series = []
    lineData.forEach((element, index) => {
        series.push(
            {
                type: "lines",
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "red",
                    symbolSize: 3,
                },
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 0,
                        curveness: 0.2,
                    }
                },
                data: convertData(element)
            }
        )
    })
    // if (data.value) {
    let option: any = {
        tooltip: {
            show: true,
            formatter: (params: any) => {
                return `${params.name}:`
                // params.name + ':' + params.value
                // params.data['value']
            }
        },
        visualMap: {
            color: '#ffffff',
            type: 'continuous',
            text: ['', ''],
            showLabel: true,
            left: '50',
            min: 0,
            max: 100,
            inRange: {
                color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
            },
            splitNumber: 0
        },
        series: [{
            name: 'MAP',
            type: 'map',
            mapType: name,
            selectedMode: 'false',//是否允许选中多个区域
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: provinceData
        }]
    };
    // 连线设置
    // ['陕西', lineData].forEach((item, i) => {
    //     option.series.push(
    //         {
    //             type: 'line',
    //             zlevel: 1,
    //             effect: {
    //                 show: true,
    //                 peroid: 6,
    //                 trailLength: 0.7,
    //                 color: "red",
    //                 symbolSize: 3
    //             },
    //             lineStyle: {
    //                 normal: {
    //                     color: '#fff',
    //                     width: 0,
    //                     curveness: 0.2
    //                 }
    //             },
    //             data: convertData(item[1])
    //         }
    //     )
    // })
    map.value.setOption(option)
    // }
}

</script>
<style lang="scss" scoped></style>
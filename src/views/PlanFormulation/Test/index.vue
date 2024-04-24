<template>
    <div class="all">
        <el-drawer v-model="drawVisible">
            <json-viewer :value="jsonData"></json-viewer>
        </el-drawer>
        <div ref="stencilContainer" class="app-stencil"></div>

        <div class="main">
            <div class="toolbar">
                <div class="left">
                    <!-- 上一步 -->
                    <button class="back" @click="back()" :disabled="!canUndo">
                        <i class="iconfont icon-chexiaofanhuichehuishangyibu"></i>
                        <span>上一步</span>
                    </button>
                    <!-- 下一步 -->
                    <button class="next" @click="next()" :disabled="!canRedo">
                        <i class="iconfont icon-xiayibu"></i>
                        <span>下一步</span>
                    </button>
                    <!-- 清空 -->
                    <!--<button class="clear" @click="clear()" :disabled="!canClean">
                        <i class="iconfont icon-qingkong"></i>
                        <span>清空</span>
                    </button>
                -->
                </div>
                <div class="title">
                    <h2>个人制作</h2>
                </div>
                <div class="right">
                    <button class="export" @click="exportToPNG()">
                        <i class="iconfont icon-daochu"></i>
                        <span>导出为PNG</span>
                    </button>
                    <button class="export" @click="exportToJSON()">
                        <i class="iconfont icon-daochu"></i>
                        <span>导出为JSON</span>
                    </button>
                </div>
            </div>
            <div id="container" ref="container" class="container"></div>
            <div class="bottom"></div>
        </div>
        <!-- <div class="attribution">
            <div class="collapse">
                <i class="iconfont icon-"></i>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { Graph, Shape } from '@antv/x6'
import { ref, onMounted, nextTick } from 'vue'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Export } from '@antv/x6-plugin-export'
// const { Rect, Circle, Ellipse } = Shape
import city from '@/assets/images/symbol/city.jpg'
import attraction from '@/assets/images/symbol/attraction.jpg'
// 
import xian from '@/assets/images/cities/xian.jpg'
import beijing from '@/assets/images/cities/beijing.jpg'
import hangzhou from '@/assets/images/cities/hangzhou.jpg'
import baishan from '@/assets/images/cities/baishan.jpg'
// 
const graph = ref<Graph>()
const stencil = ref<Stencil>()
const container = ref<HTMLDivElement>()
const stencilContainer = ref<HTMLDivElement>()
const jsonData = ref({})
// 
// 状态
const canUndo = ref(false)
const canRedo = ref(false)
const drawVisible = ref(false)
// 工具栏方法
const back = () => {
    console.log("撤销");
    graph.value?.undo()
}
const next = () => {
    console.log("下一步");
    graph.value?.redo()
}
const exportToPNG = () => {
    // graph.value?.exportSVG()
    console.log("导出");
    graph.value?.exportPNG()
}
const exportToJSON = () => {
    drawVisible.value = true
    if (graph.value) {
        jsonData.value = graph.value?.toJSON()
    }
}
// 
// 
const initGraph = (container: HTMLDivElement) => {
    return new Graph({
        container: container,
        // grid: true,
        background: {
            // color: "F2F7FA"
            color: "011031"
        },
        mousewheel: {
            enabled: true,
            zoomAtMousePosition: true,
            modifiers: 'ctrl',
            minScale: 0.5,
            maxScale: 3,
        },
        connecting: {
            router: 'manhattan',
            connector: {
                name: 'rounded',
                args: {
                    radius: 8,
                },
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowBlank: false,
            snap: {
                radius: 20,
            },
            createEdge() {
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#A2B1C3',
                            strokeWidth: 2,
                            targetMarker: {
                                name: 'block',
                                width: 12,
                                height: 8,
                            },
                        },
                    },
                    zIndex: 0,
                })
            },
            validateConnection({ targetMagnet }) {
                return !!targetMagnet
            },
        },
        highlighting: {
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#5F95FF',
                        stroke: '#5F95FF',
                    },
                },
            },
        },
    })
}
const initStencil = (graph: Graph, stencilContainer: HTMLDivElement) => {
    const stencil = new Stencil({
        title: "Components",
        target: graph,
        search(cell, keyword) {
            return cell.shape.indexOf(keyword) !== -1
        },
        // background: {
        //     color: ffffff,
        // },
        placeholder: 'Search by shape name',
        notFoundText: "Not Found",
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 0,
        groups: [
            {
                name: "group1",
                title: "基本流程图",
                layoutOptions: {
                    // rowHeight: 100,
                }
            },
            {
                name: "group2",
                title: "类型",
            },
            {
                name: "group3",
                title: "常用城市"
            }
        ],
        layoutOptions: {
            column: 2,
            columnWidth: 100,
            // rowHeight: 70,
        },
        getDragNode(node) {
            const { width, height } = node.size()
            return node.clone().size(width, height)
        }
    })

    stencilContainer.appendChild(stencil.container)
    // stencil.load([rect, circle, ellipse], 'group2')
    return stencil
    // stencil.load([rect, circle], 'group2')
}
const initKeyboardEvents = (graph: Graph) => {
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.copy(cells)
        }
        return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.cut(cells)
        }
        return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
            const cells = graph.paste({ offset: 32 })
            graph.cleanSelection()
            graph.select(cells)
        }
        return false
    })
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
            graph.undo()
        }
        return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
            graph.redo()
        }
        return false
    })
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
            graph.select(nodes)
        }
    })
    graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.removeCells(cells)
        }
    })
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
            graph.zoom(0.1)
        }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
            graph.zoom(-0.1)
        }
    })
}
const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
}
const initPorts = (graph: Graph, container: HTMLDivElement) => {
    graph.on('node:mouseenter', () => {
        const ports = container.querySelectorAll(
            '.x6-port-body',
        ) as NodeListOf<SVGElement>
        showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
        const ports = container.querySelectorAll(
            '.x6-port-body',
        ) as NodeListOf<SVGElement>
        showPorts(ports, false)
    })
}
const ports = {
    groups: {
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            group: 'top',
        },
        {
            group: 'right',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
    ],
}

const registerNode = () => {
    Graph.registerNode(
        'custom-rect',
        {
            inherit: 'rect',
            width: 66,
            height: 36,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: { ...ports },
        },
        true,
    )
    Graph.registerNode(
        'custom-polygon',
        {
            inherit: 'polygon',
            width: 66,
            height: 36,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: {
                ...ports,
                items: [
                    {
                        group: 'top',
                    },
                    {
                        group: 'bottom',
                    },
                ],
            },
        },
        true,
    )
    Graph.registerNode(
        'custom-circle',
        {
            inherit: 'circle',
            width: 45,
            height: 45,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                },
            },
            ports: { ...ports },
        },
        true,
    )
    Graph.registerNode(
        'custom-image',
        {
            inherit: 'rect',
            width: 52,
            height: 52,
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'image',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: {
                body: {
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
                image: {
                    width: 26,
                    height: 26,
                    refX: 13,
                    refY: 16,
                },
                label: {
                    refX: 3,
                    refY: 2,
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    fontSize: 12,
                    fill: '#fff',
                },
            },
            ports: { ...ports },
        },
        true,
    )
    Graph.registerNode(
        'custom-ellipse',
        {
            inherit: 'ellipse',
            width: 100,
            height: 52,
            attrs: {
                body: {
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
            },
            ports: { ...ports },
        }, true)
}
const initNodes = (graph: Graph, stencil: Stencil) => {
    const r1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始/结束',
        attrs: {
            body: {
                rx: 20,
                ry: 26,
            },
        },
    })
    const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程',
    })
    const r3 = graph.createNode({
        shape: 'custom-rect',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
            },
        },
        label: '可选过程',
    })
    const r4 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
            },
        },
        label: '决策',
    })
    const r5 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '10,0 40,0 30,20 0,20',
            },
        },
        label: '数据',
    })
    const r6 = graph.createNode({
        shape: 'custom-circle',
        label: '连接',
    })
    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
    const cityNode = graph.createNode({
        shape: 'custom-image',
        label: '城市',
        attrs: {
            image: {
                'xlink:href': city
            },
            body: {
                fill: '#000000'
            }
        }
    })
    const attractionNode = graph.createNode({
        shape: 'custom-image',
        label: '景点',
        attrs: {
            image: {
                'xlink:href': attraction
            },
            body: {
                fill: '#00ffff'
            }
        }
    })
    stencil.load([cityNode, attractionNode], 'group2')
    const xianNode = graph.createNode({
        shape: 'custom-image',
        label: '西安',
        attrs: {
            image: {
                'xlink:href': xian
            },
            body: {
                fill: '#ffffff',
            },
            label: {
                fill: "#000000"
            }
        }
    })
    const beijingNode = graph.createNode({
        shape: 'custom-image',
        label: '北京',
        attrs: {
            image: {
                'xlink:href': beijing
            },
            body: {
                fill: '#ffffff',
            },
            label: {
                fill: "#000000"
            }
        }
    })
    const baishanNode = graph.createNode({
        shape: 'custom-image',
        label: '白山',
        attrs: {
            image: {
                'xlink:href': baishan
            }
        }
    })
    const hangzhouNode = graph.createNode({
        shape: 'custom-image',
        label: '杭州',
        attrs: {
            image: {
                'xlink:href': hangzhou
            }
        }
    })
    stencil.load([xianNode, beijingNode, baishanNode, hangzhouNode], 'group3')
}
const initGraphNodes = (graph: Graph) => {
    const xianNode = graph.addNode({
        x: -200,
        y: 10,
        id: 'xian',
        shape: 'custom-image',
        label: '西安',
        attrs: {
            image: {
                'xlink:href': xian
            },
        }
    })
    const beijingNode = graph.addNode({
        x: 200,
        y: 10,
        id: 'beijing',
        shape: 'custom-image',
        label: '北京',
        attrs: {
            image: {
                'xlink:href': beijing
            }
        }
    })
    const hangzhouNode = graph.addNode({
        x: -200,
        y: -200,
        id: 'hangzhou',
        shape: 'custom-image',
        label: '杭州',
        attrs: {
            image: {
                'xlink:href': hangzhou
            }
        }
    })
    const baishanNode = graph.addNode({
        x: 200,
        y: -200,
        id: 'baishan',
        shape: 'custom-image',
        label: '白山',
        attrs: {
            image: {
                'xlink:href': baishan
            }
        }
    })
    graph.addEdge({
        source: xianNode,
        target: beijingNode,
        attrs: {
            line: {
                stroke: '#00ff00',
            },
        },
    })
    graph.addEdge({
        source: xianNode,
        target: hangzhouNode,
        attrs: {
            line: {
                stroke: '#0000ff',
            },
        },
    })
    graph.addEdge({
        source: beijingNode,
        target: baishanNode,
        attrs: {
            line: {
                stroke: '#0000ff',
            },
        },
    })
}
const initClickEvents = (graph: Graph) => {
    graph.on('node:delete', ({ view, e }: any) => {
        e.stopPropagation();
        view.cell.remove()
    })
}
const initPage = async () => {
    // 注册节点->初始化画布->注册插件->初始化左侧->注册事件->初始化setting
    graph.value = initGraph(container.value as HTMLDivElement)
    // 数据渲染
    // graph.value.fromJSON(data)
    //插件使用
    graph.value.use(
        new Transform({
            resizing: true,
            rotating: true,
        }),
    )
        .use(
            new Selection({
                rubberband: true,
                showNodeSelectionBox: true,
            }),
        )
        .use(new Snapline())
        .use(new Keyboard())
        .use(new Clipboard())
        .use(new History({
            enabled: true,
        }))
        .use(new Export())
    // 
    stencil.value = initStencil(graph.value as Graph, stencilContainer.value as HTMLDivElement)
    graph.value.centerContent()
    // 初始化键盘事件
    initKeyboardEvents(graph.value as Graph)
    // 初始化点击事件
    initClickEvents(graph.value as Graph)
    //控制连接桩
    initPorts(graph.value as Graph, container.value as HTMLDivElement)
    // 注册结点
    registerNode()
    // 创建节点
    initNodes(graph.value as Graph, stencil.value as Stencil)
    // 初始化画布节点
    initGraphNodes(graph.value as Graph)
    await nextTick()
}
const monitorEvents = (canUndo: any, canRedo: any) => {
    graph.value?.on('history:change', () => {
        canUndo.value = graph.value?.canUndo()
        canRedo.value = graph.value?.canRedo()
    })
}
onMounted(() => {
    initPage()
    // 监听事件
    monitorEvents(canUndo, canRedo)
})
</script>
<style lang="scss" scoped>
.all {
    display: flex;
    height: 100vh;
    background-color: #ffffff;

    .app-stencil {
        position: relative;
        width: $left_width;
        // border-right: 1px solid #ffffff;
    }


    .el-drawer__body {
        overflow: auto;
    }

    .el-drawer__container::-webkit-scrollbar {
        display: none;
    }

    .main {
        position: relative;
        flex: 1;

        .toolbar {
            height: $toolbar_height;
            line-height: $toolbar_height;
            display: flex;
            font-size: 12px;

            .left {
                display: flex;
                margin-left: 5px;
                width: 300px;

                .back,
                .next,
                .clear {
                    text-align: center;
                    width: 70px;
                    display: flex;
                    flex-direction: column;

                    i,
                    span {
                        display: inline-block;
                        height: 25px;
                        width: 70px;
                        text-align: center;
                    }

                    i {
                        line-height: 35px;
                    }

                    span {
                        line-height: 25px;
                    }
                }
            }

            .title {
                text-align: center;
                flex: 1;
            }

            .right {
                display: flex;
                // width: 300px;
                margin-right: 20px;
                text-align: right;

                .save,
                .export {
                    text-align: center;
                    display: flex;
                    flex-direction: column;

                    i,
                    span {
                        width: 90px;
                        display: inline-block;
                        height: 25px;
                    }

                    i {
                        line-height: 35px;
                    }

                    span {
                        line-height: 25px;
                    }
                }
            }
        }

        .container {
            // width: calc(100vw - 400px);
            width: calc(100vw - $left_width);
            min-height: calc(100vh - $toolbar_height);
            background-color: #f3f3f3;
        }

        .bottom {
            position: absolute;
            // width: calc(100vw - $left_width - $right_width );
            height: 60px;
            background-color: #ffffff;
            bottom: 0;
            left: 0;
        }
    }


}

button {
    border: none;
    background-color: transparent;
    text-align: center;
}
</style>
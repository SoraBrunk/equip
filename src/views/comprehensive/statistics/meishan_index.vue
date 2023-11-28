<template>
  <div class="test-container">
    <el-row :gutter="20">
      <el-col :span="15" style="position: relative">
        <vab-chart
          ref="myLine1"
          theme="vab-echarts-theme"
          autoresize
          :options="map"
          class="map"
        />
        <div class="map_details">
          <div>实时作业</div>
          <div>青神县：326</div>
          <div>彭山区：229</div>
          <div>东坡区：176</div>
          <div>仁寿县：322</div>
          <div>丹棱县：201</div>
          <div>洪雅县：182</div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="box">
          <div class="title">
            <h3>供应商评价指数</h3>
          </div>
        </div>
        <vab-chart
          ref="myLine1"
          theme="vab-echarts-theme"
          autoresize
          :options="pie"
          class="pie"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-col :span="12">
          <vab-chart
            ref="myLine1"
            theme="vab-echarts-theme"
            autoresize
            :options="hot1"
            class="hot"
          />
        </el-col>
        <el-col :span="12"></el-col>
      </el-col>
      <el-col :span="9">123</el-col>
    </el-row>
  </div>
</template>
<script>
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";
  export default {
    components: {
      VabChart,
    },
    data() {
      return {
        hotx1: ["7.15", "7.16", "7.17", "7.18", "7.19"],
        hoty1: [
          "人字梯",
          "绝缘服",
          "自吸过滤式防毒面具",
          "安全帽-塑料",
          "绝缘手套-高压",
          "电容型验电器- 10kV",
        ],
        hotData1: [
          [0, 0, 3],
          [0, 1, 4],
          [0, 2, 1],
          [0, 3, 3],
          [0, 4, 10],
          [1, 0, 1],
          [1, 1, 0],
          [1, 2, 7],
          [1, 3, 9],
          [1, 4, 5],
          [2, 0, 8],
          [2, 1, 3],
          [2, 2, 8],
          [2, 3, 1],
          [2, 4, 7],
          [3, 0, 5],
          [3, 1, 10],
          [3, 2, 1],
          [3, 3, 7],
          [3, 4, 4],
          [4, 0, 1],
          [4, 1, 4],
          [4, 2, 7],
          [4, 3, 0],
          [4, 4, 8],
          [5, 0, 0],
          [5, 1, 9],
          [5, 2, 2],
          [5, 3, 9],
          [5, 4, 6],
        ],
        map: {
          title: {
            text: "站所数量",
            bottom: 20,
            right: 250,
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c}",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: 0,
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            orient: "horizontal",
            right: 0,
            bottom: 20,
            max: 500,
            calculable: true,
            inRange: {
              color: ["#fff", "#C8FCA6", "#00B638", "#08893B"],
            },
          },
          series: [
            {
              name: "2099年全国GDP分布",
              type: "map",
              mapType: "眉山",
              label: {
                show: true,
                rotate: -90,
              },
              emphasis: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#00B660",
                },
              },
              data: [
                { name: "青神县", value: 326 },
                { name: "彭山区", value: 229 },
                { name: "东坡区", value: 176 },
                { name: "仁寿县", value: 322 },
                { name: "丹棱县", value: 201 },
                { name: "洪雅县", value: 181 },
              ],
            },
          ],
        },
        pie: {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["正常运行", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ["异常运行", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ],
          },
          series: [
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["15%", "30%"],
              // No encode specified, by default, it is "2012".
            },
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["50%", "30%"],
              // No encode specified, by default, it is "2012".
            },
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["85%", "30%"],
              // No encode specified, by default, it is "2012".
            },
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["15%", "75%"],
              encode: {
                itemName: "product",
                value: "2013",
              },
            },
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["50%", "75%"],
              encode: {
                itemName: "product",
                value: "2014",
              },
            },
            {
              type: "pie",
              radius: ["20%", "30%"],
              label: {
                show: false,
              },
              center: ["85%", "75%"],
              encode: {
                itemName: "product",
                value: "2015",
              },
            },
          ],
        },
        hot1: {
          tooltip: {
            position: "top",
          },
          animation: false,
          grid: {
            height: "50%",
            top: "10%",
          },
          xAxis: {
            type: "category",
            data: this.dataX,
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: "category",
            data: this.dataY,
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "15%",
          },
          series: [
            {
              name: "Punch Card",
              type: "heatmap",
              data: this.data1,
              label: {
                show: true,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },
      };
    },
    created() {
      this.hot1.xAxis.data = this.hotx1;
      this.hot1.yAxis.data = this.hoty1;
    },
    mounted() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .map {
    width: 100%;
  }
  .map_details {
    position: absolute;
    top: 6%;
    left: 5%;
    padding: 15px 30px 15px 15px;
    border: 2px solid rgb(167 223 187);
    border-radius: 8px;
    background: rgb(245 252 249);
    > div:first-child {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;
      ~ div {
        margin-bottom: 10px;
      }
    }
  }
  .box {
    padding: 10px;
  }
  .title {
    display: flex;
    h3 {
      margin: 0;
    }
  }
  .pie {
    width: 100%;
  }
  .hot {
    width: 100%;
  }
</style>

<template>
  <div class="container">
    <el-row style="border-bottom: 5px solid #f6f8f9">
      <el-col :span="7">
        <el-row
          style="
            border-bottom: 5px solid #f6f8f9;
            border-right: 5px solid #f6f8f9;
          "
        >
          <div class="box">
            <div class="title">
              <h3>工器具柜可视化</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <vab-chart
              ref="myLine1"
              theme="vab-echarts-theme"
              autoresize
              :options="chart3"
              class="line1"
            />
          </div>
        </el-row>
        <el-row style="border-right: 5px solid #f6f8f9">
          <div class="box">
            <div class="title">
              <h3>班组价值分析</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <div style="margin-top: 10px">
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm1.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="90"
                    style="width: 100%"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm2.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="60"
                    style="width: 100%"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm3.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="40"
                    style="width: 100%"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">4</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="0"
                    style="width: 100%"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">5</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="0"
                    style="width: 100%"
                  ></el-progress>
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="10">
        <div class="box">
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zgdt"
            class="map"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <el-row
          style="
            border-bottom: 5px solid #f6f8f9;
            border-left: 5px solid #f6f8f9;
          "
        >
          <div class="box">
            <div class="title">
              <h3>工器具路径分析</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="analyse"
              class="line1"
            />
          </div>
        </el-row>
        <el-row style="border-left: 5px solid #f6f8f9">
          <div class="box">
            <div class="title">
              <h3>供应商评价指数</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <div style="margin-top: 10px">
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm1.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="90"
                    style="width: 100%"
                    color="#46AFF1"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm2.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="60"
                    style="width: 100%"
                    color="#46AFF1"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm3.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="40"
                    style="width: 100%"
                    color="#46AFF1"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">4</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="0"
                    style="width: 100%"
                    color="#46AFF1"
                  ></el-progress>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">5</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="0"
                    style="width: 100%"
                    color="#46AFF1"
                  ></el-progress>
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" style="border-right: 5px solid #f6f8f9">
        <el-row>
          <div class="box">
            <div class="title">
              <h3>作业分析</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <vab-chart
              ref="analyse"
              theme="vab-echarts-theme"
              autoresize
              :options="pie"
              class="pie1"
            />
          </div>
        </el-row>
      </el-col>
      <el-col :span="10" style="border-right: 5px solid #f6f8f9">
        <el-row>
          <div class="box">
            <div class="title">
              <h3>供应商评价指数</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <div style="margin-top: 20px">
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm1.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1; text-align: right">
                  <span>283次</span>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm2.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1; text-align: right">
                  <span>283次</span>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <img src="@/assets/level_images/pm3.png" />
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1; text-align: right">
                  <span>283次</span>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">4</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1; text-align: right">
                  <span>283次</span>
                </div>
              </div>
              <div class="processGroup">
                <div class="left">
                  <span style="margin-right: 12px">5</span>
                  <span>眉山供电局</span>
                </div>
                <div style="flex-grow: 1; text-align: right">
                  <span>283次</span>
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row>
          <div class="box">
            <div class="title">
              <h3>检测机构价值分析</h3>
              <el-button round size="mini">查看更多</el-button>
            </div>
            <div style="margin-top: 15px">
              <div
                class="right_bottom"
                style="
                  border-left-color: #00b65f;
                  background-color: rgb(232 248 241);
                "
              >
                <span>川电检测</span>
                <span>7812</span>
              </div>
              <div
                class="right_bottom"
                style="
                  border-left-color: #46aff1;
                  background-color: rgb(232 248 241);
                "
              >
                <span>川电检测</span>
                <span>7812</span>
              </div>
              <div class="right_bottom" style="border-left-color: #fedb17">
                <span>川电检测</span>
                <span>7812</span>
              </div>
              <div class="right_bottom">
                <span>川电检测</span>
                <span>7812</span>
              </div>
              <div class="right_bottom">
                <span>川电检测</span>
                <span>7812</span>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
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
        chart3: {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          legend: {
            data: ["正常运行", "异常运行"],
            right: 0,
            top: 15,
          },
          series: [
            {
              name: "正常运行",
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00b65f" },
                  // { offset: 0.5, color: "#56c3db" },
                  { offset: 1, color: "#fff" },
                ]),
              },
            },
            {
              name: "异常运行",
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#46aff1" },
                  // { offset: 0.5, color: "#56c3db" },
                  { offset: 1, color: "#fff" },
                ]),
              },
            },
          ],
        },
        zgdt: {
          title: {
            text: "站所数量",
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c}",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            orient: "horizontal",
            right: 0,
            top: 0,
            calculable: true,
            inRange: {
              color: ["#fff", "#C8FCA6", "#00B638", "#08893B"],
            },
          },
          series: [
            {
              name: "2099年全国GDP分布",
              type: "map",
              mapType: "四川",
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
                { name: "甘孜", value: 20 },
                { name: "阿坝", value: 0 },
                { name: "凉山", value: 0 },
                { name: "雅安", value: 200 },
                { name: "攀枝花", value: 50 },
                { name: "广元", value: 20 },
                { name: "绵阳", value: 200 },
                { name: "德阳", value: 0 },
                { name: "成都", value: 0 },
                { name: "乐山", value: 0 },
                { name: "眉山", value: 0 },
                { name: "巴中", value: 0 },
                { name: "南充", value: 0 },
                { name: "遂宁", value: 0 },
                { name: "资阳", value: 0 },
                { name: "内江", value: 0 },
                { name: "自贡", value: 0 },
                { name: "宜宾", value: 0 },
                { name: "达州", value: 0 },
                { name: "广安", value: 0 },
                { name: "泸州", value: 0 },
              ],
            },
          ],
        },
        analyse: {
          tooltip: {
            trigger: "axis",
            formatter: "Temperature : <br/>{b}km : {c}°C",
          },
          legend: {
            data: ["总量", "采购量", "报废量"],
            right: 0,
            top: 15,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "总量",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#00B65F",
                width: 5,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10,
              },
              data: [920, 1132, 901, 1134, 1290, 1530, 920],
              type: "line",
            },
            {
              name: "采购量",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#46AFF1",
                width: 5,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10,
              },
              data: [707, 1032, 801, 1004, 1090, 1520, 820],
              type: "line",
            },
            {
              name: "报废量",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#FEDB17",
                width: 5,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10,
              },
              data: [520, 632, 601, 834, 1090, 1230, 920],
              type: "line",
            },
          ],
        },
        pie: {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["20%", "50%"],
              center: ["40%", "30%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: false,
                  formatter: "",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 234, name: "联盟广告" },
                { value: 135, name: "视频广告" },
                { value: 1548, name: "搜索引擎" },
              ],
            },
          ],
        },
      };
    },
    created() {},
    mounted() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .box {
    padding: 10px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      margin: 0;
    }
  }
  .line1 {
    width: 100%;
    height: 40vh;
  }
  .pie1 {
    width: 100%;
    height: 40vh;
  }
  .map {
    width: 100%;
    height: 77vh;
  }
  .processGroup {
    display: flex;
    margin-bottom: 20px !important;
    justify-content: space-between;
    align-items: center;
    > div:last-child span {
      margin-right: 20px;
    }
    .left {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    img {
      display: inline-block;
      width: 12px !important;
      height: 100%;
      margin-right: 8px;
    }
  }
  .right_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px 5px;
    margin-bottom: 10px;
    border-left: 2px solid #e4e2e2;
    background: rgb(247 246 246);
  }
</style>

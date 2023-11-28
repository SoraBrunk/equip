<template>
  <div v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <h3>工器具出入库档案</h3>
    </el-row>
    <el-row>
      <el-divider content-position="center">
        <span class="title">基本信息</span>
      </el-divider>
      <div class="mode">
        <div>
          <span>RFID编号：</span>
          <span>{{ details.epc }}</span>
        </div>
        <div>
          <span>工器具类型：</span>
          <span>{{ details.toolTypeName }}</span>
        </div>
        <div>
          <span>所属区县：</span>
          <span>{{ details.region }}</span>
        </div>
        <div>
          <span>所属班组：</span>
          <span>{{ details.team }}</span>
        </div>
        <div>
          <span>责任人：</span>
          <span>{{ details.maintainUserName }}</span>
        </div>
        <div>
          <span>责任人联系电话：</span>
          <span>{{ details.maintainUserPhone }}</span>
        </div>
        <div>
          <span>检验周期：</span>
          <span>{{ details.cycle }}</span>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-divider content-position="center">
        <span class="title">出入库记录</span>
      </el-divider>
      <el-form
        ref="select"
        :model="select"
        class="demo-ruleForm"
        inline
        size="mini"
      >
        <el-form-item label="领取日期：">
          <el-date-picker
            v-model="select.checkTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSelect(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading.list"
        :data="list"
        :element-loading-text="elementLoadingText"
        fit
      >
        <el-table-column
          show-overflow-tooltip
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="操作人员"
          prop="operateUserName"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="联系方式"
          prop="phone"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="领取时间"
          prop="outOperateDate"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="归还时间"
          prop="inOperateDate"
        ></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="success"
              size="mini"
              style=""
              @click="confirmEdit(row)"
            >
              查看轨迹
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="10">
        <el-pagination
          :total="total"
          hide-on-single-page
          :page-sizes="[10, 20]"
          :page-size="select.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="select.pageNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-row>
    </el-row>
    <el-dialog
      title="查看轨迹"
      :visible.sync="dialogVisible"
      width="60%"
      top="10vh"
    >
      <baidu-map
        class="map"
        style="height: 60vh"
        :center="polylinePath.length > 0 ? polylinePath[0] : '成都'"
        :zoom="15"
        :scroll-wheel-zoom="true"
      >
        <bm-polyline
          :path="polylinePath"
          stroke-color="#00B660"
          :stroke-opacity="1"
          :stroke-weight="10"
        ></bm-polyline>
      </baidu-map>
    </el-dialog>
  </div>
</template>
<script>
  import {
    useTrackDetails,
    useTrackDetailsList,
    useTrackDetailsMap,
  } from "@/api/use";
  export default {
    data() {
      return {
        epc: "",
        loading: {
          all: false,
          list: false,
        },
        details: {},
        dialogVisible: false,
        selectRow: "",
        total: 0,
        list: [],
        elementLoadingText: "正在加载...",
        select: {
          pageNum: 1,
          pageSize: 10,
          checkTime: "",
        },
        polylinePath: [],
      };
    },
    created() {
      this.getType();
    },
    mounted() {},
    methods: {
      async getType() {
        this.loading.all = true;
        var data = sessionStorage.getItem("userDetailsId");
        data = data.split(",");
        this.epc = data[0];
        await this.getDetails(data[0]);
        await this.onSelect(1);
        this.loading.all = false;
      },
      async getDetails(epc) {
        var details = await useTrackDetails(epc);
        this.details = details.result;
      },
      async onSelect(type) {
        this.loading.list = true;
        var form;
        var data = {};
        form = this.select;
        var gmtStart = form.checkTime[0];
        var gmtEnd = form.checkTime[1];
        data.epc = this.epc;
        gmtStart = new Date(gmtStart).toLocaleDateString();
        gmtEnd = new Date(gmtEnd).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.gmtStart = form.checkTime !== "" ? Start : "";
        data.gmtEnd = form.checkTime !== "" ? gmtEnd : "";
        var res = await useTrackDetailsList(data);
        this.list = res.result.data;
        this.total = res.result.totalCount;
        this.loading.list = false;
      },
      handleCurrentChange(pageNum) {
        this.select.pageNum = pageNum;
        this.onSelect(2);
      },
      handleSizeChange(pageSize) {
        this.select.pageSize = pageSize;
        this.onSelect(2);
        // console.log(pageSize);
      },
      async confirmEdit(row) {
        this.selectRow = row;
        await useTrackDetailsMap(row.epc).then((res) => {
          this.polylinePath = res.result;
          console.log(res.result);
        });
        this.dialogVisible = true;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .title {
    font-size: 16px;
    font-weight: 400;
    color: #00b65f;
  }
  .mode {
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    > div {
      flex: 0 0 33%;
      margin: 20px 0;
      > span:first-child {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
</style>

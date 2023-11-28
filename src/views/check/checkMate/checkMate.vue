<template>
  <div v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <h3>工器具检验记录</h3>
    </el-row>
    <el-row>
      <el-divider content-position="center">
        <span class="title">基本信息</span>
      </el-divider>
      <div class="mode">
        <div>
          <span>RFID编号：</span>
          <span>{{ details.toolCode }}</span>
        </div>
        <div>
          <span>工器具名称：</span>
          <span>{{ details.toolName }}</span>
        </div>
        <div>
          <span>工器具类型：</span>
          <span>{{ details.typeModel }}</span>
        </div>
        <div>
          <span>所属地市：</span>
          <span>{{ details.cities }}</span>
        </div>
        <div>
          <span>所属区县：</span>
          <span>{{ details.country }}</span>
        </div>
        <div>
          <span>所属班组：</span>
          <span>{{ details.team }}</span>
        </div>
        <div>
          <span>报废申请人及电话：</span>
          <span>{{ details.mainUserNameAndPhone }}</span>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-divider content-position="center">
        <span class="title">检验记录</span>
      </el-divider>
      <el-form
        ref="select"
        :model="select"
        class="demo-ruleForm"
        inline
        size="mini"
      >
        <el-form-item label="检验日期：">
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
          min-width="250"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验日期"
          prop="checkDate"
          min-width="250"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验次序"
          prop="code"
        ></el-table-column>
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
  </div>
</template>
<script>
  import { checkMateDetails, checkMateList } from "@/api/check";
  export default {
    data() {
      return {
        loading: {
          all: false,
          list: false,
        },
        details: {},
        total: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          toolId: "",
          checkTime: "",
        },
        list: [],
        elementLoadingText: "正在加载...",
      };
    },
    created() {
      this.getType();
    },
    mounted() {},
    methods: {
      async getType() {
        this.loading.all = true;
        var params = {};
        var data = sessionStorage.getItem("checkAllId");
        data = data.split(",");
        this.select.toolId = data[0];
        params.toolId = data[0];
        // this.epc = data[0];
        // this.type = data[1];
        await this.getDetails(params);
        await this.onSelect(1);
        this.loading.all = false;
      },
      getDetails(params) {
        checkMateDetails(params).then((res) => {
          this.details = res.result;
        });
      },
      async onSelect(type) {
        this.loading.list = true;
        var form;
        var data = {};
        form = this.select;
        var startDate = form.checkTime[0];
        var endDate = form.checkTime[1];
        startDate = new Date(startDate).toLocaleDateString();
        endDate = new Date(endDate).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.toolId = form.toolId;
        data.startDate = form.checkTime !== "" ? startDate : "";
        data.endDate = form.checkTime !== "" ? endDate : "";
        var res = await checkMateList(data);
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

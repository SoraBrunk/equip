<template>
  <div v-loading="loading.all" class="test-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#00b660"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <span class="title">基本信息</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span class="title">出入库记录</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span class="title">监察记录</span>
      </el-menu-item>
    </el-menu>
    <div v-if="activeIndex === '1'">
      <div class="mode">
        <div>
          <span>RFID编号：</span>
          <span>{{ details.epc }}</span>
        </div>
        <div>
          <span>工器具名称：</span>
          <span>{{ details.toolName }}</span>
        </div>
        <div>
          <span>工器具类型：</span>
          <span>{{ details.toolTypeName }}</span>
        </div>
        <div>
          <span>所属地市：</span>
          <span>{{ details.city }}</span>
        </div>
        <div>
          <span>所属区县：</span>
          <span>{{ details.region }}</span>
        </div>
        <div>
          <span>所属班组：</span>
          <span>{{ details.team }}</span>
        </div>
        <div v-if="type === '1'">
          <span>报废申请人：</span>
          <span>{{ details.scrapName }}</span>
        </div>
        <div v-if="type === '2'">
          <span>责任人：</span>
          <span>{{ details.responsible }}</span>
        </div>
        <div v-if="type === '1'">
          <span>申请人联系电话：</span>
          <span>{{ details.phone }}</span>
        </div>
        <div v-if="type === '2'">
          <span>责任人联系电话：</span>
          <span>{{ details.responsiblePhone }}</span>
        </div>
        <div>
          <span>购置时间：</span>
          <span>{{ details.buyDate }}</span>
        </div>
        <div>
          <span>生产厂家：</span>
          <span>{{ details.manufacture }}</span>
        </div>
        <div>
          <span>出厂日期：</span>
          <span>{{ details.produceDate }}</span>
        </div>
        <div v-if="type === '2'">
          <span>报废时间：</span>
          <span>{{ details.gmtModified }}</span>
        </div>
        <div v-if="type === '2'">
          <span>报废原因：</span>
          <span>{{ details.scrappedMsg }}</span>
        </div>
      </div>
    </div>
    <div v-if="activeIndex === '2'">
      <el-row>
        <el-form
          ref="select"
          :model="select"
          class="demo-ruleForm"
          inline
          size="mini"
        >
          <el-form-item label="出入库：" prop="checkType">
            <el-select
              v-model="select.operateType"
              placeholder="全部"
              style="width: 80px"
            >
              <el-option label="出库" value="1"></el-option>
              <el-option label="入库" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出库日期 ：">
            <el-date-picker
              v-model="select.gmtOut"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="归还日期 ：">
            <el-date-picker
              v-model="select.gmtIn"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSelect1(1)">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loading.list1"
          :data="list1"
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
            label="出入库"
            prop="operateType"
            :formatter="operateStatus"
          ></el-table-column>
          <el-table-column
            label="操作人员"
            prop="operateUserName"
          ></el-table-column>
          <el-table-column
            label="联系方式"
            prop="phone"
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="出库时间"
            prop="outOperateDate"
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="归还时间"
            prop="inOperateDate"
            min-width="180"
          ></el-table-column>
        </el-table>
        <el-row :gutter="10">
          <el-pagination
            :total="total1"
            :page-sizes="[10, 20]"
            hide-on-single-page
            :page-size="select.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="select.pageNum"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          ></el-pagination>
        </el-row>
      </el-row>
    </div>
    <div v-if="activeIndex === '3'">
      <el-row>
        <el-form
          ref="select2"
          :model="select2"
          class="demo-ruleForm"
          inline
          size="mini"
        >
          <el-form-item label="检验日期 ：">
            <el-date-picker
              v-model="select2.checkTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSelect2(1)">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loading.lis2"
          :data="list2"
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
            prop="checkCount"
            min-width=""
          ></el-table-column>
        </el-table>
        <el-row :gutter="10">
          <el-pagination
            :total="total2"
            hide-on-single-page
            :page-sizes="[10, 20]"
            :page-size="select2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="select2.pageNum"
            @size-change="handleCurrentChange2"
            @current-change="handleCurrentChange2"
          ></el-pagination>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { scarpDetails, warehousing, scarpCheck } from "@/api/scarp";
  export default {
    data() {
      return {
        type: 1,
        elementLoadingText: ".......正在加载中",
        activeIndex: "1",
        loading: {
          all: false,
          list1: false,
          list2: false,
        },
        details: {},
        total1: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          operateType: "",
          gmtIn: "",
          gmtOut: "",
        },
        select2: {
          pageNum: 1,
          pageSize: 10,
          checkTime: "",
        },
        list1: [],
        list2: [],
      };
    },
    created() {
      this.getType();
    },
    methods: {
      async getType() {
        this.loading.all = true;
        var data = sessionStorage.getItem("scarpId");
        data = data.split(",");
        this.epc = data[0];
        this.type = data[1];
        await this.getDetails(data[0]);
        await this.onSelect1(1);
        await this.onSelect2(1);
        this.loading.all = false;
      },
      async getDetails(epc) {
        var details = await scarpDetails(epc);
        this.details = details.result;
      },
      async onSelect1(type) {
        this.loading.list1 = true;
        var form;
        var data = {};
        form = this.select;
        var gmtInStart = form.gmtIn[0];
        var gmtInEnd = form.gmtIn[1];
        var gmtOutStart = form.gmtOut[0];
        var gmtOutEnd = form.gmtOut[1];
        data.epc = this.epc;
        gmtInStart = new Date(gmtInStart).toLocaleDateString();
        gmtInEnd = new Date(gmtInEnd).toLocaleDateString();
        gmtOutStart = new Date(gmtOutStart).toLocaleDateString();
        gmtOutEnd = new Date(gmtOutEnd).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.operateType = form.operateType;
        data.pageSize = form.pageSize;
        data.gmtInStart = form.gmtIn !== "" ? gmtInStart : "";
        data.gmtInEnd = form.gmtIn !== "" ? gmtInEnd : "";
        data.gmtOutStart = form.gmtOut !== "" ? gmtOutStart : "";
        data.gmtOutEnd = form.gmtOut !== "" ? gmtOutEnd : "";
        var res = await warehousing(data);
        this.list1 = res.result.data;
        this.total1 = res.result.totalCount;
        this.loading.list1 = false;
      },
      async onSelect2(type) {
        this.loading.list2 = true;
        var form;
        var data = {};
        form = this.select2;
        var gmtStart = form.checkTime[0];
        var gmtEnd = form.checkTime[1];
        gmtStart = new Date(gmtStart).toLocaleDateString();
        gmtEnd = new Date(gmtEnd).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.epc = this.epc;
        data.pageSize = form.pageSize;
        data.gmtStart = form.checkTime !== "" ? gmtStart : "";
        data.gmtEnd = form.checkTime !== "" ? gmtEnd : "";
        var res = await scarpCheck(data);
        this.list2 = res.result.data;
        this.total2 = res.result.totalCount;
        this.loading.list2 = false;
      },
      handleCurrentChange1(pageNum) {
        this.select.pageNum = pageNum;
        this.onSelect1(2);
      },
      handleSizeChange1(pageSize) {
        this.select.pageSize = pageSize;
        this.onSelect1(2);
        // console.log(pageSize);
      },
      handleCurrentChange2() {
        this.select2.pageNum = pageNum;
        this.onSelect2(2);
      },
      handleSizeChange2(pageSize) {
        this.select2.pageSize = pageSize;
        this.onSelect2(2);
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
      operateStatus(row) {
        if (row.operateType === 1) {
          return "出库";
        } else if (row.operateType === 2) {
          return "入库 ";
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-menu-demo {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .mode {
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    > div {
      flex: 0 0 25%;
      margin: 20px 0;
      > span:first-child {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
</style>

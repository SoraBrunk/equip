<template>
  <div v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <el-form
        ref="select"
        :model="select"
        inline
        size="mini"
        class="demo-ruleForm"
        label-width="96px"
      >
        <el-form-item label="RFID编号：" prop="epc">
          <el-input
            v-model="select.epc"
            placeholder="输入工器具RFID进行查询"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="工器具类型：" prop="toolTypeId">
          <el-select
            v-model="select.toolTypeId"
            placeholder="请选择工器具种类及规格型号"
            style="width: 210px"
            filterable
          >
            <el-option
              v-for="item in begin.equip"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地市：" prop="cityId">
          <el-select
            v-model="select.cityId"
            placeholder="请选择所属地市"
            @change="selectCountry"
          >
            <el-option
              v-for="item in begin.city"
              :key="item.id"
              :label="item.name"
              :value="[item.id, item.orgCodeNumber]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区县：" prop="regionId">
          <el-select
            v-model="select.regionId"
            placeholder="请选择所属区县"
            @change="selectGroup"
          >
            <el-option
              v-for="item in begin.country"
              :key="item.id"
              :label="item.name"
              :value="[item.id, item.orgCodeNumber]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班组：" prop="teamId">
          <el-select v-model="select.teamId" placeholder="请选择所属班组">
            <el-option
              v-for="item in begin.group"
              :key="item.id"
              :label="item.name"
              :value="[item.id, item.orgCodeNumber]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSelect(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <div class="title">
        <h3>列表</h3>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          round
          size="mini"
          @click="openSet"
        >
          设置检验周期
        </el-button>
      </div>
    </el-row>
    <el-row :gutter="10">
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
          min-width="50"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="RFID编号"
          prop="toolCode"
          min-width="200"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所在智能柜"
          prop="deviceCode"
          min-width="180"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具类型"
          prop="typeModel"
          min-width="150"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属区县"
          prop="country"
          min-width="120"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属班组"
          prop="team"
          min-width="120"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="负责人及联系方式"
          prop="mainUserNameAndPhone"
          min-width="160"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验周期（年）"
          prop="yearInterval"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验到期时间"
          prop="expiredDate"
          min-width="180"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="逾期天数"
          prop="expiredDay"
          :formatter="expiredDay"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验次数"
          prop="checkAmount"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="当前状态"
          prop="status"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          min-width="150"
        >
          <template slot-scope="{ row }">
            <el-button type="success" size="mini" @click="confirmEdit(row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
  </div>
</template>
<script>
  import { getCheckQuipType, getCity } from "@/api/inputCommon";
  import { checkAll } from "@/api/check";
  export default {
    data() {
      return {
        loading: {
          all: false,
          list: false,
        },
        begin: {
          equip: [],
          city: [],
          country: [],
          group: [],
        },
        total: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          epc: "",
          toolTypeId: "",
          cityId: [],
          regionId: [],
          teamId: [],
        },
        list: [
          {
            code: "EZ36647009",
            site: "LS-657702334",
            type: "电容型验电器-10kV",
            country: "彭山供电局",
            group: "谢家供电所",
            duty: "张建利",
            phone: "13398078890",
            time: "半年",
            enTime: "2020-09-11 11:22:34",
            overTime: "2天",
            checkTimes: "4",
            typing: "已出库",
          },
        ],
        listLoading: false,
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
        var equip = await getCheckQuipType();
        this.begin.equip = equip.result;
        var city = await getCity(1);
        this.begin.city = city.result;
        await this.onSelect(1);
        this.loading.all = false;
      },
      async selectCountry() {
        var parentId = this.select.cityId;
        // parentId = Number(parentId);
        this.select.regionId = "";
        this.select.teamId = "";
        var country = await getCity(parentId[0]);
        this.begin.country = country.result;
      },
      async selectGroup() {
        var parentId = this.select.regionId;
        this.select.teamId = "";
        var group = await getCity(parentId[0]);
        this.begin.group = group.result;
      },
      async onSelect(type) {
        this.loading.list = true;
        var form;
        var data = {};
        form = this.select;
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.toolCode = form.epc;
        data.typeId = form.toolTypeId;
        data.cityOrgId = form.cityId[0] == undefined ? "" : form.cityId[0];
        data.countryOrgId =
          form.regionId[0] == undefined ? "" : form.regionId[0];
        data.stationOrgId = form.teamId[0] == undefined ? "" : form.teamId[0];
        var res = await checkAll(data);
        this.list = res.result.data;
        this.total = res.result.totalCount;
        this.loading.list = false;
      },
      openSet() {
        this.$router.push({
          name: "checkCycle",
        });
      },
      confirmEdit(row) {
        console.log(row);
        sessionStorage.setItem("checkAllId", row.toolId);
        this.$router.push("checkMate");
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
      expiredDay(row) {
        if (row.expiredDay <= 0) {
          return "0";
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    justify-content: space-between !important;
    align-items: center;
  }
</style>

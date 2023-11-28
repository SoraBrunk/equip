<template>
  <div class="test-container">
    <el-row :gutter="10">
      <el-form
        ref="select"
        :model="select"
        inline
        size="mini"
        class="demo-ruleForm"
        label-width="96px"
      >
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
        <el-form-item label="检验日期：">
          <el-date-picker
            v-model="select.checkTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSelect(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <el-table
        v-loading="loading.listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        fit
        size="mini"
      >
        <el-table-column
          show-overflow-tooltip
          label="序号"
          type="index"
          min-width=""
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属城市"
          prop="city"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属区县"
          prop="region"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属班组"
          prop="team"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检查人"
          prop="checkUserName"
          min-width="90"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检查日期"
          prop="checkDate"
          min-width="180"
        ></el-table-column>
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
  import { getCity } from "@/api/inputCommon";
  import { getBox, verification } from "@/api/scarp";
  export default {
    data() {
      return {
        loading: {
          all: false,
          listLoading: false,
        },
        begin: {
          city: [],
          country: [],
          group: [],
        },
        dialogVisible: false,
        select: {
          pageNum: 1,
          pageSize: 10,
          cityId: [],
          regionId: [],
          teamId: [],
          checkTime: "",
        },
        list: [],
        total: 0,
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
        this.loading.listLoading = true;
        var form;
        var data = {};
        form = this.select;
        var gmtStart = form.checkTime[0];
        var gmtEnd = form.checkTime[1];
        gmtStart = new Date(gmtStart).toLocaleDateString();
        gmtEnd = new Date(gmtEnd).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.cityId = form.cityId[1] == undefined ? "" : form.cityId[1];
        data.regionId = form.regionId[1] == undefined ? "" : form.regionId[1];
        data.teamId = form.teamId[1] == undefined ? "" : form.teamId[1];
        data.gmtStart = form.checkTime !== "" ? gmtStart : "";
        data.gmtEnd = form.checkTime !== "" ? gmtEnd : "";
        var res = await verification(data);
        this.list = res.result.data;
        this.total = res.result.totalCount;
        this.loading.listLoading = false;
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
  .dialogButton {
    text-align: center;
    margin-top: 20px;
  }
</style>

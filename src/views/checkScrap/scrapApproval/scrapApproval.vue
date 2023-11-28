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
          <el-select
            v-model="select.teamId"
            placeholder="请选择所属班组"
            @change="selectBox"
          >
            <el-option
              v-for="item in begin.group"
              :key="item.id"
              :label="item.name"
              :value="[item.id, item.orgCodeNumber]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在智能柜：" prop="deviceNumber">
          <el-select
            v-model="select.deviceNumber"
            placeholder="请选择所在智能柜"
          >
            <el-option
              v-for="item in begin.box"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="当前状态：" prop="status">
          <el-select v-model="select.status" placeholder="全部">
            <el-option label="未审批" value="0"></el-option>
            <el-option label="已审批" value="1"></el-option>
            <el-option label="已拒绝" value="2"></el-option>
          </el-select>
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
          label="RFID编号"
          prop="epc"
          min-width="200"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具名称"
          prop="toolName"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="智能柜编号"
          prop="deviceNumber"
          min-width="120"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具类型"
          prop="toolTypeName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属地市"
          prop="city"
          min-width="150"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属区县"
          prop="region"
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
          label="报废申请人"
          prop="scrapName"
          min-width="90"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="联系方式"
          prop="phone"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="报废原因"
          prop="scrappedMsg"
          min-width=""
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="审批状态"
          prop="approveStatus"
          :formatter="status"
          min-width=""
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          min-width="170"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.approveStatus === 0"
              type="warning"
              size="mini"
              @click="scrap(row)"
            >
              审批
            </el-button>
            <el-button
              type="success"
              size="mini"
              style=""
              @click="confirmEdit(row)"
            >
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
    <el-dialog
      title="审批"
      :visible.sync="dialogVisible"
      width="30%"
      top="25vh"
    >
      <div>
        <el-form ref="approval" :model="approval" inline>
          <el-form-item
            label="审批结果："
            prop="approvalResult"
            :rules="{
              required: true,
              message: '请选择审批结果',
              trigger: 'change',
            }"
          >
            <el-radio-group v-model="approval.approvalResult">
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="审批原因："
            prop="approvalReason"
            :rules="{
              required: true,
              message: '请填写原因',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="approval.approvalReason"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogButton">
        <el-button
          type="success"
          size="medium"
          :loading="loading.submitLoading"
          @click="submitReason('approval')"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getCheckQuipType, getCity } from "@/api/inputCommon";
  import { getBox, approval, scarp } from "@/api/scarp";
  export default {
    data() {
      return {
        loading: {
          all: false,
          submitLoading: false,
          listLoading: false,
        },
        begin: {
          equip: [],
          city: [],
          country: [],
          group: [],
          box: [],
        },
        approval: {
          approvalResult: "",
          approvalReason: "",
        },
        dialogVisible: false,
        total: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          epc: "",
          toolTypeId: "",
          cityId: [],
          regionId: [],
          teamId: [],
          deviceNumber: "",
          checkTime: "",
          status: "",
        },
        list: [],
        selectRow: {},
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
      async selectBox() {
        var orgId;
        if (this.select.teamId) {
          orgId = this.select.teamId[1];
        } else if (this.select.regionId) {
          orgId = this.select.regionId[1];
        } else if (this.select.cityId) {
          orgId = this.select.cityId[1];
        }
        var box = await getBox({
          orgCode: orgId,
        });
        this.begin.box = box.result;
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
        data.epc = form.epc;
        data.toolTypeId = form.toolTypeId;
        data.cityId = form.cityId[1] == undefined ? "" : form.cityId[1];
        data.regionId = form.regionId[1] == undefined ? "" : form.regionId[1];
        data.teamId = form.teamId[1] == undefined ? "" : form.teamId[1];
        data.deviceNumber = form.deviceNumber;
        data.gmtStart = form.checkTime !== "" ? gmtStart : "";
        data.gmtEnd = form.checkTime !== "" ? gmtEnd : "";
        data.status = form.status;
        var res = await approval(data);
        this.list = res.result.data;
        this.total = res.result.totalCount;
        this.loading.listLoading = false;
      },
      scrap(row) {
        this.dialogVisible = true;
        this.selectRow = row;
      },
      submitReason(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submitLoading = true;
            var params = {};
            params.id = this.selectRow.id;
            params.status = this.approval.approvalResult;
            params.msg = this.approval.approvalReason;
            scarp(params).then((res) => {
              this.loading.submit = false;
              this.dialogVisible = false;
              if (res.success) {
                this.$baseMessage("操作成功", "success");
                this.onSelect(1);
              } else {
                this.$baseMessage("操作失败", "error");
              }
            });
          } else {
            return false;
          }
        });
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
      status(row) {
        if (row.approveStatus === 0) {
          return "待审批";
        } else if (row.approveStatus === 1) {
          return "审批通过";
        } else if (row.approveStatus === 2) {
          return "审批拒绝";
        }
      },
      confirmEdit(row) {
        var scarp = [row.epc, 1];
        sessionStorage.setItem("scarpId", scarp);
        this.$router.push("scrapSelectDetails");
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

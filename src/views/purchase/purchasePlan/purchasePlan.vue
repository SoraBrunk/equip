<template>
  <div v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <el-form
        ref="select"
        :model="select"
        inline
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="关键字：" prop="purchasePlanName">
          <el-input
            v-model="select.purchasePlanName"
            placeholder="输入采购关键字查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购进度：" prop="statusId">
          <el-select v-model="select.statusId" placeholder="选择采购进度">
            <el-option label="已创建" value="1"></el-option>
            <el-option label="待审批" value="2"></el-option>
            <el-option label="审批未通过" value="3"></el-option>
            <el-option label="采购中" value="4"></el-option>
            <el-option label="入库中" value="5"></el-option>
            <el-option label="已入库" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            v-model="select.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到货时间：">
          <el-date-picker
            v-model="select.wareHouseTime"
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
    </el-row>
    <el-row :gutter="10">
      <div class="title">
        <h3>采购计划列表</h3>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          round
          size="mini"
          @click="openDiag(0)"
        >
          创建采购计划
        </el-button>
      </div>
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
          min-width="50"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="采购单位"
          prop="initOrgName"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="采购名称"
          prop="purchasePlanName"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具数量"
          prop="purchaseQuantity"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="进度"
          prop="currentStatus"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="发起人"
          prop="initUserName"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="创建时间"
          prop="createTime"
          min-width="140"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="到货时间"
          prop="wareHouseTime"
          min-width="140"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          min-width="250"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.currentStatusId === 1 || row.currentStatusId === 3"
              type="success"
              size="mini"
              style=""
              @click="confirmEdit(row)"
            >
              查看编辑
            </el-button>
            <el-button
              v-else
              type="success"
              size="mini"
              style=""
              @click="confirmEdit(row)"
            >
              查看明细
            </el-button>
            <el-button
              v-if="row.currentStatusId === 1"
              class=""
              type="primary"
              size="mini"
              @click="submitPlan(row)"
            >
              提交计划
            </el-button>
            <el-button
              v-if="row.currentStatusId === 3"
              class=""
              type="primary"
              size="mini"
              @click="submitPlan(row)"
            >
              重新提交
            </el-button>
            <el-button
              v-if="row.currentStatusId === 2"
              class="warningBtn"
              type="warning"
              size="mini"
              @click="approvalM(row)"
            >
              审批
            </el-button>
            <el-button
              v-if="row.currentStatusId === 3"
              type="success"
              size="mini"
              @click="returnReason(row)"
            >
              退回原因
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
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      top="30vh"
    >
      <div v-if="dialogType === 0">
        <el-form ref="create" :model="create" class="demo-ruleForm" inline>
          <el-form-item
            label="计划名称："
            prop="purchasePlanName"
            :rules="{
              required: true,
              message: '请输入计划名称',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="create.purchasePlanName"
              placeholder="请输入采购计划名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购类型："
            prop="purchasePlanType"
            :rules="{
              required: true,
              message: '请选择采购方式',
              trigger: 'change',
            }"
          >
            <el-radio-group v-model="create.purchasePlanType">
              <el-radio label="1">按需采购</el-radio>
              <el-radio label="2">备用采购</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="dialogType === 1" class="selectFinance">
        <div>费用类型：</div>
        <el-radio-group v-model="pickFinance">
          <el-radio
            v-for="(item, index) of org"
            :key="index"
            :label="item.id"
            style="display: block; margin-bottom: 10px"
          >
            {{ item.text }}财务
          </el-radio>
        </el-radio-group>
      </div>
      <div v-if="dialogType === 2">
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
              <el-radio label="4">通过</el-radio>
              <el-radio label="3">不通过</el-radio>
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
      <div v-if="dialogType === 3">{{ reason }}</div>
      <div v-if="dialogType !== 3" class="dialogButton">
        <el-button
          type="success"
          size="medium"
          :loading="loading.submit"
          @click="submitForm"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getPurchasePlanList,
    purchaseChange,
    slectOrg,
  } from "@/api/purchase";
  export default {
    data() {
      return {
        loading: {
          all: false,
          submit: false,
          listLoading: false,
        },
        title: "",
        dialogType: 3,
        org: [],
        dialogVisible: false,
        selectRow: "",
        total: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          purchasePlanName: "",
          statusId: "",
          createTime: "",
          wareHouseTime: "",
        },
        list: [],
        pickFinance: 3,
        elementLoadingText: "正在加载...",
        create: {
          currentStatusId: 1,
          purchasePlanName: "",
          purchasePlanType: "1",
        },
        approval: {
          approvalResult: "",
          approvalReason: "",
        },
        reason: "",
      };
    },
    created() {
      this.getType();
    },
    mounted() {},
    methods: {
      async getType() {
        this.loading.all = true;
        await this.onSelect(1);
        await slectOrg().then((res) => {
          this.org = res.result;
        });
        this.loading.all = false;
      },
      async onSelect(type) {
        this.loading.listLoading = true;
        var form;
        var data = {};
        form = this.select;
        var createTimeStart = form.createTime[0];
        var createTimeEnd = form.createTime[1];
        createTimeStart = new Date(createTimeStart).toLocaleDateString();
        createTimeEnd = new Date(createTimeEnd).toLocaleDateString();
        var wareHouseTimeStart = form.wareHouseTime[0];
        var wareHouseTimeEnd = form.wareHouseTime[1];
        wareHouseTimeStart = new Date(wareHouseTimeStart).toLocaleDateString();
        wareHouseTimeEnd = new Date(wareHouseTimeEnd).toLocaleDateString();
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.purchasePlanName = form.purchasePlanName;
        data.statusId = form.statusId;
        data.createTimeStart = form.createTime !== "" ? createTimeStart : "";
        data.createTimeEnd = form.createTime !== "" ? createTimeEnd : "";
        data.wareHouseTimeStart =
          form.wareHouseTime !== "" ? wareHouseTimeStart : "";
        data.wareHouseTimeEnd =
          form.wareHouseTime !== "" ? wareHouseTimeEnd : "";
        var res = await getPurchasePlanList(data);
        this.list = res.result.data;
        this.total = res.result.totalCount;
        this.loading.listLoading = false;
      },
      openDiag(type) {
        this.dialogVisible = true;
        this.dialogType = type;
        if (type === 0) {
          this.title = "创建采购计划";
        } else if (type === 1) {
          this.title = "提交采购计划";
        } else if (type === 2) {
          this.title = "审批";
        } else if (type === 3) {
          this.title = "退回原因";
        }
      },
      submitForm() {
        if (this.dialogType === 0) {
          this.$refs["create"].validate((valid) => {
            if (valid) {
              this.loading.submit = true;
              var data;
              data.currentStatusId = 1;
              data.pickFinance = pickFinance;
              purchaseChange(data).then((res) => {
                this.loading.submit = false;
                this.dialogVisible = false;
                if (res.success) {
                  this.$baseMessage("操作成功", "success");
                  this.onSelect(2);
                } else {
                  this.$baseMessage("操作失败", "error");
                }
              });
            } else {
              return false;
            }
          });
        } else if (this.dialogType === 1) {
          this.loading.submit = true;
          var data = this.create;
          data.currentStatusId = 2;
          data.purchasePlanId = this.selectRow.purchasePlanId;
          data.purchasePlanName = this.selectRow.purchasePlanName;
          purchaseChange(data).then((res) => {
            this.loading.submit = false;
            this.dialogVisible = false;
            if (res.success) {
              this.$baseMessage("操作成功", "success");
              this.onSelect(2);
            } else {
              this.$baseMessage("操作失败", "error");
            }
          });
        } else if (this.dialogType === 2) {
          this.$refs["approval"].validate((valid) => {
            if (valid) {
              this.loading.submit = true;
              var data = {};
              data.currentStatusId = this.approval.approvalResult;
              data.purchasePlanId = this.selectRow.purchasePlanId;
              data.remark = this.approval.approvalReason;
              data.purchasePlanName = this.selectRow.purchasePlanName;
              purchaseChange(data).then((res) => {
                this.loading.submit = false;
                this.dialogVisible = false;
                if (res.success) {
                  this.$baseMessage("操作成功", "success");
                  this.onSelect(2);
                } else {
                  this.$baseMessage("操作失败", "error");
                }
              });
            } else {
              return false;
            }
          });
        } else if (this.dialogType === 3) {
          this.reason = this.selectRow.remark;
        }
      },
      submitPlan(row) {
        this.openDiag(1);
        this.selectRow = row;
      },
      approvalM(row) {
        this.openDiag(2);
        this.selectRow = row;
      },
      returnReason(row) {
        this.openDiag(3);
        this.selectRow = row;
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
    display: flex;
    justify-content: space-between !important;
    align-items: center;
  }
  .demo-ruleForm {
    margin: 0 auto !important;
  }
  .dialogButton {
    text-align: center;
    margin-top: 20px;
  }
  .selectFinance {
    display: flex;
    > div:first-child {
      margin: 0 10px;
    }
  }
</style>

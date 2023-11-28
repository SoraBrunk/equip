<template>
  <div v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <el-form
        ref="select"
        :model="select"
        class="demo-ruleForm"
        inline
        size="mini"
      >
        <el-form-item label="工器具类型及型号：" prop="toolTypeId">
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
        <el-form-item>
          <el-button type="success" @click="onSelect(1)">查询</el-button>
        </el-form-item>
      </el-form>
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
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具种类及规格型号"
          prop="name"
          min-width="200"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具编码"
          prop="code"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="检验周期（年）"
          prop="inspectionInterval"
          :formatter="inspectionInterval"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          width=""
        >
          <template slot-scope="{ row }">
            <el-button type="success" size="mini" @click="confirmEdit(row)">
              设置检验周期
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
      title="设置检验周期"
      :visible.sync="dialogVisible"
      width="35%"
      top="30vh"
    >
      <div class="input_label">
        <el-form ref="ruleForm" :model="ruleForm" inline>
          <el-form-item
            label="设置检验周期："
            prop="setTime"
            :rules="{
              required: true,
              message: '请填写检验周期',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="ruleForm.setTime"
              type="number"
              min="0"
              max="5"
              size="mini"
              style="width: 200px"
              @input="numberChange"
            ></el-input>
          </el-form-item>
          <span style="margin-top: 10px; display: inline-block">（年）</span>
          <div class="dialogButton">
            <el-button
              type="success"
              size="medium"
              :loading="loading.submit"
              @click="submitTime('ruleForm')"
            >
              提交
            </el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getCheckQuipType } from "@/api/inputCommon";
  import { checkInspectionInterval, changeTime } from "@/api/check";
  export default {
    data() {
      return {
        loading: {
          all: false,
          list: false,
          submit: false,
        },
        begin: {
          equip: [],
        },
        select: {
          pageNum: 1,
          pageSize: 10,
          toolTypeId: "",
        },
        list: [],
        total: 0,
        selectRow: {},
        ruleForm: {
          setTime: "",
        },
        dialogVisible: false,
        elementLoadingText: "正在加载...",
      };
    },
    created(e) {
      this.getType();
    },
    mounted() {},
    methods: {
      async getType() {
        this.loading.all = true;
        var equip = await getCheckQuipType();
        this.begin.equip = equip.result;
        await this.onSelect(1);
        this.loading.all = false;
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
        data.typeId = form.toolTypeId;
        var res = await checkInspectionInterval(data);
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
      confirmEdit(row) {
        this.dialogVisible = true;
        this.selectRow = row;
      },
      inspectionInterval(row) {
        if (row.inspectionInterval) {
          var year = row.inspectionInterval;
          year = (year / 365).toFixed(1);
          return year;
        }
      },
      submitTime(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true;
            var data = {};
            data.typeId = this.selectRow.id;
            data.yearInterval = this.ruleForm.setTime;
            console.log(data);
            changeTime(data).then((res) => {
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
      },
      numberChange() {
        if (this.ruleForm.setTime > 5) {
          this.ruleForm.setTime = 5;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .input_label {
    display: flex;
    align-items: center;
  }
  .dialogButton {
    margin-top: 40px;
    text-align: center;
  }
</style>

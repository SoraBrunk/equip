<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div
          class="borde"
          style="overflow: auto; height: 70vh; padding-right: 0"
        >
          <el-input v-model="select" placeholder="搜索" class="ridus">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div style="margin-top: 10px">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="vertical"
              @select="handleSelect"
            >
              <el-menu-item v-for="(item, i) of list" :key="i" :index="i">
                <span>处理中心</span>
                <i
                  v-if="activeIndex === i"
                  class="el-icon-delete"
                  style="margin-left: 60%"
                ></i>
              </el-menu-item>
            </el-menu>
          </div>
          <el-button
            type="primary"
            size="medium"
            style="width: 100%; margin-top: 20px"
            @click="dialogVisible = true"
          >
            新增角色
          </el-button>
        </div>
      </el-col>
      <el-col :span="18" style="">
        <div
          class="borde"
          style="border-left: 3px solid #f7f7f7; overflow: auto; height: 70vh"
        >
          <el-row>
            <div class="mainTitle">
              <h2 style="margin: 0">工器具配置明细</h2>
            </div>
          </el-row>
          <div class="title">
            <h3>菜单权限</h3>
          </div>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkComprehensive.all"
                :indeterminate="checkGroup.checkComprehensive.isIndeterminate"
                @change="checkComprehensiveAllChange"
              >
                <h3>综合概况</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkComprehensive.checkLable"
                class="checkboxUnit"
                @change="checkComprehensiveChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkComprehensive.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkPurchase.all"
                :indeterminate="checkGroup.checkPurchase.isIndeterminate"
                @change="checkPurchaseAllChange"
              >
                <h3>采购验收</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkPurchase.checkLable"
                class="checkboxUnit"
                @change="checkPurchaseChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkPurchase.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkTest.all"
                :indeterminate="checkGroup.checkTest.isIndeterminate"
                @change="checkTestAllChange"
              >
                <h3>检验与试验</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkTest.checkLable"
                class="checkboxUnit"
                @change="checkTestChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkTest.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkUsed.all"
                :indeterminate="checkGroup.checkUsed.isIndeterminate"
                @change="checkUsedAllChange"
              >
                <h3>使用与保管</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkUsed.checkLable"
                class="checkboxUnit"
                @change="checkUsedChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkUsed.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkScarp.all"
                :indeterminate="checkGroup.checkScarp.isIndeterminate"
                @change="checkScarpAllChange"
              >
                <h3>检查与报废</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkScarp.checkLable"
                class="checkboxUnit"
                @change="checkScarpChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkScarp.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkSystem.all"
                :indeterminate="checkGroup.checkSystem.isIndeterminate"
                @change="checkSystemAllChange"
              >
                <h3>检查与报废</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkSystem.checkLable"
                class="checkboxUnit"
                @change="checkSystemChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkSystem.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <div class="title">
            <h3>审批权限</h3>
          </div>
          <el-row>
            <div class="checkboxGroup">
              <el-checkbox
                v-model="checkGroup.checkApproval.all"
                :indeterminate="checkGroup.checkApproval.isIndeterminate"
                @change="checkApprovalAllChange"
              >
                <h3>审批</h3>
              </el-checkbox>
              <el-checkbox-group
                v-model="checkGroup.checkApproval.checkLable"
                class="checkboxUnit"
                @change="checkApprovalChange"
              >
                <el-checkbox
                  v-for="(item, i) of checkGroup.checkApproval.lable"
                  :key="i"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row>
            <div style="text-align: center; margin-top: 20px">
              <el-button
                size="medium"
                type="success"
                class="buttonClass"
                @click="save"
              >
                保存
              </el-button>
              <el-button
                size="medium"
                type="primary"
                class="buttonClass"
                @click="clear"
              >
                重置
              </el-button>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      top="25vh"
    >
      <div class="input_label">
        角色名称：
        <el-input
          v-model="input1"
          label="检验周期："
          placeholder="请输入角色名称"
          style="width: 220px"
        >
          <!-- <div style="position: absolute; z-index: 999">年</div> -->
        </el-input>
      </div>
      <div class="dialogButton">
        <el-button
          type="success"
          size="medium"
          class="buttonClass"
          @click="submitForm"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import VabSticky from "@/components/VabSticky";
  export default {
    data() {
      return {
        select: "",
        dialogVisible: false,
        elementLoadingText: "正在加载...",
        activeIndex: 0,
        list: [
          {
            type: "安全帽-黄色Y-普通型",
            code: "DL-00238",
            number: 112,
          },
          {
            type: "安全帽-黄色Y-普通型",
            code: "DL-00238",
            number: 112,
          },
          {
            type: "安全帽-黄色Y-普通型",
            code: "DL-00238",
            number: 112,
          },
          {
            type: "安全帽-黄色Y-普通型",
            code: "DL-00238",
            number: 112,
          },
        ],
        checkGroup: {
          checkComprehensive: {
            all: false,
            isIndeterminate: false,
            lable: [
              "统计分析",
              "工器具总览",
              "工器具柜可视化",
              "班组价值分析",
              "作业分析",
              "领用分析",
              "工器具路径分析",
              "供应商评价指数",
              "检测机构价值分析",
            ],
            checkLable: [],
          },
          checkPurchase: {
            all: false,
            isIndeterminate: false,
            lable: ["采购计划", "增量入库台账", "班组基本配置"],
            checkLable: [],
          },
          checkTest: {
            all: false,
            isIndeterminate: false,
            lable: ["检验总览", "检验台账"],
            checkLable: [],
          },
          checkUsed: {
            all: false,
            isIndeterminate: false,
            lable: ["轨迹跟踪", "领使用台账"],
            checkLable: [],
          },
          checkScarp: {
            all: false,
            isIndeterminate: false,
            lable: ["报废审批", "报废台账", "检查台账"],
            checkLable: [],
          },
          checkSystem: {
            all: false,
            isIndeterminate: false,
            lable: ["用户管理", "角色权限管理", "组织架构管理"],
            checkLable: [],
          },
          checkApproval: {
            all: false,
            isIndeterminate: false,
            lable: ["采购审批", "报废审批"],
            checkLable: [],
          },
        },
      };
    },
    created() {},
    mounted() {},
    methods: {
      writeEdit(row) {},
      deleteEdit(row) {},
      addQuip() {},
      handleSelect(key) {
        this.activeIndex = key;
      },
      checkComprehensiveAllChange(val) {
        this.checkGroup.checkComprehensive.checkLable = val
          ? this.checkGroup.checkComprehensive.lable
          : [];
        this.checkGroup.checkComprehensive.isIndeterminate = false;
      },
      checkComprehensiveChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkComprehensive.all =
          checkedCount === this.checkGroup.checkComprehensive.lable.length;
        this.checkGroup.checkComprehensive.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkComprehensive.lable.length;
      },
      checkPurchaseAllChange(val) {
        this.checkGroup.checkPurchase.checkLable = val
          ? this.checkGroup.checkPurchase.lable
          : [];
        this.checkGroup.checkPurchase.isIndeterminate = false;
      },
      checkPurchaseChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkPurchase.all =
          checkedCount === this.checkGroup.checkPurchase.lable.length;
        this.checkGroup.checkPurchase.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkPurchase.lable.length;
      },
      checkTestAllChange(val) {
        this.checkGroup.checkTest.checkLable = val
          ? this.checkGroup.checkTest.lable
          : [];
        this.checkGroup.checkTest.isIndeterminate = false;
      },
      checkTestChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkTest.all =
          checkedCount === this.checkGroup.checkTest.lable.length;
        this.checkGroup.checkTest.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkTest.lable.length;
      },
      checkUsedAllChange(val) {
        this.checkGroup.checkUsed.checkLable = val
          ? this.checkGroup.checkUsed.lable
          : [];
        this.checkGroup.checkUsed.isIndeterminate = false;
      },
      checkUsedChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkUsed.all =
          checkedCount === this.checkGroup.checkUsed.lable.length;
        this.checkGroup.checkUsed.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkUsed.lable.length;
      },
      checkScarpAllChange(val) {
        this.checkGroup.checkScarp.checkLable = val
          ? this.checkGroup.checkScarp.lable
          : [];
        this.checkGroup.checkScarp.isIndeterminate = false;
      },
      checkScarpChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkScarp.all =
          checkedCount === this.checkGroup.checkScarp.lable.length;
        this.checkGroup.checkScarp.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkScarp.lable.length;
      },
      checkSystemAllChange(val) {
        this.checkGroup.checkSystem.checkLable = val
          ? this.checkGroup.checkSystem.lable
          : [];
        this.checkGroup.checkSystem.isIndeterminate = false;
      },
      checkSystemChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkSystem.all =
          checkedCount === this.checkGroup.checkSystem.lable.length;
        this.checkGroup.checkSystem.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkSystem.lable.length;
      },
      checkApprovalAllChange(val) {
        this.checkGroup.checkApproval.checkLable = val
          ? this.checkGroup.checkApproval.lable
          : [];
        this.checkGroup.checkApproval.isIndeterminate = false;
      },
      checkApprovalChange(value) {
        var checkedCount = value.length;
        this.checkGroup.checkApproval.all =
          checkedCount === this.checkGroup.checkApproval.lable.length;
        this.checkGroup.checkApproval.isIndeterminate =
          checkedCount > 0 &&
          checkedCount < this.checkGroup.checkApproval.lable.length;
      },
      save() {},
      clear() {
        for (var index in this.checkGroup) {
          this.checkGroup[index].checkLable = [];
          this.checkGroup[index].isIndeterminate = false;
          this.checkGroup[index].all = false;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .borde {
    padding: 10px;
  }
  .input_label {
    text-align: center;
  }
  .dialogButton {
    text-align: center;
    margin-top: 40px;
  }
  ::v-deep {
    .ridus .el-input__inner {
      border-radius: 30px !important;
    }
  }
  .mainTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f7f7f7;
    padding-bottom: 20px;
  }
  .title {
    color: #00b660;
    border-bottom: 2px solid #f7f7f7;
  }
  .el-menu {
    border-right: 0 !important;
  }
  .el-menu-item {
    border-left: 5px solid #fff;
  }
  .el-menu-item.is-active,
  .el-menu-item:focus {
    color: #00b660;
    border-left: 5px solid #00b660 !important;
    background: #e6f8ef;
  }
  .el-menu-item:hover {
    border-left: 5px solid #e6f8ef;
  }
  .checkboxGroup {
    margin-bottom: 10px;
  }
  .checkboxUnit {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    > .el-checkbox {
      flex: 0 0 25%;
      margin: 10px 0;
    }
  }
  .buttonClass {
    padding: 10px 40px;
  }
</style>

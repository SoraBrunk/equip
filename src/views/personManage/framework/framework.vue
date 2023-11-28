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
          123
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

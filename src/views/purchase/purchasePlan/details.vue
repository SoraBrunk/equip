<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="borde">
          <h3 style="margin: 0">眉山市供电局</h3>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <span style="font-weight: bolder">导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="borde" style="border: 3px solid #f7f7f7">
          <el-row>
            <div class="title">
              <h3 style="margin: 0">工器具配置明细</h3>
            </div>
          </el-row>
          <el-row>
            <el-form
              ref="select"
              :model="select"
              inline
              size="mini"
              class="demo-ruleForm"
            >
              <el-form-item label="工器具种类及其规格型号：" prop="type">
                <el-select v-model="select.type" placeholder="选择工器具类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="onSelect">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-table
              v-loading="listLoading"
              :data="list"
              :element-loading-text="elementLoadingText"
              fit
              size="mini"
            >
              <el-table-column
                show-overflow-tooltip
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                label="工器具种类及规格型号"
                prop="type"
                min-width="150"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                label="工器具编码"
                prop="code"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                label="采购数量"
                prop="number"
              ></el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: "",
        listLoading: false,
        elementLoadingText: "正在加载...",
        data: [
          {
            label: "一级 1",
            children: [
              {
                label: "二级 1-1",
                children: [
                  {
                    label: "三级 1-1-1",
                  },
                ],
              },
            ],
          },
        ],
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
        ],
      };
    },
    created() {},
    mounted() {},
    methods: {
      writeEdit(row) {},
      deleteEdit(row) {},
      addQuip() {},
    },
  };
</script>
<style lang="scss" scoped>
  .borde {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .el-menu {
    border-right: 0 !important;
  }
</style>

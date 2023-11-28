<template>
  <div class="test-container">
    <el-row gutter="10">
      <el-form
        ref="select"
        :model="select"
        inline
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="关键字：" prop="keyWords">
          <el-input
            v-model="select.keyWords"
            placeholder="请输入关键字查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属地市：" prop="city">
          <el-select v-model="select.city" placeholder="请选择所属地市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区县：" prop="country">
          <el-select v-model="select.country" placeholder="请选择所属区县">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班组：" prop="group">
          <el-select v-model="select.group" placeholder="请选择所属班组">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色：" prop="character">
          <el-select v-model="select.character" placeholder="请选择角色类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSelect">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row gutter="10">
      <div class="title">
        <h3>用户列表</h3>
        <div>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            round
            size="mini"
            @click="openDiag(0)"
          >
            新增
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-delete"
            round
            size="mini"
            @click="deleteUser"
          >
            删除
          </el-button>
        </div>
      </div>
    </el-row>
    <el-row gutter="10">
      <el-table
        v-loading="listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        fit
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="用户名"
          prop="username"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="姓名"
          prop="name"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="联系方式"
          prop="phone"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属地市"
          prop="city"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属区县"
          prop="country"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属班组"
          prop="group"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="角色"
          prop="character"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="创建时间"
          prop="createTime"
          min-width="160"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="是否开启"
          prop="isOPen"
          min-width=""
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.isOpen"
              type="success"
              size="mini"
              style=""
              @click="open(row)"
            >
              已开启
            </el-button>
            <el-button v-else type="danger" size="mini" @click="open(row)">
              已禁用
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          min-width="180"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="edit(row)">
              编辑
            </el-button>
            <el-button type="success" size="mini" @click="setPassword(row)">
              修改密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row gutter="10">
      <el-pagination
        :total="400"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage4"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      top="20vh"
    >
      <div v-if="dialogType === 0">
        <el-form
          ref="add"
          :model="add"
          :rules="createRules"
          class="demo-ruleForm"
          inline
          label-width="120px"
        >
          <el-form-item
            label="用户名："
            prop="username"
            :rules="{
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            }"
          >
            <el-input v-model="add.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item
            label="用户性名："
            prop="name"
            :rules="{
              required: true,
              message: '请输入用户性名',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="add.name"
              placeholder="请输入用户性名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系方式："
            prop="phone"
            :rules="{
              required: true,
              message: '请输入联系方式',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="add.phone"
              placeholder="请输入联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属单位："
            prop="company"
            :rules="{
              required: true,
              message: '请选择所属单位',
              trigger: 'change',
            }"
          >
            <el-select v-model="add.company" placeholder="请选择用户所属单位">
              <input type="text" />
              <!-- <el-option value="0">
              </el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="角色："
            prop="character"
            :rules="{
              required: true,
              message: '请选择角色',
              trigger: 'change',
            }"
          >
            <el-select v-model="add.character" placeholder="请选择用户角色">
              <el-option label="按需采购" value="0"></el-option>
              <el-option label="备用采购" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="dialogType === 2">
        <el-form
          ref="passWord"
          :model="passWord"
          :rules="passWordRules"
          inline
          label-width="100px"
        >
          <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="passWord.newPassword" type="passWord"></el-input>
          </el-form-item>
          <el-form-item label="再次输入：" prop="rPassword">
            <el-input v-model="passWord.rPassword" type="passWord"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="dialogType === 3">
        <div class="tipImg">
          <img src="@/assets/comparison/right.jpg" alt="" />
        </div>
        <div class="footer">
          <div style="margin-bottom: 30px">是否确认删除该用户？</div>
          <el-button type="success" size="medium" @click="deleteConfirm">
            确 定
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="dialogVisible = false"
          >
            取 消
          </el-button>
        </div>
      </div>
      <div v-if="dialogType !== 3" class="dialogButton">
        <el-button type="success" size="medium" @click="submitForm">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.passWord.newPassword !== "") {
            this.$refs.ruleForm.validateField("newPassword");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.passWord.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        title: "",
        dialogType: 0,
        dialogVisible: false,
        select: {
          keyWords: "",
          city: "",
          country: "",
          group: "",
          character: "",
        },
        list: [
          {
            username: "superadmin",
            name: "王松",
            phone: "13398789088",
            city: "眉山市供电局",
            country: "东坡区供电局",
            group: "运检班组",
            character: "部门负责人",
            createTime: "2222-22-22 12:12:12",
            isOpen: true,
          },
          {
            username: "superadmin",
            name: "王松",
            phone: "13398789088",
            city: "眉山市供电局",
            country: "东坡区供电局",
            group: "运检班组",
            character: "部门负责人",
            createTime: "2222-22-22 12:12:12",
            isOpen: false,
          },
        ],
        add: {
          username: "",
          name: "",
          phone: "",
          company: "",
          character: "",
        },
        passWord: {
          newPassword: "",
          rPassword: "",
        },
        passWordRules: {
          newPassword: [{ validator: validatePass, trigger: "blur" }],
          rPassword: [{ validator: validatePass2, trigger: "blur" }],
        },
        listLoading: false,
        pickFinance: "",
        elementLoadingText: "正在加载...",
      };
    },
    created() {},
    methods: {
      onSelect() {},
      openDiag(type) {
        this.dialogVisible = true;
        this.dialogType = type;
        if (type === 0) {
          this.title = "新增用户";
        } else if (type === 1) {
          this.title = "编辑";
        } else if (type === 2) {
          this.title = "修改密码";
        } else if (type === 3) {
          this.title = "温馨提示";
        }
      },
      submitForm() {
        if (this.dialogType === 0) {
          this.$refs["create"].validate((valid) => {
            if (valid) {
              alert("提交成功");
            } else {
              return false;
            }
          });
        } else if (this.dialogType === 2) {
          this.$refs["approval"].validate((valid) => {
            if (valid) {
              alert("提交成功");
            } else {
              return false;
            }
          });
        }
      },
      edit(row) {},
      setPassword(row) {
        this.openDiag(2);
      },
      open(row) {
        console.log(row);
      },
      deleteUser() {
        this.openDiag(3);
      },
      deleteConfirm() {},
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
  .tipImg {
    width: 30%;
    height: 30%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    text-align: center;
    margin-top: 20px;
  }
</style>

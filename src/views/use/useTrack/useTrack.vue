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
        <el-form-item label="库存状态：" prop="status">
          <el-select v-model="select.status" placeholder="全部">
            <el-option label="库存中" value="1"></el-option>
            <el-option label="已出库" value="2"></el-option>
            <el-option label="已报废" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库日期：">
          <el-date-picker
            v-model="select.checkTime"
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
    <el-row v-if="type === 'list'" :gutter="10">
      <div class="title">
        <h3>列表</h3>
        <el-button
          type="primary"
          icon="el-icon-map-location"
          round
          size="mini"
          @click="type = 'map'"
        >
          地图模式
        </el-button>
      </div>
    </el-row>
    <el-row v-if="type === 'list'" :gutter="10">
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
          label="工器具ID"
          prop="epc"
          min-width="200"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="工器具种类及其规格型号"
          prop="toolTypeName"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属地市"
          prop="city"
          min-width="140"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属区县"
          prop="region"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="所属班组"
          prop="team"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="责任人"
          prop="maintainUserName"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="联系方式"
          prop="maintainUserPhone"
          min-width="120"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="库存状态"
          prop="status"
          :formatter="status"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="领用人员"
          prop="operateUserName"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="联系方式"
          prop="operateUserPhone"
          min-width="120"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          min-width="100"
        >
          <template slot-scope="{ row }">
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
    <el-row v-if="type === 'list'" :gutter="10">
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
    <el-row v-if="type === 'map'">
      <div style="position: relative">
        <baidu-map
          class="map"
          style="height: 90vh"
          :center="{ lng: map.point[0].lng, lat: map.point[0].lat }"
          :zoom="15"
          :map-click="map.click"
        >
          <bm-marker
            v-for="(item, index) of map.point"
            :key="index"
            :position="{ lng: item.lng, lat: item.lat }"
            :icon="{
              url: require('@/assets/map_images/unSelect.png'),
              size: { width: 60, height: 60 },
            }"
            @click="infoWindowOpen(index)"
          >
            <bm-info-window
              :show="pointShow[index]"
              @close="infoWindowClose(index)"
              @open="infoWindowOpen(index)"
            >
              <div class="tip">
                <el-image
                  style="width: 30px; height: 30px"
                  :src="item.toolImg"
                  fit="['fill', 'contain', 'cover', 'none', 'scale-down']"
                ></el-image>
                <span>{{ item.toolTypeName }}</span>
              </div>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
        <div class="returnList" @click="type = 'list'">
          <el-image
            style="width: 30px; height: 20px"
            :src="require('@/assets/map_images/list.png')"
            fit="['fill', 'contain', 'cover', 'none', 'scale-down']"
          ></el-image>
          <div>列表</div>
        </div>
        <div v-if="listShow" class="details">
          <div class="mode">
            <span>工器具ID：</span>
            <div>{{ selectRow.epc }}</div>
          </div>
          <div class="mode">
            <span>工器具类型及其型号：</span>
            <div>{{ selectRow.toolTypeName }}</div>
          </div>
          <div class="mode">
            <span>经纬度：</span>
            <div>{{ selectRow.lng }}</div>
            <div>{{ selectRow.lat }}</div>
          </div>
          <div class="mode">
            <span>当前位置：</span>
            <div>{{ selectRow.epc }}</div>
          </div>
          <div class="mode">
            <span>库存状态：</span>
            <div>
              {{
                selectRow.status == 1
                  ? "库存中"
                  : selectRow.status == 2
                  ? "出库"
                  : "报废"
              }}
            </div>
          </div>
          <div class="mode">
            <span>操作人员：</span>
            <div>{{ selectRow.operateUserName }}</div>
          </div>
          <div class="mode">
            <span>联系方式：</span>
            <div>{{ selectRow.phone }}</div>
          </div>
          <el-button
            type="success"
            size="medium"
            class="btn"
            @click="confirmMapEdit"
          >
            查看详情
          </el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import { getCheckQuipType, getCity } from "@/api/inputCommon";
  import { getTrackList, getTrackListMap } from "@/api/use";
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
        total: 0,
        select: {
          pageNum: 1,
          pageSize: 10,
          epc: "",
          toolTypeId: "",
          cityId: [],
          regionId: [],
          teamId: [],
          status: "",
          checkTime: "",
        },
        list: [],
        selectRow: {},
        listShow: true,
        elementLoadingText: "正在加载...",
        type: "list",
        pointShow: [],
        map: {
          click: false,
          point: [],
        },
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
        data.gmtStart = form.checkTime !== "" ? gmtStart : "";
        data.gmtEnd = form.checkTime !== "" ? gmtEnd : "";
        data.status = form.status;
        var res = await getTrackList(data);
        var map = await getTrackListMap(data);
        this.list = res.result.data;
        this.map.point = map.result;
        var pointShow = [];
        for (var index in map.result) {
          pointShow[index] = false;
        }
        pointShow[0] = true;
        this.selectRow = map.result[0];
        this.pointShow = pointShow;
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
      status(row) {
        if (row.status === 1) {
          return "库存中";
        } else if (row.status === 2) {
          return "已出库";
        } else if (row.status === 3) {
          return "已报废";
        }
      },
      confirmEdit(row) {
        // var scarp = [row.epc, 2];
        sessionStorage.setItem("userDetailsId", row.epc);
        this.$router.push("useDetails");
      },
      confirmMapEdit() {
        // var scarp = [row.epc, 2];
        sessionStorage.setItem("userDetailsId", this.selectRow.epc);
        this.$router.push("useDetails");
      },
      infoWindowClose(index) {
        this.pointShow.splice(index, 1, false);
        this.listShow = false;
      },
      infoWindowOpen(index) {
        this.pointShow.splice(index, 1, true);
        this.selectRow = this.map.point[index];
        this.listShow = true;
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
  .returnList {
    position: absolute;
    top: 5%;
    left: 5%;
    padding: 15px 20px;
    background: #fff;
    box-shadow: 2px 2px 5px 0px rgba(162, 162, 162, 0.35);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    div {
      color: #00b660;
      font-weight: bold;
      margin-top: 2px;
    }
  }
  .details {
    position: absolute;
    top: 0;
    right: 10px;
    height: 90vh;
    background: #fff;
    padding: 30px 30px 0 30px;
  }
  .mode {
    margin-bottom: 20px;
    > span {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    div {
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .btn {
    margin-top: 30px;
    width: 100%;
  }
  .tip {
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      font-weight: bold;
      margin-left: 30px;
    }
  }
</style>


<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button size="small" icon="el-icon-plus" plain @click="handleAddFactory">添加工厂</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple1"
            @click="handleDeleteFactory"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          class="chain-table"
          v-loading="loading"
          :data="factoryList"
          @selection-change="handleFactorySelectionChange"
          @row-click="handleFactoryRowClick"
          highlight-current-row
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="工厂列表" align="center" prop="factoryName" />
          <el-table-column align="center">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateFactory(scope.row)"
                v-hasPermi="['main:factory:edit']"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteFactory(scope.row)"
                v-hasPermi="['main:factory:remove']"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="factoryTotal>0"
          :total="factoryTotal"
          :page.sync="factoryQueryParams.pageNum"
          :limit.sync="factoryQueryParams.pageSize"
          @pagination="getFactoryList"
        />
      </el-col>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button
            size="small"
            icon="el-icon-plus"
            plain
            :disabled="add1"
            @click="handleAddBuilding"
          >添加楼宇</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple2"
            @click="handleDeleteBuilding"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          class="chain-table"
          v-loading="loading"
          :data="buildingList"
          @selection-change="handleBuildingSelectionChange"
          @row-click="handleBuildingRowClick"
          highlight-current-row
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="楼宇列表" align="center" prop="name" />
          <el-table-column align="center" width="250">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateBuilding(scope.row)"
                v-hasPermi="['main:building:edit']"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteBuilding(scope.row)"
                v-hasPermi="['main:building:remove']"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="buildingTotal>0"
          :total="buildingTotal"
          :page.sync="buildingQueryParams.pageNum"
          :limit.sync="buildingQueryParams.pageSize"
          @pagination="getBuildingList"
        />
      </el-col>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button
            size="small"
            icon="el-icon-plus"
            :disabled="add2"
            plain
            @click="handleAddFloor"
          >添加楼层</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple3"
            @click="handleDeleteFloor"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          class="chain-table"
          v-loading="loading"
          :data="floorList"
          @selection-change="handleFloorSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="楼层列表" align="center" prop="floorName" />
          <el-table-column align="center" width="180">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateFloor(scope.row)"
                v-hasPermi="['main:floor:edit']"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteFloor(scope.row)"
                v-hasPermi="['main:floor:remove']"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="floorTotal>0"
          :total="floorTotal"
          :page.sync="floorQueryParams.pageNum"
          :limit.sync="floorQueryParams.pageSize"
          @pagination="getFloorList"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  listFactory,
  delFactory,
  updateFactory,
  exportFactory
} from "@/api/main/factory";
import {
  listBuilding,
  getBuilding,
  delBuilding,
  exportBuilding
} from "@/api/main/building";
import { listFloor, delFloor, addFloor, updateFloor } from "@/api/main/floor";
import MyFactoryAdd from "@/views/main/factory/add";
import MyFactoryEdit from "@/views/main/factory/edit";
import MyBuildingAdd from "@/views/main/building/add";
import MyBuildingEdit from "@/views/main/building/edit";
import MyFloorAdd from "@/views/main/floor/add";
import MyFloorEdit from "@/views/main/floor/edit";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      loading: true,
      multiple1: true,
      multiple2: true,
      multiple3: true,
      add1: true,
      add2: true,
      factoryList: [],
      typeOptions: [],
      factoryQueryParams: {
        pageNum: 1,
        pageSize: 20,
        factoryName: "",
        address: "",
        createDateTime: "",
        description: "",
        factoryType: "",
        latitude: "",
        leader: "",
        longitude: "",
        phone: "",
        picture: "",
        province: "",
        tel: "",
        updateDateTime: ""
      },
      buildingQueryParams: {
        pageNum: 1,
        pageSize: 20,
        factoryId: 0
      },
      floorQueryParams: {
        pageNum: 1,
        pageSize: 20,
        floorName: "",
        buildingId: 0
      },
      buildingList: [],
      floorList: [],
      nowFactoryId: null,
      nowBuildingId: null,
      factoryTotal: 0,
      buildingTotal: 0,
      floorTotal: 0,
      layerId: "",
      layerInitWidth: 0,
      layerInitHeight: 0
    };
  },
  watch: {
    layerId: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    }
  },
  created() {
    this.getDicts("main_factory_type").then(response => {
      if (response.code == 200) {
        this.typeOptions = response.data;
      }
    });
    this.getFactoryList();
  },
  mounted() {
    window.addEventListener("resize", () => {
      let _layerId = this.layerId;
      if (_layerId == "") {
        return;
      }
      let layer = document.querySelector("#" + _layerId);
      if (layer != null) {
        utils.resizeLayer(_layerId, this.layerInitWidth, this.layerInitHeight);
      }
    });
  },
  methods: {
    getFactoryList() {
      //加载工厂数据
      this.loading = true;
      listFactory(this.factoryQueryParams).then(response => {
        if (response.code == 200) {
          this.factoryList = response.rows;
          this.factoryTotal = response.total;
          this.loading = false;
        }
      });
    },
    getBuildingList() {
      listBuilding(this.buildingQueryParams).then(response => {
        console.log(response);
        if (response.code == 200) {
          this.buildingList = response.rows;
          this.buildingTotal = response.total;
        }
      });
    },
    getFloorList() {
      listFloor(this.floorQueryParams).then(response => {
        this.floorList = response.rows;
        this.floorTotal = response.total;
      });
    },
    handleFactorySelectionChange(selection) {
      this.ids = selection.map(item => item.factoryId);
      this.multiple1 = !selection.length;
    },
    handleBuildingSelectionChange(selection) {
      this.ids = selection.map(item => item.buildingId);
      this.multiple2 = !selection.length;
    },
    handleFloorSelectionChange(selection) {
      this.ids = selection.map(item => item.floorId);
      this.multiple3 = !selection.length;
    },
    hidePhone(phone) {
      return mobileEncrypt(phone);
    },
    handleAddFactory() {
      var index = this.$layer.iframe({
        content: {
          content: MyFactoryAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增工厂信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    handleAddBuilding() {
      var index = this.$layer.iframe({
        content: {
          content: MyBuildingAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增楼宇信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    handleAddFloor() {
      var index = this.$layer.iframe({
        content: {
          content: MyFloorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增楼层信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdateFactory(row) {
      this.eid = row.factoryId;
      var index = this.$layer.iframe({
        content: {
          content: MyFactoryEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "编辑工厂信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDeleteFactory(row) {
      const factoryIds = row.factoryId || this.ids;
      this.$confirm(
        '是否确认删除工厂信息编号为"' + factoryIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delFactory(factoryIds);
        })
        .then(() => {
          this.getFactoryList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 修改按钮操作 */
    handleUpdateBuilding(row) {
      this.eid = row.buildingId;
      var index = this.$layer.iframe({
        content: {
          content: MyBuildingEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "编辑楼宇信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDeleteBuilding(row) {
      const buildingIds = row.buildingId || this.ids;
      this.$confirm(
        '是否确认删除楼宇数据编号为"' + buildingIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delBuilding(buildingIds);
        })
        .then(() => {
          this.getBuildingList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 修改按钮操作 */
    handleUpdateFloor(row) {
      this.eid = row.floorId;
      var index = this.$layer.iframe({
        content: {
          content: MyFloorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑楼层信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDeleteFloor(row) {
      const floorIds = row.floorId || this.ids;
      this.$confirm(
        '是否确认删除楼层数据编号为"' + floorIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delFloor(floorIds);
        })
        .then(() => {
          this.getFloorList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    handleFactoryRowClick(row) {
      //工厂行的点击事件
      this.buildingQueryParams.factoryId = row.factoryId;
      this.nowFactoryId = row.factoryId;
      this.nowBuildingId = null;
      this.add1 = false;
      this.add2 = true;
      this.floorTotal = 0;
      this.getBuildingList();
      this.floorList = [];
    },
    handleBuildingRowClick(row) {
      console.log(row);
      this.floorQueryParams.buildingId = row.buildingId;
      this.nowBuildingId = row.buildingId;
      this.add2 = false;
      this.getFloorList();
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button size="small" icon="el-icon-plus" plain @click="handleAddSys">添加传感器系统</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple1"
            @click="handleDeleteSys"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="systemList"
          class="chain-table"
          @selection-change="handleSysSelectionChange"
          @row-click="handleSysRowClick"
          highlight-current-row
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="传感器系统列表" align="center" prop="name" />
          <el-table-column align="center">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateSys(scope.row)"
                v-hasPermi="['display:sys:edit']"
                title="编辑"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteSys(scope.row)"
                v-hasPermi="['main:floor:remove']"
                title="删除"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="sysTotal>0"
          :total="sysTotal"
          :page.sync="sysQueryParams.pageNum"
          :limit.sync="sysQueryParams.pageSize"
          @pagination="getSysList"
        />
      </el-col>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button
            size="small"
            icon="el-icon-plus"
            plain
            :disabled="add1"
            @click="handleAddType"
          >添加传感器类型</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple2"
            @click="handleDeleteType"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          :data="transducertypeList"
          class="chain-table"
          @selection-change="handleTypeSelectionChange"
          @row-click="handleTypeRowClick"
          highlight-current-row
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="传感器类型列表" align="center" prop="name" />
          <el-table-column align="center">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateType(scope.row)"
                v-hasPermi="['display:transducertype:edit']"
                title="编辑"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteType(scope.row)"
                v-hasPermi="['main:transducertype:remove']"
                title="删除"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="typeTotal>0"
          :total="typeTotal"
          :page.sync="typeQueryParams.pageNum"
          :limit.sync="typeQueryParams.pageSize"
          @pagination="getTypeList"
        />
      </el-col>
      <el-col :span="8" style="overflow:hidden">
        <div class="folder">
          <el-button
            size="small"
            icon="el-icon-plus"
            plain
            :disabled="add2"
            @click="handleAddSensor"
          >添加传感器</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            :disabled="multiple3"
            @click="handleDeleteSensor"
            plain
          >批量删除</el-button>
        </div>
        <el-table
          class="chain-table"
          :data="transducerList"
          @selection-change=" handleSensorSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="传感器列表" align="center">
            <template slot-scope="scope">
              <template v-for="(item,i) in buildingList">
                <div v-if="item.factoryId == scope.row.factoryId" :key="i">{{item.name}}</div>
              </template>
              传感器编号：{{scope.row.deviceNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <i
                class="el-icon-edit chain-icon"
                @click="handleUpdateSensor(scope.row)"
                v-hasPermi="['display:transducer:edit']"
                title="编辑"
              ></i>
              <i
                class="el-icon-delete chain-icon"
                @click="handleDeleteSensor(scope.row)"
                v-hasPermi="['main:transducer:remove']"
                title="删除"
              ></i>
              <i
                class="el-icon-s-claim chain-icon"
                @click="handleConfigPoint(scope.row)"
                title="配置分数"
              ></i>
              <i class="el-icon-setting chain-icon" @click="handleConfig(scope.row)" title="配置阈值"></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="sensorTotal>0"
          :total="sensorTotal"
          :page.sync="sensorQueryParams.pageNum"
          :limit.sync="sensorQueryParams.pageSize"
          @pagination="getSensorList"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { listSystem, getSystem, delSystem } from "@/api/display/sys";
import {
  listTransducertype,
  getTransducertype,
  delTransducertype
} from "@/api/display/type";
import {
  listTransducer,
  getTransducer,
  delTransducer
} from "@/api/display/sensor";
import { listBuilding } from "@/api/main/building";
import MySysAdd from "@/views/display/sys/add";
import MySysEdit from "@/views/display/sys/edit";
import MyTypeAdd from "@/views/display/type/add";
import MyTypeEdit from "@/views/display/type/edit";
import MySensorAdd from "@/views/display/sensor/add";
import MySensorEdit from "@/views/display/sensor/edit";
import MyPointConfigPoint from "@/views/display/sensor/point";
import MyPointConfig from "@/views/display/sensor/tadd";

export default {
  data() {
    return {
      loading: true,
      multiple1: true,
      multiple2: true,
      multiple3: true,
      add1: true,
      add2: true,
      sysQueryParams: {
        pageNum: 1,
        pageSize: 20,
        description: "",
        name: ""
      },
      typeQueryParams: {
        pageNum: 1,
        pageSize: 20,
        systemId: 0
      },
      sensorQueryParams: {
        pageNum: 1,
        pageSize: 20,
        ttId: 0
      },
      systemList: [],
      transducertypeList: [],
      transducerList: [],
      buildingList: [],
      nowSysId: "",
      nowTypeId: "",
      sysTotal: 0,
      typeTotal: 0,
      sensorTotal: 0
    };
  },
  created() {
    listBuilding().then(response => {
      if (response.code === 200) {
        this.buildingList = response.rows;
        console.log(this.buildingList);
      }
    });
    this.getSysList();
  },
  methods: {
    getSysList() {
      this.loading = true;
      listSystem(this.sysQueryParams).then(response => {
        this.systemList = response.rows;
        this.sysTotal = response.total;
        this.loading = false;
      });
    },
    getTypeList() {
      listTransducertype(this.typeQueryParams).then(response => {
        this.transducertypeList = response.rows;
        this.typeTotal = response.total;
      });
    },
    getSensorList() {
      listTransducer(this.sensorQueryParams).then(response => {
        this.transducerList = response.rows;
        this.sensorTotal = response.total;
      });
    },
    handleSysSelectionChange(selection) {
      this.ids = selection.map(item => item.systemId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAddSys() {
      var index = this.$layer.iframe({
        content: {
          content: MySysAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器系统",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdateSys(row) {
      this.eid = row.systemId;
      var index = this.$layer.iframe({
        content: {
          content: MySysEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑传感器系统",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDeleteSys(row) {
      const systemIds = row.systemId || this.ids;
      this.$confirm(
        '是否确认删除传感器数据系统编号为"' + systemIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delSystem(systemIds);
        })
        .then(() => {
          this.getSysList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    handleSysSelectionChange(selection) {
      this.ids = selection.map(item => item.ttId);
      this.multiple1 = !selection.length;
    },
    /** 新增按钮操作 */
    handleAddType() {
      var index = this.$layer.iframe({
        content: {
          content: MyTypeAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器类型",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdateType(row) {
      this.eid = row.ttId;
      var index = this.$layer.iframe({
        content: {
          content: MyTypeEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器类型",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDeleteType(row) {
      const ttIds = row.ttId || this.ids;
      this.$confirm(
        '是否确认删除传感器类型编号为"' + ttIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delTransducertype(ttIds);
        })
        .then(() => {
          this.getTypeList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    handleAddSensor() {
      var index = this.$layer.iframe({
        content: {
          content: MySensorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdateSensor(row) {
      this.eid = row.transducerId;
      var index = this.$layer.iframe({
        content: {
          content: MySensorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑传感器",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    handleConfigPoint(row) {
      this.fid = row.factoryId;
      this.eid = row.transducerId;
      var index = this.$layer.iframe({
        content: {
          content: MyPointConfigPoint, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "配置分数",
        target: ".app-main"
      });
      this.layerId = index;
    },
    handleDeleteSensor(row) {
      const transducerIds = row.transducerId || this.ids;
      this.$confirm(
        '是否确认删除传感器数据编号为"' + transducerIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delTransducer(transducerIds);
        })
        .then(() => {
          this.getSensorList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    handleTypeSelectionChange(selection) {
      this.ids = selection.map(item => item.ttId);
      this.multiple2 = !selection.length;
    },
    handleSensorSelectionChange(selection){
      this.ids = selection.map(item => item.transducerId);
      this.multiple3 = !selection.length;
    },
    handleSysRowClick(row) {
      this.typeQueryParams.systemId = row.systemId;
      this.nowSysId = row.systemId;
      this.nowTypeId = null;
      this.add1 = false;
      this.add2 = true;
      this.getTypeList();
      this.transducerList = [];
    },
    handleTypeRowClick(row) {
      this.sensorQueryParams.ttId = row.ttId;
      this.nowTypeId = row.ttId;
      this.add2 = false;
      this.getSensorList();
    },
    handleConfig(row) {
      this.eid = row.transducerId;
      var index = this.$layer.iframe({
        content: {
          content: MyPointConfig, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "配置阈值",
        target: ".app-main"
      });
      this.layerId = index;
    }
  }
};
</script>
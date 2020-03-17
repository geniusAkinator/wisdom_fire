<template>
  <div class="app-container">
    <div class="table-tool">
      <el-button-group>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['main:building:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['main:building:add']"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['main:building:export']"
        >导出</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="工厂名称" prop="buildingName">
              <el-input
                v-model="queryParams.buildingName"
                placeholder="请输入工厂名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-form>
        </template>
        <template slot="end">
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </template>
      </my-search-tool>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="buildingList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属工厂" align="center" prop="factoryId">
        <template slot-scope="scope">
          <span v-for="(item,index) in factoryList" :key="index">
            <template v-if="scope.row.factoryId == item.factoryId">{{item.factoryName}}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="面积" align="center" prop="area">
        <template slot-scope="scope">
          <span>
            {{scope.row.area}}m
            <sup>2</sup>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="楼宇名称" align="center" prop="name" />
      <el-table-column label="楼上层数" align="center" prop="upperLevel">
        <template slot-scope="scope">
          <span>{{scope.row.upperLevel}}层</span>
        </template>
      </el-table-column>
      <el-table-column label="楼下层数" align="center" prop="underLevel">
        <template slot-scope="scope">
          <span>{{scope.row.underLevel}}层</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleJump(scope.row)">楼层</el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['main:factory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.row)"
            v-hasPermi="['main:factory:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listBuilding,
  getBuilding,
  delBuilding,
  exportBuilding
} from "@/api/main/building";
import { listFactory } from "@/api/main/factory";

import MySearchTool from "@/components/SearchTool/index";
import MyBuildingAdd from "@/views/main/building/add";
import MyBuildingEdit from "@/views/main/building/edit";
export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 楼宇数据表格数据
      buildingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        factoryId: this.$route.params.id
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      layerId: "",
      eid: 0,
      pid: this.$route.params.id,
      factoryList: []
    };
  },
  created() {
    listFactory().then(response => {
      if (response.code == 200) {
        this.factoryList = response.rows;
      }
    });
    this.getList();
  },
  methods: {
    /** 查询楼宇数据列表 */
    getList() {
      this.loading = true;
      listBuilding(this.queryParams).then(response => {
        if (response.code == 200) {
          this.buildingList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        buildingId: "",
        area: "",
        createtime: "",
        name: "",
        picture: "",
        underLevel: "",
        updatetime: "",
        upperLevel: "",
        factoryId: ""
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.buildingId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
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
    handleDelete(row) {
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
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有楼宇数据数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportBuilding(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },

    handleJump(row) {
      this.$router.push({ name: "Floor", params: { id: row.buildingId } });
    }
  },
  components: {
    MySearchTool
  }
};
</script>
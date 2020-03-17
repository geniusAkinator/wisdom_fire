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
          v-hasPermi="['main:floor:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['main:floor:add']"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['main:floor:export']"
        >导出</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="工厂名称">
              <el-input
                v-model="queryParams.floorName"
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
      :data="floorList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="楼层名称" align="center" prop="floorName" />
      <el-table-column label="层级" align="center" prop="level" />
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['main:floor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.row)"
            v-hasPermi="['main:floor:remove']"
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
  listFloor,
  getFloor,
  delFloor,
  addFloor,
  updateFloor,
  exportFloor
} from "@/api/main/floor";

import MySearchTool from "@/components/SearchTool/index";
import MyFloorAdd from "@/views/main/floor/add";
import MyFloorEdit from "@/views/main/floor/edit";

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
      // 楼层数据表格数据
      floorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        floorName: "",
        buildingId: this.$route.params.id
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      eid: 0,
      layerId: "",
      pid: this.$route.params.id
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询楼层数据列表 */
    getList() {
      this.loading = true;
      listFloor(this.queryParams).then(response => {
        this.floorList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        floorName: "",
        buildingId: this.$route.params.id
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
      this.ids = selection.map(item => item.floorId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyFloorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增楼层信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.floorId;
      var index = this.$layer.iframe({
        content: {
          content: MyFloorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "编辑楼层信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 提交按钮 */
    submitForm: function() {},
    /** 删除按钮操作 */
    handleDelete(row) {
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
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有楼层数据数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportFloor(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
  },
  components: {
    MySearchTool
  }
};
</script>
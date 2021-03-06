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
          v-hasPermi="['display:sys:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['display:sys:add']"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['display:sys:export']"
        >导出</el-button>
      </el-button-group>
    </div>

    <el-table
      v-loading="loading"
      border
      :data="systemList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="操作" align="center" fixed="right" width="280">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleJump(scope.row)">类型管理</el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['display:sys:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['display:sys:remove']"
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
  listSystem,
  getSystem,
  delSystem,
  exportSystem
} from "@/api/display/sys";
import MySearchTool from "@/components/SearchTool/index";
import MySysAdd from "@/views/display/sys/add";
import MySysEdit from "@/views/display/sys/edit";
import utils from "@/utils/utils";
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
      // 传感器数据系统表格数据
      systemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        description: "",
        name: ""
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      eid: 0,
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
    this.getList();
  },
  methods: {
    /** 查询传感器数据系统列表 */
    getList() {
      this.loading = true;
      listSystem(this.queryParams).then(response => {
        this.systemList = response.rows;
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
        systemId: "",
        description: "",
        name: ""
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
      this.ids = selection.map(item => item.systemId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
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
    handleUpdate(row) {
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
    handleDelete(row) {
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
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有传感器数据系统数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportSystem(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    handleJump(row) {
      console.log(row.systemId);
      // this.$router.push({
      //   path: "/display/type",
      //   query: { id: row.systemId }
      // });

      this.$router.push({
        name: "Type",
        params: { id: row.systemId }
      });
    }
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
  components: {
    MySearchTool
  }
};
</script>
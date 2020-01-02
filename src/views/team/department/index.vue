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
          v-hasPermi="['team:department:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['team:department:add']"
        >新增</el-button>
      </el-button-group>
    </div>

    <el-table
      v-loading="loading"
      border
      :data="departmentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="departmentId" />
      <el-table-column label="所属工厂" align="center" prop="factoryId">
        <template slot-scope="scope">
          <span>{{ scope.row.factoryId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" align="center" prop="departmentName" />
      <el-table-column label="部门领导人" align="center" prop="leader" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="座机号" align="center" prop="tel" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleJump(scope.row)"
          >人员管理</el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['team:department:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['team:department:remove']"
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
  listDepartment,
  getDepartment,
  delDepartment,
  exportDepartment
} from "@/api/team/department";
import { listFactory } from "@/api/main/factory";
import MyDepartmentAdd from "@/views/team/department/add";
import MyDepartmentEdit from "@/views/team/department/edit";
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
      // 团队信息表格数据
      departmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createtime: "",
        departmentName: "",
        leader: "",
        phone: "",
        tel: "",
        factoryId: ""
      },
      // 表单参数
      form: {},
      factoryList: [],
      eid: 0,
      layerId: "",
      layerInitWidth: 0,
      layerInitHeight: 0
    };
  },
  watch: {
    layerId: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      console.log(layer);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    }
  },
  created() {
    this.getList();
    listFactory().then(response => {
      if (response.code === 200) {
        this.factoryList = response.rows;
      }
    });
  },
  methods: {
    /** 查询团队信息列表 */
    getList() {
      this.loading = true;
      listDepartment(this.queryParams).then(response => {
        this.departmentList = response.rows;
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
        departmentId: 0,
        departmentName: "",
        leader: "",
        phone: "",
        remark: "",
        tel: "",
        factoryId: 0
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
      this.ids = selection.map(item => item.departmentId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyDepartmentAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增团队信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.departmentId;
      var index = this.$layer.iframe({
        content: {
          content: MyDepartmentEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑团队信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.departmentId != "") {
            updateDepartment(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addDepartment(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const departmentIds = row.departmentId || this.ids;
      this.$confirm(
        '是否确认删除团队信息编号为"' + departmentIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delDepartment(departmentIds);
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
      this.$confirm("是否确认导出所有团队信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportDepartment(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    handleJump(row) {
      this.$router.push({ name: "Employee", params: { id: row.departmentId } });
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
  }
};
</script>
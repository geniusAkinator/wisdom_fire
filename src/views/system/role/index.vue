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
          v-hasPermi="['system:role:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
        >新增</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="角色名称" prop="roleName">
              <el-input
                v-model="queryParams.roleName"
                placeholder="请输入角色名称"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="权限字符" prop="roleKey">
              <el-input
                v-model="queryParams.roleKey"
                placeholder="请输入权限字符"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="queryParams.status"
                placeholder="角色状态"
                clearable
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="dateRange"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </template>
        <template slot="end">
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </template>
      </my-search-tool>
    </div>
    <el-table v-loading="loading" border :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" prop="roleId" width="120" />
      <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" />
      <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" />
      <el-table-column label="显示顺序" prop="roleSort" />
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
            v-hasPermi="['system:role:edit']"
          >数据权限</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']"
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
  listRole,
  delRole,
  exportRole,
  dataScope,
  changeRoleStatus
} from "@/api/system/role";
import MyRoleAdd from "@/views/system/role/add";
import MyRoleEdit from "@/views/system/role/edit";
import MyRoleAuth from "@/views/system/role/auth";
import MySearchTool from "@/components/SearchTool/index";

export default {
  name: "Role",
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
      // 角色表格数据
      roleList: [],
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 数据范围选项
      dataScopeOptions: [],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        roleName: "",
        roleKey: "",
        status: ""
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_role_scope").then(response => {
      if (response.code == 200) {
        this.dataScopeOptions = response.data;
      }
    });
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.roleList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.roleName + '"角色吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return changeRoleStatus(row.roleId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.tree != "") {
        this.$refs.tree.setCheckedKeys([]);
      }
      this.form = {
        roleId: "",
        roleName: "",
        roleKey: "",
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: ""
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyRoleAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增角色信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.roleId;
      var index = this.$layer.iframe({
        content: {
          content: MyRoleEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增角色信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.eid = row.roleId;
      var index = this.$layer.iframe({
        content: {
          content: MyRoleAuth, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "分配数据权限",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$confirm(
        '是否确认删除角色编号为"' + roleIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delRole(roleIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  },
  components: {
    MySearchTool
  }
};
</script>
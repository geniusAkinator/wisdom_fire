<template>
  <div class="app-container">
    <div class="table-tool">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:menu:add']"
        >新增</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="菜单名称">
              <el-input
                v-model="queryParams.menuName"
                placeholder="请输入菜单名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryParams.visible" placeholder="菜单状态" clearable size="small">
                <el-option
                  v-for="dict in visibleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
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
      :data="menuList"
      row-key="menuId"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="130px"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="100px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" width="60px"></el-table-column>
      <el-table-column prop="perms" label="权限标识" width="130px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="visible" label="禁用状态" :formatter="visibleFormat"></el-table-column>
      <el-table-column prop="status" label="禁用状态" :formatter="visibleFormat"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="280">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:menu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listMenu,
  getMenu,
  delMenu,
  addMenu,
  updateMenu
} from "@/api/system/menu";
import IconSelect from "@/components/IconSelect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import MyMenuAdd from "@/views/system/menu/add";
import MyMenuEdit from "@/views/system/menu/edit";
import MySearchTool from "@/components/SearchTool/index";

export default {
  name: "Menu",
  components: { IconSelect, MySearchTool },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],

      // 菜单状态数据字典
      visibleOptions: [],
      statusOptions: [],
      // 查询参数
      queryParams: {
        menuName: "",
        visible: ""
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_enable_disable").then(response => {
      this.visibleOptions = response.data;
    });
    this.getDicts("sys_show_hide").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listMenu(this.queryParams).then(response => {
        this.menuList = response.data;
        this.loading = false;
      });
    },
    // 菜单显示状态字典翻译
    visibleFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.visibleOptions, row.visible);
    },
    statusFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: "",
        parentId: 0,
        menuName: "",
        icon: "",
        menuType: "M",
        orderNum: "",
        isFrame: "1",
        visible: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      var index = this.$layer.iframe({
        content: {
          content: MyMenuAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增菜单信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.menuId;
      var index = this.$layer.iframe({
        content: {
          content: MyMenuEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "编辑菜单信息",
        target: ".app-main"
      });
      this.$layer.full(index);
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.menuName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delMenu(row.menuId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
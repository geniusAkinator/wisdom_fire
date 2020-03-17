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
          v-hasPermi="['main:factory:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['main:factory:add']"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['main:factory:export']"
        >导出</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="工厂名称" prop="factoryName">
              <el-input
                v-model="queryParams.factoryName"
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
      :data="factoryList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工厂名称" align="center" prop="factoryName" />
      <el-table-column label="工厂地址" align="center" prop="address" />
      <el-table-column label="工厂类型" align="center" prop="factoryType" />
      <el-table-column label="负责人" align="center" prop="leader" />
      <el-table-column label="手机号" align="center" prop="phone">
        <template slot-scope="scope">
          <span :title="scope.row.phone">{{hidePhone(scope.row.phone)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="省市区" align="center" prop="province" />
      <el-table-column label="座机号" align="center" prop="tel" />
      <!-- <el-table-column label="创建时间" align="center" prop="createDateTime" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.createDateTime">{{ parseTime(scope.row.createDateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateDateTime" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.updateDateTime">{{ parseTime(scope.row.updateDateTime) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleJump(scope.row)">楼宇</el-button>
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
  listFactory,
  delFactory,
  updateFactory,
  exportFactory
} from "@/api/main/factory";

import MySearchTool from "@/components/SearchTool/index";
import MyFactoryAdd from "@/views/main/factory/add";
import MyFactoryEdit from "@/views/main/factory/edit";
import http from "@/utils/http";
import request from "@/utils/request";
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
      // 工厂信息表格数据
      factoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      eid: 0,
      layerId: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询工厂信息列表 */
    getList() {
      this.loading = true;
      listFactory(this.queryParams).then(response => {
        this.factoryList = response.rows;
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
        factoryId: "",
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
      this.ids = selection.map(item => item.factoryId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
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
    handleDelete(row) {
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
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有工厂信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportFactory(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    handleJump(row) {
      this.$router.push({ name: "Building", params: { id: row.factoryId } });
    },
    hidePhone(phone) {
      return mobileEncrypt(phone);
    }
  },
  components: {
    MySearchTool
  }
};
</script>
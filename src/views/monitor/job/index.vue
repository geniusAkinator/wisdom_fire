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
          v-hasPermi="['monitor:job:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['monitor:job:add']"
        >新增</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="公告标题" prop="jobTitle">
              <el-input
                v-model="queryParams.jobTitle"
                placeholder="请输入公告标题"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="操作人员" prop="createBy">
              <el-input
                v-model="queryParams.createBy"
                placeholder="请输入操作人员"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="类型" prop="jobType">
              <el-select v-model="queryParams.jobType" placeholder="公告类型" clearable size="small">
                <el-option
                  v-for="dict in typeOptions"
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

    <el-table v-loading="loading" border :data="jobList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="jobId" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['monitor:job:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['monitor:job:remove']"
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
import { listJob, getJob, delJob } from "@/api/monitor/job";
import MySearchTool from "@/components/SearchTool/index";
import MyJobAdd from "@/views/monitor/job/add";
import MyJobEdit from "@/views/monitor/job/edit";
export default {
  name: "job",
  components: {
    MySearchTool
  },
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
      // 公告表格数据
      jobList: [],
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      layerId: "",
      eid: 0
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_job_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_job_type").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listJob(this.queryParams).then(response => {
        this.jobList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.jobType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        jobId: "",
        jobTitle: "",
        jobType: "",
        jobContent: "",
        status: 0
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
      this.ids = selection.map(item => item.jobId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyJobAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "新增公告信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.jobId;
      var index = this.$layer.iframe({
        content: {
          content: MyJobEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["600px", "600px"],
        title: "编辑公告信息",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const jobIds = row.jobId || this.ids;
      this.$confirm('是否确认删除公告编号为"' + jobIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deljob(jobIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  }
};
</script>
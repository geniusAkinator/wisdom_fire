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
          v-hasPermi="['display:transducertype:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['display:transducertype:add']"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['display:transducertype:export']"
        >导出</el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="loading"
      :data="transducertypeList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属系统" align="center" prop="systemId">
        <template slot-scope="scope">
          <span v-for="(item,index) in sysList" :key="index">
            <template v-if="scope.row.systemId == item.systemId">{{item.name}}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="类型名称" align="center" prop="name" />
      <el-table-column label="缩略图" align="center" prop="picture">
        <template slot-scope="scope">
          <el-image class="thumbnail" :src="baseUrl+scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="480">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleJump(scope.row)">传感器管理</el-button>
          <!-- <el-button size="mini" icon="el-icon-edit" @click="handleJumpThreshold(scope.row)">阈值管理</el-button> -->
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['display:transducertype:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['display:transducertype:remove']"
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
  listTransducertype,
  getTransducertype,
  delTransducertype,
  exportTransducertype
} from "@/api/display/type";
import { listSystem } from "@/api/display/sys";
import MyTypeAdd from "@/views/display/type/add";
import MyTypeEdit from "@/views/display/type/edit";

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
      // 传感器类型表格数据
      transducertypeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        systemId: this.$route.params.id
      },
      // 表单参数
      form: {},
      eid: 0,
      layerId: "",
      pid: this.$route.params.id,
      sysList: [],
      baseUrl: process.env.VUE_APP_BASE_API
    };
  },
  created() {
    listSystem().then(response => {
      if (response.code === 200) {
        this.sysList = response.rows;
      }
    });
    this.getList();
  },
  methods: {
    /** 查询传感器类型列表 */
    getList() {
      this.loading = true;
      listTransducertype(this.queryParams).then(response => {
        this.transducertypeList = response.rows;
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
        ttId: "",
        name: "",
        img: "",
        systemId: ""
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
      this.ids = selection.map(item => item.ttId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
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
    handleUpdate(row) {
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
    handleDelete(row) {
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
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有传感器类型数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportTransducertype(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    handleJump(row) {
      this.$router.push({
        name: "Sensor",
        params: { id: row.ttId }
      });
    },
    handleJumpThreshold(row) {
      this.$router.push({
        name: "Threshold",
        params: { id: row.ttId }
      });
    }
  }
};
</script>

<style>
.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
</style>
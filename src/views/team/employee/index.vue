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
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="人员姓名" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入人员姓名"
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
      :data="employeeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属团队" align="center" prop="departmentId">
        <template slot-scope="scope">
          <span v-for="(item,index) in departmentList" :key="index">
            <template v-if="scope.row.departmentId == item.departmentId">{{item.departmentName}}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center" prop="postId">
        <template slot-scope="scope">
          <span v-for="(item,index) in postList" :key="index">
            <template v-if="scope.row.postId == item.postId">{{item.postName}}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="人员姓名" align="center" prop="name" />
      <el-table-column label="性别" align="center" prop="sex">
        <template slot-scope="scope">
          <span>{{scope.row.sex == 0 ?'男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" align="center" prop="idCard">
        <template slot-scope="scope">
          <span :title="scope.row.idCard">{{hideIdcard(scope.row.idCard)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="phone">
        <template slot-scope="scope">
          <span :title="scope.row.phone">{{hidePhone(scope.row.phone)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态(在职，离职)" align="center" prop="state">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="scope.row.state == 0 ?'success':'info'"
          >{{scope.row.state == 0 ?'在职':'离职'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="入职时间" align="center" prop="joinTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.joinTime,'{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['team:employee:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['team:employee:remove']"
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
  listEmployee,
  getEmployee,
  delEmployee,
  addEmployee,
  updateEmployee,
  exportEmployee
} from "@/api/team/employee";
import { listDepartment } from "@/api/team/department";
import { listPost } from "@/api/system/post";
import MySearchTool from "@/components/SearchTool/index";
import MyEmployeeAdd from "@/views/team/employee/add";
import MyEmployeeEdit from "@/views/team/employee/edit";
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
      // 团队人员信息表格数据
      employeeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createtime: "",
        duty: "",
        idCard: "",
        joinTime: "",
        name: "",
        phone: "",
        sex: "",
        state: "",
        departmentId: this.$route.params.id
      },
      // 表单参数
      form: {},
      pid: this.$route.params.id,
      eid: 0,
      layerId: "",
      layerInitWidth: 0,
      layerInitHeight: 0,
      departmentList: [],
      postList: []
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
    listDepartment().then(response => {
      if (response.code == 200) {
        this.departmentList = response.rows;
      }
    });
    listPost().then(response => {
      if (response.code == 200) {
        this.postList = response.rows;
      }
    });
    this.getList();
  },
  methods: {
    /** 查询团队人员信息列表 */
    getList() {
      this.loading = true;
      listEmployee(this.queryParams).then(response => {
        this.employeeList = response.rows;
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
        employeeId: "",
        createtime: "",
        duty: "",
        idCard: "",
        joinTime: "",
        name: "",
        phone: "",
        remark: "",
        sex: "",
        state: "",
        departmentId: ""
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
      this.ids = selection.map(item => item.employeeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyEmployeeAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增团队人员信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.employeeId;
      var index = this.$layer.iframe({
        content: {
          content: MyEmployeeEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑团队人员信息",
        target: ".app-main"
      });
      this.layerId = index;
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.employeeId != "") {
            updateEmployee(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("更新成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addEmployee(this.form).then(response => {
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
      const employeeIds = row.employeeId || this.ids;
      this.$confirm(
        '是否确认删除团队人员信息编号为"' + employeeIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delEmployee(employeeIds);
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
      this.$confirm("是否确认导出所有团队人员信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportEmployee(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    hideIdcard(idCard) {
      return idCardEncrypt(idCard);
    },
    hidePhone(phone) {
      return mobileEncrypt(phone);
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
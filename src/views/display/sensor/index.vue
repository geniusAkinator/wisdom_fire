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
      :data="transducerList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" fixed width="55" align="center" />
      <el-table-column label="传感器id" align="center" prop="transducerId" />
      <el-table-column label="当前位置" align="center" prop="currlocation" />
      <el-table-column label="操作" fixed="right" align="center" width="190">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:transducer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:transducer:remove']"
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
  listTransducer,
  getTransducer,
  delTransducer,
  addTransducer,
  updateTransducer,
  exportTransducer
} from "@/api/display/sensor";
import MySensorAdd from "@/views/display/sensor/add";
import MySensorEdit from "@/views/display/sensor/edit";
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
      // 传感器数据表格数据
      transducerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        ttId: this.$route.query.id
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deviceStatus: [
          { required: true, message: "设备状态不能为空", trigger: "blur" }
        ]
      },
      eid: 0,
      layerId: "",
      pid: this.$route.query.id
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询传感器数据列表 */
    getList() {
      this.loading = true;
      listTransducer(this.queryParams).then(response => {
        this.transducerList = response.rows;
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
        transducerId: "",
        batteryPercentage: "",
        collectTime: "",
        crc: "",
        createDateTime: "",
        dataType: "",
        dataWarm: "",
        deviceId: "",
        deviceNumber: "",
        deviceStatus: "0",
        expirationDate: "",
        latitude: "",
        liquidLevel: "",
        longitude: "",
        noisePower: "",
        rxLev: "",
        temp: "",
        threshold: "",
        factoryId: "",
        ttId: "",
        floorId: "",
        xaxis: "",
        yaxis: "",
        current: "",
        power: "",
        voltage: "",
        maxid: "",
        currlocation: ""
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
      this.ids = selection.map(item => item.transducerId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MySensorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.eid = row.transducerId;
      var index = this.$layer.iframe({
        content: {
          content: MySensorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "编辑传感器",
        target: ".app-main"
      });
      this.$layer.full(index);
      this.layerId = index;
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.transducerId != "") {
            updateTransducer(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addTransducer(this.form).then(response => {
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
      const transducerIds = row.transducerId || this.ids;
      this.$confirm(
        '是否确认删除传感器数据编号为"' + transducerIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delTransducer(transducerIds);
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
      this.$confirm("是否确认导出所有传感器数据数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportTransducer(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>
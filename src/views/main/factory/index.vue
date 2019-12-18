<template>
  <div class="app-container">
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
      <el-form-item label="工厂地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入工厂地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createDateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createDateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="工厂类型" prop="factoryType">
        <el-select v-model="queryParams.factoryType" placeholder="请选择工厂类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          v-model="queryParams.latitude"
          placeholder="请输入纬度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input
          v-model="queryParams.leader"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          v-model="queryParams.longitude"
          placeholder="请输入经度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <el-input
          v-model="queryParams.picture"
          placeholder="请输入图片"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省市区" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省市区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="座机号" prop="tel">
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入座机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改时间" prop="updateDateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateDateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择修改时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['main:factory:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['main:factory:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['main:factory:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['main:factory:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="factoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="factoryId" />
      <el-table-column label="工厂名称" align="center" prop="factoryName" />
      <el-table-column label="工厂地址" align="center" prop="address" />
      <el-table-column label="创建时间" align="center" prop="createDateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="工厂类型" align="center" prop="factoryType" />
      <el-table-column label="纬度" align="center" prop="latitude" />
      <el-table-column label="负责人" align="center" prop="leader" />
      <el-table-column label="经度" align="center" prop="longitude" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="图片" align="center" prop="picture" />
      <el-table-column label="省市区" align="center" prop="province" />
      <el-table-column label="座机号" align="center" prop="tel" />
      <el-table-column label="修改时间" align="center" prop="updateDateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateDateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['main:factory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
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

    <!-- 添加或修改工厂信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工厂名称" prop="factoryName">
          <el-input v-model="form.factoryName" placeholder="请输入工厂名称" />
        </el-form-item>
        <el-form-item label="工厂地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入工厂地址" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createDateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="工厂类型">
          <el-select v-model="form.factoryType" placeholder="请选择工厂类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="form.leader" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="图片" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入图片" />
        </el-form-item>
        <el-form-item label="省市区" prop="province">
          <el-input v-model="form.province" placeholder="请输入省市区" />
        </el-form-item>
        <el-form-item label="座机号" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入座机号" />
        </el-form-item>
        <el-form-item label="修改时间" prop="updateDateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateDateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择修改时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFactory, getFactory, delFactory, addFactory, updateFactory, exportFactory } from "@/api/system/factory";

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
        factoryName: undefined,
        address: undefined,
        createDateTime: undefined,
        description: undefined,
        factoryType: undefined,
        latitude: undefined,
        leader: undefined,
        longitude: undefined,
        phone: undefined,
        picture: undefined,
        province: undefined,
        tel: undefined,
        updateDateTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
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
        factoryId: undefined,
        factoryName: undefined,
        address: undefined,
        createDateTime: undefined,
        description: undefined,
        factoryType: undefined,
        latitude: undefined,
        leader: undefined,
        longitude: undefined,
        phone: undefined,
        picture: undefined,
        province: undefined,
        tel: undefined,
        updateDateTime: undefined
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
      this.ids = selection.map(item => item.factoryId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工厂信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const factoryId = row.factoryId || this.ids
      getFactory(factoryId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工厂信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.factoryId != undefined) {
            updateFactory(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addFactory(this.form).then(response => {
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
      const factoryIds = row.factoryId || this.ids;
      this.$confirm('是否确认删除工厂信息编号为"' + factoryIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFactory(factoryIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有工厂信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFactory(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
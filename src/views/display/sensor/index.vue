<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="电池电量" prop="batteryPercentage">
        <el-input
          v-model="queryParams.batteryPercentage"
          placeholder="请输入电池电量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采集时间" prop="collectTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.collectTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择采集时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="校验码" prop="crc">
        <el-input
          v-model="queryParams.crc"
          placeholder="请输入校验码"
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
        <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="queryParams.dataType" placeholder="请选择数据类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="数据报警" prop="dataWarm">
        <el-input
          v-model="queryParams.dataWarm"
          placeholder="请输入数据报警"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceId">
        <el-input
          v-model="queryParams.deviceId"
          placeholder="请输入设备类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNumber">
        <el-input
          v-model="queryParams.deviceNumber"
          placeholder="请输入设备编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="设备状态" prop="deviceStatus">
        <el-select v-model="queryParams.deviceStatus" placeholder="请选择设备状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="到期时间" prop="expirationDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.expirationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择到期时间">
        </el-date-picker>
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
      <el-form-item label="液位值" prop="liquidLevel">
        <el-input
          v-model="queryParams.liquidLevel"
          placeholder="请输入液位值"
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
      <el-form-item label="噪声强度" prop="noisePower">
        <el-input
          v-model="queryParams.noisePower"
          placeholder="请输入噪声强度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="信号强度" prop="rxLev">
        <el-input
          v-model="queryParams.rxLev"
          placeholder="请输入信号强度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="温度值" prop="temp">
        <el-input
          v-model="queryParams.temp"
          placeholder="请输入温度值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报警水位阈值" prop="threshold">
        <el-input
          v-model="queryParams.threshold"
          placeholder="请输入报警水位阈值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工厂id" prop="factoryId">
        <el-input
          v-model="queryParams.factoryId"
          placeholder="请输入工厂id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传感器类型" prop="ttId">
        <el-input
          v-model="queryParams.ttId"
          placeholder="请输入传感器类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="楼层id" prop="floorId">
        <el-input
          v-model="queryParams.floorId"
          placeholder="请输入楼层id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="x轴" prop="xaxis">
        <el-input
          v-model="queryParams.xaxis"
          placeholder="请输入x轴"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="y轴" prop="yaxis">
        <el-input
          v-model="queryParams.yaxis"
          placeholder="请输入y轴"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电流" prop="current">
        <el-input
          v-model="queryParams.current"
          placeholder="请输入电流"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="浮点" prop="power">
        <el-input
          v-model="queryParams.power"
          placeholder="请输入浮点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电压" prop="voltage">
        <el-input
          v-model="queryParams.voltage"
          placeholder="请输入电压"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="阀值" prop="maxid">
        <el-input
          v-model="queryParams.maxid"
          placeholder="请输入阀值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前位置" prop="currlocation">
        <el-input
          v-model="queryParams.currlocation"
          placeholder="请输入当前位置"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:transducer:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:transducer:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:transducer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:transducer:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="transducerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="传感器id" align="center" prop="transducerId" />
      <el-table-column label="电池电量" align="center" prop="batteryPercentage" />
      <el-table-column label="采集时间" align="center" prop="collectTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.collectTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="校验码" align="center" prop="crc" />
      <el-table-column label="创建时间" align="center" prop="createDateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据类型" align="center" prop="dataType" />
      <el-table-column label="数据报警" align="center" prop="dataWarm" />
      <el-table-column label="设备类型" align="center" prop="deviceId" />
      <el-table-column label="设备编号" align="center" prop="deviceNumber" />
      <el-table-column label="设备状态" align="center" prop="deviceStatus" />
      <el-table-column label="到期时间" align="center" prop="expirationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expirationDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center" prop="latitude" />
      <el-table-column label="液位值" align="center" prop="liquidLevel" />
      <el-table-column label="经度" align="center" prop="longitude" />
      <el-table-column label="噪声强度" align="center" prop="noisePower" />
      <el-table-column label="信号强度" align="center" prop="rxLev" />
      <el-table-column label="温度值" align="center" prop="temp" />
      <el-table-column label="报警水位阈值" align="center" prop="threshold" />
      <el-table-column label="工厂id" align="center" prop="factoryId" />
      <el-table-column label="传感器类型" align="center" prop="ttId" />
      <el-table-column label="楼层id" align="center" prop="floorId" />
      <el-table-column label="x轴" align="center" prop="xaxis" />
      <el-table-column label="y轴" align="center" prop="yaxis" />
      <el-table-column label="电流" align="center" prop="current" />
      <el-table-column label="浮点" align="center" prop="power" />
      <el-table-column label="电压" align="center" prop="voltage" />
      <el-table-column label="阀值" align="center" prop="maxid" />
      <el-table-column label="当前位置" align="center" prop="currlocation" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:transducer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
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

    <!-- 添加或修改传感器数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="电池电量" prop="batteryPercentage">
          <el-input v-model="form.batteryPercentage" placeholder="请输入电池电量" />
        </el-form-item>
        <el-form-item label="采集时间" prop="collectTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.collectTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择采集时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="校验码" prop="crc">
          <el-input v-model="form.crc" placeholder="请输入校验码" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createDateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="form.dataType" placeholder="请选择数据类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据报警" prop="dataWarm">
          <el-input v-model="form.dataWarm" placeholder="请输入数据报警" />
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceId">
          <el-input v-model="form.deviceId" placeholder="请输入设备类型" />
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceNumber">
          <el-input v-model="form.deviceNumber" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="设备状态">
          <el-radio-group v-model="form.deviceStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到期时间" prop="expirationDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.expirationDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择到期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="液位值" prop="liquidLevel">
          <el-input v-model="form.liquidLevel" placeholder="请输入液位值" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="噪声强度" prop="noisePower">
          <el-input v-model="form.noisePower" placeholder="请输入噪声强度" />
        </el-form-item>
        <el-form-item label="信号强度" prop="rxLev">
          <el-input v-model="form.rxLev" placeholder="请输入信号强度" />
        </el-form-item>
        <el-form-item label="温度值" prop="temp">
          <el-input v-model="form.temp" placeholder="请输入温度值" />
        </el-form-item>
        <el-form-item label="报警水位阈值" prop="threshold">
          <el-input v-model="form.threshold" placeholder="请输入报警水位阈值" />
        </el-form-item>
        <el-form-item label="工厂id" prop="factoryId">
          <el-input v-model="form.factoryId" placeholder="请输入工厂id" />
        </el-form-item>
        <el-form-item label="传感器类型" prop="ttId">
          <el-input v-model="form.ttId" placeholder="请输入传感器类型" />
        </el-form-item>
        <el-form-item label="楼层id" prop="floorId">
          <el-input v-model="form.floorId" placeholder="请输入楼层id" />
        </el-form-item>
        <el-form-item label="x轴" prop="xaxis">
          <el-input v-model="form.xaxis" placeholder="请输入x轴" />
        </el-form-item>
        <el-form-item label="y轴" prop="yaxis">
          <el-input v-model="form.yaxis" placeholder="请输入y轴" />
        </el-form-item>
        <el-form-item label="电流" prop="current">
          <el-input v-model="form.current" placeholder="请输入电流" />
        </el-form-item>
        <el-form-item label="浮点" prop="power">
          <el-input v-model="form.power" placeholder="请输入浮点" />
        </el-form-item>
        <el-form-item label="电压" prop="voltage">
          <el-input v-model="form.voltage" placeholder="请输入电压" />
        </el-form-item>
        <el-form-item label="阀值" prop="maxid">
          <el-input v-model="form.maxid" placeholder="请输入阀值" />
        </el-form-item>
        <el-form-item label="当前位置" prop="currlocation">
          <el-input v-model="form.currlocation" placeholder="请输入当前位置" />
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
import { listTransducer, getTransducer, delTransducer, addTransducer, updateTransducer, exportTransducer } from "@/api/display/sensor";

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
        pageSize: 10,
        batteryPercentage: undefined,
        collectTime: undefined,
        crc: undefined,
        createDateTime: undefined,
        dataType: undefined,
        dataWarm: undefined,
        deviceId: undefined,
        deviceNumber: undefined,
        deviceStatus: undefined,
        expirationDate: undefined,
        latitude: undefined,
        liquidLevel: undefined,
        longitude: undefined,
        noisePower: undefined,
        rxLev: undefined,
        temp: undefined,
        threshold: undefined,
        factoryId: undefined,
        ttId: undefined,
        floorId: undefined,
        xaxis: undefined,
        yaxis: undefined,
        current: undefined,
        power: undefined,
        voltage: undefined,
        maxid: undefined,
        currlocation: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deviceStatus: [
          { required: true, message: "设备状态不能为空", trigger: "blur" }
        ],      }
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
        transducerId: undefined,
        batteryPercentage: undefined,
        collectTime: undefined,
        crc: undefined,
        createDateTime: undefined,
        dataType: undefined,
        dataWarm: undefined,
        deviceId: undefined,
        deviceNumber: undefined,
        deviceStatus: "0",
        expirationDate: undefined,
        latitude: undefined,
        liquidLevel: undefined,
        longitude: undefined,
        noisePower: undefined,
        rxLev: undefined,
        temp: undefined,
        threshold: undefined,
        factoryId: undefined,
        ttId: undefined,
        floorId: undefined,
        xaxis: undefined,
        yaxis: undefined,
        current: undefined,
        power: undefined,
        voltage: undefined,
        maxid: undefined,
        currlocation: undefined
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
      this.ids = selection.map(item => item.transducerId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加传感器数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const transducerId = row.transducerId || this.ids
      getTransducer(transducerId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改传感器数据";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.transducerId != undefined) {
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
      this.$confirm('是否确认删除传感器数据编号为"' + transducerIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTransducer(transducerIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有传感器数据数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTransducer(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<template>
  <div class="app-container">
    <el-card class="state-card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <ul class="state_block">
            <li class="state_item">
              <span>待处理统计</span>
              <div class="border-circle warning">{{count1}}</div>
            </li>
            <li class="state_item">
              <span>累计处理统计</span>
              <div class="border-circle danger">{{count2}}</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">
                最常见隐患类型为：
                <span v-for="(item,index) in typeOptions" :key="index">
                  <template v-if="hazardType == item.dictValue">{{item.dictLabel}}</template>
                </span>
              </span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <el-table
      stripe
      border
      :data="overviewList"
      align="center"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属工厂" align="center" prop="factoryId">
        <template slot-scope="scope">
          <span v-for="(item,index) in factoryList" :key="index">
            <template v-if="scope.row.factoryId == item.factoryId">{{item.factoryName}}</template>
          </span>
        </template>
      </el-table-column>-->
      <el-table-column label="楼宇" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="楼层" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点位描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currlocation }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="隐患类型">
        <template slot-scope="scope">
          <span v-for="(item,index) in typeOptions" :key="index">
            <template v-if="scope.row.type == item.dictValue">{{item.dictLabel}}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="content" align="center" label="隐患内容"></el-table-column>
      <el-table-column label="首次上报时间" align="center" prop="currdate">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.currdate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新上报时间" align="center" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.upTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="updateTime">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0" type="danger" effect="dark">待处理</el-tag>
          <el-tag v-else-if="scope.row.state == 1" type="warning" effect="dark">处理中</el-tag>
          <el-tag v-else-if="scope.row.state == 2" type="success" effect="dark">已处理</el-tag>
          <el-tag v-else-if="scope.row.state == 3" type="info" effect="dark">不显示</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleAppoint(scope.$index, scope.row)">指派任务</el-button>
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
import { listOverview } from "@/api/hazard/overview";
import MyAppointAdd from "@/views/hazard/overview/add";
import { listFactory } from "@/api/main/factory";

export default {
  name: "OverView",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        menuName: "",
        visible: ""
      },
      overviewList: [],
      factoryList: [],
      // 表单参数
      form: {},
      rowId: 0,
      layerId: "",
      eid: 0,
      total: 0,
      typeOptions: [],
      count1: 0,
      count2: 0,
      hazardType: ""
    };
  },
  created() {
    this.getDicts("sys_type_hidden").then(response => {
      if (response.code == 200) {
        this.typeOptions = response.data;
      }
    });
    listFactory().then(response => {
      if (response.code == 200) {
        this.factoryList = response.rows;
      }
    });
    this.getList();
  },
  methods: {
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listOverview(this.queryParams).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _table = _data.tableDataInfo;
          this.overviewList = _table.rows;
          this.total = _table.total;
          this.count1 = _data.sum;
          this.count2 = _data.handleCount;
          this.hazardType = _data.type;
          console.log(_data.sum);
          this.loading = false;
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleDetail(index, row) {
      console.log(row);
      this.$router.push({
        name: "HazardDetail",
        params: { transducerId: row.transducerId, hdId: row.hdId }
      });
    },
    handleNotice(index, row) {},
    handleAppoint(index, row) {
      var index = this.$layer.iframe({
        content: {
          content: MyAppointAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["800px", "600px"],
        title: "指派任务",
        target: ".app-main"
      });
      this.layerId = index;
      this.rowFactoryId = row.factoryId;
      this.eid = row.hdId;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.border-circle {
  width: 100px;
  height: 100px;
  border: 2px solid #409eff;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}
.border-circle.danger {
  border: 2px solid #f56c6c;
  background: #fff;
}
.border-circle.warning {
  border: 2px solid #e6a23c;
  background: #fff;
}
.state_block {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.state_item > span {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}
.info_block {
  list-style: none;
}
</style>
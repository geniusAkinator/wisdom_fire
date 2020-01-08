<template>
  <div class="app-container">
    <el-card class="state-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <ul class="state_block">
            <li class="state_item">
              <span>待处理统计</span>
              <div class="border-circle warning">0</div>
            </li>
            <li class="state_item">
              <span>累计处理统计</span>
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">最常见隐患类型</span>
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
      <el-table-column prop="hdId" label="隐患ID" width="80"></el-table-column>
      <el-table-column prop="content" label="隐患内容"></el-table-column>
      <el-table-column prop="type" label="隐患类型"></el-table-column>
      <el-table-column prop="currdate" label="首次上报时间"></el-table-column>
      <el-table-column prop="currdate" label="最新上报时间"></el-table-column>
      <el-table-column prop="factory.factoryName" label="工厂名称"></el-table-column>
      <el-table-column prop="transducer.deviceNumber" label="设备编号"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" @click="handleNotice(scope.$index, scope.row)">通知</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listOverview } from "@/api/hazard/overview";

export default {
  name: "OverView",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 查询参数
      queryParams: {
        menuName: "",
        visible: ""
      },
      overviewList: [],
      // 表单参数
      form: {},
      rowId: 0,
      layerId: "",
      eid: 0,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listOverview(this.queryParams).then(response => {
        this.overviewList = response.rows;
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
        setTimeout(() => {
        this.$router.push({
          name: "隐患详情",
          params: { fId: item.factoryId }
        });
      }, 600);
    },
    handleNotice(index, row) {}
  }
};
</script>
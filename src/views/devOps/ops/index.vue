<template>
  <div class="app-container">
    <el-card class="state-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="12">
          <ul class="state_block">
            <li class="state_item">
              <span>实时待处理</span>
              <div class="border-circle warning">0</div>
            </li>
            <li class="state_item">
              <span>累计故障</span>
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">故障最多单位</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="devops-tab">
      <el-tab-pane label="待处理" name="first">
        <el-table
          stripe
          border
          :data="overviewList"
          align="center"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="hdId" label="ID" width="80"></el-table-column>
          <el-table-column prop="hdId" label="时间"></el-table-column>
          <el-table-column prop="hdId" label="单位"></el-table-column>
          <el-table-column prop="type" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column label="操作" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="处理中" name="second">
        <el-table
          stripe
          border
          :data="overviewList"
          align="center"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="hdId" label="ID" width="80"></el-table-column>
          <el-table-column prop="hdId" label="时间"></el-table-column>
          <el-table-column prop="hdId" label="单位"></el-table-column>
          <el-table-column prop="type" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column prop="type" label="处理人"></el-table-column>
          <el-table-column label="操作" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="third">
        <el-table
          stripe
          border
          :data="overviewList"
          align="center"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="hdId" label="ID" width="80"></el-table-column>
          <el-table-column prop="hdId" label="时间"></el-table-column>
          <el-table-column prop="hdId" label="单位"></el-table-column>
          <el-table-column prop="type" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column prop="type" label="处理人"></el-table-column>
          <el-table-column prop="date" label="完成时间"></el-table-column>
          <el-table-column label="操作" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
        pageNum: 1,
        pageSize: 10,
        menuName: "",
        visible: ""
      },
      overviewList: [],
      // 表单参数
      form: {},
      rowId: 0,
      layerId: "",
      eid: 0,
      total: 0,
      activeName: "first"
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleClick() {},
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listOverview(this.queryParams).then(response => {
        if (response.code == 200) {
          this.overviewList = response.rows;
          console.log(this.overviewList);
          this.total = response.total;
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
      this.$router.push({ name: "OpsDetail", params: { id: row.hdId } });
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
.devops-tab {
  margin-top: 10px;
}
</style>
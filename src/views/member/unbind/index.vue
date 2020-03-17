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
          v-hasPermi="['system:member:remove']"
        >删除</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="关键字" prop="nickname">
              <el-input
                v-model="queryParams.nickname"
                placeholder="请输入昵称"
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
      :data="unbindList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
     <el-table-column label="ID" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center" prop="headimgurl" width="80">
        <template slot-scope="scope">
          <el-image :src="scope.row.headimgurl"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center" prop="nickname" />
      <el-table-column label="性别" align="center" prop="sex" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 0">未知</span>
          <span v-else-if="scope.row.sex == 1">男</span>
          <span v-else-if="scope.row.sex == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column label="关注渠道" align="center" prop="subscribeScene">
        <template slot-scope="scope">
          <span v-if="scope.row.subscribeScene = 'ADD_SCENE_SEARCH'">公众号搜索</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_ACCOUNT_MIGRATION'">公众号迁移</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_PROFILE_CARD'">名片分享</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_QR_CODE'">扫描二维码</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_PROFILE_LINK'">图文页内名称点击</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_PROFILE_ITEM'">图文页右上角菜单</span>
          <span v-else-if="scope.row.subscribeScene = 'DD_SCENE_PAID'">支付后关注</span>
          <span v-else-if="scope.row.subscribeScene = 'ADD_SCENE_OTHERS'">其他</span>
        </template>
      </el-table-column>
      <el-table-column label="订阅公众号(是/否)" align="center" prop="subscribe">
        <template slot-scope="scope">
          <span v-if="scope.row.subscribe == 0">否</span>
          <span v-else-if="scope.row.subscribe == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="state">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未绑定</span>
          <span v-else-if="scope.row.state == 1">已绑定</span>
          <span v-else-if="scope.row.state == 2">已拉黑</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="warning"
            @click="handleBlock(scope.row)"
          >拉黑</el-button>
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
import { listUnbind, delUnbind } from "@/api/member/unbind";
import MySearchTool from "@/components/SearchTool/index";
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
      unbindList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        state: 0,
        nickname: ""
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
      listUnbind(this.queryParams).then(response => {
        if (response.code == 200) {
          this.unbindList = response.rows;
          this.total = response.total;
          console.log(response.rows);
        }
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
    //拉黑
    handleBlock(row) {}
  },
  components: {
    MySearchTool
  }
};
</script>
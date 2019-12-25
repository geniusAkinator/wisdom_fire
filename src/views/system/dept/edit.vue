<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24" v-if="form.parentId !== 0">
          <el-form-item label="上级代理" prop="parentId">
            <treeselect v-model="form.parentId" :options="deptOptions" placeholder="选择上级代理" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代理名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入代理名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代理状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import { treeselect, addDept, getDept } from "@/api/system/dept";
export default {
  data() {
    return {
      form: {
        deptId: this.$parent.eid,
        parentId: 100,
        deptName: "",
        orderNum: "",
        leader: "",
        phone: "",
        email: "",
        status: "0"
      },
      deptOptions: [],
      statusOptions: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit() {
      addDept(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.$parent.getList();
          this.closeDialog();
        } else {
          this.msgError(response.msg);
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    getTreeselect() {
      treeselect().then(response => {
        if (response.code === 200) {
          this.deptOptions = response.data;
        }
      });
    },
    initForm() {
      this.getTreeselect();
      getDept(this.form.deptId).then(response => {
        if (response.code === 200) {
          this.form = response.data;
        }
      });
      this.getDicts("sys_normal_disable").then(response => {
        if (response.code === 200) {
          this.statusOptions = response.data;
        }
      });
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    Treeselect
  }
};
</script>

<style>
</style>
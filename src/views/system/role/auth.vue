<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" :disabled="true" />
      </el-form-item>
      <el-form-item label="权限字符">
        <el-input v-model="form.roleKey" :disabled="true" />
      </el-form-item>
      <el-form-item label="权限范围">
        <el-select v-model="form.dataScope">
          <el-option
            v-for="item in dataScopeOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据权限" v-show="form.dataScope == 2">
        <el-tree
          :data="deptOptions"
          show-checkbox
          default-expand-all
          ref="dept"
          node-key="id"
          empty-text="加载中，请稍后"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addRole, getRole, dataScope } from "@/api/system/role";
import {
  treeselect as deptTreeselect,
  roleDeptTreeselect
} from "@/api/system/dept";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        roleId: this.$parent.eid,
        roleName: "",
        roleKey: "",
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: "",
        dataScope: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      dataScopeOptions: [],
      rules: {},
      deptOptions: []
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.deptIds = this.getDeptAllCheckedKeys();
          dataScope(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功");
              this.$parent.getList();
              this.closeDialog();
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getHalfCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);

      this.getDicts("sys_role_scope").then(response => {
        if (response.code == 200) {
          this.dataScopeOptions = response.data;
        }
      });
      deptTreeselect().then(response => {
        if (response.code == 200) {
          this.deptOptions = response.data;
        }
      });
      getRole(this.form.roleId).then(response => {
        if (response.code == 200) {
          this.form = response.data;
          console.log(this.form);
        }
      });

      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style>
</style>
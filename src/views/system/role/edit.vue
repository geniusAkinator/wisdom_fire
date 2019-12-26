<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
      </el-form-item>
      <el-form-item label="角色顺序" prop="roleSort">
        <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictValue"
          >{{dict.dictLabel}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-tree
          :data="menuOptions"
          show-checkbox
          ref="menu"
          node-key="id"
          empty-text="加载中，请稍后"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateRole, getRole } from "@/api/system/role";
import {
  treeselect as menuTreeselect,
  roleMenuTreeselect
} from "@/api/system/menu";
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
        remark: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      statusOptions: [],
      menuOptions: [],
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.menuIds = this.getMenuAllCheckedKeys();
          updateRole(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("编辑成功");
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
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      this.getDicts("sys_normal_disable").then(response => {
        if (response.code == 200) {
          this.statusOptions = response.data;
        }
      });
      menuTreeselect().then(response => {
        if (response.code == 200) {
          this.menuOptions = response.data;
        }
      });

      roleMenuTreeselect(this.form.roleId).then(response => {
        if (response.code == 200) {
          this.$refs.menu.setCheckedKeys(response.data);
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
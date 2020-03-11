<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="20"> 
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <treeselect
              v-model="form.parentId"
              :options="menuOptions"
              :show-count="true"
              placeholder="选择上级菜单"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="M">目录</el-radio>
              <el-radio label="C">菜单</el-radio>
              <el-radio label="F">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
            <el-popover
              placement="bottom-start"
              width="460"
              trigger="click"
              @show="$refs['iconSelect'].reset()"
            >
              <IconSelect ref="iconSelect" @selected="selected" />
              <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                <svg-icon
                  v-if="form.icon"
                  slot="prefix"
                  :icon-class="form.icon"
                  class="el-input__icon"
                  style="height: 32px;width: 16px;"
                />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'F'" label="是否外链">
            <el-radio-group v-model="form.isFrame">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType == 'C'">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" placeholder="请输入组件路径" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType == 'C'" label="页面参数" prop="path">
            <el-input v-model="form.parameter" placeholder="请输入页面参数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'M'" label="权限标识">
            <el-input v-model="form.perms" placeholder="请权限标识" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="form.menuType != 'F'" label="禁用状态">
            <el-radio-group v-model="form.visible">
              <el-radio
                v-for="dict in visibleOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="form.menuType != 'F'" label="显示状态">
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
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateMenu, getMenu } from "@/api/system/menu";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import { treeselect } from "@/api/system/menu";

export default {
  data() {
    return {
      form: {
        menuId: this.$parent.eid,
        parentId: 0,
        menuName: "",
        icon: "",
        menuType: "M",
        orderNum: "",
        isFrame: "1",
        visible: "0",
        status: "0",
        parameter: ""
      },
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ]
      },
      menuOptions: [],
      visibleOptions: [],
      statusOptions: []
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateMenu(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("更新成功");
              this.$parent.getList();
              this.closeDialog();
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },
    getTreeselect() {
      treeselect().then(response => {
        this.menuOptions = [];
        const menu = { id: 0, label: "主类目", children: [] };
        menu.children = response.data;
        this.menuOptions.push(menu);
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    selected(name) {
      this.form.icon = name;
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      this.getTreeselect();
      this.getDicts("sys_show_hide").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("sys_enable_disable").then(response => {
        this.visibleOptions = response.data;
      });
      getMenu(this.form.menuId).then(response => {
        this.form = response.data;
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    Treeselect,
    IconSelect
  }
};
</script>

<style>
</style>
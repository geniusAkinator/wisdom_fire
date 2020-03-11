<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂" prop="name">
        <el-input v-model="form.factoryName" disabled />
      </el-form-item>
      <el-form-item label="选择团队">
        <el-select v-model="form.deptId" placeholder="请选择团队" @change="handleSelectTeam($event)">
          <el-option
            v-for="(item,index) in tlist"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择成员">
        <el-transfer v-model="value" :data="data"></el-transfer>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addConfig } from "@/api/system/config";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        factoryName: this.$parent.rowFactoryName,
        deptId: ""
      },
      flist: [],
      tlist: [],
      data: [],
      value: [1, 4],
      rules: {}
    };
  },
  methods: {
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.close(this.$parent.layerId);
    },
    handleSubmit() {
      addConfig(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.$parent.getList();
          this.closeDialog();
        } else {
          this.msgError(response.msg);
        }
      });
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    handleSelectTeam() {}
  },
  created() {
    this.initForm();
  },
  components: {}
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>
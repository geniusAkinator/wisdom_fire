<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂" prop="name">
        <el-select v-model="form.factoryId" disabled>
          <el-option
            v-for="(item,index) in flist"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择团队">
        <el-select v-model="form.departmentId" placeholder="请选择团队">
          <el-option
            v-for="(item,index) in tlist"
            :key="index"
            :label="item.departmentName"
            :value="item.departmentId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择成员">
        <el-transfer v-model="value" :titles="['待选成员列表', '选定成员列表']" :data="slist">
          <span slot-scope="{ option }">{{ option.key }} - {{ option.duty }}</span>
        </el-transfer>
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
import { listFactory } from "@/api/main/factory";
import { getTeamList } from "@/api/devops/ops";
import { listEmployee } from "@/api/team/employee";
export default {
  data() {
    return {
      form: {
        factoryId: this.$parent.rowFactoryId,
        departmentId: ""
      },
      flist: [],
      tlist: [],
      slist: [],
      value: [1, 4],
      rules: {}
    };
  },
  watch: {
    "form.departmentId"(nVal, oVal) {
      let _this = this;
      _this.getStaffList();
    }
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
      let _this = this;
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      listFactory().then(response => {
        if (response.code == 200) {
          _this.flist = response.rows;
        }
      });
      getTeamList({ factoryId: _this.form.factoryId }).then(response => {
        if (response.code == 200) {
          console.log(response.data);
          let _data = response.data;
          _this.tlist = _data;
        }
      });
      let loadingInstance = Loading.service(options);
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getStaffList() {
      let _this = this;
      listEmployee({ departmentId: _this.form.departmentId }).then(response => {
        if (response.code == 200) {
          console.log(response.rows);
          let _data = response.rows;
          let _arr = [];
          _data.map((item, i) => {
            console.log(item);
            let temp = {};
            temp.id = item.employeeId;
            temp.key = item.name;
            temp.duty = item.duty;
            if (item.state == 0) {
              temp.disabled = false;
            } else {
              temp.disabled = true;
            }
            _arr.push(temp);
          });
          _this.slist = _arr;
        }
      });
    }
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
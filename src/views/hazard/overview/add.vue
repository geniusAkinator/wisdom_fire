<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂">
        <el-select v-model="form.factoryId" disabled>
          <el-option
            v-for="(item,index) in flist"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择团队" prop="departmentId">
        <el-select v-model="form.departmentId" placeholder="请选择团队">
          <el-option
            v-for="(item,index) in tlist"
            :key="index"
            :label="item.departmentName"
            :value="item.departmentId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择成员" prop="staff">
        <el-transfer v-model="staffList" :titles="['待选成员列表', '选定成员列表']" :data="slist">
          <div slot-scope="{ option }">
            <del v-if="option.disabled">{{ option.name }}({{option.duty}})</del>
            <span v-else>{{ option.name }}({{option.duty}})</span>
          </div>
        </el-transfer>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { listFactory } from "@/api/main/factory";
import { getTeamList, addAppoint } from "@/api/hazard/overview";
import { listEmployee } from "@/api/team/employee";
export default {
  data() {
    let validateStaff = (rule, value, callback) => {
      if (this.staffList.length == 0) {
        callback(new Error("选定成员列表不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: {
        id: this.$parent.eid,
        factoryId: this.$parent.rowFactoryId,
        departmentId: "",
        remarks: ""
      },
      flist: [],
      tlist: [],
      slist: [],
      staffList: [],
      rules: {
        departmentId: [
          { required: true, message: "请选择指派团队", trigger: "change" }
        ],
        staff: [{ required: true, validator: validateStaff, trigger: "change" }]
      }
    };
  },
  watch: {
    "form.departmentId"(nVal, oVal) {
      let _this = this;
      _this.getStaffList();
    },
    staffList(nVal, oVal) {
      let str = "";
      if (nVal.length > 0) {
        nVal.forEach(function(val) {
          str = str + val + ",";
        });
        if (str.length > 0) str = str.substr(0, str.length - 1);
      }
      this.form.employeeId = str;
    }
  },
  methods: {
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.close(this.$parent.layerId);
    },
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          addAppoint(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("指派成功");
              this.$parent.getList();
              this.closeDialog();
            } else {
              this.msgError(response.msg);
            }
          });
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
            temp.name = item.name;
            temp.key = item.employeeId;
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
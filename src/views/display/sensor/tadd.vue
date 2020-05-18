<template>
  <div class="container form" >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item :label="thresholdName+'最小值'">
        <el-input v-model="form.mina" placeholder="请输入A最小值">
          <template slot="append">{{unit}}</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="thresholdName+'最大值'">
        <el-input v-model="form.maxa" placeholder="请输入A最大值">
          <template slot="append">{{unit}}</template>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="B最小值">
        <el-input v-model="form.minb" placeholder="请输入B最小值" />
      </el-form-item>
      <el-form-item label="B最大值">
        <el-input v-model="form.maxb" placeholder="请输入B最大值" />
      </el-form-item>
      <el-form-item label="C最小值">
        <el-input v-model="form.minc" placeholder="请输入C最小值" />
      </el-form-item>
      <el-form-item label="C最大值">
        <el-input v-model="form.maxc" placeholder="请输入C最大值" />
      </el-form-item>-->
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { updateThreshold, getThreshold } from "@/api/display/threshold";
import { getTransducertype } from "@/api/display/type";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        transducerId: this.$parent.eid,
        maxa: 0,
        maxb: 0,
        maxc: 0,
        mina: 0,
        minb: 0,
        minc: 0
      },
      rules: {},
      thresholdType: "",
      thresholdName: "",
      unit: "",
      threshold: [
        {
          name: "温度",
          unit: "℃"
        },
        {
          name: "湿度",
          unit: "%rh"
        },
        {
          name: "烟雾",
          unit: "ppm"
        },
        {
          name: "电压",
          unit: "V"
        },
        {
          name: "漏电流",
          unit: "mA"
        },
        {
          name: "功率",
          unit: "W"
        },
        {
          name: "浓度",
          unit: "%LEL"
        }
      ]
    };
  },
  watch: {
    thresholdType(nVal, oVal) {
      console.log(nVal);
      this.threshold.map((item, i) => {
        if (nVal.indexOf(item.name) != -1) {
          this.thresholdName = item.name;
          this.unit = item.unit;
        }
      });
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateThreshold(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("更新成功");
              // this.$parent.getList();
              this.$parent.getSensorList();
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
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      getThreshold({ transducerId: this.form.transducerId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          if (_data != undefined) {
            this.form.maxa = _data.maxa;
            this.form.maxb = _data.maxb;
            this.form.maxc = _data.maxc;
            this.form.mina = _data.mina;
            this.form.minb = _data.minb;
            this.form.minc = _data.minc;
          }
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    console.log(this.$parent.nowTypeId);
    getTransducertype(this.$parent.nowTypeId).then(response => {
      if (response.code == 200) {
        this.thresholdType = response.data.name;
      }
    });
    this.initForm();
  }
};
</script>

<style>
</style>
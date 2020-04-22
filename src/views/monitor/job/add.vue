<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="任务名称" prop="jobName">
            <el-input v-model="form.jobName" placeholder="请输入任务名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务分组" prop="jobGroup">
            <el-select v-model="form.jobGroup" placeholder="请选择">
              <el-option
                v-for="dict in jobGroupOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="invokeTarget">
            <span slot="label">
              调用方法
              <el-tooltip placement="top">
                <div slot="content">
                  Bean调用示例：ryTask.ryParams('ry')
                  <br />Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
                  <br />参数说明：支持字符串，布尔类型，长整型，浮点型，整型
                </div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
            <el-input v-model="form.invokeTarget" placeholder="请输入调用目标字符串" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="cron表达式" prop="cronExpression">
            <el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否并发" prop="concurrent">
            <el-radio-group v-model="form.concurrent" size="small">
              <el-radio-button label="0">允许</el-radio-button>
              <el-radio-button label="1">禁止</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="错误策略" prop="misfirePolicy">
            <el-radio-group v-model="form.misfirePolicy" size="small">
              <el-radio-button label="1">立即执行</el-radio-button>
              <el-radio-button label="2">执行一次</el-radio-button>
              <el-radio-button label="3">放弃执行</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态">
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
import { addJob } from "@/api/monitor/job";

export default {
  data() {
    return {
      form: {
        jobName: "",
        jobGroup: "",
        invokeTarget: "",
        cronExpression: "",
        misfirePolicy: 1,
        concurrent: 1,
        status: "0"
      },
      rules: {},
      jobGroupOptions: [],
      statusOptions: []
    };
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
          addJob(this.form).then(response => {
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
      this.getDicts("sys_job_group").then(response => {
        this.jobGroupOptions = response.data;
      });
      this.getDicts("sys_job_status").then(response => {
        this.statusOptions = response.data;
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
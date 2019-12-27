<template>
  <div class="container form">
    <el-tabs v-model="preview.activeName">
      <el-tab-pane
        v-for="(value, key) in preview.data"
        :label="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
        :name="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
        :key="key"
      >
        <pre>{{ value }}</pre>
      </el-tab-pane>
    </el-tabs>
    <div class="add-footer">
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import {  previewTable } from "@/api/tool/gen";
export default {
  data() {
    return {
      preview: {
        id: this.$parent.pid,
        open: false,
        data: {},
        activeName: "domain.java"
      }
    };
  },
  methods: {
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.close(this.$parent.layerId);
    },
    init() {
      previewTable(this.preview.id).then(response => {
        this.preview.data = response.data;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
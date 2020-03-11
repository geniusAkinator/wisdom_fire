<template>
  <div class="container">
    <el-card class="state-card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-col :span="8">
            <ul class="info_block">
              <li class="info_item">
                <span class="info_item_name">所属工厂:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">所属楼宇:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">所属楼层:</span>
                <span class="info_item_value"></span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="info_block">
              <li class="info_item">
                <span class="info_item_name">设备编号:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">设备类型:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">点位描述:</span>
                <span class="info_item_value"></span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="info_block">
              <li class="info_item">
                <span class="info_item_name">故障类型:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">故障状态:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">故障描述:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">上报时间:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">更新时间:</span>
                <span class="info_item_value"></span>
              </li>
              <li class="info_item">
                <span class="info_item_name">完成时间:</span>
                <span class="info_item_value"></span>
              </li>
            </ul>
          </el-col>
        </el-col>
        <el-col :span="12">
          <div class="detail_img_content">
            <div class="not_found">暂无楼层图，请先到工厂管理中添加</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <span class="subtitle">维修进度预览</span>
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card shadow="never">
              <h5>已完成</h5>
              <h4>填写内容</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card shadow="never">
              <h5>处理中</h5>
              <h4>填写内容</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card shadow="never">
              <h5>待处理</h5>
              <h4>填写内容</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAppointAdd from "@/views/devOps/ops/add";

export default {
  data() {
    return {
      tableData: [],
      layerId: "",
    };
  },
  methods: {
    
  }
};
</script>

<style>
.info_block {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding: 0 20px;
}
.info_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.info_item:last-child {
  margin-bottom: 0;
}
.detail_img_content {
  min-height: 100px;
  width: 100%;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: crosshair;
  position: relative;
  line-height: 0;
}
.not_found {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  line-height: 102px;
}
.subtitle {
  margin: 20px;
  display: block;
  font-weight: bold;
}
.info_item_name{
  font-weight: bold;
}
</style>
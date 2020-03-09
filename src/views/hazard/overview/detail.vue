<template>
  <div class="container">
    <el-card class="state-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <ul class="state_block">
            <li class="state_item">
              <div class="border-circle">0</div>
            </li>
            <li class="state_item">
              <div class="border-circle warning">0</div>
            </li>
            <li class="state_item">
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_item_name">上报时间</span>
              <span class="info_item_value">2019-11-16 13:59:24</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">更新时间</span>
              <span class="info_item_value">2019-11-16 13:59:24</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_item_name">处理人</span>
              <span class="info_item_value">刘XX</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">处理时间</span>
              <span class="info_item_value">2019-11-16 13:59:24</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">处理结果</span>
              <span class="info_item_value">确认火灾</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <div class="state_record">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-table class="state_table" :data="tableData" border stripe style="width: 100%">
              <el-table-column prop="id" label="id"></el-table-column>
              <el-table-column prop="number" label="点位号"></el-table-column>
              <el-table-column prop="type" label="设备类型"></el-table-column>
              <el-table-column prop="des" label="位置描述"></el-table-column>
              <el-table-column prop="date" label="首次上报时间"></el-table-column>
              <el-table-column prop="date" label="最后上报时间"></el-table-column>
              <el-table-column prop="count" label="上报次数"></el-table-column>
            </el-table>
            <el-pagination class="state_paging" background layout="prev, pager, next" :total="200"></el-pagination>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- <div ref="floorImg" class="detail_img_content" v-if="sensor.floor.picture!=''">
            <img class="floor_img" :src="imgUrl+sensor.floor.picture" />
            <img
              ref="marker"
              :style="{left:`${sensor.xaxis}%`,top:`${sensor.yaxis}%`}"
              class="floor_img_marker"
              :src="icon"
              alt
            />
          </div>-->
          <div class="detail_img_content">
            <div class="not_found">暂无楼层图，请先到工厂管理中添加</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      imgUrl: "",
      icon: require("@/assets/image/map-marker.png"),
    };
  },
  watch: {},
  methods: {
    init() {}
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>

<style>
.detail_img_content {
  min-height: 100px;
  width: 100%;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: crosshair;
  position: relative;
  line-height: 0;
}
.state_block {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.state_item {
  display: block;
  flex: 1;
}
.state_name {
  display: block;
  font-weight: bold;
  font-size: 22px;
}
.state_value {
  font-size: 22px;
}
.info_block {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding: 0 20px;
}
/* .info_block::before {
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 1px;
  background: #000;
  display: block;
  content: "";
} */
.info_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.info_item:last-child {
  margin-bottom: 0;
}
.state_record {
  margin-top: 20px;
}
.floor_img {
  width: 100%;
  border: 1px solid #ebeef5;
}
.not_found {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.state_paging {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.state_table .cell {
  text-align: center;
}
.floor_img_marker {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}
.action-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 600px;
  padding: 10px;
  overflow: hidden;
  overflow-y: scroll;
}
.group-name {
  font-size: 22px;
  font-weight: bold;
  margin: 16px 0;
  display: block;
}
.action-detail-list {
  list-style-type: none;
  background: #ebeef5;
  padding: 20px;
  border-radius: 5px;
}
.action-detail-list li {
  margin-bottom: 10px;
}
.resolution {
  background: #ebeef5;
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  margin-top: 20px;
}
.res {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.res button {
  margin-right: 10px;
}

.info-panel {
  margin-bottom: 20px;
  background: #ebeef5;
  padding: 10px;
  border-radius: 5px;
}
.not_found {
  height: 100%;
  line-height: 102px;
}
.border-circle {
  width: 100px;
  height: 100px;
  border: 2px solid #409eff;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}
.border-circle.danger {
  border: 2px solid #f56c6c;
  background: #fff;
}
.border-circle.warning {
  border: 2px solid #e6a23c;
  background: #fff;
}
</style>
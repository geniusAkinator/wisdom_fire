<template>
  <el-calendar>
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
    <template v-slot:dateCell="{date, data}">
      <p :class="data.isSelected ? 'is-selected' : ''">{{data.day.split('-').slice(1)[1]}}</p>
      <div class="status">
        <template v-for="(item,key) in clist">
          <i class="circle warning" :key="key" v-if="item.isHazard&&isBoolean(data,item)"></i>
          <!-- <i class="circle danger" :key="key" v-if="item.errorCount&&isBoolean(data,item)"></i>
          <i class="circle info" :key="key" v-if="item.outlineCount&&isBoolean(data,item)"></i>-->
        </template>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data() {
    return {
      clist: []
    };
  },
  computed: {
    isBoolean() {
      return function(day1, day2) {
        return day1.day == day2.createDate;
      };
    }
  },
  watch: {
    list: function(newVal, oldVal) {
      this.clist = newVal;
    }
  },
  props: {
    list: {}
  }
};
</script>

<style>
.is-selected {
  color: #1989fa;
}
.el-calendar-day p {
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: block;
  margin: auto;
  font-size: 10px;
}
.is-today p {
  background: #ff0000;
  color: #fff;
  border-radius: 50%;
}
.status {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 32px;
  margin: auto;
  margin-top: 2px;
}
.status .circle {
  width: 6px;
  height: 6px;
  display: block;
  margin-right: 0;
}
.prev .circle.warning,
.next .circle.warning {
  background: rgb(250, 236, 216);
}
.prev .circle.danger,
.next .circle.danger {
  background: rgb(253, 226, 226);
}
.prev .circle.info,
.next .circle.info {
  background: rgb(233, 233, 235);
}
.current.is-selected p {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: block;
  margin: auto;
  font-size: 10px;
}
</style>
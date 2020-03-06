<!-- 搜索框用于slot -->
<template>
  <div class="query" v-clickOutSide="handleClose">
    <div :class="{'query-picker':true,'active':current}" @click="toggle">
      ==查询条件==
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="query-content">
      <div class="query-form">
        <slot name="content"></slot>
      </div>
      <div class="query-btn-group">
        <slot name="end"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: this.isActive
    };
  },
  methods: {
    toggle() {
      this.current = !this.current;
    },
    handleClose() {
      if (this.current) {
        this.current = false;
      }
    }
  },
  mounted() {}
};
</script>

<style>
.query {
  position: relative;
}
.query-picker {
  width: 200px;
  border-radius: 3px;
  height: 30px;
  border: 1px solid #c9c9c9;
  background: #fff;
  font-size: 12px;
  padding: 0 16px;
  cursor: pointer;
  color: #555;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 10001;
  line-height: 32px;
  display: flex;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  transition: all 0.6s;
  -webkit-transition: all 0.6s;
  border-bottom: 1px solid #c9c9c9;
}
.query-picker.active {
  border-bottom: 1px solid #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.query-picker i {
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.query-picker i {
  margin-left: auto;
  line-height: 32px;
}
.query-picker.active i {
  transform: rotate(-180deg);
  -ms-transform: rotate(-180deg); /* IE 9 */
  -moz-transform: rotate(-180deg); /* Firefox */
  -webkit-transform: rotate(-180deg); /* Safari å’Œ Chrome */
  -o-transform: rotate(-180deg); /* Opera */
}

.query-picker::after {
  content: "";
  left: 0;
  right: 0px;
  bottom: -1px;
  height: 1px;
  display: block;
  background: #c9c9c9;
  position: absolute;
  transition: all 0.6s;
  -webkit-transition: all 0.6s;
  z-index: -1;
}
.query-picker.active::after {
  content: "";
  left: 0;
  right: 0px;
  bottom: -1px;
  height: 1px;
  display: block;
  background: #fff;
  position: absolute;
  z-index: 1;
}
.query-content {
  position: absolute;
  top: 29px;
  left: 0;
  min-width: 400px;
  background: #fff;
  border: 1px solid #c9c9c9;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  display: none;
  z-index: 10000;
  padding: 20px;
  box-shadow: 2px 2px 5px #ccc;
}
.query-picker.active + .query-content {
  display: block;
}
.query-btn-group {
  float: right;
}
.el-button + .el-button {
  margin-left: 0;
}
.query-form {
  min-height: 80px;
}
.query-form .el-form-item{
  margin-bottom: 10px;
}
.query-content {
  min-height: 80px;
}
</style>
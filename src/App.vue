<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: function(newVal, oldVal) {
      this.$layer.closeAll();
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 20px;
}
.container.form {
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-bottom: 54px;
}
.container.form .el-form {
  padding-bottom: 70px;
}
.table-tool {
  position: relative;
  z-index: 15;
  padding: 10px 15px;
  border-top: 1px solid #e7e7e7;
  background-color: #f8f8f8;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  display: flex;
  .el-button-group + .query {
    margin-left: 10px;
  }
  .table-tool-others {
    margin-left: auto;
  }
  .table-tool-others .el-inline {
    position: relative;
    width: 26px;
    height: 26px;
    padding: 2px;
    line-height: 26px;
    margin-right: 10px;
    text-align: center;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    -webkit-transition: 0.5s all;
    transition: 0.5s all;
    background: #ccc;
    color: #fff;
  }
  .table-tool-others .el-inline:hover {
    background: #909399;
  }
}
.vl-notify,
.vl-notify-mask {
  position: absolute !important;
}
.vl-notify-mask {
  background-color: #000;
  opacity: 0.2;
  right: 0;
  height: auto;
  width: auto;
  left: 0;
  height: initial !important;
  bottom: -9999px !important;
}
// .vl-notify-content {
//   z-index: 2002 !important;
// }
// .vl-notify {
//   z-index: 2003 !important;
// }
.add-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  z-index: 99;
}
.add-footer .el-button + .el-button {
  margin-left: 10px;
}

.vl-notify.vl-notify-main + .vl-notify.vl-notify-main + .vl-notify-mask {
  z-index: 503 !important;
}
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.readonly input[readonly="readonly"] {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.toggleMap {
  position: relative;
  width: 38px;
  height: 38px;
  padding: 0;
  line-height: 38px;
  margin-right: 10px;
  text-align: center;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
  -webkit-transition: 0.5s all;
  transition: 0.5s all;
  font-size: 16px;
  margin-left: 20px;
  border-radius: 4px;
}
.toggleMap.active {
  color: #fff;
  background: #409eff;
  border: 1px solid #409eff;
}
.form-map-picker + .map-picker {
  margin-top: 10px;
}
.form-map-picker .el-col:nth-child(2) {
  margin-left: 20px;
}
.app-wrapper {
  overflow: hidden;
}
.help-block {
  color: #999;
  margin-top: 0;
  margin-bottom: 0;
  display: block;
}
.tips {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
}
.el-card__header .tips {
  padding: 18px 0;
}
.tips-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  line-height: 19px;
}
.tips-item:last-child {
  margin-right: 0;
}
.circle {
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  margin-right: 5px;
}
.circle.success {
  background: #67c23a;
}
.circle.warning {
  background: #e6a23c;
}
.circle.danger {
  background: #f56c6c;
}
.circle.info {
  background: #909399;
}
.el-card {
  position: relative;
}
.box-card .el-carousel .el-carousel__indicators {
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  bottom: auto;
  padding: 8px 20px;
  border-bottom: 0;
}
.box-card .el-carousel {
  position: initial;
}
.box-card .el-carousel .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}
.box-card .el-carousel .el-carousel__button.is-active {
  background: #999;
}
.box-card.no-padding .el-card__body {
  padding: 0;
}
.block-content .el-carousel__container {
  height: 200px;
}
.header_right {
  position: absolute;
  right: 20px;
  top: 0;
}
.el-input__prefix .svg-icon {
  margin-top: 2px;
  margin-left: 5px;
}
.el-tabs .el-tabs__nav-next,
.el-tabs .el-tabs__nav-prev {
  width: 40px;
  display: block;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid #dfe4ed;
  line-height: 39px;
}
.el-card + .el-table {
  margin-top: 20px;
}

.calendar .el-calendar__header {
  position: absolute;
  top: 0;
  right: 0;
  padding: 13px 20px;
  border-bottom: 0;
}
.el-calendar__title {
  display: none;
}
.el-calendar__body {
  padding: 0;
}
.el-calendar-table .el-calendar-day {
  height: auto;
}

#tags-view-container
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-active {
  border-bottom-color: #dfe4ed;
}

#tags-view-container .el-tabs__header {
  margin: 0;
}

::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

.app-main ::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2) inset;
}

.app-main ::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* ==================
          布局
 ==================== */

/*  -- flex弹性布局 -- */

.flex {
  display: flex;
}

.basis-xs {
  flex-basis: 20%;
}

.basis-sm {
  flex-basis: 40%;
}

.basis-df {
  flex-basis: 50%;
}

.basis-lg {
  flex-basis: 60%;
}

.basis-xl {
  flex-basis: 80%;
}

.flex-sub {
  flex: 1;
}

.flex-twice {
  flex: 2;
}

.flex-treble {
  flex: 3;
}

.flex-direction {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: flex-center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}

.align-stretch {
  align-items: stretch;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

/* -- 浮动 --  */

.cf::after,
.cf::before {
  content: " ";
  display: table;
}

.cf::after {
  clear: both;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.round {
  border-radius: 5000px;
}

.radius {
  border-radius: 12px;
}

/*  -- 内外边距 -- */

.margin-0 {
  margin: 0;
}

.margin-xs {
  margin: 10px;
}

.margin-sm {
  margin: 20px;
}

.margin {
  margin: 30px;
}

.margin-lg {
  margin: 40px;
}

.margin-xl {
  margin: 50px;
}

.margin-top-xs {
  margin-top: 10px;
}

.margin-top-sm {
  margin-top: 20px;
}

.margin-top {
  margin-top: 30px;
}

.margin-top-lg {
  margin-top: 40px;
}

.margin-top-xl {
  margin-top: 50px;
}

.margin-right-xs {
  margin-right: 10px;
}

.margin-right-sm {
  margin-right: 20px;
}

.margin-right {
  margin-right: 30px;
}

.margin-right-lg {
  margin-right: 40px;
}

.margin-right-xl {
  margin-right: 50px;
}

.margin-bottom-xs {
  margin-bottom: 10px;
}

.margin-bottom-sm {
  margin-bottom: 20px;
}

.margin-bottom {
  margin-bottom: 30px;
}

.margin-bottom-lg {
  margin-bottom: 40px;
}

.margin-bottom-xl {
  margin-bottom: 50px;
}

.margin-left-xs {
  margin-left: 10px;
}

.margin-left-sm {
  margin-left: 20px;
}

.margin-left {
  margin-left: 30px;
}

.margin-left-lg {
  margin-left: 40px;
}

.margin-left-xl {
  margin-left: 50px;
}

.margin-lr-xs {
  margin-left: 10px;
  margin-right: 10px;
}

.margin-lr-sm {
  margin-left: 20px;
  margin-right: 20px;
}

.margin-lr {
  margin-left: 30px;
  margin-right: 30px;
}

.margin-lr-lg {
  margin-left: 40px;
  margin-right: 40px;
}

.margin-lr-xl {
  margin-left: 50px;
  margin-right: 50px;
}

.margin-tb-xs {
  margin-top: 10px;
  margin-bottom: 10px;
}

.margin-tb-sm {
  margin-top: 20px;
  margin-bottom: 20px;
}

.margin-tb {
  margin-top: 30px;
  margin-bottom: 30px;
}

.margin-tb-lg {
  margin-top: 40px;
  margin-bottom: 40px;
}

.margin-tb-xl {
  margin-top: 50px;
  margin-bottom: 50px;
}

.padding-0 {
  padding: 0;
}

.padding-xs {
  padding: 10px;
}

.padding-sm {
  padding: 20px;
}

.padding {
  padding: 30px;
}

.padding-lg {
  padding: 40px;
}

.padding-xl {
  padding: 50px;
}

.padding-top-xs {
  padding-top: 10px;
}

.padding-top-sm {
  padding-top: 20px;
}

.padding-top {
  padding-top: 30px;
}

.padding-top-lg {
  padding-top: 40px;
}

.padding-top-xl {
  padding-top: 50px;
}

.padding-right-xs {
  padding-right: 10px;
}

.padding-right-sm {
  padding-right: 20px;
}

.padding-right {
  padding-right: 30px;
}

.padding-right-lg {
  padding-right: 40px;
}

.padding-right-xl {
  padding-right: 50px;
}

.padding-bottom-xs {
  padding-bottom: 10px;
}

.padding-bottom-sm {
  padding-bottom: 20px;
}

.padding-bottom {
  padding-bottom: 30px;
}

.padding-bottom-lg {
  padding-bottom: 40px;
}

.padding-bottom-xl {
  padding-bottom: 50px;
}

.padding-left-xs {
  padding-left: 10px;
}

.padding-left-sm {
  padding-left: 20px;
}

.padding-left {
  padding-left: 30px;
}

.padding-left-lg {
  padding-left: 40px;
}

.padding-left-xl {
  padding-left: 50px;
}

.padding-lr-xs {
  padding-left: 10px;
  padding-right: 10px;
}

.padding-lr-sm {
  padding-left: 20px;
  padding-right: 20px;
}

.padding-lr {
  padding-left: 30px;
  padding-right: 30px;
}

.padding-lr-lg {
  padding-left: 40px;
  padding-right: 40px;
}

.padding-lr-xl {
  padding-left: 50px;
  padding-right: 50px;
}

.padding-tb-xs {
  padding-top: 10px;
  padding-bottom: 10px;
}

.padding-tb-sm {
  padding-top: 20px;
  padding-bottom: 20px;
}

.padding-tb {
  padding-top: 30px;
  padding-bottom: 30px;
}

.padding-tb-lg {
  padding-top: 40px;
  padding-bottom: 40px;
}

.padding-tb-xl {
  padding-top: 50px;
  padding-bottom: 50px;
}
/* ==================
          文本
 ==================== */

.text-xs {
  font-size: 20px;
}

.text-sm {
  font-size: 24px;
}

.text-df {
  font-size: 28px;
}

.text-lg {
  font-size: 32px;
}

.text-xl {
  font-size: 36px;
}

.text-xxl {
  font-size: 44px;
}

.text-sl {
  font-size: 80px;
}

.text-xsl {
  font-size: 120px;
}

/* ==================
         颜色
 ==================== */

.bg-white {
  background: #fff;
}
.text-white {
  color: #fff;
}
.bg-blue {
  background: #2356f9;
}
.text-blue {
  color: #2356f9;
}

.text-cut {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.text-bold {
  font-weight: bold;
}

.text-center {
  text-align: center;
}

.folder {
  padding: 20px;
  background: #f6f6f6;
  border: 1px solid #efefef;
}
.chain-table {
  border: 1px solid #efefef;
  border-top: 0;
  border-bottom: 0;
}
.chain-icon {
  transition: all 0.3s linear;
  opacity: 0;
  cursor: pointer;
  font-size: 20px;
}
.chain-table tr:hover .chain-icon {
  opacity: 1;
}
.chain-table .el-icon-edit:hover {
  color: #409eff;
}
.chain-table .el-icon-delete:hover {
  color: #f56c6c;
}
</style>

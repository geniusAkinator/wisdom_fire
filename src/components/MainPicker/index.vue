<!-- 主体选择器 -->
<template>
  <div class="main-picker">
    <div class="main_search">
      <el-input
        v-model="keyword"
        placeholder="请输入内容"
        size="medium"
        @focus="handleFocus"
        @blur="handleBlur"
        id="inputMain"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" size="medium" id="btnMainAdd" @click="jump"></el-button>
    </div>
    <ul class="main_list">
      <template v-for="(item,index) in mainList">
        <li
          :class="item.isCollapsed?'main_row collapsed':'main_row expanded'"
          :key="index"
          @click.stop="handleToggle(index)"
        >
          <div class="team_item">
            <span class="main_name">{{item.label}}</span>
            <div class="right">
              <i class="el-icon-arrow-down"></i>
              <i class="el-icon-arrow-up"></i>
            </div>
          </div>
          <el-collapse-transition>
            <ul class="factory_list" v-show="!item.isCollapsed">
              <template v-for="(citem,idx) in item.children">
                <li
                  class="factory_row"
                  :key="idx"
                  @click.stop="handleSelectFactory(index,idx,citem)"
                >
                  <div class="factory_item">
                    <span class="factory_name">{{citem.label}}</span>
                  </div>
                </li>
              </template>
            </ul>
          </el-collapse-transition>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { listDept } from "@/api/system/dept";
import { listFactory } from "@/api/main/factory";

export default {
  data() {
    return {
      keyword: "",
      mainList: [
        // {
        //   id: "1",
        //   label: "阿米华晟代理商",
        //   isCollapsed: true,
        //   children: [
        //     {
        //       id: "2",
        //       label: "AAA工厂",
        //       checked: false
        //     },
        //     {
        //       id: "3",
        //       label: "BBB工厂",
        //       checked: false
        //     },
        //     {
        //       id: "4",
        //       label: "CCC工厂",
        //       checked: false
        //     }
        //   ]
        // },
        // {
        //   id: "1",
        //   label: "阿米华晟代理商",
        //   isCollapsed: true,
        //   children: [
        //     {
        //       id: "2",
        //       label: "AAA工厂",
        //       checked: false
        //     },
        //     {
        //       id: "3",
        //       label: "BBB工厂",
        //       checked: false
        //     },
        //     {
        //       id: "4",
        //       label: "CCC工厂",
        //       checked: false
        //     }
        //   ]
        // }
      ]
    };
  },
  methods: {
    handleBlur() {
      const btn = document.querySelector("#btnMainAdd");
      const input = document.querySelector("#inputMain");
      btn.classList.remove("hide");
      input.classList.remove("filled");
    },
    handleFocus() {
      const btn = document.querySelector("#btnMainAdd");
      const input = document.querySelector("#inputMain");
      btn.classList.add("hide");
      input.classList.add("filled");
    },
    handleToggle(index) {
      this.$set(
        this.mainList[index],
        "isCollapsed",
        !this.mainList[index].isCollapsed
      );
    },
    handleSelectFactory(idx1, idx2, item) {
      this.$emit("send", "");
      this.$router.push({
        name: "工厂管理"
      });
      setTimeout(() => {
        this.$router.push({
          name: "工厂详情"
        });
      }, 600);
    },
    jump() {
      this.$router.push({
        name: "Factory"
      });
    }
  },
  mounted() {
    let flist = [];
    listFactory()
      .then(response => {
        if (response.code === 200) {
          flist = response.rows;
          console.log(flist);
          return listDept();
        }
      })
      .then(response => {
        if (response.code === 200) {
          let dlist = response.data[0].children;
          dlist.map((item, i) => {
            console.log(item);
            let temp = {};
            temp.id = item.deptId;
            temp.label = item.deptName;
            temp.isCollapsed = true;
            temp.children = [];
            console.log();
            item.children.map((citem, k) => {
              flist.map((fitem, j) => {
                if (fitem.deptId == citem.deptId) {
                  let temp2 = {};
                  temp2.id = fitem.factoryId;
                  temp2.label = fitem.factoryName;
                  temp2.checked = false;
                  temp.children.push(temp2);
                }
              });
            });
            flist.map((fitem, j) => {
              if (fitem.deptId == item.deptId) {
                let temp2 = {};
                temp2.id = fitem.factoryId;
                temp2.label = fitem.factoryName;
                temp2.checked = false;
                temp.children.push(temp2);
              }
            });
            this.mainList.push(temp);
          });
        }
      });
  }
};
</script>

<style>
.main-picker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  padding: 10px;
  overflow: hidden;
  overflow-y: scroll;
  border-left: 1px solid #e7e7e7;
  background-image: url("../../assets/image/texture.png");
  color: #000;
  z-index: 9999;
}
.main_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.main_list > li {
  display: block;
  padding-top: 10px;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  position: relative;
}
.factory_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.factory_list li {
  display: block;
  cursor: pointer;
  padding-left: 40px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin-top: 10px;
}
.main_name {
  font-weight: bold;
}
.team_item {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}
.factory_list::before {
  content: "";
  display: block;
  width: 1px;
  background: #999;
  position: absolute;
  left: 10px;
  top: 50px;
  bottom: 10px;
}
.team_row,
.factory_row {
  position: relative;
}
.factory_row::before {
  content: "";
  display: block;
  height: 1px;
  background: #999;
  position: absolute;
  left: 10px;
  top: 25px;
  bottom: 10px;
  width: 31px;
}
.factory_item {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}

.factory_duty {
  float: right;
  color: #999;
  font-size: 12px;
}
.factory_item .el-checkbox {
  width: 100%;
}
.el-checkbox__label {
  width: calc(100% - 20px);
}
.factory_item .el-checkbox__inner {
  border-radius: 50%;
}
.main_row {
  position: relative;
}
.team_item .right {
  position: absolute;
  top: 10px;
  height: 40px;
  line-height: 40px;
  right: 10px;
  font-size: 16px;
}
.main_row.collapsed .team_item .right .el-icon-arrow-down {
  display: inline-block;
}
.main_row.collapsed .team_item .right .el-icon-arrow-up {
  display: none;
}
.main_row.expanded .team_item .right .el-icon-arrow-down {
  display: none;
}
.main_row.expanded .team_item .right .el-icon-arrow-up {
  display: inline-block;
}
.main_search {
  display: flex;
  overflow: hidden;
}
.main_search input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition-property: all;
  transition-duration: 0.6s;
  transition-delay: 0.6s;
}
.main_search button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition-property: all;
  transition-duration: 0.6s;
}
.filled {
  width: 312px;
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}
.hide {
  opacity: 0;
  transform: scale(0.1);
}
</style>
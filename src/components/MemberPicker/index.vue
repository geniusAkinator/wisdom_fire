<!-- 成员选择器 -->
<template>
  <div class="member-picker">
    <el-input v-model="keyword" placeholder="请输入内容" size="medium"></el-input>
    <ul class="teamer_list">
      <template v-for="(item,index) in teamerList">
        <li
          :class="item.isCollapsed?'team_row collapsed':'team_row expanded'"
          :key="index"
          @click="handleClick(index)"
        >
          <div class="team_item">
            <i class="el-icon-circle-plus-outline"></i>
            <i class="el-icon-remove-outline"></i>
            <span class="teamer_name">{{item.label}}</span>
          </div>
          <el-collapse-transition>
            <ul class="member_list" v-show="!item.isCollapsed">
              <li
                class="member_row"
                v-for="(mitem,idx) in item.children"
                :key="idx"
                @click.stop="handleSubClick"
              >
                <div class="member_item">
                  <el-checkbox v-model="mitem.checked" @change="handleCheckboxClick(mitem)">
                    <span class="member_name">{{mitem.label}}</span>
                    <span class="member_duty">{{mitem.duty}}</span>
                  </el-checkbox>
                </div>
              </li>
            </ul>
          </el-collapse-transition>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { listDepartmentList } from "@/api/team/department";
import { listEmployee } from "@/api/team/employee";
export default {
  data() {
    return {
      keyword: "",
      tform: {
        pageNum: 1,
        pageSize: 0,
        deptId: this.$store.getters.dept.deptId
      },
      eform: {
        pageNum: 1,
        pageSize: 0
      },
      teamerList: []
    };
  },
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(nVal, oVal) {
        let list = nVal;
        let arr = [];
        list.map((item, i) => {
          arr.push(item.id);
        });
        this.teamerList.map((item, i) => {
          item.children.map((citem, j) => {
            if (arr.indexOf(citem.id) != "-1") {
              citem.checked = true;
            } else {
              citem.checked = false;
            }
          });
        });
      }
    }
  },
  methods: {
    handleClick(index) {
      this.$set(
        this.teamerList[index],
        "isCollapsed",
        !this.teamerList[index].isCollapsed
      );
      if (!this.teamerList[index].isFirst) {
        return;
      }
      let _rowId = this.teamerList[index].id;
      listEmployee(this.eform)
        .then(res => {
          if (res.code == 200) {
            let list = res.rows;
            if (list.length) {
              let arr = [];
              list.map((item, i) => {
                if (item.departmentId == _rowId) {
                  let temp = {};
                  temp.id = item.employeeId;
                  temp.label = item.name;
                  temp.duty = item.duty;
                  temp.checked = false;
                  arr.push(temp);
                }
              });
              this.$set(this.teamerList[index], "children", arr);
              this.$set(this.teamerList[index], "isFirst", false);
            }
          }
        })
        .catch(_ => {});
    },
    handleSubClick() {},
    handleCheckboxClick(mitem) {
      let arr = [];
      this.teamerList.map((item, i) => {
        item.children.map((citem, j) => {
          if (citem.checked) {
            arr.push(citem);
          }
        });
      });
      this.$emit("sendMember", arr);
    }
  },
  mounted() {
    console.log(this.tform);
    console.log();
    listDepartmentList(this.tform)
      .then(res => {
        console.log(res);
        if (res.code == 200) {
          let list = res.data;
          let arr = [];
          list.map((item, i) => {
            let temp = {};
            temp.label = item.departmentName;
            temp.id = item.departmentId;
            temp.isCollapsed = true;
            temp.isFirst = true;
            temp.children = [];
            arr.push(temp);
          });
          this.teamerList = arr;
        }
      })
      .catch(_ => {});
  }
};
</script>

<style>
.member-picker {
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
.teamer_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.teamer_list > li {
  display: block;
  padding-top: 10px;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.team_row.collapsed i.el-icon-remove-outline {
  display: none;
}
.team_row.collapsed i.el-icon-circle-plus-outline {
  display: inline-block;
}
.team_row.expanded i.el-icon-remove-outline {
  display: inline-block;
}
.team_row.expanded i.el-icon-circle-plus-outline {
  display: none;
}
.member_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.member_list li {
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
.teamer_name {
  font-weight: bold;
}
.team_item {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}
.member_list::before {
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
.member_row {
  position: relative;
}
.member_row::before {
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
.member_item {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}

.member_duty {
  float: right;
  color: #999;
  font-size: 12px;
}
.member_item .el-checkbox {
  width: 100%;
}
.el-checkbox__label {
  width: calc(100% - 20px);
}
.member_item .el-checkbox__inner {
  border-radius: 50%;
}
</style>
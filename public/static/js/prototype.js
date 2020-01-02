// 扩充
// String.prototype.colorHex = function () { //RBG转HEX
//     // RGB颜色值的正则
//     var reg = /^(rgb|RGB)/;
//     var color = this;
//     if (reg.test(color)) {
//         var strHex = "#";
//         // 把RGB的3个数值变成数组
//         var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
//         // 转成16进制
//         for (var i = 0; i < colorArr.length; i++) {
//             var hex = Number(colorArr[i]).toString(16);
//             if (hex === "0") {
//                 hex += hex;
//             }
//             strHex += hex;
//         }
//         return strHex;
//     } else {
//         return String(color);
//     }
// };

// String.prototype.colorRgb = function () { //HEX转RBG
//     // 16进制颜色值的正则
//     var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
//     // 把颜色值变成小写
//     var color = this.toLowerCase();
//     if (reg.test(color)) {
//         // 如果只有三位的值，需变成六位，如：#fff => #ffffff
//         if (color.length === 4) {
//             var colorNew = "#";
//             for (var i = 1; i < 4; i += 1) {
//                 colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
//             }
//             color = colorNew;
//         }
//         // 处理六位的颜色值，转为RGB
//         var colorChange = [];
//         for (var i = 1; i < 7; i += 2) {
//             colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
//         }
//         return "RGB(" + colorChange.join(",") + ")";
//     } else {
//         return color;
//     }
// };

// String.prototype.isEmpty = function () { return !(/.?[^/s　]+/.test(this)); } //检测字符串是否为空
// // 替换字符
// String.prototype.reserve = function (type) {
//     if (type == 'int') return this.replace(/^/d / g, ''); // 替换字符串中除了数字以外的所有字符
//     else if (type == 'en') return this.replace(/[^A-Za-z]/g, ''); // 替换字符串中除了英文以外的所有字符
//     else if (type == 'cn') return this.replace(/[^/u4e00-/u9fa5/uf900-/ufa2d]/g, ''); // 替换字符串中除了中文以外的所有字符
//     else return this;
// }
// // 字符串反转
// String.prototype.reverse = function () {
//     return this.split('').reverse().join('');
// }
// // 以一个中文算两个字符长度计算字符串的长度
// String.prototype.cnLength = function () { return this.replace(/[^/x00-/xff]/g, ' * * ').length; }
// // 替换字符串中的空格
// String.prototype.trim = function (type, char) {
//     var type = type ? type.toUpperCase() : '';
//     // switch (type) {
//     //     case 'B': // 替换所有欲清除字符,未定义char则默认为替换空格
//     //         return this.replace(char ? new RegExp(char, 'g') : /(/s +|　) / g, '');
//     //     case 'O': // 将两个以上的连续欲清除字符替换为一个,未定义char则默认为替换空格
//     //         return char ? this.replace(new RegExp(char + '{2,}', 'g'), char) : this.replace(/[/s　]{2,}/g, ' ');
//     //     case 'L': // 替换除左边欲清除字符,未定义char则默认为替换空格
//     //         return this.replace(char ? new RegExp('^(' + char + ') * ', 'g') : /^(/s |　) * /g, '');
//     //     case 'R': // 替换除右边欲清除字符,未定义char则默认为替换空格
//     //         return this.replace(char ? new RegExp('(' + char + ') * $', 'g') : /(/s |　) * $ / g, '');
//     //     default: // 替换除左右两边欲清除字符,未定义char则默认为替换空格
//     //         return this.replace(char ? new RegExp('^(' + char + ') * |(' + char + ') * $', 'g') : /(^/s * |　) | (　| /s * $)/g, '');
//     // }
// }
// // 判断字符串是否是数字
// String.prototype.isNumer = function (flag) {
//     if (isNaN(this)) { return false; }
//     // switch (flag) {
//     //     case '+': return /(^/ +?|^ /d?)/d * /.?/d + $ /.test(this); // 正数
//     //     case '-': return /^-/d * /.?/d + $ /.test(this); // 负数
//     //     case 'i': return /(^-?|^/ +?| /d)/d + $ /.test(this); // 整数
//     //     case '+i': return /(^/d + $)| (^ /+?/d + $) /.test(this); // 正整数
//     //     case '-i': return /^-/d + $ /.test(this); // 负整数
//     //     case 'f': return /(^-?|^/ +?|^ /d?)/d * /./d + $ /.test(this); // 浮点数
//     //     case '+f': return /(^/ +?|^ /d?)/d * /./d + $ /.test(this); // 正浮点数
//     //     case '-f': return /^-/d * /./d$ /.test(this); // 负浮点数
//     //     default: return true; // 缺省
//     // }
// }
// // 仿PHP的str_pad
// String.prototype.pad = function (input, length, type) {
//     if (!input) return this;
//     if (!length || length < 1) var length = 1;
//     var input = Array(length + 1).join(input), value;
//     var type = type ? type.toUpperCase() : '';
//     switch (type) {
//         case 'LEFT': return input + this;
//         case 'BOTH': return input + this + input;
//         default: return this + input;
//     }
// }
// // 获取url对应参数的值
// String.prototype.getQuery = function (name) {
//     var reg = new RegExp('(^|&)' + name + ' = ([^&] * )(&|$)');
//     var r = this.substr(this.indexOf('/?') + 1).match(reg);
//     return r[2] ? unescape(r[2]) : null;
// }
// // 判断是否是日期格式(YYYY-MM-DD YYYY/MM/DD YYYY.MM.DD)
// // String.prototype.isDate = function () {
// //     result = this.match(/^(/d{ 1, 4})(-|//|.)(/d{1, 2})/2(/d{1, 2})$/);
// //     if (!result) return false;
// //     var d = new Date(result[1], result[3] - 1, result[4])
// //     var str = d.getFullYear() + result[2] + (d.getMonth() + 1) + result[2] + d.getDate();
// //     return this == str;
// // }
// // 将字符串转为日期
// String.prototype.toDate = function () {
//     var mDate = new Date(Date.parse(str));
//     if (isNaN(mDate)) {
//         var arr = this.split('-');
//         mDate = new Date(arr[0], arr[1], arr[2]);
//     }
//     return mDate;
// }
// // 格式化日期, new Date().format('yyyy/mm/dd')
// Date.prototype.format = function (format) {
//     var format = format.toLowerCase();
//     var type = {
//         'm+': this.getMonth() + 1,
//         'd+': this.getDate(),
//         'h+': this.getHours(),
//         'i+': this.getMinutes(),
//         's+': this.getSeconds(),
//         'q+': Math.floor((this.getMonth() + 3) / 3),
//         'ms': this.getMilliseconds()
//     }
//     if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//     for (var k in type) {
//         if (new RegExp('(' + k + ')').test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? type[k] : ('00' + type[k]).substr(('' + type[k]).length));
//         }
//     }
//     return format;
// }
// // 添加日期，对应参数分别是：类型(y-年, q-季, m-月, w-周, d-日, h-时, i-分, s-秒)和增加的值
// Date.prototype.addDate = function (type, num) {
//     var type = type.toLowerCase();
//     switch (type) {
//         case 's': return new Date.parse(Date.parse(this) + (1000 * num));
//         case 'i': return new Date.parse(Date.parse(this) + (60000 * num));
//         case 'h': return new Date(Date.parse(this) + (3600000 * num));
//         case 'd': return new Date(Date.parse(this) + (86400000 * num));
//         case 'w': return new Date(Date.parse(this) + ((86400000 * 7) * num));
//         case 'm': return new Date(this.getFullYear(), (this.getMonth()) + num, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
//         case 'q': return new Date(this.getFullYear(), (this.getMonth()) + num * 3, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
//         case 'y': return new Date((this.getFullYear() + num), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
//     }
// }
// // 计算两个日期
// Date.prototype.dateDiff = function (type, date) {
//     if (typeof date == 'string') date = date.toDate();
//     switch (type) {
//         case 's': return parseInt((date - this) / 1000);
//         case 'i': return parseInt((date - this) / 60000);
//         case 'h': return parseInt((date - this) / 3600000);
//         case 'd': return parseInt((date - this) / 86400000);
//         case 'w': return parseInt((date - this) / (86400000 * 7));
//         case 'm': return (date.getMonth() + 1) + ((date.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
//         case 'y': return date.getFullYear() - this.getFullYear();
//     }
// }
// // 判断对象是否是数组
// Object.prototype.isArray = function () { return Object.prototype.toString.apply(this) == '[object Array]'; }
// // 判断数组内是否存在指定的元素
// Array.prototype.inArray = function (value) {
//     if (this.length < 2) return this[0] == value;
//     this.sort(function (a) {
//         return new RegExp('^' + value).test(a) ? -1 : 1;
//     });
//     return this[0] == value;
// }
// // 在数组中查找元素并返回第一次出现的位置索引，未找到则返回-1。
// Array.prototype.indexOf = function (string) {
//     var len = this.length, i = 0;
//     if (len < 2) return this[0] == value ? 0 : -1;
//     for (i; i < len; i++) {
//         if (this[i] == string) return i;
//     }
//     return -1;
// }
// // [1, 2, 3].each(function(x) {return x+1}) 得到2, 3, 4
// Array.prototype.each = function (c) {
//     var ret = [];
//     for (var i = 0; i < this.length; i++) {
//         ret.push(c(this[i]));
//     }
//     return ret;
// }
// // [1, -1, 2].any(function(x) {return x < 0}) 判断是否数组中有一个元素小于0
// Array.prototype.any = function (c) {
//     for (var i = 0; i < this.length; i++) {
//         if (c(this)) return true;
//     }
//     return false;
// }
// // [1, 2, 3].all(function(x) {return x > 0}) 判断是否数组中所有的元素都大于0
// Array.prototype.all = function (c) {
//     for (var i = 0; i < this.length; i++) {
//         if (!c(this)) return false;
//     }
//     return true;
// }
// // 移除数组指定的元素,如果指定了limit,则仅移除limit个指定元素，如果省略limit或者其值为0，则所有指定元素都会被移除。
// Array.prototype.unset = function (string, limit) {
//     var len = this.length, i = 0, count = 0;
//     for (i; i < len; i++) {
//         if (this[i] == string) {
//             this.splice(i, 1);
//             if (limit && limit > 0) {
//                 count++;
//                 if (count == limit) break;
//             }
//         }
//     }
//     return this;
// }
// // 移除数组中重复的元素
// Array.prototype.unique = function () {
//     var arr = tmp = [], i, len = this.length;
//     if (len < 2) return this;
//     for (i = 0; i < len; i++) {
//         if (tmp[this[i]]) {
//             arr.push(this[i]);
//             tmp[this[i]] = true;
//         }
//     }
//     return arr;
// }
// Array.prototype.min = function () { return Math.min.apply(null, this) } // 求数组中最小值
// Array.prototype.max = function () { return Math.max.apply(null, this) } // 求数组中最大值00 
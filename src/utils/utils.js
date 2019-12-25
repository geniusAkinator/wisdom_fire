/**
 * 一些常用方法
 * @module Utils
 */
const Utils = {
    decounce(fn, t) { //函数防抖
        let delay = t || 500;
        let timer = null;
        return function () {
            let _this = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, delay);
        };
    },
    throttle(fn, t) { //函数节流
        let last;
        let timer;
        let interval = t || 500;
        return function () {
            let args = arguments;
            let now = +new Date();
            if (last && now - last < interval) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    last = now;
                    fn.apply(this, args);
                }, interval);
            } else {
                last = now;
                fn.apply(this, args);
            }
        }
    },
    param(data) {
        let url = ''
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
    },
    closest(el, selector) {      //查找祖先元素
        var matchesSelector =
            el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    },
    gradientColor(startColor, endColor, step) {
        let startRGB = this.colorToRgb(startColor);//转换为rgb数组模式
        let startR = startRGB[0];
        let startG = startRGB[1];
        let startB = startRGB[2];

        let endRGB = this.colorToRgb(endColor);
        let endR = endRGB[0];
        let endG = endRGB[1];
        let endB = endRGB[2];

        let sR = (endR - startR) / step;//总差值
        let sG = (endG - startG) / step;
        let sB = (endB - startB) / step;

        let colorArr = [];
        for (let i = 0; i < step; i++) {
            //计算每一步的hex值
            var hex = this.colorToHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
            colorArr.push(hex);
        }
        return colorArr;
    },
    colorToRgb(sColor) {  //hex转rbg数组模式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    },
    colorToHex(rgb) { //rbg转hex
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }

            return strHex;
        } else if (reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    },
    resizeLayer(layerIndex, layerInitWidth, layerInitHeight) { //layer自适应
        let parentNode = document.querySelector(".app-main");
        var docWidth = parentNode.offsetWidth;
        var docHeight = parentNode.offsetHeight;
        var minWidth = layerInitWidth > docWidth ? docWidth : layerInitWidth;
        var minHeight = layerInitHeight > docHeight ? docHeight : layerInitHeight;
        let nowLayer = document.querySelector("#" + layerIndex);
        let nowLayerContent = nowLayer.querySelector(".vl-notify-content");
        let nowLayerTitle = nowLayer.querySelector(".vl-notice-title");
        if (layerInitHeight > docHeight) {  //遮挡归位
            nowLayer.style.top = "50%";
            nowLayerContent.style.height = docHeight - nowLayerTitle.offsetHeight + 'px'; //更新高度，让scroll正常
        }
        if (layerInitWidth > docWidth) {  //遮挡归位
            nowLayer.style.left = "50%";
        }
        nowLayer.style.width = minWidth + "px";
        nowLayer.style.height = minHeight + "px";
    },
    // base64转成blob对象
    dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(",")[0].indexOf("base64") >= 0)
            byteString = atob(base64Data.split(",")[1]);
        else byteString = unescape(base64Data.split(",")[1]);
        var mimeString = base64Data
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
        console.log(mimeString);
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    },
    reader(file, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            reader.onload = function () {
                resolve(reader);
            };
            reader.onerror = reject;
            if (options.accept && !new RegExp(options.accept).test(file.type)) {
                reject({
                    code: 1,
                    msg: "wrong file type"
                });
            }
            if (!file.type || /^text\//i.test(file.type)) {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file);
            }
        });
    },
}
export default Utils
/**
 * 通用的方法
 */
function mobileEncrypt(mobile) { //手机号脱敏
    if (isEmpty(mobile) || (mobile.length != 11)) {
        return mobile;
    }
    return mobile.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
}

function idCardEncrypt(idCard) { //身份证脱敏
    if (isEmpty(idCard) || (idCard.length < 8)) {
        return idCard;
    }
    return idCard.replace(/(\w{10})\w*(\w{2})/, '$1******$2');
}

function isEmpty(str) {
    if (typeof (str) == "undefined" || str == null || str === "")
        return true;
    else
        return false;
}

function isFullScreen() {
    return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}
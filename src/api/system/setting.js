import request from '@/utils/request'

//基本设置详情
export function getSetting() {
    return request({
        url: 'system/settings/list',
        method: 'get',
    })
}

//基本设置添加
export function addSetting(data) {
    return request({
        url: '/system/settings',
        method: 'post',
        data: data
    })
}

//风格样式详情
export function getTheme() {
    return request({
        url: '/system/theme/list',
        method: 'get',
    })
}

//风格样式添加
export function addTheme(data) {
    return request({
        url: '/system/theme',
        method: 'post',
        data: data
    })
}

//通知模板详情
export function getTemplate() {
    return request({
        url: '/system/template/list',
        method: 'get',
    })
}


//通知模板添加
export function addTemplate(data) {
    return request({
        url: '/system/template',
        method: 'post',
        data: data
    })
}

//短信配置详细
export function getSms() {
    return request({
        url: '/system/setting/list',
        method: 'get',
    })
}

//短信配置添加
export function addSms(data) {
    return request({
        url: '/system/setting',
        method: 'post',
        data: data
    })
}

//微信配置详细
export function getWx() {
    return request({
        url: '/system/wxapp/list',
        method: 'get',
    })
}

//微信配置添加
export function addWx(data) {
    return request({
        url: '/system/wxapp',
        method: 'post',
        data: data
    })
}

//API详情
export function getApi() {
    return request({
        url: 'system/api/list',
        method: 'get',
    })
}

//API添加
export function addApi(data) {
    return request({
        url: '/system/api',
        method: 'post',
        data: data
    })
}

//token
export function generateApiToken() {
    return request({
        url: '/system/api/generateToken',
        method: 'post',
    })
}

//平台设置详情
export function getSetup(){
    return request({
        url: 'system/setup/list',
        method: 'get',
    })
}

//平台设置添加
export function addSetup(data) {
    return request({
        url: '/system/setup',
        method: 'post',
        data: data
    })
}
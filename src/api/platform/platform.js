import request from '@/utils/request'


export function getWeekly() {
    return request({
        url: '/system/bulletin/weekly',
        method: 'get',
    })
}

export function getMonthly() {
    return request({
        url: '/system/bulletin/monthly',
        method: 'get',
    })
}

export function getYearly() {
    return request({
        url: '/system/bulletin/yearly',
        method: 'get',
    })
}

//重大隐患单位排名接口
export function getHazardUnitsRank() {
    return request({
        url: '/system/bulletin/hiddenDangerUnits',
        method: 'get',
    })
}

//高频隐患类型排名
export function getHazardTypesRank() {
    return request({
        url: '/system/bulletin/frequency',
        method: 'get',
    })
}

//设备故障事件中心接口
export function getErrRank() {
    return request({
        url: '/system/bulletin/equipmentFailure',
        method: 'get',
    })
}

//在线统计
export function getOnlineRate() {
    return request({
        url: '/system/bulletin/onlineStatistics',
        method: 'get'
    })
}


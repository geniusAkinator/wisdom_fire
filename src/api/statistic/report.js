import request from '@/utils/request'

//人员统计
export function getCount(query) {
    return request({
        url: '/system/statistics/analysisList',
        method: 'get',
        params: query
    })
}

//隐患统计
export function getHazardCount(query) {
    return request({
        url: '/system/hiddendanger/hiddenTroubleStatistics',
        method: 'get',
        params: query
    })
}

//服务统计
export function getServiceCount(query) {
    return request({
        url: '/system/service/serviceCount',
        method: 'get',
        params: query
    })
}
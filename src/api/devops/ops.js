import request from '@/utils/request'

//运维管理查询
export function getSensorFaultList(query) {
    return request({
        url: '/system/fault/sensorFault',
        method: 'get',
        params: query
    })
}

// 工厂id查询团队
// export function getTeamList(query) {
//     return request({
//         url: '/system/fault/person',
//         method: 'get',
//         params: query
//     })
// }

//运维详情
export function getAllData(query) {
    return request({
        url: '/system/fault/AllData',
        method: 'get',
        params: query
    })
}

//指派
export function addAppoint(data) {
    return request({
        url: '/system/fault',
        method: 'put',
        data: data
    })
}

//撤销
export function revokeAppoint(query) {
    return request({
        url: '/system/fault/revoke',
        method: 'get',
        params: query
    })
}
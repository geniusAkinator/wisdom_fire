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
export function getTeamList(query) {
    return request({
        url: '/system/fault/person',
        method: 'get',
        params: query
    })
}


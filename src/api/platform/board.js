import request from '@/utils/request'

//隐患处理情况
export function getHazardResult(query) {
    return request({
        url: '/system/bulletin/treatmentHidden',
        method: 'get',
        params: query
    })
}

//事件处理率
export function getEventDoneRate(query) {
    return request({
        url: '/system/bulletin/eventHandlingRate',
        method: 'get',
        params: query
    })
}

//传感器信息
export function getSensorData(query) {
    return request({
        url: '/system/bulletin/sensorData',
        method: 'get',
        params: query
    })
}

//监控在线统计
export function getOnlineRate(query) {
    return request({
        url: '/system/bulletin/monitoringStatistics',
        method: 'get',
        params: query
    })
}
//本日设备正常运行统计接口
export function getNormalEquipment(query) {
    return request({
        url: '/system/bulletin/equipmentNormalFunctionToday',
        method: 'get',
        params: query
    })
}

//处理详情接口
export function getHandleDetail(query) {
    return request({
        url: '/system/bulletin/handlingDetails',
        method: 'get',
        params: query
    })
}

// 楼层接口
export function getBuildingDetail(query) {
    return request({
        url: '/system/bulletin/floorStatistics',
        method: 'get',
        params: query
    })
}

// 安全评分流水
export function getHealthPoint(query) {
    return request({
        url: '/system/bulletin/healthIndex',
        method: 'get',
        params: query
    })
}

import request from '@/utils/request'

//隐患处理情况
export function getHazardResult() {
    return request({
        url: '/system/bulletin/treatmentHidden',
        method: 'get'
    })
}

//事件处理率
export function getEventDoneRate() {
    return request({
        url: '/system/bulletin/eventHandlingRate',
        method: 'get'
    })
}

//传感器信息
export function getSensorData() {
    return request({
        url: '/system/bulletin/sensorData',
        method: 'get'
    })
}

//监控在线统计
export function getOnlineRate() {
    return request({
        url: '/system/bulletin/monitoringStatistics',
        method: 'get'
    })
}
//本日设备正常运行统计接口
export function getNormalEquipment() {
    return request({
        url: '/system/bulletin/equipmentNormalFunctionToday',
        method: 'get'
    })
}

// /system/transducer/recvfrom

//处理详情接口
export function getHandleDetail() {
    return request({
        url: '/system/bulletin/handlingDetails',
        method: 'get'
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
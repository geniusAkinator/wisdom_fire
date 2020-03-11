import request from '@/utils/request'

//运维管理查询
export function getSensorFaultList(query) {
    return request({
      url: '/system/fault/sensorFault',
      method: 'get',
      params: query
    })
  }
  
import request from '@/utils/request'

// 查询工厂信息列表
export function listFactory(query) {
  return request({
    url: '/system/factory/list',
    method: 'get',
    params: query
  })
}

// 查询工厂信息详细
export function getFactory(factoryId) {
  return request({
    url: '/system/factory/' + factoryId,
    method: 'get'
  })
}

// 新增工厂信息
export function addFactory(data) {
  return request({
    url: '/system/factory',
    method: 'post',
    data: data
  })
}

// 修改工厂信息
export function updateFactory(data) {
  return request({
    url: '/system/factory',
    method: 'put',
    data: data
  })
}

// 删除工厂信息
export function delFactory(factoryId) {
  return request({
    url: '/system/factory/' + factoryId,
    method: 'delete'
  })
}

// 导出工厂信息
export function exportFactory(query) {
  return request({
    url: '/system/factory/export',
    method: 'get',
    params: query
  })
}

//
export function listSensorByFactoryId(query) {
  return request({
    url: '/system/transducer/factoryIds',
    method: 'get',
    params: query
  })
}

export function getGrandTotal(query) {
  return request({
    url: '/system/factory/cumulative',
    method: 'get',
    params: query
  })
}

import request from '@/utils/request'

// 查询传感器数据系统列表
export function listSystem(query) {
  return request({
    url: '/system/system/list',
    method: 'get',
    params: query
  })
}

// 查询传感器数据系统详细
export function getSystem(systemId) {
  return request({
    url: '/system/system/' + systemId,
    method: 'get'
  })
}

// 新增传感器数据系统
export function addSystem(data) {
  return request({
    url: '/system/system',
    method: 'post',
    data: data
  })
}

// 修改传感器数据系统
export function updateSystem(data) {
  return request({
    url: '/system/system',
    method: 'put',
    data: data
  })
}

// 删除传感器数据系统
export function delSystem(systemId) {
  return request({
    url: '/system/system/' + systemId,
    method: 'delete'
  })
}

// 导出传感器数据系统
export function exportSystem(query) {
  return request({
    url: '/system/system/export',
    method: 'get',
    params: query
  })
}
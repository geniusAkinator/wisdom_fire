import request from '@/utils/request'

// 查询传感器类型列表
export function listTransducertype(query) {
  return request({
    url: '/system/transducertype/list',
    method: 'get',
    params: query
  })
}

// 查询传感器类型详细
export function getTransducertype(ttId) {
  return request({
    url: '/system/transducertype/' + ttId,
    method: 'get'
  })
}

// 新增传感器类型
export function addTransducertype(data) {
  return request({
    url: '/system/transducertype',
    method: 'post',
    data: data
  })
}

// 修改传感器类型
export function updateTransducertype(data) {
  return request({
    url: '/system/transducertype',
    method: 'put',
    data: data
  })
}

// 删除传感器类型
export function delTransducertype(ttId) {
  return request({
    url: '/system/transducertype/' + ttId,
    method: 'delete'
  })
}

// 导出传感器类型
export function exportTransducertype(query) {
  return request({
    url: '/system/transducertype/export',
    method: 'get',
    params: query
  })
}
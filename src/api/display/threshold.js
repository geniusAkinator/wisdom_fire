import request from '@/utils/request'

// 查询阈值列表
export function listThreshold(query) {
  return request({
    url: '/system/threshold/list',
    method: 'get',
    params: query
  })
}

// 查询阈值详细
export function getThreshold(id) {
  return request({
    url: '/system/threshold/' + id,
    method: 'get'
  })
}

// 新增阈值
export function addThreshold(data) {
  return request({
    url: '/system/threshold',
    method: 'post',
    data: data
  })
}

// 修改阈值
export function updateThreshold(data) {
  return request({
    url: '/system/threshold',
    method: 'put',
    data: data
  })
}

// 删除阈值
export function delThreshold(id) {
  return request({
    url: '/system/threshold/' + id,
    method: 'delete'
  })
}

// 导出阈值
export function exportThreshold(query) {
  return request({
    url: '/system/threshold/export',
    method: 'get',
    params: query
  })
}
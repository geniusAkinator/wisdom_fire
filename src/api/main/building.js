import request from '@/utils/request'

// 查询楼宇数据列表
export function listBuilding(query) {
  return request({
    url: '/system/building/list',
    method: 'get',
    params: query
  })
}

// 查询楼宇数据详细
export function getBuilding(buildingId) {
  return request({
    url: '/system/building/' + buildingId,
    method: 'get'
  })
}

// 新增楼宇数据
export function addBuilding(data) {
  return request({
    url: '/system/building',
    method: 'post',
    data: data
  })
}

// 修改楼宇数据
export function updateBuilding(data) {
  return request({
    url: '/system/building',
    method: 'put',
    data: data
  })
}

// 删除楼宇数据
export function delBuilding(buildingId) {
  return request({
    url: '/system/building/' + buildingId,
    method: 'delete'
  })
}

// 导出楼宇数据
export function exportBuilding(query) {
  return request({
    url: '/system/building/export',
    method: 'get',
    params: query
  })
}
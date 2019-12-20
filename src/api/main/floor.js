import request from '@/utils/request'

// 查询楼层数据列表
export function listFloor(query) {
  return request({
    url: '/system/floor/list',
    method: 'get',
    params: query
  })
}

// 查询楼层数据详细
export function getFloor(floorId) {
  return request({
    url: '/system/floor/' + floorId,
    method: 'get'
  })
}

// 新增楼层数据
export function addFloor(data) {
  return request({
    url: '/system/floor',
    method: 'post',
    data: data
  })
}

// 修改楼层数据
export function updateFloor(data) {
  return request({
    url: '/system/floor',
    method: 'put',
    data: data
  })
}

// 删除楼层数据
export function delFloor(floorId) {
  return request({
    url: '/system/floor/' + floorId,
    method: 'delete'
  })
}

// 导出楼层数据
export function exportFloor(query) {
  return request({
    url: '/system/floor/export',
    method: 'get',
    params: query
  })
}
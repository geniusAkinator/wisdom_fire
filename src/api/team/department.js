import request from '@/utils/request'

// 查询团队信息列表
export function listDepartment(query) {
  return request({
    url: '/system/department/list',
    method: 'get',
    params: query
  })
}

// 查询团队信息详细
export function getDepartment(departmentId) {
  return request({
    url: '/system/department/' + departmentId,
    method: 'get'
  })
}

// 新增团队信息
export function addDepartment(data) {
  return request({
    url: '/system/department',
    method: 'post',
    data: data
  })
}

// 修改团队信息
export function updateDepartment(data) {
  return request({
    url: '/system/department',
    method: 'put',
    data: data
  })
}

// 删除团队信息
export function delDepartment(departmentId) {
  return request({
    url: '/system/department/' + departmentId,
    method: 'delete'
  })
}

// 导出团队信息
export function exportDepartment(query) {
  return request({
    url: '/system/department/export',
    method: 'get',
    params: query
  })
}
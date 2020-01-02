import request from '@/utils/request'

// 查询团队人员信息列表
export function listEmployee(query) {
  return request({
    url: '/system/employee/list',
    method: 'get',
    params: query
  })
}

// 查询团队人员信息详细
export function getEmployee(employeeId) {
  return request({
    url: '/system/employee/' + employeeId,
    method: 'get'
  })
}

// 新增团队人员信息
export function addEmployee(data) {
  return request({
    url: '/system/employee',
    method: 'post',
    data: data
  })
}

// 修改团队人员信息
export function updateEmployee(data) {
  return request({
    url: '/system/employee',
    method: 'put',
    data: data
  })
}

// 删除团队人员信息
export function delEmployee(employeeId) {
  return request({
    url: '/system/employee/' + employeeId,
    method: 'delete'
  })
}

// 导出团队人员信息
export function exportEmployee(query) {
  return request({
    url: '/system/employee/export',
    method: 'get',
    params: query
  })
}
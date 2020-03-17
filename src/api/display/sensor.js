import request from '@/utils/request'

// 查询传感器数据列表
export function listTransducer(query) {
  return request({
    url: '/system/transducer/list',
    method: 'get',
    params: query
  })
}

// 查询传感器数据详细
export function getTransducer(transducerId) {
  return request({
    url: '/system/transducer/' + transducerId,
    method: 'get'
  })
}

// 新增传感器数据
export function addTransducer(data) {
  return request({
    url: '/system/transducer',
    method: 'post',
    data: data
  })
}

// 修改传感器数据
export function updateTransducer(data) {
  return request({
    url: '/system/transducer',
    method: 'put',
    data: data
  })
}

// 删除传感器数据
export function delTransducer(transducerId) {
  return request({
    url: '/system/transducer/' + transducerId,
    method: 'delete'
  })
}

// 导出传感器数据
export function exportTransducer(query) {
  return request({
    url: '/system/transducer/export',
    method: 'get',
    params: query
  })
}

//设定单个传感器分数
export function updatePoint(data) {
  return request({
    url: '/system/point',
    method: 'put',
    data: data
  })
}

//传感器分数回显
export function getPointDetail(query) {
  return request({
    url: '/system/point/list',
    method: 'get',
    params: query
  })
}

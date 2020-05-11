import request from '@/utils/request'
export function listOverview(query) {
  return request({
    url: '/system/hiddendanger/list',
    method: 'get',
    params: query
  })
}


export function getCalendar(query) {
  return request({
    url: '/system/hiddendanger/calendar',
    method: 'get',
    params: query
  })
}


export function getTeamList(query) {
  return request({
    url: '/system/hiddendanger/person',
    method: 'get',
    params: query
  })
}


//指派
export function addAppoint(data) {
  return request({
    url: '/system/hiddendanger',
    method: 'put',
    data: data
  })
}

//获取隐患详情
export function getHazardDetail(query) {
  return request({
    url: '/system/hiddendanger/AllData',
    method: 'get',
    params: query
  })
}

//获取进度列表
export function getProgressList(query) {
  return request({
    url: '/system/progress/list',
    method: 'get',
    params: query
  })
}

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
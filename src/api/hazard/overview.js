import request from '@/utils/request'
export function listOverview(query) {
    return request({
      url: 'system/hiddendanger/list',
      method: 'get',
      params: query
    })
  }
  
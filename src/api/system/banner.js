import request from '@/utils/request'

// 查询轮播列表
export function listBanner(query) {
    return request({
      url: '/system/banner/list',
      method: 'get',
      params: query
    })
  }
  
  // 查询轮播详细
  export function getBanner(noticeId) {
    return request({
      url: '/system/banner/' + noticeId,
      method: 'get'
    })
  }
  
  // 新增轮播
  export function addBanner(data) {
    return request({
      url: '/system/banner',
      method: 'post',
      data: data
    })
  }

  // 修改轮播
export function updateBanner(data) {
    return request({
      url: '/system/banner',
      method: 'put',
      data: data
    })
  }
  
  // 删除轮播
  export function delBanner(bannerId) {
    return request({
      url: '/system/banner/' + bannerId,
      method: 'delete'
    })
  }
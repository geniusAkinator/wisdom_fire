import request from '@/utils/request'


// 查询阈值详细
export function getThreshold(query) {
  return request({
    url: '/system/thresholdmax/transducerId',
    method: 'get',
    params: query
  })
}



// 修改阈值
export function updateThreshold(data) {
  return request({
    url: '/system/thresholdmax',
    method: 'put',
    data: data
  })
}


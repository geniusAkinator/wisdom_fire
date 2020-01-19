import request from '@/utils/request'

export function listCount(query) {
    return request({
        url: '/system/statistics/analysisList',
        method: 'get',
        params: query
    })
}
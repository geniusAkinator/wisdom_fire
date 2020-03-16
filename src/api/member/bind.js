import request from '@/utils/request'

// 微信成本绑定列表
export function listBind(query) {
    return request({
        url: '/system/members/list',
        method: 'get',
        params: query
    })
}
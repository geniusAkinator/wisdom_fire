import request from '@/utils/request'

//黑名单列表
export function listBlackList(query) {
    return request({
        url: '/system/members/list',
        method: 'get',
        params: query
    })
}
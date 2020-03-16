import request from '@/utils/request'

// 微信成本未绑定列表
export function listUnbind(query) {
    return request({
        url: '/system/members/list',
        method: 'get',
        params: query
    })
}

// 删除微信成本未绑定
export function delUnbind(uid) {
    return request({
        url: '/system/members/' + uid,
        method: 'delete'
    })
}
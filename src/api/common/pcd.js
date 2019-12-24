import request from '@/utils/request'
export function getPCD(query) {
    return request({
        url: '/system/district/address',
        method: 'get',
        params: query
    })
}

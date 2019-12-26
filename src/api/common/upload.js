import request from '@/utils/request'

//上传图片
export function uploadImage(data) {
    return request({
        url: "/common/uploadImage",
        method: "post",
        data: data
    });
}

//已上传图片列表根据deptId查询
export function listImage(query) {
    return request({
        url: '/common/imageList',
        method: 'get',
        params: query
    })
}

//删除图片
export function delImage(params) {
    return request({
        url: '/common/removeImage',
        params: params,
        method: "delete"
    })
}

export function uploadFile(data) {
    return request({
        url: "/common/uploadFile",
        method: "post",
        data: data
    });
}

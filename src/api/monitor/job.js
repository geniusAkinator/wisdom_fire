import request from '@/utils/request'

// 查询任务数据列表
export function listJob(query) {
    return request({
        url: '/monitor/job/list',
        method: 'get',
        params: query
    })
}

// 查询任务数据详细
export function getJob(jobId) {
    return request({
        url: '/monitor/job/' + jobId,
        method: 'get'
    })
}

// 新增任务数据
export function addJob(data) {
    return request({
        url: '/monitor/job',
        method: 'post',
        data: data
    })
}

// 修改任务数据
export function updateJob(data) {
    return request({
        url: '/monitor/job',
        method: 'put',
        data: data
    })
}

// 删除任务数据
export function delJob(jobId) {
    return request({
        url: '/monitor/job/' + jobId,
        method: 'delete'
    })
}

// 导出任务数据
export function exportJob(query) {
    return request({
        url: '/monitor/job/export',
        method: 'get',
        params: query
    })
}
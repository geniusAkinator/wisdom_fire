/**
 * axios http文件上传和jsonp
 * @module HttpRequest
 */
import axios from 'axios'
import { getToken } from '@/utils/auth'
// import originJSONP from 'jsonp'
axios.defaults.headers.common["Authorization"] = getToken();
const HttpRequest = {
    getRequestUpload(url, data, callback) { //文件上传
        return new Promise((resolve, reject) => {
            console.log(process.env.VUE_APP_BASE_API + url)
            axios({
                url: process.env.VUE_APP_BASE_API + url,
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function (progressEvent) { //callback回调上传进度
                    if (progressEvent.lengthComputable) { callback(progressEvent); }
                },
            }).then(
                res => {
                    resolve(res.data)
                }
            ).catch(
                err => {
                    reject(err)
                }
            )
        })
    },
    // getRequestJsonp({ url, data }) {
    //     url += (url.indexOf('?') < 0 ? '?' : '&') + utils.param(data)
    //     return new Promise(function (resolve, reject) {
    //         originJSONP(url, '', function (err, data) {
    //             if (!err) {
    //                 resolve(data)
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
    // }
}
export default HttpRequest
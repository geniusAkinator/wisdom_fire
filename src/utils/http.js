/**
 * jsonp
 * @module HttpRequest
 */
import utils from "@/utils/utils";
import originJSONP from 'jsonp'
const HttpRequest = {
    getRequestJsonp({ url, data }) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + utils.param(data)
        return new Promise(function (resolve, reject) {
            originJSONP(url, '', function (err, data) {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }
}
export default HttpRequest
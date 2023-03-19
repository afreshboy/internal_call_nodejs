const axios = require('axios')
const util = require('util')
const http = require('http')

// function internal_call_get(uri, toServiceID, paramMap, headers) {
//     let fromServiceID = process.env.SERVICE_ID;
//     let url = util.format("http://%s-%s.dycloud.service%s", fromServiceID, toServiceID, uri)
//     console.log(url);
//     let reqInstance = axios.create({
//         headers: headers
//     })
//     let resp = ""
//     reqInstance.get(url, paramMap)
//     .then(function (response) {
//         // 处理成 功情况
//         console.log(response.data);
//         resp = data;
//     })
//     .catch(function (error) {
//         // 处理错误情况
//         console.log(error);
//     })
//     .then(function () {
//         // 总是会执行
//         console.log('总是会执行')
//         return resp
//     });
    
// }

module.exports = {
    internal_call_get: function (req, res, next) {
        let serviceID = req.get("X-SERVICE-ID");
        let method = req.get("X-SERVICE-METHOD");
        let uri = req.get("X-SERVICE-URI");
        let value1 = req.get("X-SERVICE-VALUE1");
        let value2 = req.get("X-SERVICE-VALUE2");
        console.log(serviceID, method, uri, value1, value2);
        let url = util.format("http://localhost:8000%s?num1=%d&num2=%d", uri, value1, value2)
        console.log(url);

        http.get(url, resp => {
            resp.setEncoding('utf8')
            resp.on('data', data => {
                console.log(data);
                res.send(resp.data);
            })
        })

        // let request = http.request(url, (resp) =>{
        //     console.log(resp);
        //     res.send(resp.data);
        // });
        // request.end();//必须调用end()方法结束请求
        
        // let reqInstance = axios.create({
        //     headers: headers
        // })
        // let resp = ""
        // reqInstance.get(url, paramMap)
        // .then(function (response) {
        //     // 处理成 功情况
        //     console.log(response.data);
        //     resp = data;
        // })
        // .catch(function (error) {
        //     // 处理错误情况
        //     console.log(error);
        // })
        // .then(function () {
        //     // 总是会执行
        //     console.log('总是会执行')
        //     return resp
        // });
        
    }
}
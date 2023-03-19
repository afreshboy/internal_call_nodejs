
var koa = require('koa');
var Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
var app = new koa();
const axios = require("axios");
const router = new Router()              // 实例化一个路由
const util = require('util')

function getCount(ctx,next) {
    console.log(ctx.request.headers);
    let query = ctx.request.query
    console.log(ctx.request.query);
    respValue = parseInt(query.num1) + parseInt(query.num2);
    ctx.body = respValue;
 };

 function postCount(ctx,next) {
    console.log(ctx.request.headers);
    let body = ctx.request.body;
    console.log(body);
    respValue = parseInt(body.num1) + parseInt(body.num2);
    ctx.body = respValue;
 };

 function ping(ctx,next) {
    ctx.body = "ping success";
 }

 async function internalCall(ctx, next)  {
    let headers = ctx.request.headers;
    let method = ctx.request.headers["x-service-method"]
    let value1 = headers["x-service-value1"]
    let value2 = headers["x-service-value2"]
    let uri = headers["x-service-uri"]
    let toServiceID = headers["x-service-id"];
    if (method == "GET") {
        let res = await internalCallGet(uri, toServiceID, {"num1": value1, "num2": value2}, {"TEST-HEADER": "test-header"});
        ctx.body = res;
    } else if (method == "POST") {
        let res = await internalCallPost(uri, toServiceID, {"num1": value1, "num2": value2}, {"TEST-HEADER": "test-header"});
        ctx.body = res;
    } else {
        ctx.body = util.format("err method: %s", method);
    }
}

async function internalCallGet(uri, toServiceID, paramMap, headers) {
    let fromServiceID = process.env.SERVICE_ID;
    let url = util.format("http://%s-%s.dycloud.service%s", fromServiceID, toServiceID, uri)
    let reqInstance = axios.create({
        headers: headers
    })
    let res = await reqInstance.get(url, {"params": paramMap});
    console.log(res);
    return res.data;
}

async function internalCallPost(uri, toServiceID, body, headers) {
    let fromServiceID = process.env.SERVICE_ID;
    let url = util.format("http://%s-%s.dycloud.service%s", fromServiceID, toServiceID, uri)
    let reqInstance = axios.create({
        headers: headers
    })
    let res = await reqInstance.post(url, body);
    console.log(res);
    return res.data;
}

router.get('/v1/ping', ping)
router.get('/api/v1/get_count', getCount);
router.post('/api/v1/post_count', postCount);
router.get('/api/v1/internal_call', internalCall);
app.use(bodyParser())
app.use(router.routes());  
app.listen(8000);

// router.get('/v1/ping', function(req, resp) {
//     resp.send("ping");
// })

// router.get('/api/v1/get_count', function(req, resp) {
//     let respValue = parseInt(req.query.num1) + parseInt(req.query.num2);
//     resp.send(respValue.toString());
//     console.log(respValue);
// })

// router.post('/api/v1/post_count', bodyParser.json(), function(req, resp) {
//     console.log(req.body);
//     let respValue = parseInt(req.body.num1) + parseInt(req.body.num2);
//     resp.send(respValue.toString());
//     console.log(respValue);
// })

// router.get('/api/v1/internal_call', function(req, resp, next) {
//     internal_call.internal_call_get(req, resp, next);
// })

// async function(req, resp) {
//     let serviceID = req.get("X-SERVICE-ID");
//     let method = req.get("X-SERVICE-METHOD");
//     let uri = req.get("X-SERVICE-URI");
//     let value1 = req.get("X-SERVICE-VALUE1");
//     let value2 = req.get("X-SERVICE-VALUE2");
//     console.log(serviceID, method, uri, value1, value2);
//     let url = util.format("http://localhost:8000%s", uri)
//     if (method == "GET") {
//          const result = await get(serviceID,method, uri, value1, value2).then((response)=>{
//          return response;
 
//          });
//          console.log(result);
//          resp.send(result);
//     }
//     resp.send("resp1");
//  }

// router.get('/api/v1/internal_call1', function(req, resp) {
//     let method = req.get("X-SERVICE-METHOD");
//     let uri = req.get("X-SERVICE-URI");
//     let value1 = req.get("X-SERVICE-VALUE1");
//     let value2 = req.get("X-SERVICE-VALUE2");
//     console.log(serviceID, method, uri, value1, value2);
//     if (method == "GET") {

//         (uri, serviceID, {"num1": value1, "num2": value2}, {"TEST-HEADER": "test-header"});
//     }
//     resp.send("internal_call fail")
//  })

// app.use('/', router);

// var server = app.listen(8000, function () {
 
//     var host = server.address().address
//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
//   })
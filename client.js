const util = require('util')
const axios = require("axios");

let paramMap = {"num1": 2, "num2": 3};
let url = util.format("http://localhost:8000/api/v1/post_count");
let headers = {"TEST-HEADER": "test-header"};
let reqInstance = axios.create({
    headers: headers
})
reqInstance.post(url, paramMap).then(res => {
    console.log(res.data);
});
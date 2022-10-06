import Taro from "@tarojs/taro";
import qs from 'qs'
function settle(resolve, reject, res, failed){
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
}

export default function taroAdapter(config) {
  return new Promise((resolve,reject)=>{
    const { params = {} } = config;
    const query = Object.values(params).length
      ? "?" + qs.stringify(params)
      : "";
    Taro.request({
      ...config,
      url: config.baseURL + config.url + query,
      data: config.data,
      method: config.method,
      header: config.headers,
      timeout: config.timeout,
      success: function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null
        };

        settle(resolve, reject, response);
      },
      fail:function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null
        };
        
        settle(resolve, reject, response, true);
      }
    })
  })
}

import Taro from "@tarojs/taro";

export default function taroAdapter(config) {
  return Taro.request({
    url: config.baseURL + config.url,
    data: config.data,
    method: config.method,
    header: config.headers,
    timeout: config.timeout,
  });
}

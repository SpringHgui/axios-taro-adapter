# axios-taro-adapter
axios adaptor for `Taro.request`

在`Taroa`项目中完美使用`axios`框架，统一代码风格。

有用点小星星支持~

# Quick start
1. npm install axios
2. create instance
```js
import { taroAdapter } from "axios-taro-adapter";

const API_URL = "https://api.xxxx.com/";
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  adapter: taroAdapter, // add this line，添加这一行使用taroAdapter
});

// interceptors for request
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// interceptors for response
instance.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  function (error) {
    return Promise.reject(error.message);
  }
);
```
3. enjoy axios
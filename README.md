# axios-taro-adapter
[![npm](https://img.shields.io/npm/v/axios-taro-adapter)](https://www.npmjs.com/package/axios-taro-adapter)
![NPM](https://img.shields.io/npm/l/axios-taro-adapter)

基于`axios`支持自定义适配器，只需要针对不同环境下的http请求api进行适配进行替换，`axios`可以使用在任意平台。  

由于`axios`在其他项目中大量使用，本项目实现`Taro`框架下的适配器，可以在`Taroa`项目中完美使用原汁原味的`axios`，统一团队前端技术栈，统一http请求类库。 

采用此方式对项目零侵入，开发者专注于`axios`的api即可。

有用点小星星支持~

# Quick start
1. `npm i axios@0.27.2`
2. `npm i axios-taro-adapter`
3. create axios instance

仅需2行代码，完美使用`axios`替换`Taro.request`

```js
// api.js
import axios from "axios";
import { TaroAdapter } from "axios-taro-adapter";

const API_URL = "https://api.xxxx.com/";
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  adapter: TaroAdapter, // add this line，添加这一行使用taroAdapter
});

export const postData = data => {
    return instance.post("/api/test", data);
}
```
例如：
原汁原味的拦截器
```js
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

import Taro from "@tarojs/taro";

function settle(resolve, reject, res, failed) {
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
}

// reference: https://gist.github.com/yuku/e568b9134aeeabcc7cde270849e109bf
function encode(val) {
  return encodeURIComponent(val + "")
    .replace(/%40/gi, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

function serializeParams(params) {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];

      if (value == null) return;

      return Array.isArray(value) ? [`${key}[]`, value] : [key, [value]];
    })
    .reduce((parts, entry) => {
      if (entry == null) return parts;

      const [key, value] = entry;

      return parts.concat(
        value
          .filter((v) => v)
          .map((v) => {
            if (v instanceof Date) {
              v = v.toISOString();
            } else if (v instanceof Object) {
              v = JSON.stringify(v);
            }

            return v ? `${encode(key)}=${encode(v)}` : v;
          })
      );
    }, [])
    .join("&");
}

function buildURL(url, params) {
  if (!params) {
    return url;
  }

  let u = url;

  if (u.indexOf("?") === -1) {
    u += "?";
  } else {
    u += "&";
  }

  return u + serializeParams(params);
}

export default function taroAdapter(config) {
  return new Promise((resolve, reject) => {
    Taro.request({
      ...config,
      url: buildURL(config.baseURL + config.url, config.params),
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
          request: null,
        };

        settle(resolve, reject, response);
      },
      fail: function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null,
        };

        settle(resolve, reject, response, true);
      },
    });
  });
}

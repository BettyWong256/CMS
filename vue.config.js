module.exports = {
  publicPath: '/' ,
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    proxy: {
      '/': getProxyConfig()
    }
  }
};

function getProxyConfig () {
  const devBase = `http://49.232.33.171:8080/`;
  const config = {
    target: devBase,
    changeOrigin: true,
    xfwd: false,
    ws: false
  };
  const token = '00CAFFABD28ED91699DF63A86D9A7C9F';
  if (token) {
    config.onProxyReq = (proxyReq, req, res) => {
      const cookieMap = {
        JSESSIONID: token
      };
      let cookie = '';
      for (const key in cookieMap) {
        if (Object.prototype.hasOwnProperty.call(cookieMap, key)) {
          cookie += `${key}=${cookieMap[key]}; `;
        }
      }
      proxyReq.setHeader('cookie', cookie);
    };
  }
  return config;
}

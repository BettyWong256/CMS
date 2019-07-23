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

function getProxyConfig (target) {
  const devBase = `http://49.232.33.171:8080/`;
  const config = {
    target: devBase,
    changeOrigin: true,
    xfwd: false,
    ws: false
  };
  const token = '55F20B8C4465CA99A37E541D0D2B8543';
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

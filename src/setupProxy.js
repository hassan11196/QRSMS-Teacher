const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  var options = {
    target: 'http://qrsms-v1.herokuapp.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    // pathRewrite: {
    //   '^/bts/': '/', // rewrite path
    // },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'localhost:3000': 'http://localhost:8000',
      'localhost:3001': 'http://localhost:8000',
      // 'localhost:3000': 'http://172.16.71.12/'
      // 'localhost:3000': 'http://180.149.217.63/'
    },
  };

  // create the proxy (without context)
  // var exampleProxy = proxy(options);

  // if ((process.env.proxy_url === 'http://qrsms-v1.herokuapp.com') || (process.env.proxy_url === 'https://qrsms-v1.herokuapp.com') ){
  //     app.use(proxy('/management', {target : 'http://qrsms-v1.herokuapp.com'}));
  // }
  // else{
  //     app.use(proxy('/management', {target : 'http://localhost:8000'}));
  // }
  app.use(proxy('/management', options));
  app.use(proxy('/api', options));
  app.use(proxy('/teacher', options));
  app.use(proxy('/student', options));
  app.use(proxy('/faculty-api', options));
};

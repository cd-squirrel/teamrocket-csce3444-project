const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/api", { 
    target: "http://localhost:8055/",
    changeOrigin: true,
    secure: false,
    headers: {
      Connection: 'keep-alive'
    }
  }));
};
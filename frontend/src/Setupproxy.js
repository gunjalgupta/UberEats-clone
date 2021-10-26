const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/', {
      target: process.env.PROD ? `http://${process.env.BACKEND}:5000` : "http://localhost:5000",
    })
  );
};
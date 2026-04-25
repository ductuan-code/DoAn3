const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API calls to backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5120', // Use HTTP instead of HTTPS
      changeOrigin: true,
      secure: false,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Target all API calls (e.g., /api/onboarding-questions)
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your Express server address
      changeOrigin: true,
    })
  );
};
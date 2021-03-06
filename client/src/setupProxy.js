const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/api/current_user", "/api/logout", "/api/stripe", "/api/surveys"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
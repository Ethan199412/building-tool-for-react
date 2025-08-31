// server.js
const express = require("express");
const path = require("path");
const app = express();

const DIST_DIR = path.join(__dirname, "dist");

// 静态资源
app.use(express.static(DIST_DIR, {
  // 可选：缓存静态资源
  maxAge: '1d'
}));

// SPA fallback：所有未知路由返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SPA running at http://localhost:${PORT}`);
});


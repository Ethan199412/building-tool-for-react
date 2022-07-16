# BuildingToolsForReact 是 Ethan 开发的 React 脚手架，欢迎使用

和 create-react-app 不同的是，本项目中的 webpack.config.js 是暴露给你的，你可以根据需要定制属于你自己的专属脚手架。

## 本脚手架支持
- 已支持 less
- 已支持 ES6
- 已支持 ES7 decorators, 使用 mobx 时请确保 mobx 小于版本 6，mobx-react 小于版本 7，因为高版本的 mobx 取消了
装饰器
- 已支持 typescript
- 采纳了 thread-loader

## 本脚手架做了哪些优化
- 自带 tree-shaking
- babel 缓存 + contentHash
- thread-loader 和 happy-pack
- 生产环境 mini-css-extract-plugin
- oneOf
- 使用了 clean-webpack-plugin

后续会添加更多功能，敬请期待 
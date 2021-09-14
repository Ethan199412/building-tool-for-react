const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader'],
        exclude: /(node_modules|bower_components|dist)/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|bower_components|dist)/,
      }
    ]
  },
  resolve: { extensions: ["*", "ts", "tsx", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3001,
    publicPath: "http://localhost:3001/dist/",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map"
};
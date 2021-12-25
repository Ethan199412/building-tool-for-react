const path = require("path");
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../dist/"),
        publicPath: "http://localhost:3001/dist/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                // 某一种类型的文件一旦找到了一种 rules，就不会去再匹配其他 loaders。
                // 如果需要同一种类型文件匹配多个 rules，从 oneOf 中拿出去。
                oneOf: [
                    {
                        test: /\.(png|jpg|jpeg)$/,
                        use: ['file-loader'],
                        exclude: /(node_modules|bower_components|dist)/
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /(node_modules|bower_components|dist)/,
                        use: [
                            //   {
                            //     loader: "thread-loader",
                            //     options: {
                            //       workers: 3
                            //     }
                            //   },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true
                                }
                            }

                        ],
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
                        use: [
                            // { loader: 'thread-loader', options: { workers: 3 } },
                            {
                                loader: 'babel-loader',
                                options: {
                                    // 启用缓存机制，在重复打包未改变过的模块时防止二次编译，同时加快打包速度
                                    cacheDirectory: true,
                                },
                            },
                            {
                                loader: 'ts-loader',
                                // 不仅提升了性能，也解决了 ts-loader 和 thread-loader 兼容性问题
                                options: {
                                    happyPackMode: true
                                }
                            },
                        ],
                        exclude: /(node_modules|bower_components|dist)/,
                    }
                ]
            }
        ]
    },
    //   externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    //   },
    resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", "."] },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: 'index.html',
            template: './src/index.html'
        })
    ],
};
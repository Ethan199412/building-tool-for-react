const path = require("path");
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getConfig(mode) {
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "../dist/"),
            publicPath: mode == 'production' ? "http://81.70.46.244/" : "http://localhost:3003/dist/",
            filename: mode == 'production' ? "bundle.[contenthash:10].js" : "bundle.js"
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
                                /**
                                 * 开启多进程打包，打开进程一般 600 ms，
                                 * 通信也有开销。
                                 */
                                // {
                                //     loader: "thread-loader",
                                //     options: {
                                //         workers: 3
                                //     }
                                // },
                                {
                                    loader: "babel-loader",
                                    options: {
                                        /**
                                         * babel 缓存，js 和 css 同时使用一个 hash 值。
                                         * 如果重新打包，会导致所有缓存失效。但你有可能只
                                         * 改一种类型的文件。
                                         */
                                        cacheDirectory: true
                                    }
                                }

                            ],
                        },
                        {
                            test: /\.css$/,
                            exclude: /(node_modules|bower_components|dist)/,
                            use: ["css-loader"]
                        },
                        {
                            test: /\.less$/,
                            exclude: /(node_modules|bower_components|dist)/,
                            use: ['css-loader', 'less-loader']
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
        ],
    };
}

module.exports = getConfig
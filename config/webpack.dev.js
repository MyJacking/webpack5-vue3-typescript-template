const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('./utils.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.base');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const devWebpackConfig = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // postcss-preset-env 内部集成了 autoprefixer 添加css第三方前缀
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // postcss-preset-env 内部集成了 autoprefixer 添加css第三方前缀
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                    // {
                    //   loader: 'sass-loader',
                    //   options: {
                    //     additionalData: `
                    //       @use "@/styles/variables.scss" as *;
                    //       @use "@/styles/mixin.scss" as *;`,
                    //   },
                    // },
                ],
            },
        ],
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: '/',
    },
    // 日志打印只打印错误和警告
    stats: 'errors-warnings',
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/g,
                    to: '/index.html',
                },
            ],
        },
        port: 10001, // 端口号
        open: false, // 自动打开
        hot: true, // 热更新
        allowedHosts: 'all',
        client: {
            progress: true, // 将运行进度输出到控制台。
            overlay: { warnings: false, errors: true }, // 全屏显示错误信息
        },
        compress: true, // 为所有服务启用gzip 压缩
        proxy: {
            '/api': {
                target: 'http://192.168.80.40',
                // target: 'https://i1001.xb55.net',
                secure: true, // 如果是 https ,需要开启这个选项
                ws: true, // 是否启用websockets
                changeOrigin: true, // 是否是跨域请求
                // pathRewrite: {
                //     '^/api': '',
                // },
            },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_BASE_URL': JSON.stringify('123'),
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
        }),
    ],
    // 缓存
    // cache: {
    //   type: 'filesystem',
    //   buildDependencies: {
    //     config: [__filename], // 针对构建的额外代码依赖的数组对象。webpack 将使用这些项和所有依赖项的哈希值来使文件系统缓存失效。
    //   },
    //   cacheDirectory: resolve('temp_cache'),
    //   name: 'scf-cache', // 路径temp_cache/scf-cache
    //   compression: 'gzip',
    // },
});

devWebpackConfig.plugins.push(
    // 进度条
    new ProgressBarPlugin({
        width: 20, // 默认20，进度格子数量即每个代表进度数，如果是20，那么一格就是5。
        format: chalk.blue.bold('build') + chalk.yellow('[:bar] ') + chalk.green.bold(':percent') + ' (:elapsed秒)',
        stream: process.stderr, // 默认stderr，输出流
        complete: '#', // 默认“=”，完成字符
        clear: false, // 默认true，完成时清除栏的选项
        renderThrottle: '', // 默认16，更新之间的最短时间（以毫秒为单位）
        callback() {
            // 进度条完成时调用的可选函数
            console.log(chalk.green.bold('start success!'));
        },
    }),
    // 错误提示
    new FriendlyErrorsWebpackPlugin({
        // 成功的时候输出
        compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${devWebpackConfig.devServer.port}`],
        },
        // 是否每次都清空控制台
        clearConsole: true,
    })
);

module.exports = devWebpackConfig;

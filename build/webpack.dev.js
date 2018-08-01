const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const entrys = require('../entrys.config.js');

let configArr = [];

entrys.forEach((item)=>{
    let json = {
        entry : {
            [item.page] : './src/pages/'+item.page+'/main.js',
        },
        mode : 'development',
        output : {
            filename : 'js/[name].bundle.js',
        },
        devtool: "cheap-eval-source-map",
        devServer: {
            hot: true,
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            open: true,
            overlay: true,
            // 代理转发
            // proxy: {
            //     '/*':{
            //         target: '',
            //         changeOrigin: true,
            //     }
            // }
        },
        module : {
            rules : [
                {
                    test : /\.css$/,
                    exclude: /node_modules/,
                    use : [
                        'vue-style-loader',
                        'css-loader',
                        {
                          loader: 'postcss-loader',
                          options: {
                            plugins: (loader) => [
                              require('autoprefixer')()
                            ]
                          }
                        }
                    ]
                },
                {
                    test : /\.less$/,
                    exclude: /node_modules/,
                    use : [
                        'vue-style-loader',
                        'css-loader',
                        {
                          loader: 'postcss-loader',
                          options: {
                            plugins: (loader) => [
                              require('autoprefixer')()
                            ]
                          }
                        },
                        'less-loader'
                    ]
                },
                {
                    test : /\.scss$/,
                    exclude: /node_modules/,
                    use : [
                        'vue-style-loader',
                        'css-loader',
                        {
                          loader: 'postcss-loader',
                          options: {
                            plugins: (loader) => [
                              require('autoprefixer')()
                            ]
                          }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test : /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options : {
                        cacheDirectory : true
                    }
                },
                {
                    test : /\.vue$/,
                    exclude: /node_modules/,
                    loader : 'vue-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    exclude: /node_modules/,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 1000
                        }
                      }
                    ]
                 }
            ]
        },
        resolve: {
            extensions: ['.js','.vue','.jsx','.css'],
            alias: {
                // 'vue': 'vue/dist/vue.js',
                'vue': path.resolve(__dirname,'../raw/vue.js'),
                '@': path.resolve(__dirname,'../src'),
                '#': path.resolve(__dirname,'../raw'),
                'jquery': path.resolve(__dirname,'../raw/jquery-2.1.1.js'),
                '_': path.resolve(__dirname,'../raw/lodash.js')
            }
        },
        plugins : [
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            }),
            new VueLoaderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            //http:0.0.0.0:8888/[item.page].html
            new HtmlWebpackPlugin({
                title: item.title,
                filename: item.page+'.html',
                template: 'template/'+item.page+'.html'
            })
        ]
    };

    configArr.push(json);
});


module.exports = configArr;

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const entrys = require('../entrys.config.js');
let configArr = [];

entrys.forEach((item)=>{
    let json = {
        entry : {
            [item.page] : './src/pages/'+item.page+'/main.js',
        },
        mode : 'production',
        output : {
            filename : 'js/[name].[chunkhash:8].js',
            path : path.resolve(__dirname,'../dist/'+item.page)
            // libraryTarget: "umd"
        },
        // //与 libraryTarget: "umd" 将 jQuery 单独引入  https://github.com/zhengweikeng/blog/issues/10
        // externals: {
        //   jquery: "jQuery"
        // },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: /vue|jquery/,
                    },
                    // styles: {
                    //   name: 'styles',
                    //   test: /\.css$/,
                    //   chunks: 'all'
                    // }
                }
            }
        },
        module : {
            rules : [
                {
                    test : /\.vue$/,
                    exclude: /node_modules/,
                    loader : 'vue-loader',
                    // options:{
                    //   video: ['src', 'poster'],
                    //   source: 'src',
                    //   img: 'src',
                    //   image: 'xlink:href'
                    // }
                },
                {
                    test : /\.css$/,
                    exclude: /node_modules/,
                    use : [
                        {
                            loader: ExtractCssPlugin.loader,
                            options:{
                                publicPath: '../'
                            }
                        },
                        {
                          loader: 'css-loader',
                          options: { importLoaders: 1 }
                        },
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
                        {
                            loader: ExtractCssPlugin.loader,
                            options:{
                                publicPath: '../'
                            }
                        },
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
                        {
                            loader: ExtractCssPlugin.loader,
                            options:{
                                publicPath: '../'
                            }
                        },
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
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    exclude: /node_modules/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash:8]',
                            outputPath: 'images/',
                            // publicPath: '../images'
                        }
                      }
                    ]
                 },
                 {
                     test: /\.svg$/,
                     use: [
                        {
                            loader: 'svg-sprite-loader',
                            // options: {
                            //   extract: true,
                            //   spriteFilename: 'sprite-[hash:6].svg'
                            // }
                        },
                        'svgo-loader'
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
              jQuery: 'jquery',
              // _ : '_'
            }),
            new CleanWebpackPlugin(['dist'],{
                root: path.resolve(__dirname, '../')
            }),
            // new SpriteLoaderPlugin(),
            new ExtractCssPlugin({
                filename: "css/[name].[chunkhash:8].css"
            }),
            new VueLoaderPlugin(),
            new OptimizeCSSPlugin(),
            new HtmlWebpackPlugin({
                title : item.title,
                filename: item.page+'.[chunkhash:8].html', //输出文件名
                template: 'template/'+item.page+'.html',
                minify : {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunks : [item.page,'vendor']
            })
        ]
    }

    configArr.push(json);
});


module.exports = configArr;

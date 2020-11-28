const path = require('path');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const progress = new webpack.ProgressPlugin();
const cleanWebpack = new CleanWebpackPlugin();
const extractCSS = new ExtractTextPlugin({
    filename: 'bundle.css'
});
const htmlWebpack = new HtmlWebpackPlugin({
    title: 'Ishop3-React',
    inlineSource: '.(js|css)$',
    template: 'public/index.html'
});

module.exports = {
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ['css-loader']
                })
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                }, ],
            },
        ]
    },
    plugins: [
        progress,
        cleanWebpack,
        extractCSS,
        htmlWebpack,
    ]
}

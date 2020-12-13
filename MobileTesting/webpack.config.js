const path = require('path');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const progress = new webpack.ProgressPlugin();
const cleanWebpack = new CleanWebpackPlugin();
const miniExtractCSS = new MiniCssExtractPlugin({
    filename: "bundle.css"
});
const htmlWebpack = new HtmlWebpackPlugin({
    template: 'public/index.html'
});

module.exports = {
    entry: ['@babel/polyfill', './src/main'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        hot: true,
        open: true
    },
    module: {
        rules: [{
                test: /\.jsx?$/i,
                exclude: /(node_modules|bower_components)/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        progress,
        cleanWebpack,
        miniExtractCSS,
        htmlWebpack,
    ]
}

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var failPlugin = require('webpack-fail-plugin');
var CopyPlugin = require('copy-webpack-plugin');

// default values will be overridden by current environment
var packageInfo = require('./package');
var env = {
    NODE_ENV: 'development',
    ROSBRIDGE_URI: 'ws://192.168.99.100:9090',
    PACKAGE_NAME: packageInfo.name,
    PACKAGE_VERSION: packageInfo.version
};
Object.keys(env).forEach(function(key){
    if (key in process.env) {
        env[key] = process.env[key];
    }
    env[key] = JSON.stringify(env[key]);
});

// keep a pointer to css loader so it can change based on environment
var cssPlugin = new ExtractTextPlugin('[name]-style.css');
var cssLoader = {
    test: /\.css$/,
    loader: cssPlugin.extract("style", "css!postcss")
}

// main config object
var config = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name]-bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        modulesDirectories: ['src','node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': env}),
        cssPlugin,
        failPlugin
    ],
    postcss: function(webpack) {
        return [
            autoprefixer({browsers: '> 0.1%'})
        ]
    },
    profile: true,
    module: {
        loaders: [
            cssLoader,
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot-loader/webpack', 'babel'],
            },
            {
                test: /\.(eot|woff|woff2|ttf(\?v=\d+\.\d+\.\d+)|svg(\?v=\d+\.\d+\.\d+)|gif|jpe?g|png)$/,
                loader: "file",
                query: {name:"[path][name].[ext]?[hash]"}
            }
        ]
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map'
};

config.devServer = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8080',
    contentBase: config.output.path,
    publicPath: '/',
    compress: true
}

// in production mode, minimize file-size
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// when running webpack-dev-server, enable hot module reloading
if (require.cache[require.resolve('webpack-dev-server')]) {
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer.hot = true;
    config.devServer.inline = true;
    cssLoader.loader = "style!css!postcss";
}

module.exports = config;
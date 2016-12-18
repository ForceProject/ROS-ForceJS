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
    ROSBRIDGE_URI: 'ws://Orange.local:9090',//138.25.61.21 PINGED
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



var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});





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
        extensions: ['', '.js', '.jsx', '.json'],
        alias:alias
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
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ]
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map'
};

let localhostOnly = false
let ip = localhostOnly ? '127.0.0.1' : '0.0.0.0'

config.devServer = {
    host: process.env.HOST || ip,
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
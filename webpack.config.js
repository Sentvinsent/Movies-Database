const path = require('path')

module.exports = {
    entry: {
        index: ['@babel/polyfill', './src/index.js'],
        movie: ['@babel/polyfill', './src/movie.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/, 
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        devMiddleware: {
            publicPath: '/scripts/'
        },
        // open: true, // To open browser automatically after running code
        hot: "only",
    },
    devtool: 'source-map'
}


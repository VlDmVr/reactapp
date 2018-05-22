let path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'main.js',
        publicPath: '/dist'
    },
    devServer: {
        overlay: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: {
                        loader: "babel-loader"
                    }
            },
            {
                test   : /\.css$/,
                exclude: /node_modules/,
                use: [
                        'style-loader',
                        'css-loader'
                    ]
            },
            {
                test   : /\.php$/,
                exclude: /php/,
            }
        ]
    },
    performance: {
           hints: false
        },
};

module.exports = conf;
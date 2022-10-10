const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    output: {
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                loader: 'workerize-loader',
                options: { inline: true },
            },
            {
                test: /\.mp3/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [ '.mp3' ],
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [ { from: 'assets/**/*' } ] }),
    ]
}

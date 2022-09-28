const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                loader: 'worker-loader',
                options: { inline: 'fallback' },
            },
            {
                test: /\.mp3/,
                loader: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.mp3' ],
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [ { from: 'assets/**/*' } ] }),
    ],
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                loader: 'worker-loader',
                options: { inline: true },
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
}

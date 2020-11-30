const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    externals: ['react', '@apollo/client', 'graphql'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2', // https://github.com/mui-org/material-ui/issues/18880#issuecomment-628597666
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    }
}

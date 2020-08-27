'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            '_c': resolve('src/components')
        }
    },
    rules: [
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {

                    }
                },
                {
                    loader: 'iview-loader',
                    options: {
                        prefix: false
                    }
                }
            ]
        }
    ]
}
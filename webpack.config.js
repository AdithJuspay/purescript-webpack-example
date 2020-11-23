const path = require('path');
const webpack = require('webpack');

const isWebpackDevServer = process.argv.some(a => path.basename(a) === 'webpack-dev-server');

const isWatch = process.argv.some(a => a === '--watch');
module.exports = {
    
    entry : "./action.js",
    output: {
      path: __dirname,
      pathinfo: true,
      filename: 'bundle.js'
    },
    mode :  "development",
    target: 'web',
    module: {
        rules: [
          {
            test: /\.purs$/,
            use: [
              {
                loader: 'purs-loader',
                options: {
                  src: [
                    'bower_components/purescript-*/src/**/*.purs',
                    'src/**/*.purs'
                  ],
                  bundle: false,
                  psc: 'psa',
                  watch: isWebpackDevServer || isWatch,
                  pscIde: false
                }
              }
            ]
          }
        ]
    },
    resolve: {
        modules: [ 'node_modules', 'bower_components' ],
        extensions: [ '.purs', '.js']
      }
}
const path = require('path');
const webpack = require('webpack');
const isWebpackDevServer = process.argv.some(a => path.basename(a) === 'webpack-dev-server');
const isWatch = process.argv.some(a => a === '--watch');

module.exports = {    
    entry : "./action.js",
    output: {
      filename: 'bundle.js'
    },
    bail: true, // fail-fast
    devtool: "source-map", // JS source-maps
    mode : "development", // don't minify the output bundle
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
                    'src/**/*.purs',
                    'test/**/*.purs'
                  ],
                  bundle: false, // don't insert automatic invocation of the 'main' function, build PureScript as a module for 'require'/'import'
                  psc: 'psa', // 'psa' (alias for 'purescript-psa') is a wrapper around psc (alias for 'purs') for better support of warnings
                  watch: isWebpackDevServer || isWatch,
                  pscIde: false,
                  pscArgs: {
                  	codegen: 'js,sourcemaps', // generate both the JavaScript code + Source maps
                  	isLib: 'bower_components', // for 'censorLib'
                  	stash: true, // keep warnings between incremental compilation into .psa-stash (must be gitignored)
                  	censorLib: true, // ignore warnings in libraries, use 'isLib' to determine if the code is library or not
                  	censorSrc: false, // don't ignore user code warnings (everything what is not in the 'isLib' directory, normally 'src' and 'test' directories)
                  	strict: true, // warnings cause compilation error
                  }
                }
              }
            ]
          }
        ]
    },
    devServer: {
       port: 8080,
       host: 'localhost',
       inline: false,
       publicPath: '/',
       writeToDisk: false
    }
}

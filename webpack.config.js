const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // Tells Webpack which built-in optimizations to use
  // In 'production' mode, Webpack will minify and uglify our JS code
  // If you leave this out, Webpack will default to 'production'
  mode: devMode ? 'development' : 'production',

  // Webpack needs to know where to start the bundling process,
  // so we define the main JS and Sass files, both under
  // the './src' directory
  entry: ['./src/leaflet-easymap.js'],

  // This is where we define the path where Webpack will place
  // the bundled JS file
  output: {
    path: __dirname,

			// The name of the output bundle. Path is also relative
    // to the output path
    filename: 'js/leaflet-easymap.js'
  },
  module: {
    // Array of rules that tells Webpack how the modules (output)
    // will be created
    rules: [
      {
        // Look for JavaScript files and apply the babel-loader
        // excluding the './node_modules' directory. It uses the
        // configuration in `.babelrc`
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  }
};

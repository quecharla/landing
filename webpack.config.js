module.exports = {
  context: __dirname + '/app/js',
  entry: './main',
  resolve: {
    root: [
      __dirname + '/app/js'
    ]
  },
  output: {
    path: __dirname + '/public/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader'
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  }
}

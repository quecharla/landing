const exec          = require('child_process').exec
const gulp          = require('gulp')
const autoprefixer  = require('gulp-autoprefixer')
const sass          = require('gulp-sass')
const minifyCss     = require('gulp-minify-css')
const browserSync   = require('browser-sync')
const gutil         = require('gulp-util')
const webpack       = require('webpack')
const webpackConfig = require('./webpack.config.js')
const reload        = browserSync.reload

const NODEMON_TIMEOUT = 700

/**
 * File paths
 */
var paths = {
  dist: 'public/',
  sass: 'app/sass/',
  allsass: 'app/sass/**/*.{sass,scss}',
  alljs: ['app/js/**/*.{js,jsx,njk,nunjucks}', 'config/**/*', 'webpack.config.js'],
  serverjs: ['posts/**/*', 'lib/**/*', 'server.js'],
  npm: './node_modules'
}

/**
 * Webpack
 */
gulp.task('webpack', function (done) {
  webpack(webpackConfig, function (err, stats) {
    if(err) throw new gutil.PluginError("webpack", err)
    gutil.log("[webpack]", stats.toString({}))
    reload()
    done()
  })
})

/**
 * Sass Compilation
 */
gulp.task('sass', function () {
  return gulp.src([ paths.allsass ] )
    .pipe(sass({
      indentedSyntax: true
    }))
    .on('error', swallowError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss({
      relativeTo: paths.npm,
      processImport: true
    }))
    .pipe(gulp.dest( paths.dist + 'css' ))
    .pipe(reload({ stream: true }))
})

gulp.task('distribution', ['webpack', 'sass'], function(){})

/**
 * Server
 */
gulp.task('server-update', function(done) {
  setTimeout(()=>{
    browserSync.reload({ stream: false })
    done()
  }, NODEMON_TIMEOUT)
})

/**
 * Server
 */
gulp.task('server', ['distribution'], function(done) {
  const PORT = process.env.PORT || 8080
  const child = exec(`PORT=${PORT} npm run server:watch`)
  child.stdout.on('data', function(chunk) {
    console.log(chunk)
  })
  child.stdout.on('error', function(chunk) {
    console.error(chunk)
  })
  setTimeout(() => {
    browserSync({
      notify: false,
      proxy: `localhost:${PORT}`
    })
    done()
  }, NODEMON_TIMEOUT)
})

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch( paths.allsass, ['sass'])
  gulp.watch( paths.alljs, ['webpack'])
  gulp.watch( paths.serverjs, ['server-update'])
})

gulp.task('default', ['watch', 'server'])

/**
 * Swallow errors preventing the watch to stop
 * @param  {Error} error
 */
function swallowError (error) {
  //If you want details of the error in the console
  console.error( error.toString() )
  this.emit('end')
}

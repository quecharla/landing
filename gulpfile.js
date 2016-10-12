const gulp         = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const sass         = require('gulp-sass')
const minifyCss    = require('gulp-minify-css')
const browserSync  = require('browser-sync')
const reload       = browserSync.reload

/**
 * File paths
 */
var paths = {
  dist: 'public/',
  sass: 'app/sass/',
  allsass: 'app/sass/**/*.{sass,scss}',
  npm: './node_modules'
}

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
    .pipe(reload({ stream:true }))
})

gulp.task('production', ['sass'], function(){})

/**
 * Server
 */
gulp.task('server', ['production'], function() {
  browserSync({
    notify: false,
    server: {
       baseDir: './public/'
    }
  })
})

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch( paths.allsass, ['sass'])
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

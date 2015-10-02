var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    notifier = require('node-notifier'),
    server = require('gulp-server-livereload'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/main.js'],
  transform: [reactify],
  extensions: ['.js'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/dist'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('public/dist')
    // .pipe(server({
    //   livereload: {
    //     enable: true,
    //     filter: function(filePath, cb) {
    //       if(/bundle.js/.test(filePath)) {
    //         cb(true)
    //       } else if(/style.css/.test(filePath)){
    //         cb(true)
    //       }
    //     }
    //   },
    //   open: true
    // }));
});

gulp.task('default', ['build', 'serve']);

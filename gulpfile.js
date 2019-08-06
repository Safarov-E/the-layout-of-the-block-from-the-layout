var gulp       	    = require('gulp');
var sass       	    = require('gulp-sass');
var browserSync   	= require('browser-sync').create();  
var autoprefixer    = require('gulp-autoprefixer');
var concatCss       = require('gulp-concat-css');
var ftp             = require('gulp-ftp');


gulp.task('sass', function(done){
  gulp.src('src/sass/*.sass') 
    .pipe(sass()) 
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concatCss("style.css"))
   .pipe(gulp.dest('src/css'))
   .pipe(browserSync.reload({stream: true}));
  
  done()
});

gulp.task('watch', gulp.series('sass', function(done) {
    browserSync.init({
        server: {
          baseDir: 'src'
        },
        notify: false
      });
      
      browserSync.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/**/*.sass', gulp.series('sass'));
    
  done()
}));

gulp.task('ftp', function () {
    return gulp.src('src/**')
        .pipe(ftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234',
            remotePath: 'www/site.ru/strean'
        }))  
        .pipe(gutil.noop());
});

gulp.task('default', gulp.series('watch'));
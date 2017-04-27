/**  ----- Gulpfile -----
 * @author Jana Acuna - janitaxd
 * @description gulpfile who contains all the principal tasks to allows to a fluid frontend development
*/


var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var swig = require('gulp-swig');
var browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var src = {
    scss: 'app/scss/**/*.scss',
    css:  'app/css',
    html: 'app/**/*.html'
};

// My serve tasks (contains browserSync base dir and all tasks watch function); executes sass task before
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: 'app' //getting this baseDir to trigger it
        },
    })

    gulp.watch(src.scss, ['sass']); // watching changes through sass task
    gulp.watch(src.html, ['html']); // watching changes through html task
});

//My sass gulp task
gulp.task('sass', function() {
    return gulp.src(src.scss) // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest(src.css)) //destination (generates main.css file)
        .pipe(reload({stream: true })) //setting browserSync to reload
});

// My html gulp task
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(swig())
        .pipe(reload({stream: true })) //setting browserSync to reload
});

//runing gulp executes serve task (who contains sass and html tasks) (develop enviroment)
gulp.task('watch', ['serve']);

/******************************************************************************/


gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('js', function() {
    return gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('views', function() {
    return gulp.src('app/views/**/*')
        .pipe(gulp.dest('dist/views'))
});

gulp.task('index', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
    gulp.src('app/**/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
    return gulp.src('app/css/**/*', '!app/css/**/*main.css')
        .pipe(gulp.dest('dist/css'))
});

// running production tasks (production enviroment)
gulp.task('production', ['css', 'images', 'js', 'views', 'index']);

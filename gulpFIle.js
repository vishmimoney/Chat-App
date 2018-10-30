const gulp = require('gulp');
const eslint = require('gulp-eslint');

function lint () {
    return gulp.src([
        './app/src/**/*.js',
        './server/**/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
}

gulp.task('lint', lint);

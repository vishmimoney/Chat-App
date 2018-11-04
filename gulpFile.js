const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

function lint() {
    return gulp.src([
        './app/src/**/*.js',
        './server/**/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
}

function prod() {
    gulp.src([
        './app/src/modules/*.js',
        './app/src/configs/*.js',
        './app/src/directives/*.js',
        './app/src/controllers/*.js'
    ])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/dist'))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify({ mangle: true }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./app/dist'));
}

function dev() {
    gulp.src([
        './app/src/modules/*.js',
        './app/src/configs/*.js',
        './app/src/directives/*.js',
        './app/src/controllers/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/dist'))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./app/dist'));
}

gulp.task('prod', prod);
gulp.task('dev', dev);
gulp.task('lint', lint);
gulp.task('default', ['dev']);

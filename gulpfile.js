var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    nodemon = require('gulp-nodemon'),
    clean = require('rimraf'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    async = require('async'),
    exec = require('child_process').exec,
    git = require('gulp-git'),
    http = require('http'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

    //react = require('react');

var delay = function(fn, time) {
    return function() {
        setTimeout(fn, time);
    };
};

gulp.task('less-dev', function() {
    // Builds the CSS
    gulp.src(['public/less/*.less'])
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('less-prod', function() {
    // Builds the CSS
    gulp.src(['public/less/*.less'])
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(minifyCSS({
            advanced: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-dev', function() {
    // Builds the JS
    gulp.src(['public/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-prod', function() {
    // Builds the JS
    gulp.src(['public/js/*.js'])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('html-dev', function() {
    // Moves and Compresses HTML
    gulp.src(['public/pages/*.html'])
        .pipe(replace('</body>', '<script src="http://localhost:35729/livereload.js"></script></body>'))
        .pipe(gulp.dest('dist/pages'));
});

gulp.task('html-prod', function() {
    // Moves and Compresses HTML
    gulp.src(['public/pages/*.html'])
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            caseSensitive: true,
            minifyJS: true,
            keepClosingSlash: true
        }))
        .pipe(gulp.dest('dist/pages'));
});

gulp.task('assets', function() {
    gulp.src(['public/img/**/*'])
        .pipe(gulp.dest('dist/img'));
    gulp.src(['public/vendor/**/*'])
        .pipe(gulp.dest('dist/vendor'));
    gulp.src(['public/files/**/*'])
        .pipe(gulp.dest('dist/files'));
});

gulp.task('server-dev', function() {
    // Runs the server forever
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: [
            'public/*',
            'dist'
        ],
        env: {
            PORT: '3000'
        }
    });
});

gulp.task('watch', ['server-dev'], function() {
    livereload.listen();
    gulp.watch('public/js/*.js', ['js-dev']).on('change', livereload.changed);
    gulp.watch('public/less/*.less', ['less-dev']).on('change', delay(livereload.changed, 500));
    gulp.watch('public/pages/*.html', ['html-dev']).on('change', livereload.changed);
});

// Clears all compiled client code
gulp.task('clean', function() {
    clean.sync(path.join(__dirname, 'dist'));
});

gulp.task('build', ['html-dev', 'js-dev', 'less-dev', 'assets']);
gulp.task('deploy', ['html-prod', 'js-prod', 'less-prod', 'assets']);
gulp.task('dev', ['clean', 'build', 'watch']);
gulp.task('prod', ['clean', 'deploy', 'githook']);
gulp.task('default', ['dev']);
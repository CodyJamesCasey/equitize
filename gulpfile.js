var gulp = require('gulp'),
    // Generic imports
    Stream = require('stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    clean = require('rimraf'),
    plumber = require('gulp-plumber'),
    // Browserify-related imports
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    // LESS-related imports
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    // HTML-related imports
    minify = require('gulp-minify-html'),
    // Dev-server-related imports
    nodemon = require('nodemon')
    // Githook imports
    express = require('express'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    async = require('async'),
    exec = require('child_process').exec,
    git = require('gulp-git'),
    http = require('http');

var constants = {
    DEV_DB_CONN_STRING:     'postgres://postgres:postgres@localhost:5432/jirani',
    STAGING_DB_CONN_STRING: 'postgres://postgres:postgres@localhost:5432/jirani'
};

var helpers = {
    rebundle: function(bundler, done) {
        var time = (new Date()).getTime();
        gutil.log('Re-bundling js started');
        bundler
            .bundle(function(err) {
                if (!err) {
                    gutil.log('Re-bundling js finished after ' + (((new Date()).getTime() - time) / 1000) + ' seconds');
                    if (done) done();
                } else {
                    gutil.log('Re-bundling js FAILED after ' + (((new Date()).getTime() - time) / 1000) + ' seconds');
                    console.log(err);
                    if (done) done();
                }
            })
            .pipe(plumber())
            .pipe(source(path.join(__dirname, 'main.js')))
            .pipe(gulp.dest(path.join(__dirname, 'dist', 'js')))
    },
    delay: function(callback) {
        // Waits a second before executing a function
        return function() {
            setTimeout(function() {
            }, 1000);
        };
    }
};

// Compiles the public js
gulp.task('browserify', function() {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    // React middleware for JSX
    bundler.transform(reactify);
    // Add the entry point
    bundler.add(path.join(__dirname, 'client', 'js', 'main.js'));
    // Perform initial rebundle
    return helpers.rebundle(bundler);
});

// Watches and recompiles public js
gulp.task('watchify', function() {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });
    // Pass the browserify bundler to watchify
    bundler = watchify(bundler);
    // React middleware for JSX
    bundler.transform(reactify);
    // Bundlize on updates
    bundler.on('update', function() {
        helpers.rebundle(bundler);
    });
    // Add the entry point
    bundler.add(path.join(__dirname, 'client', 'js', 'main.js'));
    // Perform initial rebundle
    return helpers.rebundle(bundler);
});

// Compiles the public less
gulp.task('less', function() {
    gulp.src(path.join('client', 'less', 'main.less'))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join('.', 'dist', 'css')));
});

// Condenses the pages
gulp.task('pages', function() {
    gulp.src('./client/pages/*.html')
        .pipe(plumber())
        .pipe(minify({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(path.join('.', 'dist', 'pages')));
});

// Condenses the images
gulp.task('images', function() {
    // TODO: image compression
    gulp.src('./client/img/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(path.join('.', 'dist', 'img')));
});

// Condenses the images
gulp.task('images-delayed', function() {
    // TODO: image compression
    setTimeout(function() {
        gulp.src('./client/img/**/*')
            .pipe(plumber())
            .pipe(gulp.dest(path.join('.', 'dist', 'img')))
            .on('error', helpers.smother);
    }, 500);
});

// Clears all compiled public code
gulp.task('clean', function() {
    clean.sync(path.join(__dirname, 'dist'));
});

// Watches changes to the public code
gulp.task('watch', ['clean', 'less', 'pages', 'images', 'watchify'], function() {
    gulp.watch('client/pages/*.html', ['pages']);
    gulp.watch('client/less/**/*.less', ['less']);
    gulp.watch('client/img/**/*', ['images-delayed']);
});

// Runs dev server and watches public code
gulp.task('dev', ['watch'], function() {
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['client/*', 'dist/*'],
        env: {
            // Server environment
            PORT: 3000,
            DB: constants.DEV_DB_CONN_STRING,
            VERBOSE: true,
            SESSION_SECRET: 'thisisnotasecretatall'
        }
    });
});

// Run all compilation tasks
gulp.task('default', ['clean', 'less', 'pages', 'images', 'browserify']);

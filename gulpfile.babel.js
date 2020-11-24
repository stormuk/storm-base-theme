'use strict';

import plugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import yaml from 'js-yaml';
import fs from 'fs';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';
import autoprefixer from 'autoprefixer';

const $ = plugins();

var {
    HOST_URL,
    COMPATIBILITY,
    PATHS
} = loadConfig();
var assets_use_path = PATHS.assets.dev;

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

gulp.task('default', gulp.series(setDev, server, gulp.parallel(sass, js), watch));
gulp.task('deploy', gulp.parallel(setProd, sassDist, js));
gulp.task('js', gulp.series(setDev, js));
gulp.task('images', gulp.series(setDev, themeImageMin));

function server(done) {
    browserSync.init({
        proxy: HOST_URL,
        open: false
    });
    done();
}

function setDev(done) {
    process.env.NODE_ENV = 'development';
    done();
}

function setProd(done) {
    process.env.NODE_ENV = 'production';
    assets_use_path = PATHS.assets.dist;
    done();
}

function sass() {

    const postCssPlugins = [autoprefixer()].filter(Boolean);

    return gulp.src(PATHS.watch.sass)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass
        }).on('error', $.sass.logError))
        .pipe($.postcss(postCssPlugins))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets.dev.css))
        .pipe(browserSync.reload({
            stream: true
        }))
}

function sassDist() {

    const postCssPlugins = [autoprefixer()].filter(Boolean);

    return gulp.src(PATHS.watch.sass)
        .pipe($.sass({
            includePaths: PATHS.sass
        }).on('error', $.sass.logError))
        .pipe($.postcss(postCssPlugins))
        .pipe($.cleanCss())
        .pipe(gulp.dest(PATHS.assets.dist.css))
}

function js() {
    return gulp.src(PATHS.js)
        .pipe(named())
        .on('error', logAndContinueError)
        .pipe(webpackStream(require("./webpack.config.js"), webpack))
        .on('error', logAndContinueError)
        .pipe(gulp.dest(assets_use_path.js))
        .pipe(browserSync.reload({
            stream: true
        }))
}

function themeImageMin() {
    return gulp.src('./img/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('./img'));
}

function uploadImageMin() {
    return gulp.src('../../uploads/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('../../uploads/'));
}

function reloadWindows(done) {
    browserSync.reload()
    done();
}

function logAndContinueError(e) {
    console.log('>>> ERROR', e);
    this.emit('end');
}

function watch() {
    gulp.watch('config.yml', gulp.series(function (done) {
        PATHS = loadConfig().PATHS;
        done();
    }, gulp.parallel(js, sass)));
    gulp.watch(PATHS.watch.sass, sass);
    gulp.watch(PATHS.watch.js, js);
    gulp.watch(PATHS.watch.php, gulp.parallel(reloadWindows));
}

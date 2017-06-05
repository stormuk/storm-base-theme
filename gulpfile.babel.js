'use strict';

import plugins       from 'gulp-load-plugins';
import browserSync   from 'browser-sync';
import gulp          from 'gulp';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';

const $ = plugins();

var { HOST_URL, HOST_IP, COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

gulp.task('default', gulp.series(server, gulp.parallel(sass, js), watch));
gulp.task('deploy', gulp.parallel(sass, sassDist, js, jsDist));
gulp.task('full-deploy', gulp.parallel(sassDist, jsDist, themeImageMin, uploadImageMin));

function server(done) {
    browserSync.init({
        proxy: HOST_URL,
        open: false
    });
    done();
}

function sass() {
    return gulp.src(PATHS.watch.sass)
        .pipe($.sourcemaps.init())
        .pipe($.sass({includePaths: PATHS.sass}).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: COMPATIBILITY}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets.dev.css))
        .pipe(browserSync.stream())
}

function sassDist() {
    return gulp.src(PATHS.watch.sass)
        .pipe($.sass({includePaths: PATHS.sass}).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: COMPATIBILITY}))
        .pipe($.cleanCss())
        .pipe(gulp.dest(PATHS.assets.dist.css))
}

let webpackConfig = {
	rules: [{
		test: /.js$/,
		use: [{
			loader: 'babel-loader'
		}]
	}]
}

function js() {
    return gulp.src(PATHS.js)
	    .pipe(named())
            .on('error', logAndContinueError)
        .pipe($.sourcemaps.init())
	    .pipe(webpackStream({module: webpackConfig}, webpack2))
            .on('error', logAndContinueError)
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets.dev.js))
        .pipe(browserSync.stream())
}

function jsDist() {
    return gulp.src(PATHS.js)
	    .pipe(named())
            .on('error', logAndContinueError)
	    .pipe(webpackStream({module: webpackConfig}, webpack2))
            .on('error', logAndContinueError)
        .pipe($.uglify())
        .pipe(gulp.dest(PATHS.assets.dist.js))
}



function themeImageMin() {
    return gulp.src('./images/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('./images/'));
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
    gulp.watch('config.yml', gulp.series(function(done) { PATHS = loadConfig().PATHS; done(); }, gulp.parallel(js, sass)));
    gulp.watch(PATHS.watch.sass, sass);
    gulp.watch(PATHS.js, js);
    gulp.watch(PATHS.watch.php, gulp.parallel(reloadWindows));
}
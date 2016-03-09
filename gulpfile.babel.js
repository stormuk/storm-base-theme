'use strict';

import plugins      from 'gulp-load-plugins';
import browserSync  from 'browser-sync';
import gulp         from 'gulp';
import yaml         from 'js-yaml';
import fs           from 'fs';

const $ = plugins();

const { HOST_URL, COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task('default', gulp.series(server, gulp.parallel(sass, js, phpcs), watch));
gulp.task('deploy', gulp.parallel(sassDist, jsDist, themeImageMin, uploadImageMin));

function server(done) {
    browserSync.init({
        proxy: HOST_URL
    });
    done();
}

function watch() {
    gulp.watch('scss/**/*.scss', sass);

    gulp.watch(PATHS.js, gulp.series(js, browserSync.reload));

    gulp.watch(PATHS.watch.php, function(file) {
        gulp.src(file.path)
            .pipe(browserSync.reload)
            .pipe($.phpcs({
              bin: 'vendor/bin/phpcs',
              standard: 'PSR2',
              warningSeverity: 0,
              colors: true
            }))
            .pipe($.phpcs.reporter('log'))
    });
}

function phpcs() {
    return gulp.src(PATHS.watch.php)
        .pipe($.phpcs({
          bin: 'vendor/bin/phpcs',
          standard: 'PSR2',
          warningSeverity: 0,
          colors: true
        }))
        .pipe($.phpcs.reporter('log'))
}

function sass() {
    return gulp.src(PATHS.watch.scss)
        .pipe($.sourcemaps.init())
        .pipe($.sass({includePaths: PATHS.sass}).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: COMPATIBILITY}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets.dev.css))
        .pipe(browserSync.stream());
}

function sassDist() {
    return gulp.src(PATHS.watch.scss)
        .pipe($.sass({includePaths: PATHS.sass}).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: COMPATIBILITY}))
        .pipe($.cleanCss())
        .pipe(gulp.dest(PATHS.assets.dist.css))
}

function js() {
    return gulp.src(PATHS.js)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('compiled.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets.dev.js))
}

function jsDist() {
    return gulp.src(PATHS.js)
        .pipe($.babel())
        .pipe($.concat('compiled.min.js'))
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
var gulp					= require('gulp');
var sass					= require('gulp-sass');
var sourcemaps		= require('gulp-sourcemaps');
var minifyCSS			= require('gulp-minify-css');
var rename				= require('gulp-rename');
var watch					= require('gulp-watch');
var coffee				= require('gulp-coffee');
var uglify				= require('gulp-uglifyjs');
var livereload		= require('gulp-livereload');
var imagemin			= require('gulp-imagemin');
var phpcs					=	require('gulp-phpcs');
var exec					= require('child_process').exec;

var jsFiles				=	[
	'public/components/jquery/dist/jquery.js',
	'public/components/foundation-sites/js/foundation/foundation.js',
	'public/components/foundation-sites/js/foundation/foundation.reveal.js'
]

// This needs to contain the names of the coffee files which you want compiled into the combined.js/combined.min.js files.
var coffeeFiles		= [
	'js/app.js'
]

var jsCompileFiles = jsFiles.concat(coffeeFiles);

var sassPaths 		= [
	'public/components/foundation-sites/scss',
	'public/components/bourbon/app/assets/stylesheets'
]


gulp.task('default', ['sass','coffee','phpcs','watch']);
gulp.task('deploy', ['sass-dist','coffee-dist','imagemin']);

gulp.task('watch', function() {
  livereload.listen();
  
	gulp.watch('./scss/**/*.scss', ['sass']);

	watchJsFiles = ['./coffee/**/*.coffee'];
	watchJsFiles = watchJsFiles.concat(jsFiles);
	gulp.watch([watchJsFiles], ['coffee']);

	gulp.watch('./**/*.php').on('change', function(file) {
		gulp.src(file.path)
    .pipe(livereload())
	  .pipe(phpcs({
	      bin: 'vendor/bin/phpcs',
	      standard: 'WordPress',
	      warningSeverity: 0,
	      colors: true
	  }))
	  .pipe(phpcs.reporter('log'))
	});
	
});

gulp.task('phpcs', function() {
	
	//Include the wordpress coding standards.
	exec('vendor/bin/phpcs --config-set installed_paths vendor/wp-coding-standards/wpcs', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
	
	gulp.src(['**/*.php', '!vendor/**/*.*'])
	  .pipe(phpcs({
	      bin: 'vendor/bin/phpcs',
	      standard: 'WordPress',
	      warningSeverity: 0,
	      colors: true
	  }))
	  .pipe(phpcs.reporter('log'))
});

gulp.task('sass', function () {
	gulp.src('./scss/*.scss')
	  .pipe(sourcemaps.init())
    .pipe(sass({includePaths: sassPaths}))
    .on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest('./css'))
    .pipe(livereload())
});

gulp.task('sass-dist', function() {
	gulp.src('./scss/*.scss')
    .pipe(sass({includePaths: sassPaths}))
    .on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css/dist'))
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
	  .pipe(sourcemaps.init())
    .pipe(coffee())
	  .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js/'))
    
  gulp.src(jsCompileFiles)
    .pipe(uglify('compiled.js', {
      mangle: false,
      outSourceMap: true,
      output: {
        beautify: true
      }
    }))
    .on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
    .pipe(gulp.dest('./js/dist'))
    .pipe(livereload())
});

gulp.task('coffee-dist', function() {
  gulp.src('./coffee/*.coffee')
	  .pipe(sourcemaps.init())
    .pipe(coffee())
    .on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
	  .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js/'))
    
  gulp.src(jsCompileFiles)
    .pipe(uglify('compiled.min.js', {
      outSourceMap: false
    }))
    .pipe(gulp.dest('./js/dist'))
});

gulp.task('imagemin', function() {
	gulp.src('./images/**/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('./images/'));
	  
	gulp.src('../../uploads/**/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('../../uploads/'));
});
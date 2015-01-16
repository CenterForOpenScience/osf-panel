var gulp = require('gulp');
var concat = require("gulp-concat")
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var header = require('gulp-header');
var pkg = require('./package.json');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author%>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

gulp.task('dist_full', function(){
    return gulp.src('./panel.js')
        .pipe(rename('jquery-osfPanel.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/'))
})
gulp.task('dist_min', function(){
    return gulp.src('./panel.js')
        .pipe(uglify())
        .pipe(rename('jquery-osfPanel.min.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
    gulp.watch(['./panel.js'], ['dist_full', 'dist_min']);
});

gulp.task("default", ["dist_min", "dist_full", "watch"]);
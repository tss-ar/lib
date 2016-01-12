'use strict';

var del = require('del');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('merge2');
var rename = require('gulp-rename');
var config = require('./gulp.conf');
    var dts = require('dts-bundle');

var tsProjectSrc = ts.createProject('./src/tsconfig.json');

// var dtsGenerator = require('dts-generator');

gulp.task('dts', function () {
    dts.bundle({
        name: 'tss-lib',
        main: path.join(config.dest.lib.jsTds, 'index.d.ts'),
        out: path.join(__dirname, config.dest.lib.js, 'index.d.ts')
    });

    // dtsGenerator.default({
    //     name: 'tss-lib',
    //     project: './src',
    //     main: 'tss-lib',
    //     out: 'tss-lib.d.ts',
    //     //files: config.src.lib.js,
    //     excludes: ['typings/**']
    // });
});

function sequenceComplete(done) {
    return function (err) {
        if (err) {
            var error = new Error('build sequence failed');
            error.showStack = false;
            done(error);
        } else {
            done();
        }
    };
}

gulp.task('clean', [
    'clean.js'
]);

gulp.task('clean.js', () => {
    del(path.join(config.dest.lib.js, '**/*.{js,js.map,d.ts}'));
});

gulp.task('build', (done) => {
    runSequence(
        'build.js',
        sequenceComplete(done));
});

gulp.task('rebuild', (done) => {
    runSequence('clean', 'build', sequenceComplete(done));
});

gulp.task('build.js', function () {
    var tsResult = gulp.src([config.src.lib.js, config.src.lib.jsTds])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProjectSrc, {
            typescript: require('typescript')
        }));

    let jsStream = tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest.lib.js));

    return merge([
        tsResult.dts.pipe(gulp.dest(config.dest.lib.jsTds)),
        jsStream
    ]);
});

gulp.task('build.js.prod', function (done) {
    let tsResult = gulp.src([config.src.lib.js, config.src.lib.jsTds])
        .pipe(ts(tsProjectSrc, {
            typescript: require('typescript')
        }));

    let jsStream = tsResult.js
        .pipe(concat('tss-lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.lib.jsProd));

    let dtsStream = tsResult.dts
        .pipe(concat('libs-bundle.d.ts'))
        .pipe(gulp.dest(config.dest.lib.jsProd));

    return merge([
        dtsStream,
        jsStream
    ]);
});

gulp.task('watch.js', () => {
    watch([config.src.lib.js], {
        readDelay: 2000
    }, batch(function (events, done) {
        gulp.start('build.js', done);
    }));
});

gulp.task('watch', (done) => {
    runSequence(
        'clean',
        'build',
        [
            'watch.js'
        ],
        done);
});

// gulp.task('build.app.js', function() {
//     var tsResult = gulp.src([CONFIG.src.app.js, CONFIG.src.app.jsTds])
//         .pipe(sourcemaps.init())
//         .pipe(ts(tsProjectSrc, {
//             typescript: require('typescript')
//         }));
// 
//     var jsStream = tsResult.js
//         .pipe(ngAnnotate({ single_quotes: true }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(CONFIG.dest.app.js));
// 
//     return merge([
//         tsResult.dts.pipe(gulp.dest(CONFIG.dest.app.js)),
//         jsStream
//     ]);
// });
// 
// gulp.task('build.app.js.prod', function() {
//     let tsResult = gulp.src([CONFIG.src.app.js, CONFIG.src.app.jsTds])
//         .pipe(ts(tsProjectSrc, {
//             sortOutput: true,
//             typescript: require('typescript')
//         }));
// 
//     let jsStream = tsResult.js
//         .pipe(ngAnnotate({ single_quotes: true }))
//         .pipe(concat('app-bundle.js'))
//         .pipe(gulp.dest(CONFIG.dest.app.jsProd))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest(CONFIG.dest.app.jsProd));
// 
//     return merge([
//         //tsResult.dts.pipe(gulp.dest(CONFIG.dest.app.jsProd)),
//         jsStream
//     ]);
// });
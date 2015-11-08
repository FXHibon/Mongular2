var gulp = require('gulp');

var PATHS = {
    src: ['frontend/**/*.ts'],
    raw: ['frontend/**/*.*', '!frontend/**/*.ts']
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src(PATHS.src)
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            moduleResolution: 'node',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('raw', function () {
    gulp.src(PATHS.raw)
        .pipe(gulp.dest('dist'));
});

gulp.task('play', ['ts2js', 'raw'], function () {
    gulp.watch(PATHS.src, ['ts2js', 'raw']);
    gulp.watch(PATHS.raw, ['ts2js', 'raw']);
    require('./backend/app');
});


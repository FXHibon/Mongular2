var gulp = require('gulp');

var PATHS = {
    src: ['frontend/**/*.ts', '!frontend/bower_components/**/*.*']
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    console.log('ts2js');
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

gulp.task('play', ['ts2js'], function () {
    gulp.watch(PATHS.src, ['ts2js']);
    require('./backend/app');
});


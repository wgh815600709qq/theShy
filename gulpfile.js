const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const path = require('path');
const tsConfig = require('./ts.config.json');
const tsDefaultReporter = ts.reporter.defaultReporter()

const libDir = path.join(__dirname, './lib');
const esDir = path.join(__dirname, './es');

function compileLess(isModule) {
    gulp
        .src(['components/**/*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest((isModule ? libDir : esDir) + '/css'))
    console.log('Compile less finish.')
}


function compileTs(isModule) {
    let error = 0;
    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'config/**/*.ts',
        'utils/*.ts'
    ]
    const tsResult = gulp
        .src(source)
        .pipe(ts(tsConfig.compilerOptions, {
            error(e) {
                tsDefaultReporter.error(e)
                error = 1
            },
            finish: tsDefaultReporter.finish,
        }))
        
    function check() {
        // eslint-disable-next-line no-undef
        if (error && !argv['ignore-error']) {
            process.exit(1)
        }
     }
    
    tsResult.on('finish', check)
    tsResult.on('end', check)
    return tsResult.js.pipe(gulp.dest(isModule ? libDir : esDir))
}

gulp.task('compile-clean', (done) => {
    rimraf.sync(libDir);
    rimraf.sync(esDir);
    done()
})

gulp.task('compile-less', (done) => {
    compileLess()
    done()
})


gulp.task('compile-typescript', (done) => {
    compileTs();
    done();
})

gulp.task('dynamic-into', (done) => {
    // 动态添加
    done();
})
gulp.task('compile', gulp.series(['compile-clean', 'compile-less', 'compile-typescript']));
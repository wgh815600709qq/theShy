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
        .src('components/style/index.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest((isModule ? libDir : esDir) + '/css'))
    console.log('Compile less finish.')
}


function compileTs() {
    const source = [
        '*.tsx',
        '*.ts'
    ]
    gulp
        .src(source)
        .pipe(ts(tsConfig.compilerOptions, {
            error(e) {
                tsDefaultReporter.error(e)
                error = 1
            },
            finish: tsDefaultReporter.finish,
        }))
}

gulp.task('compile-clean', (done) => {
    rimraf.sync(isModule ? libDir : esDir);    
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

gulp.task('compile', gulp.series(['compile-clean', 'compile-less', 'compile-typescript']));
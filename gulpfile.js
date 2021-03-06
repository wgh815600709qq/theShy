const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const path = require('path');
const fs = require('fs');
const tsConfig = require('./ts.config.json');
const { getFirstLevelSonDirs } = require('./tools/fs.tool');
const webpack = require('webpack');
const tsDefaultReporter = ts.reporter.defaultReporter();
const webpackConfig = require('./build/webpack.config');

const libDir = path.join(__dirname, './lib');
const esDir = path.join(__dirname, './es');

function compileLess(isModule) {
    gulp
        .src(['components/**/*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest((isModule ? libDir : esDir) + `/css`));
}


function compileTs(isModule) {
    let error = 0;
    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'config/*.ts',
        'utils/*.ts',
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
    return tsResult.js.pipe(gulp.dest(isModule ? libDir : esDir + '/components'))
}

function mergeCss(cssPath) {
    const dirs = getFirstLevelSonDirs(cssPath)
    let allCssContent = '';
    dirs.forEach(dir => {
        allCssContent += `@import './css/${dir}/style/index.css';\n`
    })
    fs.writeFileSync(path.join(__dirname, 'es', 'ts.less'), allCssContent)
}

function mergeJs(jsPath) {
    const dirs = getFirstLevelSonDirs(jsPath)
    let allJsContent = '';
    dirs.forEach(dir => {
        allJsContent += `import ${dir} from './components/${dir}/index.js';\n`
    })
    allJsContent += `import './ts.less';\n`
    allJsContent += `export {\n  ${dirs.join(',\n  ')} \n}`
    fs.writeFileSync(path.join(__dirname, 'es', 'ts.js'), allJsContent)
}

gulp.task('compile-clean', (done) => {
    rimraf.sync(libDir);
    rimraf.sync(esDir);
    done();
})

gulp.task('compile-less', (done) => {
    compileLess();
    // console.log('Compile less finish.')
    done()
})


gulp.task('compile-typescript', (done) => {
    compileTs().on('finish', done);
    // console.log('Compile js finish.')
    // done();
})

/**
 * 1、把es/css内的抽离出来，合并成一个es/ts.css入口
 * 2、把es/组件/index.js 抽取在一起，合并成es/ts.js入口
 * 3、利用webpack打包
 */

gulp.task('merge-css', (done) => {
    const cssPath = path.join(__dirname, './es/css')
    mergeCss(cssPath);
    done();
})

gulp.task('merge-js', (done) => {
    const jsPath = path.join(__dirname, './es/components');
    mergeJs(jsPath);
    done();
})

gulp.task('webpack-build', (done) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          return
        }
    
        const info = stats.toJson()
    
        if (stats.hasErrors()) {
          console.error(info.errors)
        }
    
        if (stats.hasWarnings()) {
          console.warn(info.warnings)
        }
    
        const buildInfo = stats.toString({
          colors: true,
          children: true,
          chunks: false,
          modules: false,
          chunkModules: false,
          hash: false,
          version: false
        })
    
        console.log(buildInfo);
        done()
    })
})

gulp.task('compile', gulp.series(['compile-clean', 'compile-less', 'compile-typescript']));
gulp.task('merge',gulp.series(['merge-css', 'merge-js']));
gulp.task('build', gulp.series(['compile', 'merge', 'webpack-build']));
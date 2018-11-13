const gulp = require('gulp');
const changed = require('gulp-changed');    // 只编译改动过的文件
const fileinclude = require('gulp-file-include');//模板复用
const htmlmin = require('gulp-htmlmin');    // html 压缩
const less = require('gulp-less'); //less转css
const autofx = require('gulp-autoprefixer');    // css 浏览器前缀补全
const px2rem = require('gulp-px2rem-plugin'); //px转rem
const cleanCSS = require('gulp-clean-css');     // 压缩 css
const eslint = require('gulp-eslint');          // js 代码检查
const uglify = require('gulp-uglify');          // js 压缩
const babel = require('gulp-babel');            // 编译 es6 代码
const imagemin = require('gulp-imagemin');      // 图片压缩
const cache = require('gulp-cache');            // 图片缓存，图片替换了才压缩
const md5 = require('gulp-md5-assets');         // 添加 md5
const concat = require('gulp-concat');          // 合并文件
const del = require('del');                     // 删除文件
const gulpSequence = require('gulp-sequence'); //同步执行模块
const browserSync = require('browser-sync').create();//自动刷新浏览器
const reload = browserSync.reload;


const config = require('./config/pluginConfig');    // 引入插件的配置


//watch检测时，避免编译出错后，停止任务。
function swallowError(error) {
    // If you want details of the error in the console
    //console.error(error.toString());
    this.emit('end')
}



// 转移html
gulp.task('move-html',function () {
    return gulp.src('./src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dev'));
});
// 压缩 html --> (/build)
gulp.task('minify-html', ['move-html'], () => {
    return gulp
        .src('./dev/**/*.html')
        .pipe(htmlmin(config.htmlmin))
        .pipe(gulp.dest('./build'))
        .pipe(md5(10));
});


//编译 less
gulp.task('less',function () {
    return gulp.src('./src/css/**/*.less')
        .pipe(less())
        .on('error', swallowError)
        //.pipe(px2rem({'width_design':360,'ignore_selector':[]}))
        .on('error', swallowError)
         .pipe(autofx(config.autofx))
        .pipe(gulp.dest('./dev/css'))
        .pipe(reload({stream:true}))
        ;
});
// 压缩 css --> (/build)
gulp.task('minify-css', ['less'], () => {
    return gulp
        .src('./dev/css/**/*.css')
        .pipe(cleanCSS(config.cleanCSS))
        .pipe(gulp.dest('./build/css'))
        .pipe(md5(10, './build/**/*.html'));   // 查找对应文件，替换为添加md5的文件名
});

// 编译 js --> (/dev)
gulp.task('babel-js', () => {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())  // 错误格式化输出
        .pipe(changed('./dev/js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./dev/js'))
        .pipe(reload({stream: true}));

});

// 压缩js --> (/build)
gulp.task('minify-js', ['babel-js'], () => {
    return gulp
        .src('./dev/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(md5(10, './build/**/*.html'));
});

// 转移图片 --> (/dev)
gulp.task('move-img', () => {
    return gulp
        .src('./src/img/**/*.{png,jpg,gif,ico}')
        .pipe(changed('./dev/img'))
        .pipe(gulp.dest('./dev/img'))
        .pipe(reload({stream: true}));
});
// 压缩图片 --> (/build)
gulp.task('minify-img', ['move-img'], () => {
    return gulp
        .src('./dev/img/**/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true, //无损压缩
            optimizationLevel: 7 //优化等级 1 - 7
        })))
        .pipe(gulp.dest('./build/img'))
        .pipe(md5(10, './build/**/*.{css,js,html,json}'));
});


// 转移 libs 插件 (libs 中引入的都是压缩后的文件)
gulp.task('move-lib-dev', () => {
    return gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./dev/lib'));
});
gulp.task('move-lib-build', () => {
    return gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./build/lib'));
});

//转移data文件夹
gulp.task('move-data-dev', () => {
    return gulp.src('./data/**/*')
        .pipe(gulp.dest('./dev/data'));
});

// 清空文件夹
gulp.task('clean-dev', (cb) => {
    return del(['./dev/**/*'], cb);
});
gulp.task('clean-build', (cb) => {
    return del(['./build/**/*'], cb);
});



/* run 实时开发 */
gulp.task('run',["dev"],function () {
    browserSync.init({
        server:{
            baseDir:'./dev',  // 设置服务器的根目录
            index:'index.html' // 指定默认打开的文件
        },
        port:8022,  // 指定访问服务器的端口号
        open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
        injectChanges: true // 注入CSS改变
    });
    gulp.watch(['./src/**/*.html','./src/tpl/**/*.tpl'],['move-html']);
    gulp.watch('./data/**',['move-data-dev']).on('change', reload);
    gulp.watch('./src/css/**/*.less',['less']);
    gulp.watch('./src/js/**/*.js',['babel-js']);
    gulp.watch('./src/lib/**/*', ['move-lib-dev']);
    gulp.watch('./dev/**/*.html').on('change', reload);
});


/* 开发环境（未压缩） */
gulp.task('dev',function (cb) {
    gulpSequence("clean-dev","move-html",["less","babel-js","move-img","move-lib-dev","move-data-dev"])(cb);
});

/* 生产环境（压缩过） */
gulp.task('build',function (cb) {
    gulpSequence("clean-build","minify-html",["minify-css","minify-js","minify-img","move-lib-build"])(cb);
});


// gulp-htmlmin 压缩 html
exports.htmlmin = {
    removeComments: true,
    collapseWhitespace: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};

// gulp-autoprefixer 添加浏览器前缀
exports.autofx = {
    browsers: [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 20',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ],
    cascade: true, //是否美化属性
    remove: true //是否去掉不必要的前缀
};

// gulp-clean-css 压缩 css
exports.cleanCSS = {
    compatibility: 'ie8',
    keepSpecialComments: '*'
};


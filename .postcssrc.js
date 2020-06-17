// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue: 16,  //根大小
      propList: ["*"], //属性的选择器，*表示通用
      selectorBlackList: [
        // ".ig- "
      ] //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
    }
  }
}

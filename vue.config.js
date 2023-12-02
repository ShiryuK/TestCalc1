// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-vue-project/'  // このパスはリポジトリ名に基づいて変更してください
    : '/'
}

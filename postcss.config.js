module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./build/**/*.html']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}

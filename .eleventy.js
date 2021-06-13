const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function (eleventyConfig) {
  // Add watch targets
  eleventyConfig.addWatchTarget('./_tmp/style.css')

  // Passthrough static files
  eleventyConfig.addPassthroughCopy('./website/CNAME')
  eleventyConfig.addPassthroughCopy({
    './_tmp/style.css': './style.css'
  })

  // Add shortcode to get the current time
  eleventyConfig.addShortcode('now', function () {
    return now
  })

  // Don't use .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }

    return content
  })

  return {
    dir: {
      input: 'website',
      output: 'build'
    }
  }
}

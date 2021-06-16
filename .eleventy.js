const postcss = require('postcss')
const postcssConfig = require('./postcss.config')
const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = eleventyConfig => {
  // Passthrough static files
  eleventyConfig.addPassthroughCopy('./website/CNAME')

  // Add shortcode to get the current time
  eleventyConfig.addShortcode('now', () => {
    return now
  })

  // Don't use .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }

    return content
  })

  // Process SCSS to CSS
  eleventyConfig.addWatchTarget('./website/_assets/scss/')
  eleventyConfig.addTransform('postcss', async (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.css')) {
      const processed = await postcss(postcssConfig.plugins).process(content, {
        from: './website/_assets/scss/main.scss'
      })

      return processed.css
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

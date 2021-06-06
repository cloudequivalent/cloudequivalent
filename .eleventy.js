module.exports = function (eleventyConfig) {
  // Passthrough static files
  eleventyConfig.addPassthroughCopy('./website/CNAME')

  return {
    dir: {
      input: 'website',
      output: 'build'
    }
  }
}

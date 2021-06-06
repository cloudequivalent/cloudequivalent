const slugify = require('slugify')
const providers = require('./providers')
const services = []

providers.forEach(provider => {
  const dedupe = new Set(require(`./${provider.key}/services.json`))

  const map = [...dedupe].map(service => {
    return {
      name: service,
      slug: slugify(service, {
        strict: true,
        lower: true
      }),
      provider: provider
    }
  })

  return services.push(map)
})

module.exports = services.flat()

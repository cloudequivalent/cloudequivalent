const fs = require('fs').promises
const path = require('path')
const slugify = require('slugify')
const equivalentMetadata = require('./meta/equivalents.json')
const providers = ['aws', 'azure', 'gcp'];

(async () => {
  const providersMetadata = await Promise.all(providers.map(async provider => {
    const contents = await fs.readFile(path.resolve(__dirname, `${provider}/meta.json`), 'utf8')
    return JSON.parse(contents)
  }))

  const services = await Promise.all(providers.map(async provider => {
    const contents = await fs.readFile(path.resolve(__dirname, `${provider}/services.json`), 'utf8')
    const parsed = JSON.parse(contents)

    return [...new Set(parsed)].map(service => {
      const slug = slugify(service, {
        strict: true,
        lower: true
      })

      return {
        name: service,
        slug,
        provider: providersMetadata.find(metadata => metadata.key === provider)
      }
    })
  }))

  // Flatten and sort alphabetically
  const flat = services.flat()

  flat.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  // Add in equivalents
  const equivalents = flat.map(service => {
    const equiv = equivalentMetadata.find(equivalent => equivalent.includes(service.slug)) || []

    return {
      ...service,
      equivalents: equiv.map(equivalent => flat.find(service => service.slug === equivalent)).filter(equivalent => equivalent.provider.key !== service.provider.key)
    }
  })

  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/services.json'), JSON.stringify(equivalents, null, 2))
})()

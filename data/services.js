const fs = require('fs').promises
const path = require('path')
const slugify = require('slugify')
const equivalentMetadata = require('./meta/equivalents.json')
const providers = ['aws', 'azure', 'gcp'];

(async () => {
  const providersMetadata = await Promise.all(providers.map(async provider => {
    return fs.readFile(path.resolve(__dirname, `${provider}/meta.json`), 'utf8').then(contents => {
      return JSON.parse(contents)
    })
  }))

  const services = await Promise.all(providers.map(async provider => {
    return fs.readFile(path.resolve(__dirname, `${provider}/services.json`), 'utf8').then(contents => {
      return JSON.parse(contents).map(service => {
        const slug = slugify(service.name, {
          strict: true,
          lower: true
        })
        const providerInfo = providersMetadata.find(metadata => {
          return metadata.key === provider
        })

        delete providerInfo.remote
        delete providerInfo.unlistedServices

        return {
          ...service,
          slug: slug,
          provider: providerInfo
        }
      })
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
    const equiv = equivalentMetadata.find(equivalent => {
      return equivalent.includes(service.slug)
    }) || []

    return {
      ...service,
      equivalents: equiv.map(equivalent => {
        const equivalentService = flat.find(service => {
          return service.slug === equivalent
        })

        if (!equivalentService) {
          // Output services that aren't found
          console.log(equivalent, 'not found')
        }

        return equivalentService
      }).filter(equivalent => {
        return equivalent ? equivalent.provider.key !== service.provider.key : false
      })
    }
  })

  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/services.json'), JSON.stringify(equivalents, null, 2))
})()

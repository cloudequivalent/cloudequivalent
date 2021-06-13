const path = require('path')
const fs = require('fs').promises
const utilities = require('./utilities');

(async () => {
  // Get local provider definitions
  const providers = utilities.getProviders().map(provider => {
    return utilities.getProvider(provider)
  }).map(provider => {
    // Return only required data
    return {
      name: provider.name,
      key: provider.key,
      accentColour: provider.accentColour
    }
  })

  // Get service definitions and add in provider information, slugs
  const services = providers.map(provider => {
    return require(path.resolve(__dirname, `../data/${provider.key}/services.json`)).map(service => {
      return {
        ...service,
        slug: utilities.slugify(service.name),
        provider
      }
    })
  }).flat()

  // Resolve equivalents
  const allEquivalents = utilities.getEquivalents()
  const equivalents = services.map(service => {
    // Get equivalents
    const findEquivalent = allEquivalents.find(equivalent => {
      return equivalent.includes(service.slug)
    })

    return {
      ...service,
      equivalents: findEquivalent ? findEquivalent.map(equivalent => {
        // Map equivalents to full service objects
        return services.find(service => {
          return service.slug === equivalent
        })
      }).filter(equivalent => {
        // Filter out services from the same provider
        return equivalent.provider.key !== service.provider.key
      }) : []
    }
  })

  // Sort alphabetically
  const sorted = utilities.sort(equivalents, 'name')

  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/services.json'), JSON.stringify(sorted, null, 2))
})()

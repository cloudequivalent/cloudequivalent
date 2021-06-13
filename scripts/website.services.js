const path = require('path')
const fs = require('fs').promises
const utilities = require('./utilities');

(async () => {
  // Get local provider definitions
  const providers = utilities.getProviders(true)

  // Get service definitions and add in provider information
  const services = providers.map(provider => {
    return require(path.resolve(__dirname, `../data/${provider.key}/services.json`)).map(service => {
      return {
        ...service,
        provider
      }
    })
  }).flat()

  // Resolve equivalents
  const allEquivalents = utilities.getEquivalents()
  const equivalents = services.map(service => {
    // Get equivalents
    const findEquivalent = allEquivalents.find(equivalent => {
      return equivalent.includes(service.key)
    })

    return {
      ...service,
      equivalents: findEquivalent ? findEquivalent.map(equivalent => {
        // Map equivalents to full service objects
        return services.find(service => {
          return service.key === equivalent
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

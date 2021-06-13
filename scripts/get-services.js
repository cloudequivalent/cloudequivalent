const path = require('path')
const fs = require('fs').promises
const utilities = require('./utilities');

(async () => {
  for (const provider of utilities.getProviders()) {
    try {
      // Get remote provider services
      const remoteServices = await utilities.getRemote(provider.key, provider.extra.remote.url, provider.extra.remote.bodySelector, provider.extra.remote.nameSelector, provider.extra.remote.descriptionSelector)

      // Get or set unlisted services
      const extraServices = Object.keys(provider.extra).includes('services') ? provider.extra.services : []

      // Merge extra services (i.e. manually added services) and remote services, and add in keys
      const services = [...extraServices, ...remoteServices].map(function (service) {
        return {
          ...service,
          key: utilities.slugify(service.name)
        }
      })

      await fs.writeFile(path.resolve(__dirname, `../data/${provider.key}/services.json`), JSON.stringify(services, null, 2))
    } catch (e) {
      console.error(e)
    }
  }
})()

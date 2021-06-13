const path = require('path')
const fs = require('fs').promises
const providers = ['azure', 'gcp', 'aws']
const utilities = require('./utilities');

(async () => {
  for (const provider of providers) {
    try {
      // Get local provider information
      const meta = utilities.getProvider(provider)

      // Get remote provider services
      const remoteServices = await utilities.getRemote(meta.key, meta.remote.url, meta.remote.bodySelector, meta.remote.nameSelector, meta.remote.descriptionSelector)

      // Get or set unlisted services
      const unlistedServices = Object.keys(meta).includes('unlistedServices') ? meta.unlistedServices : []

      // Merge unlisted services (i.e. manually added services) and remote services
      const services = [...unlistedServices, ...remoteServices]

      await fs.writeFile(path.resolve(__dirname, `../data/${meta.key}/services.json`), JSON.stringify(services, null, 2))
    } catch (e) {
      console.error(e)
    }
  }
})()

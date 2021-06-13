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

  // Sort alphabetically
  const sorted = utilities.sort(providers, 'name')

  // Write to website data file
  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/providers.json'), JSON.stringify(sorted, null, 2))
})()

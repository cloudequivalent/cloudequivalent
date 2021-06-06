const fs = require('fs').promises
const path = require('path');

(async () => {
  const providers = [
    require('./aws/meta.json'),
    require('./azure/meta.json'),
    require('./gcp/meta.json')
  ]

  // Sort alphabetically
  providers.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/providers.json'), JSON.stringify(providers, null, 2))
})()

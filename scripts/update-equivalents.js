const path = require('path')
const fs = require('fs').promises
const utilities = require('./utilities');

(async () => {
  const equivalents = require(path.resolve(__dirname, '../data/equivalents.json'))

  utilities.getProviders().forEach(provider => {
    require(path.resolve(__dirname, `../data/${provider.key}/services.json`)).forEach(service => {
      const compositeKey = `${provider.key}.${service.key}`

      if (!Object.keys(equivalents).includes(compositeKey)) {
        equivalents[compositeKey] = []
      }
    })
  })

  await fs.writeFile(path.resolve(__dirname, '../data/equivalents.json'), JSON.stringify(equivalents, null, 2))
})()

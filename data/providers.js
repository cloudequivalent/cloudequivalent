const fs = require('fs').promises
const path = require('path');

(async () => {
  await fs.writeFile(path.resolve(__dirname, '../website/_data/generated/providers.json'), JSON.stringify([
    require('./aws/meta.json'),
    require('./azure/meta.json'),
    require('./gcp/meta.json')
  ], null, 2))
})()

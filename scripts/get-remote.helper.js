const utilities = require('./utilities');

(async function () {
  // key, url, bodySelector, nameSelector, descriptionSelector
  // const x = await utilities.getRemote('aws.regions', 'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/', '.lb-col.lb-tiny-24.lb-mid-8 p', 'b:first-of-type', 'i:first-of-type')

  // const y = x.map(function (region) {
  //   return {
  //     name: region.name.replace('Region', '').replace('**', '').trim(),
  //     description: region.description.replace('Launched', '').trim()
  //   }
  // }).filter(function (region) {
  //   return region.name !== 'Map Key'
  // })

  // console.log(y)

  const x = await utilities.getRemote('ibm-cloud', 'https://www.ibm.com/cloud/products', '[data-testid] > div', 'h2', 'p')

  console.log(x)
})()

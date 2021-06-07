const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs').promises
const path = require('path')

async function getServices (key, url, bodySelector, nameSelector, descriptionSelector) {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const services = []

  $(bodySelector).each((index, element) => {
    const e = cheerio.load(element)
    const name = e(nameSelector).text()
    const description = e(descriptionSelector).text()

    const filtered = services.filter(service => service.name === name)

    if (!filtered.length && name) {
      services.push({
        name: name,
        description: description
      })
    }
  })

  await fs.writeFile(path.resolve(__dirname, `../data/${key}/services.json`), JSON.stringify(services, null, 2))
};

(async () => {
  await getServices('gcp', 'https://cloud.google.com/products', '.cloud-card-standard__body', '.cloud-card-standard__headline', '.cloud-card-standard__body-text')
  await getServices('azure', 'https://azure.microsoft.com/en-gb/services/', '#products-list .column', 'h3.text-heading5 a span', 'p.text-body4')
  await getServices('aws', 'https://aws.amazon.com/products/', '.lb-item-expander-content a', 'span', 'cite')
})()

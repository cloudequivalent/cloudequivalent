const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const slugify = require('slugify')

const utilities = {
  getProviders (slim = false) {
    return ['aws', 'azure', 'gcp', 'alibaba-cloud', 'oracle-cloud'].map(provider => {
      return utilities.getProvider(provider)
    }).map(provider => {
      if (slim) {
        delete provider.extra
      }
      return provider
    })
  },
  getProvider (key) {
    const filepath = path.resolve(__dirname, `../data/${key}/meta.json`)
    try {
      return require(filepath)
    } catch (e) {
      throw new Error(`Can't find meta information for ${key} at ${filepath}`)
    }
  },
  getEquivalents () {
    return require(path.resolve(__dirname, '../data/equivalents.json'))
  },
  async getRemote (key, url, bodySelector, nameSelector, descriptionSelector) {
    try {
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const services = []

      $(bodySelector).each((index, element) => {
        const e = cheerio.load(element)
        const name = utilities.sanitize(e(nameSelector).text())
        const description = utilities.sanitize(e(descriptionSelector).text())

        const filtered = services.filter(service => service.name === name)

        if (!filtered.length && name) {
          services.push({
            name,
            description
          })
        }
      })

      return services
    } catch (e) {
      throw new Error(`Can't get remote services for ${key}`)
    }
  },
  sanitize (string) {
    return string.trim().replaceAll('\u200B', '')
  },
  slugify (string) {
    return slugify(string, {
      strict: true,
      lower: true
    })
  },
  sort (array, key) {
    return array.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1
      }
      if (a[key] > b[key]) {
        return 1
      }
      return 0
    })
  }
}

module.exports = utilities

const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const slugify = require('slugify')

module.exports = {
  getProviders () {
    return ['aws', 'azure', 'gcp']
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
    return require(path.resolve(__dirname, '../data/meta/equivalents.json'))
  },
  async getRemote (key, url, bodySelector, nameSelector, descriptionSelector) {
    try {
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
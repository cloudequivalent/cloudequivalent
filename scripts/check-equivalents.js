const utilities = require('./utilities')
let exitCode = 0;

(async () => {
  const sorted = utilities.getEquivalents().map(equivalent => {
    return equivalent.sort()
  })

  sorted.forEach(equivalent => {
    const filter = sorted.filter(equiv => {
      if (equiv.join() === equivalent.join()) {
        return true
      }
      return false
    })

    if (filter.length > 1) {
      exitCode = 1
      console.log(`Equivalents listed as ${JSON.stringify(filter[0], null, 0)} appear more than once`)
    }
  })

  process.exit(exitCode)
})()

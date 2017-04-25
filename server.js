const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const superagent = require('superagent')
const moment = require('moment')

const app = express()
const port = process.env.PORT || '3000'
const exchangeApiUrl = 'http://api.fixer.io'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

async function getLastThitryDays(target, symbols) {
  let exchangeRates = []
  const day = moment()
  
  for (let i = 0, max = 29; i < max; i += 1) {
    day.subtract(1, 'days')
    
    try {
      await superagent.get(`${exchangeApiUrl}/${day.format('YYYY-MM-DD')}?symbols=${symbols.join(',')}&base=${target}`).then(result => {
        exchangeRates.push(result.body)
      })
    } catch(err) {
      console.log(err)
    }
  }
  return exchangeRates
}

function getBestFiveDays(rates, reqData, target) {
  let result = []
  rates.forEach(day => {
      let dailyResult = {
        day: day.date,
        totalAfterConversion: 0,
        conversions: []
      }
      reqData.forEach(entry => {
        let factor = entry.currency === target ? 1 : day.rates[entry.currency]
        let convertedAmmount = entry.ammount * factor
        dailyResult.totalAfterConversion += convertedAmmount
        dailyResult.conversions.push({currency: entry.currency, convertedAmmount: convertedAmmount})
      })
      result.push(dailyResult)
  })
  result.sort((a, b) => {
    return b.totalAfterConversion - a.totalAfterConversion
  })
  return result.slice(0,5)
}

app.post('/api/bestdays', (req, res) => {
  const {data} = req.body
  const target = req.body.currency
  const symbols = data.map(entry => entry.currency)

  getLastThitryDays(target, symbols).then(rates => {
    return res.send(getBestFiveDays(rates, data, target))
  })
})

app.listen(port)

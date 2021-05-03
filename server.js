const express = require('express')
const cors = require('cors')
const data = require('./asesst/data/weather.json')
const { json } = require('express')
// require('dotenv').config()




const app = express()
app.use(cors())
app.get('/', function (req, res) {
  res.send(data)
})
app.listen(3030)
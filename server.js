const express = require('express')
const cors = require('cors');

const weatherHandler = require('./component/weather')
const movieHandler = require('./component/movie');

const superagent = require('superagent');
require('dotenv').config();


let PORT = process.env.PORT || 3090

const app = express()
app.use(cors())
app.get('/', function (req, res) {
  res.send('hello')
})


app.get('/weather', weatherHandler);
app.get('/movie', movieHandler)


app.listen(PORT)
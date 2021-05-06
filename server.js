const express = require('express')
const cors = require('cors');
const weather = require('./asesst/data/weather.json');
const { json } = require('express')
const superagent = require('superagent');
require('dotenv').config();


let PORT = process.env.PORT || 3090

const app = express()
app.use(cors())
app.get('/', function (req, res) {
  res.send('hello')
})

let WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.get('/weather', (req, res) => {
  try {
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitUrl).then(weatherBitData => {
      const arrOfData = weatherBitData.body.data.map(data => new Weather(data))
      res.send(arrOfData);
    });
  } catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);
  }
});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

// let MOVIE_KEY = process.env.MOVIE_KEY;

// app.get('/movie', (req, res) => {

//   const movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=${MOVIE_KEY}`;
//   superagent.get(movieUrl).then(movieData => {
//     const newArrOfData = movieData.body.dataOfM.map(dataOfM => new Movie(dataOfM))
//     res.send(newArrOfData);
//   });




// });

// class Movie {
//   constructor(dataOfM) {
//     this.title = dataOfM.original_title;
//     this.img = dataOfM.poster_path;
//     this.description = dataOfM.overview;
//   }
// }


app.listen(PORT)
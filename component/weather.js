const weather = require('../asesst/data/weather.json');
const superagent = require('superagent');
require('dotenv').config();
let inMemory = require('./cache');

let WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;


const handelWeather = (req, res) => {
  try {
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const queryParams = {
      key: WEATHER_BIT_KEY,
      lat: req.query.lat,
      lon: req.query.lon

    };
    if (inMemory[lat, lon]) {
      console.log('weather from memory');
      res.send(inMemory[key]);
    }
    else {
      superagent.get(weatherBitUrl).query(queryParams).then(weatherBitData => {
        const arrOfData = weatherBitData.body.data.map(data => new Weather(data))
        inMemory[lat, lon] = arrOfData;
        res.send(arrOfData);
        console.log('weather from API');
      });

    }


  } catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);
  }
};

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = handelWeather;


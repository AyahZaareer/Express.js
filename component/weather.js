const weather = require('../asesst/data/weather.json');
const superagent = require('superagent');
require('dotenv').config();
const inMemory = require('./cache');
let WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;


const handelWeather = (req, res) => {
    try {
        console.log(req.query);
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
        const params = {
            key: WEATHER_BIT_KEY,
            lat: req.query.lat,
            lon: req.query.lon

        }
        console.log(inMemory);
        if (inMemory[[lat, lon]]) {
            res.send(inMoemory[[lat, lon]]);
            console.log('sent from memory');

        }
        else {
            superagent.get(weatherBitUrl).then(weatherBitData => {
                const arrOfData = weatherBitData.body.data.map(data => new Weather(data))
                inMemory[[lat, lon]] = arrOfData;
                res.send(arrOfData);
            });
        }
    } catch (error) {
        const arrOfData = weather.data.map(data => new Weather(data));
        res.send(arrOfData);
    }
}

class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

module.exports = handelWeather;


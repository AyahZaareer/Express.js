const weather = require('../asesst/data/weather.json');
const superagent = require('superagent');
require('dotenv').config();
let WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;


const handelWeather = (req, res) => {
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
}

class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

module.exports = handelWeather;


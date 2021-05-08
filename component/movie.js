const superagent = require('superagent');
require('dotenv').config();
const inMoemory = require('./cache');

let MOVIE_KEY = process.env.MOVIE_KEY;
class Movie {
    constructor(movies) {
        this.title = movies.original_title;
        this.img = movies.poster_path;
        this.description = movies.overview;
    }
}

const handelMovie = (req, res) => {
    const movieUrl = `https://api.themoviedb.org/3/search/movie`;
    const params = {
        api_key: MOVIE_KEY,
        query: req.query.query
    }
    if (inMoemory[query]) {
        res.send(inMoemory[query]);
        console.log('sent from memory');
    }
    else {
        // console.log(req.query);

        superagent.get(movieUrl).then(movieData => {
            const newArrOfData = movieData.body.results.map(dataOfM => new Movie(dataOfM));
            inMoemory[query] = newArrOfData;
            res.send(newArrOfData);
            console.log('sent from cache');
        }).catch(error => res.send(erorr));
    }
    console.log(inMoemory);

};





module.exports = handelMovie;
const superagent = require('superagent');
require('dotenv').config();

let MOVIE_KEY = process.env.MOVIE_KEY;

const handelMovie = (req, res) => {
    try {
        console.log(req.query);
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.query}&limit=10`;
        superagent.get(movieUrl).then(movieData => {
            const newArrOfData = movieData.body.results.map(dataOfM => new Movie(dataOfM));
            res.send(newArrOfData);
        })
    } catch (error) {
        console.log(error)
    }

}

class Movie {
    constructor(movies) {
        this.title = movies.original_title;
        // this.img = movies.poster_path;
        this.description = movies.overview;
    }
}

module.exports = handelMovie;
const superagent = require('superagent');
require('dotenv').config();


let MOVIE_KEY = process.env.MOVIE_KEY;
class Movie {
    constructor(movies) {
        this.title = movies.original_title;
        this.img = movies.poster_path;
        this.description = movies.overview;
    }
}

const handelMovie = (req, res) => {
    try {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.query}&limit=10`;
        // console.log(req.query);

        superagent.get(movieUrl).then(movieData => {
            const newArrOfData = movieData.body.results.map(dataOfM => new Movie(dataOfM));

            res.send(newArrOfData);
        });
    } catch (erorr) {
        console.log(error);
    }

};





module.exports = handelMovie;
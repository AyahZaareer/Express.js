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

const inMemory = {};


const handelMovie = (req, res) => {

    try {
        const movieUrl = `https://api.themoviedb.org/3/search/movie`;
        let key = req.query.query;
        const queryParams = {
            api_key: MOVIE_KEY,
            query: req.query.query

        };
        if (inMemory[key]) {
            console.log('from memory');
            res.send(inMemory[req.query.query]);
        } else {
            superagent.get(movieUrl).query(queryParams).then(movieData => {
                const newArrOfData = movieData.body.results.map(dataOfM => new Movie(dataOfM));
                inMemory[key] = newArrOfData;
                res.send(newArrOfData);
                console.log('movie from  API');
            })

        }

        // console.log(req.query);


    } catch (erorr) {
        console.log(error);
    }

};





module.exports = handelMovie;
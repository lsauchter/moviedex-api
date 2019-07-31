require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(function validateBearerToken(req, res, next) {
    const authToken = req.get('Authorization');
    const apiToken = process.env.API_TOKEN;

    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'})
    }

    next()
})

function filterMovies(req, res) {
    const {genre, country, avg_vote} = req.query;

    let movieList = MOVIES;
    if(genre) {
        movieList = movieList.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }
    if(country) {
        movieList = movieList.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    if(avg_vote) {
        const vote = Number(avg_vote);
        movieList = movieList.filter(movie => movie.avg_vote >= vote)
    }

    res.json(movieList);
}

app.get('/movie', filterMovies);

app.listen(8000, () => {
    console.log('Server listening on http://localhost:8000')
})
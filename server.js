const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

function filterMovies(req, res) {
    res.send('Movies');
}

app.get('/movie', filterMovies);

app.listen(8000, () => {
    console.log('Server listening on PORT 8000')
})
const axios = require('axios');
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') require('../secrets');

async function getMovieData() {
  let num = 1;
  let allMovies = [];
  while (num <= 20) {
    let { data } = await axios.get('http://www.omdbapi.com', {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: 'movie',
        page: num,
      },
    });
    allMovies = allMovies.concat(data.Search);
    num++;
  }
  var movieData = JSON.stringify(allMovies);
  fs.writeFile('mock-data/movies.json', movieData, 'utf8', function (err) {
    if (err) throw err;
    console.log(`added ${allMovies.length} movies to mock-data/movies.json`);
  });
}

getMovieData();

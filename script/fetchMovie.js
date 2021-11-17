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

async function getEventsData() {
  let types = {};

  let categories = {
    'theater' : 'theater',
    'ncaa_basketball': 'sports',
    'concert' : 'concerts',
    'ncaa_womens_basketball': 'sports',
    'sports' : 'sports',
    'minor_league_hockey': 'sports',
    'wresting' : 'sports',
    'basketball' : 'sports',
    'broadway_tickets_national' : 'theater'
  }

  let events = [];
  if (process.env.NODE_ENV !== 'production') require('../secrets');
  let { data } = await axios.get('https://api.seatgeek.com/2/events', {
    params: {
      client_id: process.env.SEATGEEK_API_KEY_client_id,
      client_secret: process.env.SEATGEEK_API_KEY_client_secret,
      per_page: 100,
    },
  });
  data.events.forEach((event) => {
    if (!types[event.type]) {
      types[event.type] = 1;
    } else types[event.type] += 1;
    if (event.stats.average_price) {
      let mappedCategory = categories[event.type];
      if(!mappedCategory) mappedCategory = 'misc'
      events.push({
        productName: event.short_title,
        price: event.stats.lowest_price,
        picture: event.performers[0].image,
        date: event.datetime_utc,
        category: mappedCategory,
      });
    }
  });
  var eventsData = JSON.stringify(events);
  fs.writeFile('mock-data/events.json', eventsData, 'utf8', function (err) {
    if (err) throw err;
    console.log(`added ${events.length} events to mock-data/events.json`);
  });
  console.log(types);
}

// getMovieData();
getEventsData();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
      .then(beers => {
          res.render('beers', { beers });
          console.log(beers)
      })
      .catch(error => {
          console.log(error)
      })
});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getBeers()
  punkAPI.getRandom()
      .then(beers => {
          res.render('random-beers', { beers });
      })
      .catch(error => {
          console.log(error)
      })
});
app.listen(3000);

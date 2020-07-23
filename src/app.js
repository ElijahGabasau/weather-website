const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const app = express();

//setup handlebars engine and views location
app.set('view engine', 'hbs');

const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

//setup directory to serve
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Elijah Me'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Elijah Me'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Elijah Me'
  });
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    res.send({
      error: 'You must provide a search term'
    })

    return;
  }

  res.send({
    products: []
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (err, data) => {
    if(err){
      return res.send({
        error: err
      });
    }

     weather(`${data.coordinates[1]},${data.coordinates[0]}`, (error, forecast) => {
      if(error){
        return res.send({
          error: error
        });
      }

      return res.send({
        forecast,
        place_name: data.place_name,
        address: req.query.address
      })
    })
  });
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    code: 404,
    title: 'Help article not found',
    name: 'Elijah me'
  });
})

app.get('*', (req, res) => {
  res.render('404',{
    code: 404,
    title: 'Page not found',
    name: 'Elijah me'
  });
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.');
})
/* eslint-disable no-use-before-define */

const express = require('express');
const axios = require('axios')
const currentForecastService = require('./currentForecast.service');
const config = require('../config.json');

const router = express.Router();
const { apiKey } = config;

// routes
router.get('/fetch/:city', fetchCurrentForecastFromOpenWeatherMap);
router.get('/info/:city', getByCity);
router.get('/list', getAll);

module.exports = router;

function getAll(req, res) {
  currentForecastService.getAll()
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function getByCity(req, res) {
  currentForecastService.getByCity(req.params.city)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function fetchCurrentForecastFromOpenWeatherMap(req, res) {
  const { city } = req.params;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url)
    .then((owmresult) => {
      console.log(owmresult.status);
      currentForecastService.persist(owmresult.data)
        .then((info) => {
          console.log(`response : ${owmresult.data}`);
          res.json({ 
            message: 'Persist successful',
            result: owmresult.data
          });
        })
        .catch((err) => {
          console.error('Fetch error');
          console.error(err);
        });
    })
    .catch((err) => {
      console.log('Error fetching data from openstreetmap');
      console.log(err);
    });
}

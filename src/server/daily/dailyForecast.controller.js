/* eslint-disable no-use-before-define */

const express = require('express');
const axios = require('axios')
const dailyForecastService = require('./dailyForecast.service');
const config = require('../config.json');

const router = express.Router();
const { apiKey } = config;

// routes
router.get('/fetch/:coord', fetchDailyForecastFromOpenWeatherMap);
router.get('/info/:coord', getByCoord);
router.get('/list', getAll);

module.exports = router;

function getAll(req, res) {
  dailyForecastService.getAll()
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function getByCoord(req, res) {
  let coords = req.params.coord.split(',')
  dailyForecastService.getByCoord(coords[0], coords[1])
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function fetchDailyForecastFromOpenWeatherMap(req, res) {
  let coords = req.params.coord.split(',');
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=current,minutely,daily&appid=${apiKey}&units=metric`
  console.log(url);
  axios.get(url)
    .then((owmresult) => {
      console.log(owmresult.status);
      dailyForecastService.persist(owmresult.data)
        .then((info) => {
          console.log(`response : ${info}`);
          res.json({ message: 'Persist successful' });
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

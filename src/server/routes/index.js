const route = require('express').Router();

route.use('/api/current/forecast/', require('../current/currentForecast.controller'));
route.use('/api/daily/forecast/', require('../daily/dailyForecast.controller'));

module.exports = route;

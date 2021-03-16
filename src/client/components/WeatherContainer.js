import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2/dist/react-chartjs-2';

import { currentForecastActions } from '../redux/current/currentForecastActions';
import { dailyForecastActions } from '../redux/daily/dailyForecastActions';
import WeatherTable from './WeatherTable';

function WeatherContainer() {
  const currentCity = useSelector(state => state.currentForecast);
  const currentDaily = useSelector(state => state.dailyForecast);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log();
    let currCity = localStorage.getItem('currentCity') || currentCity.current_name
    let currCoords = localStorage.getItem('currentCoords') || currentDaily.current_coord
    dispatch(currentForecastActions.getByCity(currCity));
    dispatch(dailyForecastActions.getByCoord(currCoords));
  }, []);

  return (
    <div className="col-md-8 offset-md-2">
      <div className="col-lg-8 offset-lg-2">
        {currentCity.loading && <em>currentCity loading...</em>}
        {currentCity.error && <span className="text-danger">ERROR: {currentCity.error}</span>}
        {currentCity.current_forecast &&
          <div>
            <h3>Weather in {currentCity.current_forecast.name}, {currentCity.current_forecast.data.sys.country}</h3>
            <h3>{currentCity.forecast_view.temp} &#8451;</h3>
            <h3>{currentCity.forecast_view.description}</h3>
            <h3>{currentCity.forecast_view.lastUpdate}</h3>
            <WeatherTable {...currentCity.forecast_view.tableData} />
          </div>
        }
        {currentDaily.loading && <em>currentDaily loading...</em>}
        {currentDaily.error && <span className="text-danger">ERROR: {currentDaily.error}</span>}
        {currentDaily.items && currentDaily.line_data &&
          <div>
            <Line data={currentDaily.line_data} options={currentDaily.line_options} />
          </div>
        }
      </div>
    </div>
  );

}

export default WeatherContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2/dist/react-chartjs-2';
import { dailyForecastActions } from '../redux/daily/dailyForecastActions';

function WeatherChart () {
  const currentDaily = useSelector(state => state.dailyForecast);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(dailyForecastActions.getByCoord(currentDaily.current_coord));
  }, []);
  
  return (
    <div>
      {currentDaily.loading && <em>currentCity loading...</em>}
      {currentDaily.error && <span className="text-danger">ERROR: {currentDaily.error}</span>}
      {currentDaily.current_forecast &&
        <div>
          <h3>Weather in {currentDaily.current_coord}</h3>
          {/* <Line data={lineData} options={options} /> */}
        </div>
      }
    </div>
  )
}

export default WeatherChart;
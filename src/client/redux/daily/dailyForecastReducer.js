import { dailyForecastConstants } from './dailyForecastConstants';
import moment from 'moment';

const initialState = {
    loading: false,
    items: [],
    current_coord: localStorage.getItem("currentCoord") || {lat: "39.9199", lon: "32.8543"},
    error: ''
}

const dailyForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case dailyForecastConstants.GETALL_REQUEST:
        return {
            ...state,
            loading: true
        };
    case dailyForecastConstants.GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            items: action.dailyForecasts,
        };
    case dailyForecastConstants.GETALL_FAILURE:
        return {
            ...state,
            error: action.error
        };
    case dailyForecastConstants.GETBYCOORD_REQUEST:
        return {
            ...state,
            loading: true
        };
    case dailyForecastConstants.GETBYCOORD_SUCCESS:
        let hourlyData = action.dailyForecasts.data.hourly.slice(0,25);

        let every3th = hourlyData.filter(function(value, index, Arr) {
          return index % 3 == 0;
        });

        let lineLabels = []
        let lineTemps = []

        every3th.map(data => {
          // console.log(data.dt);
          // console.log(data.temp);
          let _time = new moment(data.dt * 1000);
          
          lineLabels.push(_time.format('HH:mm'));
          lineTemps.push(data.temp);
          // console.log(_time.format('HH:mm MMM d'));
        });
        
        let lineData = {
          labels: lineLabels,
          datasets: [
              {
              label: 'Temp',
              data: lineTemps,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
              },
          ],
        }
        let lineOptions = {
          scales: {
            yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
            ],
          },
        }

        return {
            ...state,
            loading: false,
            items: action.dailyForecasts,
            line_data: lineData,
            line_options: lineOptions
        };
    case dailyForecastConstants.GETBYCOORD_FAILURE:
        return {
            ...state,
            error: action.error
        };
    default:
        return state
  }
}


export default dailyForecastReducer;
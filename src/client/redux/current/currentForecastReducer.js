import { currentForecastConstants } from './currentForecastConstants';
import moment from 'moment';

const initialState = {
    loading: false,
    changing: false,
    fetching: false,
    items: [],
    current_name: localStorage.getItem("currentCity") || "Ankara",
    current_coord: localStorage.getItem("currentCoord") || {lat: "39.9199", lon: "32.8543"},
    error: ''
}

const currentForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case currentForecastConstants.GETALL_REQUEST:
        return {
            ...state,
            loading: true
        };
    case currentForecastConstants.GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            items: action.currentForecasts,
        };
    case currentForecastConstants.GETALL_FAILURE:
        return {
            ...state,
            error: action.error
        };
    case currentForecastConstants.GETBYCITY_REQUEST:
        return {
            ...state,
            loading: true
        };
    case currentForecastConstants.GETBYCITY_SUCCESS:
        let sunrise = new moment(action.currentForecasts.data.sys.sunrise * 1000);
        let sunset = new moment(action.currentForecasts.data.sys.sunset * 1000);

        let updateTime = new moment(action.currentForecasts.updatedAt);

        let forecastView = {
            coord: {
                lat: action.currentForecasts.data.coord.lat,
                lon: action.currentForecasts.data.coord.lon,
            },
            temp: `${action.currentForecasts.data.main.temp}`,
            description: `${action.currentForecasts.data.weather[0].description}`,
            lastUpdate: `${updateTime.format('HH:mm MMM d')}`,
            tableData: {
                wind: `${action.currentForecasts.data.wind.deg}, ${action.currentForecasts.data.wind.speed} m/s`,
                cloudliness: `${action.currentForecasts.data.clouds.all} %`,
                pressure: `${action.currentForecasts.data.main.pressure} hpa`,
                humidity: `${action.currentForecasts.data.main.humidity} %`,
                sunrise: `${sunrise.format('HH:mm')}`,
                sunset: `${sunset.format('HH:mm')}`,
                geo_coords: `[${action.currentForecasts.data.coord.lat}, ${action.currentForecasts.data.coord.lon}]`,
            }
        }

        return {
            ...state,
            loading: false,
            current_forecast: action.currentForecasts,
            forecast_view: forecastView
        };
    case currentForecastConstants.GETBYCITY_FAILURE:
        return {
            ...state,
            error: action.error
        };
    case currentForecastConstants.CHANGECITY_REQUEST:
        return {
            ...state,
            changing: true
        };
    case currentForecastConstants.CHANGECITY_SUCCESS:
        localStorage.setItem('currentCity', action.newCity.name);
        localStorage.setItem('currentCoord', JSON.stringify(action.newCity.data.coord));
        return {
            ...state,
            current_name: action.newCity.name,
            current_coord: action.newCity.data.coord,
            changing: false
        };
    case currentForecastConstants.CHANGECITY_FAILURE:
        return {
            ...state,
            error: action.error,
            changing: false
        };
    case currentForecastConstants.FETCHBYCITY_REQUEST:
        return {
            ...state,
            fetching: true
        };
    case currentForecastConstants.FETCHBYCITY_SUCCESS:
        return {
            ...state,
            items: action.currentForecasts,
            fetching: false
        };
    case currentForecastConstants.FETCHBYCITY_FAILURE:
        return {
            ...state,
            error: action.error,
            fetching: false
            };
    default:
        return state
  }
}


export default currentForecastReducer;
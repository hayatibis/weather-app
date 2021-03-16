import { combineReducers } from 'redux'
import currentForecastReducer from './current/currentForecastReducer'
import dailyForecastReducer from './daily/dailyForecastReducer'

const rootReducer = combineReducers( {
    currentForecast: currentForecastReducer,
    dailyForecast: dailyForecastReducer
  } 
)

export default rootReducer;
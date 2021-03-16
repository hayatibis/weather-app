import { dailyForecastConstants } from './dailyForecastConstants';
import { dailyForecastService } from './dailyForecastService';

export const dailyForecastActions = {
  getAll,
  getByCoord
};

function getAll() {
  return dispatch => {
      dispatch(request());

      dailyForecastService.getAll()
          .then(
            dailyForecasts => dispatch(success(dailyForecasts)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: dailyForecastConstants.GETALL_REQUEST } }
  function success(dailyForecasts) { return { type: dailyForecastConstants.GETALL_SUCCESS, dailyForecasts } }
  function failure(error) { return { type: dailyForecastConstants.GETALL_FAILURE, error } }
}


function getByCoord(coord) {
  return dispatch => {
      dispatch(request());

      dailyForecastService.getByCoord(coord)
          .then(
            dailyForecasts => dispatch(success(dailyForecasts)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: dailyForecastConstants.GETBYCOORD_REQUEST } }
  function success(dailyForecasts) { return { type: dailyForecastConstants.GETBYCOORD_SUCCESS, dailyForecasts } }
  function failure(error) { return { type: dailyForecastConstants.GETBYCOORD_FAILURE, error } }
}


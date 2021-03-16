import { currentForecastConstants } from './currentForecastConstants';
import { currentForecastService } from './currentForecastService';

export const currentForecastActions = {
  getAll,
  getByCity,
  changeCity,
  fetchByCity
};

function getAll() {
  return dispatch => {
      dispatch(request());

      currentForecastService.getAll()
          .then(
              currentForecasts => dispatch(success(currentForecasts)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: currentForecastConstants.GETALL_REQUEST } }
  function success(currentForecasts) { return { type: currentForecastConstants.GETALL_SUCCESS, currentForecasts } }
  function failure(error) { return { type: currentForecastConstants.GETALL_FAILURE, error } }
}

function getByCity(city) {
  return dispatch => {
      dispatch(request());

      currentForecastService.getByCity(city)
          .then(
              currentForecasts => dispatch(success(currentForecasts)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: currentForecastConstants.GETBYCITY_REQUEST } }
  function success(currentForecasts) { return { type: currentForecastConstants.GETBYCITY_SUCCESS, currentForecasts } }
  function failure(error) { return { type: currentForecastConstants.GETBYCITY_FAILURE, error } }
}

function changeCity(city) {
  return dispatch => {
      dispatch(request());

      currentForecastService.changeCity(city)
          .then(
              newCity => dispatch(success(newCity)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: currentForecastConstants.CHANGECITY_REQUEST } }
  function success(newCity) { return { type: currentForecastConstants.CHANGECITY_SUCCESS, newCity } }
  function failure(error) { return { type: currentForecastConstants.CHANGECITY_FAILURE, error } }
}

function fetchByCity(city) {
  return dispatch => {
      dispatch(request());

      currentForecastService.fetchByCity(city)
          .then(
            currentForecasts => dispatch(success(currentForecasts)),
            error => {
              dispatch(failure(error.toString()))
            }
          );
  };

  function request() { return { type: currentForecastConstants.FETCHBYCITY_REQUEST } }
  function success(currentForecasts) { return { type: currentForecastConstants.FETCHBYCITY_SUCCESS, currentForecasts } }
  function failure(error) { return { type: currentForecastConstants.FETCHBYCITY_FAILURE, error } }
}

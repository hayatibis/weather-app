export const currentForecastService = {
  getAll,
  getByCity,
  changeCity,
  fetchByCity
};

function getAll() {
  return fetch(`/api/current/forecast/list`).then(handleResponse);
}

function getByCity(city) {
  return fetch(`/api/current/forecast/info/${city}`).then(handleResponse);
}

function fetchByCity(city) {
  return fetch(`/api/current/forecast/fetch/${city}`).then(triggerDailyFromCity);
}

function triggerDailyFromCity(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    let lat = data.result.coord.lat;
    let lon = data.result.coord.lon;
    return fetch(`/api/daily/forecast/fetch/${lat},${lon}`).then(getPure);
  });
}

function getPure(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return fetch(`/api/current/forecast/list`).then(handleResponse);
  });
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

function changeCity(city) {
  return fetch(`/api/current/forecast/info/${city}`).then(handleResponse);
}

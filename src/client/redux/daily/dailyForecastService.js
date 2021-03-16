export const dailyForecastService = {
  getAll,
  getByCoord
};

function getAll() {
  return fetch(`/api/daily/forecast/list`).then(handleResponse);
}

function getByCoord(coord) {
  
  let myCoord = JSON.parse(coord);
  console.log(myCoord);
  return fetch(`/api/daily/forecast/info/${myCoord.lat},${myCoord.lon}`).then(handleResponse);
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

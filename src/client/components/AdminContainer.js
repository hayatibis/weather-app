import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentForecastActions } from '../redux/current/currentForecastActions';

function AdminContainer( ) {
  const fetching = useSelector(state => state.fetching);
  const currentForecasts = useSelector(state => state.currentForecast);

  const [currentCity, setCurrentCity] = useState(currentForecasts.current_name);
  const [fetchCity, setFetchCity] = useState('');

  const handleChange = (evt) => {
      evt.preventDefault();
      dispatch(currentForecastActions.changeCity(currentCity));
  }

  const dispatch = useDispatch();

  const handleFetch = (evt) => {
    evt.preventDefault();
    dispatch(currentForecastActions.fetchByCity(fetchCity));
  }

  useEffect(() => {
    dispatch(currentForecastActions.getAll());
  }, []);

  return (
    <div className="col-md-8 offset-md-2">
        <div className="col-lg-8 offset-lg-2">
            <div className="change">
              <h3>Change City</h3>
              <p>Current city : {currentForecasts.current_name}</p>
              <form onSubmit={handleChange}>
                <label>
                  City:
                  <input
                    type="text"
                    value={currentCity}
                    onChange={e => setCurrentCity(e.target.value)}
                  />
                </label>
                <input type="submit" value="Change" />
              </form>
            </div>

            <div className="fetch">
              {!fetching &&
                <>
                  <h3>(Re)Fetch Data</h3>
                  <form onSubmit={handleFetch}>
                    <label>
                      Fetch:
                      <input
                        type="text"
                        value={fetchCity}
                        onChange={e => setFetchCity(e.target.value)}
                      />
                    </label>
                    <input type="submit" value="Fetch" />
                  </form>
                </>
              }
            </div>

            <div className="summary">
              <h3>Saved Forecasts:</h3>
              {currentForecasts.loading && <em>Forecasts loading...</em>}
              {currentForecasts.error && <span className="text-danger">ERROR: {currentForecasts.error}</span>}
              {currentForecasts.items && 
                <div>
                  <table className="table table-responsive table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">City id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Lat</th>
                        <th scope="col">Lon</th>
                        <th scope="col">Updated at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!fetching && currentForecasts.items.map((forecast, index) =>
                          <tr key={forecast.id}>
                            <th scope="row">{index}</th>
                            <td>{forecast.id}</td>
                            <td>{forecast.name}</td>
                            <td>{forecast.data.coord.lat}</td>
                            <td>{forecast.data.coord.lon}</td>
                            <td>{forecast.updatedAt}</td>
                          </tr> 
                      )}
                    </tbody>
                  </table>
                </div>
              }
            </div>            
        </div>
    </div>
  );

}

export default AdminContainer

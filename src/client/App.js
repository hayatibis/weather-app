import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navbar from './components/layout/Navbar';
import WeatherContainer from './components/WeatherContainer';
import AdminContainer from './components/AdminContainer';

import { history } from './helpers';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  

  useEffect(() => {
    history.listen((location, action) => {
      console.log(location);
      console.log(action);
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Router history={history}>  
          <Switch>
            <Route exact path="/">
                <AdminContainer />
            </Route>   
            <Route path='/weather' component={WeatherContainer} />
            <Route path='/admin' component={AdminContainer} />
          </Switch>
        </Router>
        {/* <Footer /> */}
      </div>
    </Provider>
  );
}

export default App;

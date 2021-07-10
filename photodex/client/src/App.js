import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App(){
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path ="/login">
              <Login />
            </Route>
            <Route exact path = "/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

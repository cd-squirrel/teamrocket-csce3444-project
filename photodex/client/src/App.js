import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import MyAlbums from './MyAlbums';
import Upload from './Upload';
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
            <Route exact path = "/myAlbums">
              <MyAlbums />
            </Route>
            <Route exact path ="/upload">
              <Upload />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

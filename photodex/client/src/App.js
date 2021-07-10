import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAlbums from './pages/MyAlbums';
import Upload from './pages/Upload';
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

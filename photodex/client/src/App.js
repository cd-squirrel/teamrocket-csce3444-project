/*
This is the main file for the React app.
What this returns will be placed where <div id="root"></div> is in public/index.html

*/
import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAlbums from './pages/MyAlbums';
import Upload from './pages/Upload';
import AlbumImages from './components/AlbumImages';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(){
  return (
    <Router>
      <div className="app">
        <NavBar /> 
        <div className="content container-flex m-4 d-flex justify-content-center" id ="album"> 
          <Switch>
            <Route exact path ="/">
              <Home />
            </Route>
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
            <Route exact path ="/images/:userId/:albumId">
              <AlbumImages />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
